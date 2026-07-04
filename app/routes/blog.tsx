import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import { Badge, Button, Card, Drawer, Heading, Text } from "../components/ui";
import { parseFrontmatter } from "../utils/markdown";

// Use Vite's import.meta.glob to import all markdown files at build time
const posts = import.meta.glob("/content/posts/*.md", {
	query: "?raw",
	import: "default",
});

interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	draft: boolean;
	author?: string;
	readTime?: string;
}

export default createRoute(async (c) => {
	// Load and parse all blog posts
	const blogPosts: BlogPost[] = [];

	for (const [path, loader] of Object.entries(posts)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data } = parseFrontmatter(markdown);

			// Skip drafts in production
			if (data.draft === true && process.env.NODE_ENV === "production") {
				continue;
			}

			const slug = path.replace("/content/posts/", "").replace(".md", "");

			const postTags = Array.isArray(data.tags) ? data.tags : [];

			blogPosts.push({
				slug,
				title: data.title || "Untitled",
				date: data.date || "",
				description: data.description || "",
				tags: postTags,
				draft: data.draft === true,
				author: data.author || "Artefact Team",
				readTime: data.readTime || "5 min read",
			});
		} catch (error) {
			console.error(`Error loading ${path}:`, error);
		}
	}

	// Sort posts by date (newest first)
	blogPosts.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();
		return dateB - dateA;
	});

	// Get unique tags for filter UI
	const allTags = new Set<string>();
	for (const [path, loader] of Object.entries(posts)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data } = parseFrontmatter(markdown);

			if (data.draft === true && process.env.NODE_ENV === "production") {
				continue;
			}

			const postTags = Array.isArray(data.tags) ? data.tags : [];
			postTags.forEach((tag: string) => allTags.add(tag));
		} catch (error) {
			// Ignore errors
		}
	}

	const tags = Array.from(allTags).sort();

	// Get URL parameters for filtering
	const url = new URL(c.req.url);
	const searchQuery = url.searchParams.get("q") || "";
	const categoryFilter = url.searchParams.get("category") || "All";

	// Filter posts based on search and category
	const filteredPosts = blogPosts.filter((post) => {
		const matchesSearch =
			!searchQuery ||
			post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
			post.tags.some((tag) =>
				tag.toLowerCase().includes(searchQuery.toLowerCase()),
			);

		const matchesCategory =
			categoryFilter === "All" || post.tags.includes(categoryFilter);

		return matchesSearch && matchesCategory;
	});

	return c.render(
		<div
			class={css({
				py: { base: "8", md: "12" },
				px: { base: "4", md: "6", lg: "8" },
				maxWidth: "7xl",
				mx: "auto",
			})}
		>
			<title>Blog - Artefact</title>

			{/* Header Section */}
			<header class={css({ textAlign: "center", mb: "12" })}>
				<Badge
					variant="subtle"
					colorPalette="blue"
					class={css({ mb: "4", px: "4", py: "1" })}
				>
					✍️ Latest Articles
				</Badge>
				<Heading
					as="h1"
					size={{ base: "3xl", md: "4xl", lg: "5xl" }}
					class={css({
						fontWeight: "bold",
						mb: "4",
						letterSpacing: "tight",
						bgGradient: "to-r",
						gradientFrom: "blue.600",
						gradientTo: "purple.600",
						bgClip: "text",
					})}
				>
					Blog
				</Heading>
				<Text
					size={{ base: "md", md: "lg" }}
					class={css({
						color: "fg.muted",
						maxWidth: "2xl",
						mx: "auto",
						lineHeight: "relaxed",
					})}
				>
					Thoughts on web development, design systems, and building better
					developer experiences. Stay updated with the latest trends and best
					practices.
				</Text>
			</header>

			{/* Filter Button - Opens Drawer */}
			<section class={css({ mb: "8" })}>
				<div
					class={css({
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						flexWrap: "wrap",
						gap: "4",
					})}
				>
					{/* Results Count */}
					<Text size="sm" class={css({ color: "fg.muted" })}>
						Showing {filteredPosts.length} article
						{filteredPosts.length !== 1 ? "s" : ""}
						{searchQuery && ` for "${searchQuery}"`}
						{categoryFilter !== "All" && ` in ${categoryFilter}`}
					</Text>

					{/* Filter Button */}
					<Drawer.Root interactive>
						<Drawer.Trigger asChild>
							<Button
								variant="outline"
								class={css({
									display: "flex",
									alignItems: "center",
									gap: "2",
									px: "4",
								})}
							>
								<svg
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<title>Filter</title>
									<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
								</svg>
								{(searchQuery || categoryFilter !== "All") && (
									<Badge
										variant="solid"
										colorPalette="blue"
										size="sm"
										class={css({ borderRadius: "full" })}
									>
										{(searchQuery ? 1 : 0) + (categoryFilter !== "All" ? 1 : 0)}
									</Badge>
								)}
								{searchQuery
									? `"${searchQuery}"`
									: categoryFilter !== "All"
										? categoryFilter
										: "Filter articles..."}
							</Button>
						</Drawer.Trigger>
						<Drawer.Backdrop />
						<Drawer.Positioner>
							<Drawer.Content>
								<Drawer.Header>
									<Drawer.Title>Search & Filter</Drawer.Title>
									<Drawer.Description>
										Find articles by keyword or browse by category
									</Drawer.Description>
								</Drawer.Header>
								<Drawer.Body>
									{/* Search Section */}
									<div class={css({ mb: "6" })}>
										<Text
											size="sm"
											class={css({
												fontWeight: "semibold",
												mb: "3",
												display: "block",
											})}
										>
											Search Articles
										</Text>
										<form
											action={c.req.url.split("?")[0]}
											method="GET"
											class={css({
												display: "flex",
												flexDirection: "column",
												gap: "3",
											})}
										>
											{categoryFilter !== "All" && (
												<input
													type="hidden"
													name="category"
													value={categoryFilter}
												/>
											)}
											<div class={css({ position: "relative" })}>
												<div
													class={css({
														position: "absolute",
														left: "3",
														top: "50%",
														transform: "translateY(-50%)",
														color: "fg.muted",
														pointerEvents: "none",
														zIndex: "1",
													})}
												>
													<svg
														width="20"
														height="20"
														viewBox="0 0 24 24"
														fill="none"
														stroke="currentColor"
														stroke-width="2"
													>
														<title>Search</title>
														<circle cx="11" cy="11" r="8" />
														<path d="m21 21-4.3-4.3" />
													</svg>
												</div>
												<input
													type="search"
													name="q"
													placeholder="Type to search..."
													value={searchQuery}
													autofocus
													class={css({
														width: "full",
														pl: "10",
														pr: "4",
														py: "3",
														borderWidth: "2px",
														borderRadius: "lg",
														bg: "bg",
														color: "fg",
														borderColor: "border",
														fontSize: "lg",
														_focus: {
															outline: "none",
															borderColor: "blue.500",
															shadow: "0 0 0 3px var(--colors-blue-100)",
														},
														_placeholder: { color: "fg.muted" },
													})}
												/>
											</div>
											<div
												class={css({
													display: "flex",
													gap: "2",
													justifyContent: "flex-end",
												})}
											>
												{searchQuery && (
													<a
														href={
															c.req.url.split("?")[0] +
															(categoryFilter !== "All"
																? `?category=${categoryFilter}`
																: "")
														}
														style={{ textDecoration: "none" }}
													>
														<Button variant="ghost" size="sm">
															Clear
														</Button>
													</a>
												)}
												<Button
													type="submit"
													variant="solid"
													colorPalette="blue"
												>
													Apply
												</Button>
											</div>
										</form>
									</div>

									{/* Divider */}
									<div
										class={css({
											my: "6",
											borderTopWidth: "1px",
											borderColor: "border.subtle",
										})}
									/>

									{/* Category Filter Section */}
									<div>
										<Text
											size="sm"
											class={css({
												fontWeight: "semibold",
												mb: "3",
												display: "block",
												color: "fg.subtle",
											})}
										>
											Filter by Category
										</Text>
										<form
											action={c.req.url.split("?")[0]}
											method="GET"
											class={css({
												display: "flex",
												flexDirection: "column",
												gap: "1",
											})}
										>
											{["All", ...tags].map((cat) => {
												const params = new URLSearchParams();
												if (searchQuery) params.set("q", searchQuery);
												if (cat !== "All") params.set("category", cat);

												return (
													<Button
														type="submit"
														name="category"
														value={cat === "All" ? "" : cat}
														variant={categoryFilter === cat ? "solid" : "ghost"}
														colorPalette={
															categoryFilter === cat ? "blue" : "gray"
														}
														size="sm"
														class={css({
															width: "full",
															justifyContent: "space-between",
															transition: "all 0.2s",
															cursor: "pointer",
															py: "2.5",
														})}
													>
														<span>{cat}</span>
														{categoryFilter === cat && (
															<svg
																width="16"
																height="16"
																viewBox="0 0 24 24"
																fill="none"
																stroke="currentColor"
																stroke-width="2.5"
															>
																<title>Selected</title>
																<polyline points="20 6 9 17 4 12" />
															</svg>
														)}
													</Button>
												);
											})}
										</form>
									</div>

									{/* Active Filters */}
									{(searchQuery || categoryFilter !== "All") && (
										<div
											class={css({
												mt: "6",
												pt: "6",
												borderTopWidth: "1px",
												borderColor: "border.subtle",
											})}
										>
											<Text
												size="sm"
												class={css({
													color: "fg.muted",
													mb: "3",
													fontWeight: "medium",
													textTransform: "uppercase",
													letterSpacing: "wide",
												})}
											>
												Active Filters
											</Text>
											<div
												class={css({
													display: "flex",
													flexWrap: "wrap",
													gap: "2",
												})}
											>
												{searchQuery && (
													<Badge
														variant="subtle"
														colorPalette="blue"
														class={css({ px: "3", py: "1.5" })}
													>
														Search: "{searchQuery}"
													</Badge>
												)}
												{categoryFilter !== "All" && (
													<Badge
														variant="subtle"
														colorPalette="green"
														class={css({ px: "3", py: "1.5" })}
													>
														Category: {categoryFilter}
													</Badge>
												)}
												<a
													href={c.req.url.split("?")[0]}
													style={{ textDecoration: "none" }}
												>
													<Button variant="link" size="sm" colorPalette="red">
														Clear all
													</Button>
												</a>
											</div>
										</div>
									)}
								</Drawer.Body>
							</Drawer.Content>
						</Drawer.Positioner>
					</Drawer.Root>
				</div>
			</section>

			{/* Posts Grid */}
			{filteredPosts.length === 0 && (
				<div
					class={css({
						textAlign: "center",
						py: "16",
						px: "4",
					})}
				>
					<div
						class={css({
							w: "20",
							h: "20",
							mx: "auto",
							mb: "6",
							bg: "blue.50",
							borderRadius: "full",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						})}
					>
						<svg
							width="32"
							height="32"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class={css({ color: "blue.500" })}
						>
							<title>Search</title>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</div>
					<Heading as="h3" size="lg" class={css({ mb: "2" })}>
						No articles found
					</Heading>
					<Text class={css({ color: "fg.muted", maxWidth: "md", mx: "auto" })}>
						Try adjusting your search or filter to find what you're looking for.
					</Text>
				</div>
			)}

			<div
				class={css({
					display: "grid",
					gridTemplateColumns: {
						base: "1fr",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					},
					gap: "6",
				})}
			>
				{filteredPosts.map((post, index) => (
					<Card.Root
						key={post.slug}
						variant="outline"
						class={css({
							transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
							_hover: {
								transform: "translateY(-4px)",
								shadow: "lg",
								borderColor: "blue.200",
							},
							overflow: "hidden",
							position: "relative",
						})}
					>
						{post.draft && (
							<div
								class={css({
									position: "absolute",
									top: "3",
									right: "3",
									zIndex: "10",
								})}
							>
								<Badge variant="solid" colorPalette="orange" size="sm">
									Draft
								</Badge>
							</div>
						)}

						<Card.Body class={css({ p: "6" })}>
							{/* Tags */}
							{post.tags.length > 0 && (
								<div
									class={css({
										display: "flex",
										flexWrap: "wrap",
										gap: "1",
										mb: "3",
									})}
								>
									{post.tags.slice(0, 2).map((tag) => (
										<Badge
											key={tag}
											variant="subtle"
											colorPalette="blue"
											size="sm"
											class={css({ borderRadius: "full" })}
										>
											{tag}
										</Badge>
									))}
									{post.tags.length > 2 && (
										<Badge
											variant="subtle"
											colorPalette="gray"
											size="sm"
											class={css({ borderRadius: "full" })}
										>
											+{post.tags.length - 2}
										</Badge>
									)}
								</div>
							)}

							{/* Title */}
							<Card.Title class={css({ mb: "3", lineHeight: "tight" })}>
								<a
									href={`/blog/${post.slug}`}
									class={css({
										color: "fg",
										textDecoration: "none",
										_hover: { color: "blue.600" },
										transition: "color 0.2s",
									})}
								>
									{post.title}
								</a>
							</Card.Title>

							{/* Description */}
							<Card.Description class={css({ mb: "4", lineHeight: "relaxed" })}>
								{post.description}
							</Card.Description>

							{/* Footer */}
							<div
								class={css({
									display: "flex",
									alignItems: "center",
									justifyContent: "space-between",
									pt: "4",
									borderTopWidth: "1px",
									borderColor: "border.subtle",
								})}
							>
								<div
									class={css({
										display: "flex",
										alignItems: "center",
										gap: "2",
									})}
								>
									{/* Author Avatar */}
									<div
										class={css({
											w: "8",
											h: "8",
											borderRadius: "full",
											bg: "blue.500",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											color: "white",
											fontSize: "sm",
											fontWeight: "semibold",
										})}
									>
										{post.author?.charAt(0).toUpperCase() || "A"}
									</div>
									<div>
										<Text
											size="sm"
											class={css({ fontWeight: "medium", lineHeight: "tight" })}
										>
											{post.author}
										</Text>
										<div
											class={css({
												display: "flex",
												gap: "2",
												alignItems: "center",
											})}
										>
											<Text size="xs" class={css({ color: "fg.muted" })}>
												{new Date(post.date).toLocaleDateString("en-US", {
													month: "short",
													day: "numeric",
													year: "numeric",
												})}
											</Text>
											<Text size="xs" class={css({ color: "fg.muted" })}>
												· {post.readTime}
											</Text>
										</div>
									</div>
								</div>

								{/* Read More Button */}
								<a
									href={`/blog/${post.slug}`}
									class={css({
										textDecoration: "none",
										display: "inline-flex",
										alignItems: "center",
										gap: "1",
									})}
								>
									<Button
										variant="ghost"
										size="sm"
										colorPalette="blue"
										class={css({ px: "2" })}
									>
										Read more
										<svg
											width="16"
											height="16"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
										>
											<title>Arrow</title>
											<path d="M5 12h14M12 5l7 7-7 7" />
										</svg>
									</Button>
								</a>
							</div>
						</Card.Body>
					</Card.Root>
				))}
			</div>

			{/* Newsletter Section */}
			<section
				class={css({
					mt: "16",
					py: "12",
					px: "8",
					bgGradient: "to-r",
					gradientFrom: "blue.50",
					gradientTo: "purple.50",
					borderRadius: "2xl",
					textAlign: "center",
				})}
			>
				<div
					class={css({
						w: "16",
						h: "16",
						mx: "auto",
						mb: "4",
						bg: "blue.500",
						borderRadius: "full",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					})}
				>
					<svg
						width="32"
						height="32"
						viewBox="0 0 24 24"
						fill="none"
						stroke="white"
						stroke-width="2"
					>
						<title>Newsletter</title>
						<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
						<polyline points="22,6 12,13 2,6" />
					</svg>
				</div>
				<Heading as="h2" size="xl" class={css({ mb: "2" })}>
					Stay Updated
				</Heading>
				<Text
					class={css({
						color: "fg.muted",
						mb: "6",
						maxWidth: "lg",
						mx: "auto",
					})}
				>
					Get the latest articles and insights delivered straight to your inbox.
					No spam, just good content.
				</Text>
				<form
					class={css({
						display: "flex",
						gap: "3",
						maxWidth: "md",
						mx: "auto",
						flexDirection: { base: "column", sm: "row" },
					})}
				>
					<div class={css({ position: "relative", flex: "1" })}>
						<div
							class={css({
								position: "absolute",
								left: "3",
								top: "50%",
								transform: "translateY(-50%)",
								color: "fg.muted",
								pointerEvents: "none",
							})}
						>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<title>Email</title>
								<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
								<polyline points="22,6 12,13 2,6" />
							</svg>
						</div>
						<input
							type="email"
							placeholder="Enter your email"
							class={css({
								width: "full",
								pl: "10",
								pr: "4",
								py: "3",
								borderWidth: "2px",
								borderRadius: "lg",
								bg: "bg",
								color: "fg",
								borderColor: "border",
								_focus: {
									outline: "none",
									borderColor: "blue.500",
									shadow: "0 0 0 3px var(--colors-blue-100)",
								},
								_placeholder: { color: "fg.muted" },
							})}
						/>
					</div>
					<Button type="submit" variant="solid" colorPalette="blue" size="lg">
						Subscribe
					</Button>
				</form>
			</section>
		</div>,
	);
});
