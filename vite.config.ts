import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import { defineConfig } from "vite";
import pandaConfig from "./panda.config";

const config = defineConfig(({ mode }) =>
	mode === "client" ? clientConfig : mainConfig(mode),
);

const mainConfig = {
	build: {
		minify: "oxc" as const,
		emptyOutDir: false,
	},
	// Vite 8 native Oxc configuration
	oxc: {
		jsxImportSource: "hono/jsx",
	},
	plugins: [
		honox({
			devServer: {
				adapter,
				exclude: [
					...devServerDefaultOptions.exclude,
					new RegExp(`^/${pandaConfig.outdir || "styled-system"}/.*`),
				],
			},
		}),
		ssg({ entry: "app/server.ts" }),
	],
});

const clientConfig = {
	oxc: {
		jsxImportSource: "hono/jsx/dom",
	},
	build: {
		minify: "oxc" as const,
	},
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default config;
