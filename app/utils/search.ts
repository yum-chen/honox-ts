// Shared between the blog route (SSR filtering for the no-JS ?q= fallback)
// and the blog-search island (instant client-side filtering), so both
// always agree on what matches.

export interface SearchEntry {
	slug: string;
	haystack: string;
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

// Every whitespace-separated token must appear somewhere in the haystack.
// Returns the slugs of matching entries; an empty query matches everything.
export function filterEntries(
	entries: SearchEntry[],
	query: string,
): string[] {
	const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
	if (tokens.length === 0) {
		return entries.map((entry) => entry.slug);
	}
	return entries
		.filter((entry) => tokens.every((token) => entry.haystack.includes(token)))
		.map((entry) => entry.slug);
}
