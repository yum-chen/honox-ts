import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
		tsconfigPaths(),
	],
};

const clientConfig = {
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		tsconfigPaths(),
	],
};

export default defineConfig(
	({ mode }) => (mode === "client" && clientConfig) || config,
);
