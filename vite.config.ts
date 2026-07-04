import adapter from "@hono/vite-dev-server/node";
import ssg from "@hono/vite-ssg";
import honox, { devServerDefaultOptions } from "honox/vite";
import { defineConfig } from "vite";
import pandaConfig from "./panda.config";
import path from "path";
import { fileURLToPath } from "url";
import { renameSync, existsSync, mkdirSync } from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// After SSG build, rename dist/blog.html → dist/blog/index.html
// so /blog serves index.html inside the blog/ directory
// and /blog/xxxxx.html can coexist without conflict.
function fixBlogRoutingPlugin() {
	return {
		name: "fix-blog-routing",
		closeBundle: async () => {
			const distDir = path.resolve(__dirname, "dist");
			const blogHtml = path.join(distDir, "blog.html");
			const blogDir = path.join(distDir, "blog");
			const blogIndex = path.join(blogDir, "index.html");

			if (existsSync(blogHtml)) {
				mkdirSync(blogDir, { recursive: true });
				renameSync(blogHtml, blogIndex);
				console.log(
					"[fix-blog-routing] ✓ dist/blog.html → dist/blog/index.html",
				);
			}
		},
	};
}

const config = defineConfig(({ mode }) =>
	mode === "client" ? clientConfig : mainConfig(mode),
);

const mainConfig = (_mode: string) => ({
	resolve: {
		alias: {
			"styled-system": path.resolve(__dirname, "styled-system"),
		},
	},
	build: {
		minify: "oxc" as const,
		emptyOutDir: false,
	},
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
		fixBlogRoutingPlugin(),
	],
});

const clientConfig = {
	resolve: {
		alias: {
			"styled-system": path.resolve(__dirname, "styled-system"),
		},
	},
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
