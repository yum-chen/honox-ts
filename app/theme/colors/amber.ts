import { defineSemanticTokens } from "@pandacss/dev";

export const amber = defineSemanticTokens.colors({
	"1": { value: { _light: "#fefdfb", _dark: "#18120a" } },
	"2": { value: { _light: "#fefbe8", _dark: "#1c150d" } },
	"3": { value: { _light: "#fef0c9", _dark: "#2a1f0f" } },
	"4": { value: { _light: "#ffea9e", _dark: "#3d2a0d" } },
	"5": { value: { _light: "#ffdf73", _dark: "#4d3410" } },
	"6": { value: { _light: "#ffd149", _dark: "#5e3e0e" } },
	"7": { value: { _light: "#ffc027", _dark: "#7a4f0c" } },
	"8": { value: { _light: "#f5a623", _dark: "#9c650a" } },
	"9": { value: { _light: "#e08a19", _dark: "#e08a19" } },
	"10": { value: { _light: "#d17a13", _dark: "#f09e1e" } },
	"11": { value: { _light: "#a35e0a", _dark: "#fbbb44" } },
	"12": { value: { _light: "#5a3205", _dark: "#fee9a8" } },
	a1: { value: { _light: "#cc8b0005", _dark: "#ffb2000a" } },
	a2: { value: { _light: "#e09b000d", _dark: "#ffb20011" } },
	a3: { value: { _light: "#f5a60021", _dark: "#ffb20028" } },
	a4: { value: { _light: "#e89e0035", _dark: "#ffb2003b" } },
	a5: { value: { _light: "#da92004a", _dark: "#ffb2004d" } },
	a6: { value: { _light: "#cc850062", _dark: "#ffb2005e" } },
	a7: { value: { _light: "#bf790082", _dark: "#ffb20075" } },
	a8: { value: { _light: "#b36d00c2", _dark: "#ffb20095" } },
	a9: { value: { _light: "#e08a19", _dark: "#ffb200c3" } },
	a10: { value: { _light: "#d17a13f8", _dark: "#ffb200cd" } },
	a11: { value: { _light: "#a35e0eef", _dark: "#ffbc00e5" } },
	a12: { value: { _light: "#5a3205f2", _dark: "#ffe082f7" } },
	solid: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.amber.9}", _dark: "{colors.amber.9}" },
			},
			hover: {
				value: { _light: "{colors.amber.10}", _dark: "{colors.amber.10}" },
			},
		},
		fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
	},
	subtle: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
			},
			hover: {
				value: { _light: "{colors.amber.a4}", _dark: "{colors.amber.a4}" },
			},
			active: {
				value: { _light: "{colors.amber.a5}", _dark: "{colors.amber.a5}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
			},
		},
	},
	surface: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a2}", _dark: "{colors.amber.a2}" },
			},
			active: {
				value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.amber.a6}", _dark: "{colors.amber.a6}" },
			},
			hover: {
				value: { _light: "{colors.amber.a7}", _dark: "{colors.amber.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
			},
		},
	},
	outline: {
		bg: {
			hover: {
				value: { _light: "{colors.amber.a2}", _dark: "{colors.amber.a2}" },
			},
			active: {
				value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.amber.a7}", _dark: "{colors.amber.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
			},
		},
	},
	plain: {
		bg: {
			hover: {
				value: { _light: "{colors.amber.a3}", _dark: "{colors.amber.a3}" },
			},
			active: {
				value: { _light: "{colors.amber.a4}", _dark: "{colors.amber.a4}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.amber.a11}", _dark: "{colors.amber.a11}" },
			},
		},
	},
});
