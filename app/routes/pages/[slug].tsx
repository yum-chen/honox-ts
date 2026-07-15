import { ssgParams } from "hono/ssg";
import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import { PageRenderer } from "../../components/page-renderer";

const pages = import.meta.glob("/content/pages/*.json", {
	import: "default",
});

export default createRoute(
	ssgParams(async () => {
		const pages = import.meta.glob("/content/pages/*.json");
		return Object.keys(pages).map((path) => ({
			slug: path.replace("/content/pages/", "").replace(".json", ""),
		}));
	}),
	async (c) => {
		const slug = c.req.param("slug");
		const pagePath = `/content/pages/${slug}.json`;
		const loader = pages[pagePath];

		if (!loader) {
			return c.notFound();
		}

		try {
			const data = (await loader()) as any;

			const seoData = data.seo as { title?: string; description?: string; keywords?: string; image?: string } | undefined;
			const seoTitle = seoData?.title || data.title || "Page";
			const seoDesc = seoData?.description || "Dynamic page built with Sveltia CMS.";
			const seoKeywords = seoData?.keywords || "";
			const seoImage = seoData?.image || undefined;

			return c.render(
				<div
					class={css({
						maxWidth: "5xl",
						mx: "auto",
						px: "4",
						py: "12",
					})}
				>
					<PageRenderer content={data.content} />
				</div>,
				{
					title: seoTitle,
					description: seoDesc,
					keywords: seoKeywords,
					image: seoImage,
				}
			);
		} catch (error) {
			console.error(`Error loading page ${slug}:`, error);
			return c.notFound();
		}
	},
);
