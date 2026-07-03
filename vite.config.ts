import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import { defineConfig, type UserConfig } from "vite";
import pandaConfig from "./panda.config";

const config = defineConfig(({ mode }) => {
	const isTest = mode === "test";

	const currentConfig = mode === "client" ? clientConfig : mainConfig;

	return {
		...currentConfig,
		define: {
			"import.meta.env.ROUTES_GLOB": isTest
				? JSON.stringify([
						"/app/routes/**/*.{ts,tsx,md,mdx}",
						"/app/routes/.well-known/**/*.{ts,tsx,md,mdx}",
						"!/app/routes/**/_*.{ts,tsx,md,mdx}",
						"!/app/routes/**/-*.{ts,tsx,md,mdx}",
						"!/app/routes/**/$*.{ts,tsx,md,mdx}",
						"!/app/routes/**/*.test.{ts,tsx}",
						"!/app/routes/**/*.spec.{ts,tsx}",
						"!/app/routes/**/-*/**/*",
					])
				: JSON.stringify([
						"/app/routes/**/*.{ts,tsx,md,mdx}",
						"/app/routes/.well-known/**/*.{ts,tsx,md,mdx}",
						"!/app/routes/**/_*.{ts,tsx,md,mdx}",
						"!/app/routes/**/-*.{ts,tsx,md,mdx}",
						"!/app/routes/**/$*.{ts,tsx,md,mdx}",
						"!/app/routes/**/*.test.{ts,tsx}",
						"!/app/routes/**/*.spec.{ts,tsx}",
						"!/app/routes/**/-*/**/*",
						"!/app/routes/tests/**",
					]),
		},
	};
});

const mainConfig: UserConfig = {
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
};

const clientConfig: UserConfig = {
	build: {
		minify: "oxc" as const,
	},
	// Vite 8 native Oxc configuration
	oxc: {
		jsxImportSource: "hono/jsx/dom",
	},
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default config;
