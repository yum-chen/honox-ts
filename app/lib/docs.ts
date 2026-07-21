import type { FC } from "hono/jsx";
import { markdownToHtml, parseFrontmatter } from "../utils/markdown";
import { buildHaystack, type SearchIndexEntry } from "../utils/search";
import { type DocsConfig, loadDocsConfig } from "./configs";

// Docs content lives under content/<collection>/*.{md,mdx} — any folder
// becomes a collection automatically (see DocsConfig in ./configs for labeling).
// Plain .md is parsed with the same hand-rolled pipeline as blog posts; .mdx
// is compiled to a real component (via @mdx-js/rollup, configured in
// vite.config.ts) so pages can embed live, actually-rendered examples.
// content/posts is excluded: blog posts have their own loader/route
// (app/lib/posts.ts).
const markdownModules = import.meta.glob(
	["/content/*/*.md", "!/content/posts/**"],
	{ query: "?raw", import: "default" },
) as Record<string, () => Promise<string>>;

interface MdxFrontmatter {
	title?: string;
	hydration?: number;
	category?: string;
}
type MdxModule = () => Promise<{
	default: FC;
	frontmatter?: MdxFrontmatter;
}>;
const mdxModules = import.meta.glob("/content/*/*.mdx") as Record<
	string,
	MdxModule
>;

export interface DocSummary {
	slug: string;
	title: string;
	/** Folder name under content/ this doc came from, e.g. "docs", "components". */
	collection: string;
	/** Display label for `collection` — DocsConfig.collections[].label, or the
	 * capitalized folder name if no config entry exists for it. */
	section: string;
	/** Fine-grained grouping, set only if present in frontmatter (e.g. "Layout", "Forms"). */
	category?: string;
	/** Hydration tier (1/2/3) per app/components/ui/island-utils.ts, set only if present in frontmatter. */
	hydration?: number;
}

export interface DocDetail extends DocSummary {
	/** Set for markdown docs, rendered via dangerouslySetInnerHTML. */
	html?: string;
	/** Set for MDX docs, rendered as JSX. */
	Component?: FC;
}

function capitalize(value: string): string {
	return value.charAt(0).toUpperCase() + value.slice(1);
}

function sectionLabel(folder: string, config: DocsConfig): string {
	const entry = config.collections?.find((c) => c.folder === folder);
	return entry?.label ?? capitalize(folder);
}

/** Splits a `/content/<folder>/<slug>.<ext>` module path into its parts. */
function parseContentPath(path: string): { folder: string; slug: string } {
	const match = path.match(/^\/content\/([^/]+)\/(.+)\.(?:md|mdx)$/);
	if (!match) {
		throw new Error(`Unexpected docs content path: ${path}`);
	}
	return { folder: match[1], slug: match[2] };
}

async function summarizeMarkdownDoc(
	path: string,
	loader: () => Promise<string>,
	config: DocsConfig,
): Promise<DocSummary> {
	const { folder, slug } = parseContentPath(path);
	const raw = await loader();
	const { data } = parseFrontmatter(raw);
	return {
		slug,
		title: (data.title as string) || slug,
		collection: folder,
		section: sectionLabel(folder, config),
	};
}

async function summarizeMdxDoc(
	path: string,
	loader: MdxModule,
	config: DocsConfig,
): Promise<DocSummary> {
	const { folder, slug } = parseContentPath(path);
	const mod = await loader();
	return {
		slug,
		title: mod.frontmatter?.title || slug,
		collection: folder,
		section: sectionLabel(folder, config),
		category: mod.frontmatter?.category,
		hydration: mod.frontmatter?.hydration,
	};
}

export async function loadDocs(): Promise<DocSummary[]> {
	const config = await loadDocsConfig();
	const docs = await Promise.all([
		...Object.entries(markdownModules).map(([path, loader]) =>
			summarizeMarkdownDoc(path, loader, config),
		),
		...Object.entries(mdxModules).map(([path, loader]) =>
			summarizeMdxDoc(path, loader, config),
		),
	]);

	docs.sort((a, b) => a.slug.localeCompare(b.slug));
	return docs;
}

/**
 * Search index entries for every doc, keyed on title/section/category.
 * Markdown bodies are real text (stripped to a haystack like blog posts);
 * MDX bodies are compiled JSX, so those are scoped to name/category.
 */
export async function loadDocsSearchIndex(): Promise<SearchIndexEntry[]> {
	const docs = await loadDocs();
	return docs.map((doc) => ({
		key: doc.slug,
		href: `/docs/${doc.slug}`,
		title: doc.title,
		tags: [doc.section, doc.category].filter((tag): tag is string =>
			Boolean(tag),
		),
		haystack: buildHaystack([doc.title, doc.slug, doc.section, doc.category]),
	}));
}

/**
 * Loads a single doc by slug — checks MDX collections first (the common
 * case for component-style docs with live demos), then markdown collections.
 * Returns undefined if the slug exists in neither. Exactly one of
 * `.html` / `.Component` is set on the result, depending on which module
 * matched.
 */
export async function loadDocBySlug(
	slug: string,
): Promise<DocDetail | undefined> {
	const config = await loadDocsConfig();

	for (const [path, loader] of Object.entries(mdxModules)) {
		const parsed = parseContentPath(path);
		if (parsed.slug !== slug) continue;
		const mod = await loader();
		return {
			slug,
			title: mod.frontmatter?.title || slug,
			collection: parsed.folder,
			section: sectionLabel(parsed.folder, config),
			category: mod.frontmatter?.category,
			hydration: mod.frontmatter?.hydration,
			Component: mod.default,
		};
	}

	for (const [path, loader] of Object.entries(markdownModules)) {
		const parsed = parseContentPath(path);
		if (parsed.slug !== slug) continue;
		const raw = await loader();
		const { data, content } = parseFrontmatter(raw);
		return {
			slug,
			title: (data.title as string) || slug,
			collection: parsed.folder,
			section: sectionLabel(parsed.folder, config),
			html: markdownToHtml(content),
		};
	}

	return undefined;
}
