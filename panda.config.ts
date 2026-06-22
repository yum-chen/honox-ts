import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import amber from "@park-ui/panda-preset/colors/amber";
import slate from "@park-ui/panda-preset/colors/slate";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	presets: [
		createPreset({
			accentColor: amber,
			grayColor: slate,
			radius: "sm",
		}),
	],

	// Where to look for your css declarations
	include: ["./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	jsxFramework: "hono",

	// The output directory for your css system
	outdir: "styled-system",
});
