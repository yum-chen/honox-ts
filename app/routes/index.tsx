import { css } from "design-system/css";
import { createRoute } from "honox/factory";
import { PageRenderer } from "../components/page-renderer";
import { detectLocale } from "../lib/i18n";

const pages = import.meta.glob("/content/pages/*.json", {
	import: "default",
});

export default createRoute(async (c) => {
	const currentPath = c.req.path;
	const currentLocale = detectLocale(currentPath);

	const loader = pages["/content/pages/index.json"];
	const data = loader ? ((await loader()) as any) : { content: [] };

	return c.render(
		<div class={css({ bg: "bg.canvas", minH: "screen", color: "fg.default" })}>
			<title>{data.title ?? "Artefact — Modern UI Suite"}</title>
			<PageRenderer
				content={data.content}
				currentLocale={currentLocale}
				currentPath={currentPath}
			/>
		</div>,
	);
});
