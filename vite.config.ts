import adapter from "@hono/vite-dev-server/cloudflare";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			plugins: [
				honox({
					client: { input: ["/app/client.ts", "/app/style.css"] },
				}),
			],
		};
	}
	return {
		plugins: [
			honox({
				devServer: { adapter },
				client: { input: ["/app/client.ts", "/app/style.css"] },
			}),
			ssg({ entry: "./app/server.ts" }),
		],
	};
});
