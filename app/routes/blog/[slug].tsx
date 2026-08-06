import { css } from "design-system/css";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { registry, renderBlocks } from "../../components/page-registry";
import {
	Anchor,
	Badge,
	Button,
	Heading,
	Text,
} from "../../components/ui";
import { loadPage } from "../../lib/pages";
import { ArrowLeftIcon } from "../../icons/arrow-left";
import { CalendarIcon } from "../../icons/calendar";
import { ChevronRightIcon } from "../../icons/chevron-right";
import { ClockIcon } from "../../icons/clock";
import { ShareIcon } from "../../icons/share";
import AuthStatus from "../../islands/auth-status";
import { loadDocsConfig } from "../../lib/configs";
import { detectLocale, isLocale, localiseHref } from "../../lib/i18n";
import { loadPostBySlug, loadPosts } from "../../lib/posts";
import { markdownContentClass } from "../../utils/markdown-content-style";

// Register custom local blocks for this route's page template
registry.calendarIcon = () => <CalendarIcon width="18" height="18" />;
registry.clockIcon = () => <ClockIcon width="18" height="18" />;

export default createRoute(
	// Use ssgParams middleware to tell SSG which params to generate
	ssgParams(async () => {
		const { posts } = await loadPosts();
		return posts.map((post) => ({ slug: post.slug }));
	}),

	// Actual route handler
	async function handler(c) {
		const slugParam = c.req.param("slug");
		if (isLocale(slugParam)) {
			const next = arguments[1];
			return next();
		}
		// isLocale's `value is string` guard narrows the untaken (fall-through)
		// branch to `undefined` when `slugParam`'s static type is `string |
		// undefined` — even though at runtime it's always a real slug here (this
		// is a dynamic-segment route param, never actually missing). Re-widen it.
		const slug = slugParam as unknown as string;
		const currentPath = c.req.path;
		const currentLocale = detectLocale(currentPath);

		const [post, config, pageData] = await Promise.all([
			loadPostBySlug(slug, currentLocale),
			loadDocsConfig(currentLocale),
			loadPage("blog/[slug]", currentLocale),
		]);

		if (!post) {
			return c.notFound();
		}

		try {
			const htmlContent = post.html;
			const relatedPosts = post.relatedPosts;
			const postUrl = `${c.req.url}`;

			const localiseLink = (href: string) => localiseHref(href, currentLocale);

			return c.render(
				<div
					class={css({
						minHeight: "100vh",
						bg: "bg.subtle",
					})}
				>
					<title>
						{post.title || "Untitled"} -{" "}
						{currentLocale === "zh" ? "博客" : "Blog"}
					</title>

					<header
						class={css({
							borderBottomWidth: "1px",
							borderColor: { _light: "white.a4", _dark: "black.a4" },
							bg: { _light: "white.a7", _dark: "black.a7" },
							backdropFilter: "blur(20px) saturate(180%)",
							position: "sticky",
							top: "0",
							zIndex: "10",
						})}
					>
						<div
							class={css({
								maxWidth: "7xl",
								mx: "auto",
								px: { base: "4", md: "6", lg: "8" },
								py: "4",
								display: "flex",
								flexWrap: "wrap",
								rowGap: "3",
								alignItems: "center",
								justifyContent: "space-between",
								gap: "4",
								// Guards against CMS-authored header content wide enough
								// to overflow even a wrapped line. Breaks the text itself
								// rather than clipping with overflow-x: hidden, which
								// would force overflow-y to auto too (CSS couples the two
								// axes) and clip the dropdown/popover blocks in this row.
								// `break-word` (not `anywhere`) because this is inherited
								// by the dropdown/popover content nested in this row too,
								// and `anywhere` also shrinks flex min-content sizing,
								// breaking short words like "English" mid-word for no
								// reason.
								overflowWrap: "break-word",
							})}
						>
							<Anchor
								href={localiseLink("/")}
								variant="plain"
								class={css({ textDecoration: "none", flexShrink: "0" })}
							>
								<Heading
									as="span"
									class={css({
										fontSize: "lg",
										fontWeight: "bold",
										tracking: "tight",
									})}
								>
									{config.home?.brandName ?? "Artefact UI"}
								</Heading>
							</Anchor>

							<nav
								class={css({
									display: "flex",
									flexWrap: "wrap",
									minWidth: "0",
									gap: { base: "3", md: "6" },
									alignItems: "center",
									justifyContent: "flex-end",
									// CMS-authored nav content (headerItems links/dropdown/
									// popover plus the Edit button) is an arbitrary-width row —
									// letting each direct child wrap/shrink in turn is what
									// keeps this in bounds on narrow viewports instead of
									// forcing the whole header wider than the page.
									"& > *": {
										flexWrap: "wrap",
										minWidth: "0",
									},
								})}
							>
								{renderBlocks(config.headerItems, {
									locale: currentLocale,
									currentPath,
								})}
								<AuthStatus
									href={`/admin/#/collections/posts/entries/${slug}`}
								/>
							</nav>
						</div>
					</header>

					{/* Article Content */}
					<section
						class={css({
							maxWidth: "4xl",
							mx: "auto",
							px: { base: "4", md: "6", lg: "8" },
							py: { base: "8", md: "12" },
						})}
					>
						{/* Back Button */}
						<a
							href={localiseLink("/blog")}
							class={css({
								display: "inline-flex",
								alignItems: "center",
								gap: "2",
								mb: "6",
								color: "fg.muted",
								textDecoration: "none",
								fontSize: "sm",
								px: "3",
								py: "1.5",
								mx: "-3",
								borderRadius: "lg",
								transition: "all 0.2s",
								_hover: {
									bg: "bg.subtle",
									color: "fg",
									transform: "translateX(-4px)",
								},
							})}
						>
							<ArrowLeftIcon width="20" height="20" />
							{currentLocale === "zh" ? "返回博客" : "Back to Blog"}
						</a>

						<div
							class={css({
								bg: "bg",
								borderRadius: "2xl",
								shadow: "lg",
								overflow: "hidden",
							})}
						>
							{/* Cover Image (full width, no card padding) */}
							{post.cover && (
								<div
									class={css({
										overflow: "hidden",
									})}
								>
									<img
										src={post.cover}
										alt={post.title || "Post cover"}
										class={css({
											width: "full",
											height: { base: "200px", md: "350px" },
											objectFit: "cover",
											display: "block",
										})}
									/>
								</div>
							)}

							{/* Post Header (inside card, with padding) */}
							<div
								class={css({
									px: { base: "6", md: "10", lg: "12" },
									pt: { base: "8", md: "10" },
									pb: "6",
								})}
							>
								{/* Tags */}
								{(() => {
									if (!Array.isArray(post.tags) || post.tags.length === 0) return null;
									const tagsBlock = pageData?.tags ? {
										...pageData.tags,
										children: post.tags.map((tag: string) => ({
											blockType: "badge",
											text: tag,
											variant: "subtle",
											style: "border-radius: 9999px; font-size: 14px; font-weight: 500"
										}))
									} : undefined;
									return tagsBlock ? renderBlocks([tagsBlock]) : null;
								})()}

								{/* Title */}
								<Heading
									as="h1"
									size={{ base: "2xl", md: "3xl", lg: "4xl" }}
									class={css({
										fontWeight: "bold",
										lineHeight: "tight",
										mb: "4",
										color: "fg",
									})}
								>
									{post.title || "Untitled"}
									{post.draft === true && (
										<Badge
											variant="solid"
											colorPalette="orange"
											class={css({
												ml: "4",
												fontSize: "md",
												verticalAlign: "middle",
											})}
										>
											{currentLocale === "zh" ? "草稿" : "Draft"}
										</Badge>
									)}
								</Heading>

								{/* Description */}
								{post.description && (
									<Text
										size={{ base: "lg", md: "xl" }}
										class={css({
											color: "fg.muted",
											lineHeight: "relaxed",
											display: "block",
											fontStyle: "italic",
											mb: "6",
										})}
									>
										{post.description}
									</Text>
								)}

								{/* Meta Information */}
								{(() => {
									const authorBlock = pageData?.author ? {
										...pageData.author,
										children: [
											{
												blockType: "anchor",
												href: localiseLink(`/blog/by-author/${post.author || "Artefact Team"}`),
												style: "text-decoration: none",
												children: [
													{
														blockType: "avatar",
														size: "md",
														variant: "solid",
														name: post.author || "Artefact Team"
													}
												]
											},
											{
												blockType: "anchor",
												href: localiseLink(`/blog/by-author/${post.author || "Artefact Team"}`),
												style: "text-decoration: none",
												children: [
													{
														blockType: "text",
														size: "sm",
														style: "font-weight: 600",
														content: post.author || "Artefact Team"
													}
												]
											}
										]
									} : undefined;

									const dateBlock = pageData?.date ? {
										...pageData.date,
										children: [
											{ blockType: "calendarIcon" },
											{
												blockType: "text",
												size: "sm",
												style: "color: var(--colors-fg-muted)",
												content: new Date(post.date).toLocaleDateString(
													currentLocale === "zh" ? "zh-CN" : "en-US",
													{
														year: "numeric",
														month: "long",
														day: "numeric",
													},
												)
											}
										]
									} : undefined;

									const readTimeBlock = pageData?.readTime ? {
										...pageData.readTime,
										children: [
											{ blockType: "clockIcon" },
											{
												blockType: "text",
												size: "sm",
												style: "color: var(--colors-fg-muted)",
												content: post.readTime
											}
										]
									} : undefined;

									const metaBlock = pageData?.meta ? {
										...pageData.meta,
										children: [
											config.blog?.showAuthor !== false && authorBlock,
											post.date && dateBlock,
											config.blog?.showReadTime !== false && post.readTime && readTimeBlock
										].filter((b): b is Exclude<typeof b, boolean | "" | undefined | null> => !!b)
									} : undefined;

									return metaBlock ? renderBlocks([metaBlock]) : null;
								})()}
							</div>

							{/* Share & Markdown Content */}
							<div
								class={css({
									px: { base: "6", md: "10", lg: "12" },
									pb: { base: "8", md: "10" },
								})}
							>
								{/* Share Button */}
								{(() => {
									const shareBlock = pageData?.share ? {
										...pageData.share,
										children: [
											{
												blockType: "button",
												variant: "outline",
												size: "sm",
												onClick: () => {
													if (navigator.share) {
														navigator.share({
															title: post.title || "Blog Post",
															url: postUrl,
														});
													} else {
														navigator.clipboard.writeText(postUrl);
													}
												},
												text: (
													<>
														<ShareIcon width="16" height="16" />
														{currentLocale === "zh" ? "分享" : "Share"}
													</>
												)
											}
										]
									} : undefined;

									return shareBlock ? renderBlocks([shareBlock]) : null;
								})()}

								{/* Markdown Content */}
								<div
									class={markdownContentClass}
									dangerouslySetInnerHTML={{ __html: htmlContent }}
								/>
							</div>
						</div>
					</section>

					{/* Related Posts */}
					{relatedPosts.length > 0 && (
						<section
							class={css({
								maxWidth: "4xl",
								mx: "auto",
								px: { base: "4", md: "6", lg: "8" },
								pb: { base: "12", md: "16" },
							})}
						>
							<div
								class={css({
									bg: "bg",
									borderRadius: "2xl",
									shadow: "md",
									p: { base: "6", md: "8" },
								})}
							>
								<Heading
									as="h2"
									size="lg"
									class={css({
										mb: "6",
										display: "flex",
										alignItems: "center",
										gap: "3",
									})}
								>
									<ChevronRightIcon
										width="24"
										height="24"
										class={css({ color: "blue.9" })}
									/>
									{currentLocale === "zh" ? "相关文章" : "Related Posts"}
								</Heading>

								<div
									class={css({
										display: "grid",
										gridTemplateColumns: { base: "1fr", md: "repeat(3, 1fr)" },
										gap: "4",
									})}
								>
									{relatedPosts.map((relatedPost) => (
										<a
											href={localiseLink(`/blog/${relatedPost.slug}`)}
											class={css({
												textDecoration: "none",
												display: "block",
												p: "5",
												borderRadius: "xl",
												borderWidth: "1px",
												borderColor: "border",
												transition: "all 0.2s",
												_hover: {
													borderColor: "blue.4",
													shadow: "md",
													transform: "translateY(-2px)",
												},
											})}
										>
											<Text
												size="sm"
												class={css({
													color: "fg.muted",
													mb: "2",
													display: "block",
												})}
											>
												{new Date(relatedPost.date).toLocaleDateString(
													currentLocale === "zh" ? "zh-CN" : "en-US",
													{
														month: "short",
														day: "numeric",
														year: "numeric",
													},
												)}
											</Text>
											<Text
												size="md"
												class={css({
													color: "fg",
													fontWeight: "semibold",
													lineHeight: "tight",
												})}
											>
												{relatedPost.title}
											</Text>
										</a>
									))}
								</div>
							</div>
						</section>
					)}

					{/* Footer with Back to Blog */}
					<section
						class={css({
							maxWidth: "4xl",
							mx: "auto",
							px: { base: "4", md: "6", lg: "8" },
							pb: { base: "8", md: "12" },
							textAlign: "center",
						})}
					>
						<a href={localiseLink("/blog")} style={{ textDecoration: "none" }}>
							<Button
								variant="solid"
								size="lg"
								class={css({
									display: "inline-flex",
									alignItems: "center",
									gap: "2",
								})}
							>
								<ArrowLeftIcon width="20" height="20" />
								{currentLocale === "zh" ? "返回所有文章" : "Back to All Posts"}
							</Button>
						</a>
					</section>
				</div>,
			);
		} catch (error) {
			console.error(`Error loading post ${slug}:`, error);
			return c.notFound();
		}
	},
);
