import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

const app = createApp({
	ROUTES: import.meta.glob(
		[
			"/app/routes/**/*.{ts,tsx,md,mdx}",
			"/app/routes/.well-known/**/*.{ts,tsx,md,mdx}",
			"!/app/routes/**/_*.{ts,tsx,md,mdx}",
			"!/app/routes/**/-*.{ts,tsx,md,mdx}",
			"!/app/routes/**/$*.{ts,tsx,md,mdx}",
			"!/app/routes/**/*.test.{ts,tsx}",
			"!/app/routes/**/*.spec.{ts,tsx}",
			"!/app/routes/**/-*/**/*",
			// [TEST_ROUTES]
		],
		{ eager: true },
	),
});

showRoutes(app);

export default app;
