import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox from "honox/vite";
import { defineConfig } from "vite";
import pandaConfig from "./panda.config";

const config = {
	build: {
		emptyOutDir: false,
	},
	plugins: [
		honox({
			devServer: {
				adapter,
				exclude: [
					new RegExp(`^/${pandaConfig.outdir || "styled-system"}/.*`),
					/^\/app\/.+/,
					/^\/favicon.ico/,
					/^\/static\/.*/,
					/^\/@vite\/client/,
					/^\/@id\/.*/,
					/^\/node_modules\/.*/,
				],
			},
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
