import { createRoute } from "honox/factory";
import { loadNotes } from "../../../lib/notes";
import type { SearchIndexDocument } from "../../../utils/search";

// GET /api/notes/search.json — aggregated note data for the Search
// component. Prerendered by @hono/vite-ssg into dist/api/notes/search.json,
// mirrors /api/posts/search.json (see app/routes/api/posts/search.json.ts).
export default createRoute(async (c) => {
	const { searchEntries } = await loadNotes();

	const document: SearchIndexDocument = {
		generated: new Date().toISOString(),
		entries: searchEntries,
	};

	return c.json(document);
});
