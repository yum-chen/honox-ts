import { css } from "design-system/css";
import { createRoute } from "honox/factory";
import {
	Anchor,
	Avatar,
	Badge,
	Button,
	Card,
	Heading,
	Stack,
	Text,
} from "../components/ui";
import { loadDocs } from "../lib/docs";

export default createRoute(async (c) => {
	const { docs: allDocs } = await loadDocs();

	return c.render(
		<div class={css({ bg: "bg.canvas", minH: "screen", color: "fg.default" })}>
			<title>Documentation - Artefact UI</title>

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
						{allDocs.map((item) => (
							<a
								key={item.slug}
								href={`/docs/${item.slug}`}
								class={css({
									px: "3",
									py: "2",
									borderRadius: "md",
									fontSize: "sm",
									textDecoration: "none",
									color: "fg.muted",
									transition: "all 0.2s",
									_hover: {
										bg: "gray.subtle.bg",
										color: "fg",
									},
								})}
							>
								{item.title}
							</a>
						))}
					</Stack>
				</aside>

				{/* Welcome Content (right) */}
				<main
					class={css({
						flex: "1",
						px: { base: "6", md: "12" },
						py: "12",
						maxW: "5xl",
					})}
				>
					<div class={css({ maxW: "3xl" })}>
						<Badge
							size="md"
							colorPalette="blue"
							variant="surface"
							class={css({ mb: "4" })}
						>
							Developer Guide
						</Badge>
						<Heading
							as="h1"
							class={css({
								fontSize: "4xl",
								fontWeight: "extrabold",
								tracking: "tight",
								mb: "4",
								color: "fg",
							})}
						>
							Artefact UI Documentation
						</Heading>
						<Text
							size="lg"
							class={css({
								color: "fg.muted",
								mb: "8",
								lineHeight: "relaxed",
								display: "block",
							})}
						>
							Welcome to the official developer documentation for the Artefact
							UI component suite. This comprehensive reference includes detailed
							guidelines, component API specifications, and real-world examples
							to help you build modern, accessible, and fast web applications.
						</Text>

						{/* Quick Overview of components */}
						<Heading
							as="h2"
							size="xl"
							class={css({ mb: "6", fontWeight: "bold" })}
						>
							Explore Components ({allDocs.length})
						</Heading>

						<div
							class={css({
								display: "grid",
								gridTemplateColumns: { base: "1fr", sm: "repeat(2, 1fr)" },
								gap: "4",
								mb: "8",
							})}
						>
							{allDocs.map((item) => (
								<a
									key={item.slug}
									href={`/docs/${item.slug}`}
									class={css({ textDecoration: "none" })}
								>
									<Card
										variant="outline"
										class={css({
											height: "full",
											transition: "all 0.2s",
											_hover: {
												borderColor: "blue.4",
												shadow: "md",
												transform: "translateY(-2px)",
											},
										})}
										title={item.title}
										description={
											item.description ||
											`Read detailed api specs and usage examples for ${item.title}.`
										}
									/>
								</a>
							))}
						</div>
					</div>
				</main>
			</div>
		</div>,
	);
});
