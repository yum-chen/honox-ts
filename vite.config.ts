import { resolve } from "node:path";
import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
	if (mode === "client") {
		return {
			resolve: { alias: { "@": resolve(__dirname, ".") } },
			plugins: [
				honox({
					client: { input: ["/app/client.ts", "/app/style.css"] },
				}),
			],
		};
	}
	return {
		resolve: { alias: { "@": resolve(__dirname, ".") } },
		plugins: [
			honox({
				devServer: { adapter },
				client: { input: ["/app/client.ts", "/app/style.css"] },
			}),
			ssg({ entry: "./app/server.ts" }),
		],
	};
});
