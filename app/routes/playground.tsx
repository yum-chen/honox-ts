import { css } from "design-system/css";
import { createRoute } from "honox/factory";
import Playground from "../islands/playground";
import { listPageSlugs, loadPage } from "../lib/pages";

export default createRoute(async (c) => {
	const slugs = listPageSlugs();
	const pages: Record<string, any> = {};
	for (const slug of slugs) {
		const page = await loadPage(slug);
		if (page) {
			pages[slug] = page;
		}
	}

	return c.render(
		<div
			class={css({
				bg: "bg.canvas",
				minH: "screen",
				color: "fg.default",
			})}
		>
			<title>Page Playground — Artefact UI</title>

			{/* Minimal Playground Header */}
			<header
				class={css({
					borderBottomWidth: "1px",
					borderColor: "border",
					bg: "bg.default",
					py: "4",
					px: "6",
					position: "sticky",
					top: "0",
					zIndex: "10",
				})}
			>
				<div
					class={css({
						maxW: "7xl",
						mx: "auto",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					})}
				>
					<div class={css({ display: "flex", alignItems: "center", gap: "3" })}>
						<div
							class={css({
								w: "8",
								h: "8",
								borderRadius: "md",
								bg: "purple.600",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "white",
								fontWeight: "bold",
								fontSize: "sm",
							})}
						>
							P
						</div>
						<div>
							<h1 class={css({ fontSize: "md", fontWeight: "bold" })}>
								Artefact Playground
							</h1>
							<p class={css({ fontSize: "xs", color: "fg.muted" })}>
								CMS Bindings & Live Previewer
							</p>
						</div>
					</div>

					<a
						href="/"
						class={css({
							fontSize: "xs",
							fontWeight: "semibold",
							color: "fg.muted",
							_hover: { color: "fg.default" },
						})}
					>
						Back to Home →
					</a>
				</div>
			</header>

			<main
				class={css({
					maxW: "7xl",
					mx: "auto",
					px: "6",
					py: "8",
				})}
			>
				<div class={css({ mb: "6" })}>
					<h2 class={css({ fontSize: "2xl", fontWeight: "bold", mb: "1" })}>
						Page Live Preview & Editor
					</h2>
					<p class={css({ fontSize: "sm", color: "fg.muted" })}>
						Preview and edit any CMS JSON file side-by-side. Your changes on the
						left are rendered live on the right using original component
						recipes.
					</p>
				</div>

				<Playground pages={pages} />
			</main>
		</div>,
	);
});
