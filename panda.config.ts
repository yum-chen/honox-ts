import { defineConfig } from "@pandacss/dev";
import { createPreset } from "@park-ui/panda-preset";
import blue from "@park-ui/panda-preset/colors/blue";
import neutral from "@park-ui/panda-preset/colors/neutral";

export default defineConfig({
	preflight: true,
	include: ["./app/**/*.{js,jsx,ts,tsx}"],
	exclude: [],
	presets: [
		createPreset({
			accentColor: blue,
			grayColor: neutral,
		}),
	],
	theme: {
		extend: {},
	},
	outdir: "styled-system",
});
