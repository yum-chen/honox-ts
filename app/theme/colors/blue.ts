import { defineSemanticTokens } from "@pandacss/dev";

export const blue = defineSemanticTokens.colors({
	"1": { value: { _light: "#fbfdff", _dark: "#0d1520" } },
	"2": { value: { _light: "#f5f9ff", _dark: "#111927" } },
	"3": { value: { _light: "#eef4ff", _dark: "#0d2847" } },
	"4": { value: { _light: "#e1edff", _dark: "#003362" } },
	"5": { value: { _light: "#d1e1ff", _dark: "#004077" } },
	"6": { value: { _light: "#bcd1ff", _dark: "#004f91" } },
	"7": { value: { _light: "#a2beff", _dark: "#0062ac" } },
	"8": { value: { _light: "#79a3ff", _dark: "#0078d1" } },
	"9": { value: { _light: "#0091ff", _dark: "#0091ff" } },
	"10": { value: { _light: "#0081f1", _dark: "#33a1ff" } },
	"11": { value: { _light: "#006adc", _dark: "#70b8ff" } },
	"12": { value: { _light: "#00254d", _dark: "#c2e6ff" } },
	a1: { value: { _light: "#0066ff04", _dark: "#0088ff08" } },
	a2: { value: { _light: "#0066ff0a", _dark: "#2a87ff0f" } },
	a3: { value: { _light: "#0070ff11", _dark: "#2091ff2f" } },
	a4: { value: { _light: "#0075ff1e", _dark: "#0093ff4b" } },
	a5: { value: { _light: "#006eff2e", _dark: "#0099ff61" } },
	a6: { value: { _light: "#005eff43", _dark: "#00a1ff7d" } },
	a7: { value: { _light: "#0059ff5d", _dark: "#14aaff98" } },
	a8: { value: { _light: "#005eff86", _dark: "#00afffbf" } },
	a9: { value: { _light: "#0091ff", _dark: "#00afffff" } },
	a10: { value: { _light: "#0082f2f5", _dark: "#33b1fffa" } },
	a11: { value: { _light: "#006bdcee", _dark: "#70b8ff" } },
	a12: { value: { _light: "#00264df2", _dark: "#c2e6fff7" } },
	solid: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.blue.9}", _dark: "{colors.blue.9}" },
			},
			hover: {
				value: { _light: "{colors.blue.10}", _dark: "{colors.blue.10}" },
			},
		},
		fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
	},
	subtle: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a3}", _dark: "{colors.blue.a3}" },
			},
			hover: {
				value: { _light: "{colors.blue.a4}", _dark: "{colors.blue.a4}" },
			},
			active: {
				value: { _light: "{colors.blue.a5}", _dark: "{colors.blue.a5}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a11}", _dark: "{colors.blue.a11}" },
			},
		},
	},
	surface: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a2}", _dark: "{colors.blue.a2}" },
			},
			active: {
				value: { _light: "{colors.blue.a3}", _dark: "{colors.blue.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.blue.a6}", _dark: "{colors.blue.a6}" },
			},
			hover: {
				value: { _light: "{colors.blue.a7}", _dark: "{colors.blue.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a11}", _dark: "{colors.blue.a11}" },
			},
		},
	},
	outline: {
		bg: {
			hover: {
				value: { _light: "{colors.blue.a2}", _dark: "{colors.blue.a2}" },
			},
			active: {
				value: { _light: "{colors.blue.a3}", _dark: "{colors.blue.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.blue.a7}", _dark: "{colors.blue.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a11}", _dark: "{colors.blue.a11}" },
			},
		},
	},
	plain: {
		bg: {
			hover: {
				value: { _light: "{colors.blue.a3}", _dark: "{colors.blue.a3}" },
			},
			active: {
				value: { _light: "{colors.blue.a4}", _dark: "{colors.blue.a4}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.blue.a11}", _dark: "{colors.blue.a11}" },
			},
		},
	},
});
