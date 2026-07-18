import type { FC } from "hono/jsx";
import { buildHaystack, type SearchIndexEntry } from "../utils/search";

// Compiled glob — each module's default export is the doc's rendered
// component, and `frontmatter` is the YAML frontmatter block (both produced
// by @mdx-js/rollup + remark-frontmatter/remark-mdx-frontmatter, configured
// in vite.config.ts).
const docModules = import.meta.glob("/content/docs/*.mdx") as Record<
	string,
	() => Promise<{ default: FC; frontmatter?: { title?: string } }>
>;

// Non-component reference docs get their own nav group; everything else is
// assumed to be a component doc named after the component it documents.
const GUIDE_SLUGS = new Set(["ARCHITECTURE", "PageBuilder"]);

export interface DocSummary {
	slug: string;
	title: string;
	category: "Guides" | "Components";
}

export interface DocDetail extends DocSummary {
	Component: FC;
}

function slugFromPath(path: string): string {
	return path.replace("/content/docs/", "").replace(/\.mdx$/, "");
}

export async function loadDocs(): Promise<DocSummary[]> {
	const docs: DocSummary[] = [];

	for (const [path, loader] of Object.entries(docModules)) {
		const slug = slugFromPath(path);
		const mod = await loader();
		docs.push({
			slug,
			title: mod.frontmatter?.title || slug,
			category: GUIDE_SLUGS.has(slug) ? "Guides" : "Components",
		});
	}

	docs.sort((a, b) => a.slug.localeCompare(b.slug));
	return docs;
}

/**
 * Search index entries for every doc, keyed on title/category — the MDX
 * body isn't included (it's a compiled component, not text; extracting a
 * haystack from it would mean rendering every doc up front), so matching is
 * scoped to the doc name and its nav group.
 */
export async function loadDocsSearchIndex(): Promise<SearchIndexEntry[]> {
	const docs = await loadDocs();
	return docs.map((doc) => ({
		key: doc.slug,
		href: `/docs/${doc.slug}`,
		title: doc.title,
		tags: [doc.category],
		haystack: buildHaystack([doc.title, doc.slug, doc.category]),
	}));
}

/**
 * Loads a single doc by slug, along with its rendered MDX component.
 * Returns undefined if the slug doesn't exist.
 */
export async function loadDocBySlug(
	slug: string,
): Promise<DocDetail | undefined> {
	const loader = docModules[`/content/docs/${slug}.mdx`];
	if (!loader) {
		return undefined;
	}

	const mod = await loader();

	return {
		slug,
		title: mod.frontmatter?.title || slug,
		category: GUIDE_SLUGS.has(slug) ? "Guides" : "Components",
		Component: mod.default,
	};
}
