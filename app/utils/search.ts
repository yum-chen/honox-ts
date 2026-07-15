// Shared search primitives used by the blog route (SSR filtering for the
// no-JS ?q= fallback), the /search-index.json route (SSG static index), and
// the Search island (instant client-side filtering + autocomplete), so
// server, build output, and client always agree on what matches.

function scoreEntry(entry: SearchIndexEntry, tokens: string[]): number {
	const title = entry.title.toLowerCase();
	const description = (entry.description ?? "").toLowerCase();
	const tags = (entry.tags ?? []).join(" ").toLowerCase();
	let score = 0;
	for (const token of tokens) {
		if (title.includes(token)) score += title.startsWith(token) ? 5 : 3;
		if (tags.includes(token)) score += 2;
		if (description.includes(token)) score += 1;
	}
	return score;
}

export interface SearchIndexEntry {
	/** Stable id (e.g. post slug) — matched against DOM filter attributes */
	key: string;
	/** Navigation target when the entry is picked from autocomplete */
	href: string;
	title: string;
	description?: string;
	tags?: string[];
	/** Precomputed lowercase text blob the query tokens are matched against */
	haystack: string;
}

/** Shape of the SSG-generated /search-index.json document */
export interface SearchIndexDocument {
	generated: string;
	entries: SearchIndexEntry[];
}

export function buildHaystack(
	parts: Array<string | string[] | undefined | null>,
): string {
	return parts
		.flat()
		.filter((part): part is string => typeof part === "string" && part !== "")
		.join(" ")
		.toLowerCase();
}

export function tokenize(query: string): string[] {
	return query.toLowerCase().split(/\s+/).filter(Boolean);
}

// Every whitespace-separated token must appear somewhere in the haystack.
// An empty query matches everything.
export function filterEntries<T extends { haystack: string }>(
	entries: T[],
	query: string,
): T[] {
	const tokens = tokenize(query);
	if (tokens.length === 0) {
		return entries;
	}
	return entries.filter((entry) =>
		tokens.every((token) => entry.haystack.includes(token)),
	);
}

// Rank `SearchIndexEntry` matches by relevance so the best hits surface first
// in the autocomplete dropdown: title > tags > description, with a bonus for
// prefix matches. Non-matches are dropped.
export function rankSearchEntries(
	entries: SearchIndexEntry[],
	query: string,
): SearchIndexEntry[] {
	const tokens = tokenize(query);
	if (tokens.length === 0) {
		return entries;
	}
	return entries
		.map((entry) => ({ entry, score: scoreEntry(entry, tokens) }))
		.filter((candidate) => candidate.score > 0)
		.sort((a, b) => b.score - a.score)
		.map((candidate) => candidate.entry);
}
