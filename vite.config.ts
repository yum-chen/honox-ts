import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

const config = {
	resolve: {
		tsconfigPaths: true,
	},
	build: {
		emptyOutDir: false,
	},
	plugins: [
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		ssg({ entry: "app/server.ts" }),
	],
};

const clientConfig = {
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default defineConfig(
	({ mode }) => (mode === "client" && clientConfig) || config,
);
