import { createRoute } from "honox/factory";
import { loadPosts } from "../lib/posts";
import type { SearchIndexDocument } from "../utils/search";

// Aggregated post data for the Search component. Prerendered by @hono/vite-ssg
// into dist/search-index.json, so on the deployed static site this is a plain
// JSON file fetched lazily by the client.
export default createRoute(async (c) => {
	const { searchEntries } = await loadPosts();

	const document: SearchIndexDocument = {
		generated: new Date().toISOString(),
		entries: searchEntries,
	};

	return c.json(document);
});
