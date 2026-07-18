import { createRoute } from "honox/factory";
import { loadDocsSearchIndex } from "../../../lib/docs";
import type { SearchIndexDocument } from "../../../utils/search";

// GET /api/docs/search.json — aggregated doc data for the Search component
// in the docs header. Prerendered by @hono/vite-ssg into
// dist/api/docs/search.json, so on the deployed static site this is a plain
// JSON file fetched lazily by the client.
export default createRoute(async (c) => {
	const entries = await loadDocsSearchIndex();

	const document: SearchIndexDocument = {
		generated: new Date().toISOString(),
		entries,
	};

	return c.json(document);
});
