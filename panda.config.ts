import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import blue from "@park-ui/panda-preset/colors/blue";
import slate from "@park-ui/panda-preset/colors/slate";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ["./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {},
	},

	presets: [
		"@pandacss/preset-panda",
		createPreset({
			accentColor: blue,
			grayColor: slate,
			borderRadius: "sm",
		}),
	],

	plugins: [
		{
			name: "Remove Panda Preset Colors",
			hooks: {
				"preset:resolved": ({ utils, preset, name }) =>
					name === "@pandacss/preset-panda"
						? utils.omit(preset, [
								"theme.tokens.colors",
								"theme.semanticTokens.colors",
							])
						: preset,
			},
		},
	],

	jsxFramework: "hono",

	// The output directory for your css system
	outdir: "styled-system",
});
