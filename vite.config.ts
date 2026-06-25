import adapter from "@hono/vite-dev-server/cloudflare";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

const config = {
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
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default defineConfig(
	({ mode }) => (mode === "client" && clientConfig) || config,
);
