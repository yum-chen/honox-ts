import { createRoute } from "honox/factory";
import { parseFrontmatter } from "../utils/markdown";

const posts = import.meta.glob("/content/posts/*.md", {
	query: "?raw",
	import: "default",
});

const pages = import.meta.glob("/content/pages/*.json", {
	import: "default",
});

export default createRoute(async (c) => {
	const origin = new URL(c.req.url).origin;

	// Always include home and blog list
	const urls = [
		`${origin}/`,
		`${origin}/blog`,
	];

	// Add dynamic pages
	for (const path of Object.keys(pages)) {
		const slug = path.replace("/content/pages/", "").replace(".json", "");
		urls.push(`${origin}/pages/${slug}`);
	}

	// Add posts & gather tags
	const tagsSet = new Set<string>();
	for (const [path, loader] of Object.entries(posts)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data } = parseFrontmatter(markdown);
			if (data.draft === true) continue;

			const slug = path.replace("/content/posts/", "").replace(".md", "");
			urls.push(`${origin}/blog/${slug}`);

			if (Array.isArray(data.tags)) {
				for (const tag of data.tags) {
					tagsSet.add(tag);
				}
			}
		} catch (_) {}
	}

	// Add tag filter pages
	for (const tag of Array.from(tagsSet).sort()) {
		urls.push(`${origin}/blog/tag/${tag}`);
	}

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url.endsWith("/") ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;

	return c.text(sitemap, 200, {
		"Content-Type": "application/xml",
	});
});
