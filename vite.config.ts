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
		tsconfigPaths(),
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
	plugins: [
		tsconfigPaths(),
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default defineConfig(
	({ mode }) => (mode === "client" && clientConfig) || config,
);
