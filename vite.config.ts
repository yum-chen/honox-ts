import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import { defineConfig } from "vite";
import pandaConfig from "./panda.config";

const config = defineConfig(({ mode }) =>
	mode === "client" ? clientConfig : mainConfig,
);

const mainConfig = {
	build: {
		emptyOutDir: false,
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
	resolve: {
		alias: {
			"@": "/app",
		},
	},
};

const clientConfig = {
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
	resolve: {
		alias: {
			"@": "/app",
		},
	},
};

export default config;
