import { existsSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

const __dirname = join(fileURLToPath(import.meta.url), "..");

const app = createApp({
	routes: import.meta.glob(
		[
			"/app/routes/**/*.{ts,tsx,md,mdx}",
			"/app/routes/.well-known/**/*.{ts,tsx,md,mdx}",
			"!/app/routes/**/_*.{ts,tsx,md,mdx}",
			"!/app/routes/**/-*.{ts,tsx,md,mdx}",
			"!/app/routes/**/$*.{ts,tsx,md,mdx}",
			"!/app/routes/**/*.test.{ts,tsx}",
			"!/app/routes/**/*.spec.{ts,tsx}",
			"!/app/routes/**/-*/**/*",
		],
		{ eager: true },
	),
});

// Serve static files from public/ for /admin/* path
// This allows Sveltia CMS to load config.yml and other static files
app.use("/admin/*", async (c, next) => {
	const url = new URL(c.req.url);
	let filePath = join(__dirname, "..", "public", url.pathname);

	// Handle directory index (e.g., /admin/ -> /admin/index.html)
	if (url.pathname.endsWith("/")) {
		filePath = join(filePath, "index.html");
	}

	try {
		if (existsSync(filePath) && statSync(filePath).isFile()) {
			const content = readFileSync(filePath);
			const ext = filePath.split(".").pop()?.toLowerCase();
			const mimeTypes: Record<string, string> = {
				".html": "text/html",
				".css": "text/css",
				".js": "application/javascript",
				".json": "application/json",
				".png": "image/png",
				".yml": "text/yaml",
				".yaml": "text/yaml",
			};
			const mimeType = mimeTypes[`.${ext}`] || "application/octet-stream";

			return new Response(content, {
				headers: { "Content-Type": mimeType },
			});
		}
	} catch (error) {
		console.error(`Error serving ${filePath}:`, error);
	}

	return next();
});

// Handle /admin (without trailing slash) - redirect to /admin/
app.get("/admin", (c) => {
	return c.redirect("/admin/");
});

showRoutes(app);

export default app;
