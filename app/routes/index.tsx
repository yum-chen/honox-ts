import { css } from "design-system/css";
import { createRoute } from "honox/factory";
import { PageRenderer } from "../components/page-renderer";
import { Anchor, Avatar, Button, Heading, Stack, Text } from "../components/ui";
import { LanguageSwitcher } from "../components/language-switcher";
import { detectLocale, localiseHref } from "../lib/i18n";

const pages = import.meta.glob("/content/pages/*.json", {
	import: "default",
});

export default createRoute(async (c) => {
	const currentPath = c.req.path;
	const currentLocale = detectLocale(currentPath);

	const localiseLink = (href: string) => localiseHref(href, currentLocale);

	const loader = pages["/content/pages/index.json"];
	const data = loader ? ((await loader()) as any) : { content: [] };

	return c.render(
		<div class={css({ bg: "bg.canvas", minH: "screen", color: "fg.default" })}>
			<title>{data.title ?? "Artefact — Modern UI Suite"}</title>

			{/* Beautiful Header */}
			<header
				class={css({
					borderBottomWidth: "1px",
					borderColor: { _light: "white.a4", _dark: "black.a4" },
					bg: { _light: "white.a7", _dark: "black.a7" },
					backdropFilter: "blur(20px) saturate(180%)",
					boxShadow: {
						_light:
							"inset 0 1px 0 0 rgba(255, 255, 255, 0.5), 0 4px 30px rgba(0, 0, 0, 0.03)",
						_dark:
							"inset 0 1px 0 0 rgba(255, 255, 255, 0.15), 0 4px 30px rgba(0, 0, 0, 0.2)",
					},
					position: "sticky",
					top: "0",
					zIndex: "10",
				})}
			>
				<div
					class={css({
						maxW: "6xl",
						mx: "auto",
						px: "6",
						py: "4",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					})}
				>
					<Stack direction="horizontal" gap="3" align="center">
						<Avatar name="Artefact UI" size="sm" variant="solid" colorPalette="blue" />
						<Heading
							as="h1"
							class={css({ fontSize: "lg", fontWeight: "bold", tracking: "tight" })}
						>
							Artefact UI
						</Heading>
					</Stack>

					<nav
						class={css({
							display: "flex",
							gap: { base: "3", md: "6" },
							alignItems: "center",
						})}
					>
						<Anchor
							href={localiseLink("/blog")}
							variant="plain"
							class={css({
								display: { base: "none", md: "block" },
								textStyle: "sm",
								fontWeight: "medium",
							})}
						>
							{currentLocale === "zh" ? "博客" : "Blog"}
						</Anchor>
						<Anchor
							href={localiseLink("/docs")}
							variant="plain"
							class={css({
								display: { base: "none", md: "block" },
								textStyle: "sm",
								fontWeight: "medium",
							})}
						>
							{currentLocale === "zh" ? "文档" : "Docs"}
						</Anchor>
						<Anchor
							href={localiseLink("/pages/product-landing")}
							variant="plain"
							class={css({
								display: { base: "none", md: "block" },
								textStyle: "sm",
								fontWeight: "medium",
							})}
						>
							{currentLocale === "zh" ? "产品着陆页" : "Pulse Landing Page"}
						</Anchor>
						<Anchor
							href="/admin"
							variant="plain"
							class={css({
								display: { base: "none", md: "block" },
								textStyle: "sm",
								fontWeight: "medium",
							})}
						>
							{currentLocale === "zh" ? "内容管理" : "Sveltia CMS"}
						</Anchor>
						<LanguageSwitcher
							currentPath={currentPath}
							currentLocale={currentLocale}
						/>
						<Button variant="solid" colorPalette="blue" size="sm">
							{currentLocale === "zh" ? "探索中心" : "Explore Hub"}
						</Button>
					</nav>
				</div>
			</header>

			{/* CMS-driven body — content/pages/index.json, edit via /admin */}
			<div
				class={css({
					maxWidth: "5xl",
					mx: "auto",
					px: "4",
					py: "12",
					display: "flex",
					flexDirection: "column",
					gap: "10",
				})}
			>
				<PageRenderer content={data.content} />
			</div>

			{/* Beautiful Footer */}
			<footer
				class={css({
					bg: "bg.canvas",
					borderTopWidth: "1px",
					borderColor: "border",
					py: "12",
					px: "6",
				})}
			>
				<div
					class={css({
						maxW: "6xl",
						mx: "auto",
						display: "flex",
						flexDirection: { base: "column", md: "row" },
						justify: "space-between",
						align: "center",
						gap: "6",
					})}
				>
					<Stack direction="horizontal" gap="3" align="center">
						<Avatar name="Artefact UI" size="xs" variant="solid" colorPalette="blue" />
						<Text size="sm" class={css({ fontWeight: "semibold" })}>
							© 2025 Artefact UI Suite. All rights reserved.
						</Text>
					</Stack>

					<Stack direction="horizontal" gap="6">
						<Anchor
							href="https://honox.dev"
							target="_blank"
							variant="underline"
							colorPalette="blue"
							class={css({ textStyle: "sm" })}
						>
							HonoX Docs
						</Anchor>
						<Anchor
							href="https://panda-css.com"
							target="_blank"
							variant="underline"
							colorPalette="purple"
							class={css({ textStyle: "sm" })}
						>
							PandaCSS Docs
						</Anchor>
						<Anchor
							href="https://park-ui.com"
							target="_blank"
							variant="underline"
							colorPalette="green"
							class={css({ textStyle: "sm" })}
						>
							Park UI
						</Anchor>
					</Stack>
				</div>
			</footer>
		</div>,
	);
});
