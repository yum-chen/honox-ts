import { readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

const mimeTypes: Record<string, string> = {
	".mjs": "application/javascript",
	".js": "application/javascript",
	".css": "text/css",
	".json": "application/json",
};

function serveStyledSystem() {
	return {
		name: "serve-styled-system",
		configureServer(server) {
			server.middlewares.use((req, res, next) => {
				if (!req.url?.startsWith("/styled-system/")) return next();
				const filePath = join(server.config.root, req.url.split("?")[0]);
				try {
					if (!statSync(filePath).isFile()) return next();
					const ext = filePath.slice(filePath.lastIndexOf("."));
					res.setHeader(
						"Content-Type",
						mimeTypes[ext] || "application/octet-stream",
					);
					res.end(readFileSync(filePath));
				} catch {
					next();
				}
			});
		},
	};
}

const config = {
	build: {
		emptyOutDir: false,
	},
	plugins: [
		serveStyledSystem(),
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		ssg({ entry: "app/server.ts" }),
	],
};

const clientConfig = {
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default defineConfig(
	({ mode }) => (mode === "client" && clientConfig) || config,
);
