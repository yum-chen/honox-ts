import {
	markdownToHtml,
	parseFrontmatter,
	stripMarkdown,
} from "../utils/markdown";
import { buildHaystack, type SearchIndexEntry } from "../utils/search";

// Use Vite's import.meta.glob to import all markdown files at build time
const noteFiles = import.meta.glob("/content/notes/*.md", {
	query: "?raw",
	import: "default",
});

// Kept to exactly the colorPalette variants the `badge` recipe defines
// (app/theme/recipes/badge.ts) — a value outside this list would silently
// fall back to the recipe's default (gray) at runtime. See memory:
// honox-switch-staticcss-key-mismatch for the same class of gotcha.
export const NOTE_COLORS = [
	"default",
	"gray",
	"red",
	"orange",
	"green",
	"cyan",
	"blue",
	"purple",
] as const;
export type NoteColor = (typeof NOTE_COLORS)[number];

export interface Note {
	slug: string;
	title: string;
	/** ISO date string of the last edit, as set in the CMS. */
	updated: string;
	color: NoteColor;
	pinned: boolean;
	archived: boolean;
	tags: string[];
	/** Plain-text preview of the body, for card previews and search. */
	excerpt: string;
}

export interface LoadedNotes {
	/** All notes, pinned first, then newest-updated first. */
	notes: Note[];
	/** One search-index entry per note. */
	searchEntries: SearchIndexEntry[];
	/** Unique tags across all notes, sorted. */
	tags: string[];
}

export interface NoteDetail extends Note {
	/** Note body rendered to HTML. */
	html: string;
}

function toNote(slug: string, data: Record<string, unknown>): Note {
	const color = NOTE_COLORS.includes(data.color as NoteColor)
		? (data.color as NoteColor)
		: "default";
	return {
		slug,
		title: (data.title as string) || "Untitled",
		updated: (data.updated as string) || "",
		color,
		pinned: data.pinned === true,
		archived: data.archived === true,
		tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
		excerpt: "",
	};
}

function sortNotes(notes: Note[]): void {
	notes.sort((a, b) => {
		if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
		return new Date(b.updated).getTime() - new Date(a.updated).getTime();
	});
}

export async function loadNotes(): Promise<LoadedNotes> {
	const notes: Note[] = [];
	const searchEntries: SearchIndexEntry[] = [];
	const allTags = new Set<string>();

	for (const [path, loader] of Object.entries(noteFiles)) {
		try {
			const markdown = await (loader as () => Promise<string>)();
			const { data, content } = parseFrontmatter(markdown);
			const slug = path.replace("/content/notes/", "").replace(".md", "");
			const note = toNote(slug, data);
			const excerpt = stripMarkdown(content).trim().slice(0, 180);
			note.excerpt = excerpt;

			for (const tag of note.tags) {
				allTags.add(tag);
			}

			notes.push(note);
			searchEntries.push({
				key: slug,
				href: `/notes/${slug}`,
				title: note.title,
				description: excerpt,
				tags: note.tags,
				haystack: buildHaystack([note.title, note.tags, excerpt]),
			});
		} catch (error) {
			console.error(`Error loading ${path}:`, error);
		}
	}

	sortNotes(notes);
	const order = new Map(notes.map((note, index) => [note.slug, index]));
	searchEntries.sort(
		(a, b) => (order.get(a.key) ?? 0) - (order.get(b.key) ?? 0),
	);

	return { notes, searchEntries, tags: Array.from(allTags).sort() };
}

/**
 * Loads a single note by slug, rendered to HTML.
 * Returns undefined if the slug doesn't exist.
 */
export async function loadNoteBySlug(
	slug: string,
): Promise<NoteDetail | undefined> {
	const loader = noteFiles[`/content/notes/${slug}.md`];
	if (!loader) {
		return undefined;
	}

	const markdown = await (loader as () => Promise<string>)();
	const { data, content } = parseFrontmatter(markdown);
	const note = toNote(slug, data);
	note.excerpt = stripMarkdown(content).trim().slice(0, 180);

	return { ...note, html: markdownToHtml(content) };
}
