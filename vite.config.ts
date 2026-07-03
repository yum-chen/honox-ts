import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";

const config = defineConfig(({ mode }) =>
	mode === "client" ? clientConfig : mainConfig,
);

const mainConfig = {
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
		honox({
			devServer: { adapter },
		}),
		tailwindcss(),
		ssg({ entry: "app/server.ts" }),
	],
};

const clientConfig = {
	oxc: {
		jsx: {
			importSource: "hono/jsx/dom",
		},
	},
	build: {
		minify: "oxc" as const,
	},
	plugins: [
		honox({
			client: { input: ["/app/client.ts", "/app/style.css"] },
		}),
		tailwindcss(),
	],
};

export default config;
