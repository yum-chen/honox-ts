import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";

const config = {
	build: {
		emptyOutDir: false,
	},
	resolve: {
		tsconfigPaths: true,
	},
	plugins: [
		honox({
			devServer: { adapter },
			client: { input: ["/app/client.ts", "/app/style.css"] },
			islandComponents: {
				resolve: (name) => {
					if (name.startsWith("@/")) {
						return name.replace("@/", "/app/");
					}
					return name;
				},
			},
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
