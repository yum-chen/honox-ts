import { defineConfig } from "@pandacss/dev";
import * as theme from "./app/theme";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	presets: ["@pandacss/preset-panda", "@park-ui/panda-preset"],

	jsxFramework: "hono",

	// Where to look for your css declarations
	include: ["./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: { extend: { ...theme.config } },

	// The output directory for your css system
	outdir: "styled-system",

	globalCss: theme.globalCss,
	conditions: theme.conditions,
});
