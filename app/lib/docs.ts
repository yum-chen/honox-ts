import { markdownToHtml, parseFrontmatter } from "../utils/markdown";

// Use Vite's import.meta.glob to import all documentation markdown files at build time
const docFiles = import.meta.glob("/content/docs/*.md", {
	query: "?raw",
	import: "default",
});

export interface DocItem {
	slug: string;
	title: string;
	description: string;
}

export interface LoadedDocs {
	/** All docs sorted alphabetically by title */
	docs: DocItem[];
}

export interface DocDetail extends DocItem {
	/** Doc body rendered to HTML */
	html: string;
}

function getTitleFromMarkdown(content: string, slug: string): string {
	// Try to find the first '# Header'
	const match = content.match(/^#\s+(.*)$/m);
	if (match && match[1]) {
		return match[1].trim();
	}
	// Fallback to stylized slug
	return slug
		.split(/[-_]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

export async function loadDocs(): Promise<LoadedDocs> {
	const docs: DocItem[] = [];

	for (const [path, loader] of Object.entries(docFiles)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data, content } = parseFrontmatter(markdown);
			const slug = path.replace("/content/docs/", "").replace(".md", "");

			const title =
				(data.title as string) || getTitleFromMarkdown(content, slug);
			const description = (data.description as string) || "";

			docs.push({
				slug,
				title,
				description,
			});
		} catch (error) {
			console.error(`Error loading doc ${path}:`, error);
		}
	}

	// Sort alphabetically by title
	docs.sort((a, b) => a.title.localeCompare(b.title));

	return { docs };
}

export async function loadDocBySlug(
	slug: string,
): Promise<DocDetail | undefined> {
	const loader = docFiles[`/content/docs/${slug}.md`];
	if (!loader) {
		return undefined;
	}

	try {
		const markdown = await (loader as () => Promise<string>)();
		const { data, content } = parseFrontmatter(markdown);

		const title = (data.title as string) || getTitleFromMarkdown(content, slug);
		const description = (data.description as string) || "";

		// Remove the first '# Title' heading from the body to avoid double titles
		let cleanedContent = content;
		const match = content.match(/^#\s+(.*)$/m);
		if (match) {
			cleanedContent = content.replace(match[0], "").trim();
		}

		return {
			slug,
			title,
			description,
			html: markdownToHtml(cleanedContent),
		};
	} catch (error) {
		console.error(`Error loading doc ${slug}:`, error);
		return undefined;
	}
}
