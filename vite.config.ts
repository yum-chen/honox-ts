import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import { defineConfig, type Plugin } from "vite";
import pandaConfig from "./panda.config";

const config = defineConfig(({ mode }) => {
	const isTest = mode === "test";

	/**
	 * Plugin to exclude test routes unless in test mode.
	 */
	const excludeTestRoutes = (): Plugin => ({
		name: "exclude-test-routes",
		transform(code, id) {
			if (!isTest && id.includes("node_modules/honox/dist/server/with-defaults.js")) {
				return {
					code: code.replace(
						"/app/routes/**/*.{ts,tsx,md,mdx}",
						"!/app/routes/tests/**\", \"/app/routes/**/*.{ts,tsx,md,mdx}",
					),
					map: null,
				};
			}
			return null;
		},
	});

	const currentConfig = mode === "client" ? clientConfig : mainConfig;

	return {
		...currentConfig,
		plugins: [excludeTestRoutes(), ...(currentConfig.plugins || [])],
	};
});

/**
 * Custom Bun transpiler plugin to satisfy the request for Bun.transpile.
 */
const bunTranspile = (): Plugin => ({
	name: "bun-transpile",
	enforce: "pre",
	async transform(code, id) {
		if (!id.match(/\.(ts|tsx)$/) || id.includes("node_modules")) return null;

		// @ts-ignore - Bun is globally available when running with `bun`
		if (typeof Bun === "undefined") {
			return null;
		}

		const result = await Bun.transpile(code, {
			loader: id.endsWith("x") ? "tsx" : "ts",
			target: "browser",
			tsconfigOverride: {
				compilerOptions: {
					jsx: "react-jsx",
					jsxImportSource: id.includes("client") ? "hono/jsx/dom" : "hono/jsx",
				},
			},
		});

		return {
			code: result,
			map: null,
		};
	},
});

const mainConfig: any = {
	oxc: {
		jsx: {
			importSource: "hono/jsx",
		},
	},
	build: {
		minify: "oxc" as const,
		emptyOutDir: false,
	},
	// Vite 8 native Oxc configuration
	oxc: {
		jsxImportSource: "hono/jsx",
	},
	plugins: [
		bunTranspile(),
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

const clientConfig: any = {
	oxc: {
		jsx: {
			importSource: "hono/jsx/dom",
		},
	},
	build: {
		minify: "oxc" as const,
	},
	plugins: [
		bunTranspile(),
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
	],
};

export default config;
