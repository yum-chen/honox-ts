import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Park UI design system: tokens, semantic tokens, typography, keyframes,
	// conditions, light/dark color palettes and component recipes.
	presets: [
		createPreset({
			accentColor: neutral,
			grayColor: neutral,
			radius: "sm",
		}),
	],

	// Where to look for your css declarations
	include: ["./app/**/*.{js,jsx,ts,tsx}"],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			tokens: {
				fonts: {
					body: {
						value:
							'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
					},
				},
			},
		},
	},

	// The output directory for your css system
	outdir: "styled-system",
});
