import { css } from "design-system/css";
import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import {
	Anchor,
	Avatar,
	Badge,
	Breadcrumb,
	Heading,
	Stack,
	Text,
} from "../../components/ui";
import { loadDocBySlug, loadDocs } from "../../lib/docs";

export default createRoute(
	// Use ssgParams middleware to tell SSG which params to generate
	ssgParams(async () => {
		const { docs } = await loadDocs();
		return docs.map((d) => ({
			doc: d.slug,
		}));
	}),

	// Actual route handler
	async (c) => {
		const docParam = c.req.param("doc");
		const docData = await loadDocBySlug(docParam);

		if (!docData) {
			return c.notFound();
		}

		const { docs: allDocs } = await loadDocs();

		return c.render(
			<div
				class={css({ bg: "bg.canvas", minH: "screen", color: "fg.default" })}
			>
				<title>{docData.title} - Artefact UI Docs</title>

				{/* Polished Header */}
				<header
					class={css({
						borderBottomWidth: "1px",
						borderColor: "border",
						bg: "bg.default",
						position: "sticky",
						top: "0",
						zIndex: "10",
					})}
				>
					<div
						class={css({
							maxW: "7xl",
							mx: "auto",
							px: "6",
							py: "4",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						})}
					>
						<Stack direction="horizontal" gap="3" align="center">
							<Avatar
								name="Artefact UI"
								size="sm"
								variant="solid"
								colorPalette="blue"
							/>
							<Heading
								as="h1"
								class={css({
									fontSize: "lg",
									fontWeight: "bold",
									tracking: "tight",
								})}
							>
								<a
									href="/"
									class={css({ color: "inherit", textDecoration: "none" })}
								>
									Artefact UI Docs
								</a>
							</Heading>
						</Stack>

						<nav
							class={css({
								display: "flex",
								gap: "6",
								alignItems: "center",
							})}
						>
							<Anchor
								href="/"
								variant="plain"
								class={css({ textStyle: "sm", fontWeight: "medium" })}
							>
								Home
							</Anchor>
							<Anchor
								href="/blog"
								variant="plain"
								class={css({ textStyle: "sm", fontWeight: "medium" })}
							>
								Blog
							</Anchor>
							<Anchor
								href="/docs"
								variant="underline"
								colorPalette="blue"
								class={css({ textStyle: "sm", fontWeight: "medium" })}
							>
								Docs
							</Anchor>
						</nav>
					</div>
				</header>

				{/* Main Container */}
				<div
					class={css({
						maxW: "7xl",
						mx: "auto",
						display: "flex",
						minH: "calc(100vh - 65px)",
					})}
				>
					{/* Sidebar (left) */}
					<aside
						class={css({
							width: "280px",
							flexShrink: "0",
							borderRightWidth: "1px",
							borderColor: "border",
							bg: "bg.default",
							p: "6",
							display: { base: "none", md: "block" },
							position: "sticky",
							top: "65px",
							height: "calc(100vh - 65px)",
							overflowY: "auto",
						})}
					>
						<Heading
							as="h3"
							class={css({
								fontSize: "xs",
								fontWeight: "semibold",
								color: "fg.muted",
								textTransform: "uppercase",
								tracking: "wider",
								mb: "4",
							})}
						>
							Documentation
						</Heading>
						<Stack gap="1" align="stretch">
							{allDocs.map((item) => {
								const isActive = item.slug === docParam;
								return (
									<a
										key={item.slug}
										href={`/docs/${item.slug}`}
										class={css({
											px: "3",
											py: "2",
											borderRadius: "md",
											fontSize: "sm",
											textDecoration: "none",
											color: isActive ? "blue.11" : "fg.muted",
											bg: isActive ? "blue.3" : "transparent",
											fontWeight: isActive ? "semibold" : "normal",
											transition: "all 0.2s",
											_hover: {
												bg: isActive ? "blue.4" : "gray.subtle.bg",
												color: isActive ? "blue.11" : "fg",
											},
										})}
									>
										{item.title}
									</a>
								);
							})}
						</Stack>
					</aside>

					{/* Main Doc Body (right) */}
					<main
						class={css({
							flex: "1",
							px: { base: "6", md: "12" },
							py: "12",
							maxW: "5xl",
						})}
					>
						{/* Breadcrumbs navigation */}
						<div class={css({ mb: "6" })}>
							<Breadcrumb
								items={[
									{ label: "Home", href: "/" },
									{ label: "Docs", href: "/docs" },
									{ label: docData.title },
								]}
							/>
						</div>

						<article class={css({ maxW: "3xl" })}>
							{/* Document Header */}
							<Heading
								as="h1"
								class={css({
									fontSize: "4xl",
									fontWeight: "extrabold",
									tracking: "tight",
									mb: "3",
									color: "fg",
								})}
							>
								{docData.title}
							</Heading>

							{/* Document Description */}
							{docData.description && (
								<Text
									size="lg"
									class={css({
										color: "fg.muted",
										mb: "6",
										lineHeight: "relaxed",
										display: "block",
										fontStyle: "italic",
									})}
								>
									{docData.description}
								</Text>
							)}

							<hr
								class={css({
									border: "none",
									borderTopWidth: "1px",
									borderColor: "border",
									mb: "8",
								})}
							/>

							{/* Rendered HTML with rich typography */}
							<div
								class={css({
									"& h1": {
										fontSize: "2xl",
										fontWeight: "bold",
										mt: "8",
										mb: "4",
										color: "fg",
										lineHeight: "tight",
									},
									"& h2": {
										fontSize: "xl",
										fontWeight: "semibold",
										mt: "8",
										mb: "4",
										color: "fg",
										lineHeight: "tight",
										paddingBottom: "2",
										borderBottomWidth: "2px",
										borderColor: "border.subtle",
									},
									"& h3": {
										fontSize: "lg",
										fontWeight: "semibold",
										mt: "6",
										mb: "3",
										color: "fg",
									},
									"& p": {
										lineHeight: "relaxed",
										mb: "4",
										color: "fg.muted",
										fontSize: "md",
									},
									"& a": {
										color: "blue.10",
										textDecoration: "none",
										_hover: {
											textDecoration: "underline",
											color: "blue.11",
										},
									},
									"& strong": {
										fontWeight: "semibold",
										color: "fg",
									},
									"& em": {
										fontStyle: "italic",
									},
									"& code": {
										bg: "gray.3",
										color: "red.10",
										px: "1.5",
										py: "0.5",
										borderRadius: "md",
										fontSize: "sm",
										fontFamily: "mono",
									},
									"& pre": {
										bg: "gray.11",
										color: "gray.3",
										p: "6",
										borderRadius: "xl",
										overflowX: "auto",
										mb: "6",
										shadow: "lg",
										"& code": {
											bg: "transparent",
											color: "inherit",
											p: "0",
										},
									},
									"& ul, & ol": {
										pl: "6",
										mb: "4",
										"& li": {
											lineHeight: "relaxed",
											mb: "2",
											color: "fg.muted",
											"&::marker": {
												color: "blue.9",
											},
										},
									},
									"& blockquote": {
										borderLeftWidth: "4px",
										borderLeftColor: "blue.9",
										pl: "6",
										py: "2",
										my: "6",
										bg: "blue.3",
										borderRadius: "sm",
										"& p": {
											color: "fg.subtle",
											fontStyle: "italic",
										},
									},
									"& img": {
										borderRadius: "xl",
										shadow: "md",
										my: "8",
										maxWidth: "full",
										height: "auto",
									},
									"& table": {
										width: "full",
										mb: "6",
										borderCollapse: "collapse",
										"& th, & td": {
											borderWidth: "1px",
											borderColor: "border",
											px: "4",
											py: "3",
											textAlign: "left",
										},
										"& th": {
											bg: "bg.subtle",
											fontWeight: "semibold",
										},
										"& tr:hover": {
											bg: "bg.subtle",
										},
									},
								})}
								dangerouslySetInnerHTML={{ __html: docData.html }}
							/>
						</article>
					</main>
				</div>
			</div>,
		);
	},
);
