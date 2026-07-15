import { createRoute } from "honox/factory";
import { parseFrontmatter, stripMarkdown } from "../../utils/markdown";
import { buildHaystack } from "../../utils/search";

// Use Vite's import.meta.glob to import all markdown files at build time
const posts = import.meta.glob("/content/posts/*.md", {
	query: "?raw",
	import: "default",
});

export default createRoute(async (c) => {
	const blogPosts = [];

	for (const [path, loader] of Object.entries(posts)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data, content } = parseFrontmatter(markdown);

			// Skip drafts in production
			if (data.draft === true && process.env.NODE_ENV === "production") {
				continue;
			}

			const slug = path.replace("/content/posts/", "").replace(".md", "");
			const postTags = Array.isArray(data.tags) ? data.tags : [];

			const title = data.title || "Untitled";
			const description = data.description || "";
			const date = data.date || "";
			const author = data.author || "Artefact Team";
			const readTime = data.readTime || "5 min read";
			const cover = data.cover || null;

			const haystack = buildHaystack([
				title,
				description,
				postTags,
				stripMarkdown(content).slice(0, 5000),
			]);

			blogPosts.push({
				slug,
				title,
				date,
				description,
				tags: postTags,
				draft: data.draft === true,
				author,
				readTime,
				cover,
				haystack,
			});
		} catch (error) {
			console.error(`Error loading ${path} for search index:`, error);
		}
	}

	// Sort posts by date (newest first)
	blogPosts.sort((a, b) => {
		const dateA = new Date(a.date).getTime();
		const dateB = new Date(b.date).getTime();
		return dateB - dateA;
	});

	return c.json(blogPosts, 200, {
		"Cache-Control": "public, max-age=3600",
	});
});
