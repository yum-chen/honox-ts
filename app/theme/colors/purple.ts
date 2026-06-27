import { defineSemanticTokens } from "@pandacss/dev";

export const purple = defineSemanticTokens.colors({
	"1": { value: { _light: "#fefcfe", _dark: "#14101b" } },
	"2": { value: { _light: "#fbf7ff", _dark: "#1c152a" } },
	"3": { value: { _light: "#f5ebff", _dark: "#2b1b4b" } },
	"4": { value: { _light: "#ebdbff", _dark: "#3a2366" } },
	"5": { value: { _light: "#dbccff", _dark: "#482b80" } },
	"6": { value: { _light: "#c9b7f5", _dark: "#57359a" } },
	"7": { value: { _light: "#b198e5", _dark: "#6b45bd" } },
	"8": { value: { _light: "#9773d6", _dark: "#8e64d7" } },
	"9": { value: { _light: "#8e4ec6", _dark: "#8e4ec6" } },
	"10": { value: { _light: "#8445bc", _dark: "#9d5bd2" } },
	"11": { value: { _light: "#793aaf", _dark: "#c293f0" } },
	"12": { value: { _light: "#3c1663", _dark: "#f1e1ff" } },
	a1: { value: { _light: "#cc00cc04", _dark: "#cc66ff0a" } },
	a2: { value: { _light: "#9900ff08", _dark: "#d896ff15" } },
	a3: { value: { _light: "#8800ff14", _dark: "#d59dff38" } },
	a4: { value: { _light: "#8000ff24", _dark: "#d598ff55" } },
	a5: { value: { _light: "#7300ff33", _dark: "#d394ff73" } },
	a6: { value: { _light: "#6000e048", _dark: "#d4a2ff91" } },
	a7: { value: { _light: "#5500ce67", _dark: "#d4a7ffb8" } },
	a8: { value: { _light: "#5600c78c", _dark: "#cc95ffd5" } },
	a9: { value: { _light: "#7a1eb1e1", _dark: "#ad46f3e4" } },
	a10: { value: { _light: "#7219afba", _dark: "#bb6cf2ec" } },
	a11: { value: { _light: "#6917a5c5", _dark: "#c293f0" } },
	a12: { value: { _light: "#26014ee9", _dark: "#f1e1ff" } },
	solid: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.purple.9}", _dark: "{colors.purple.9}" },
			},
			hover: {
				value: { _light: "{colors.purple.10}", _dark: "{colors.purple.10}" },
			},
		},
		fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
	},
	subtle: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a3}", _dark: "{colors.purple.a3}" },
			},
			hover: {
				value: { _light: "{colors.purple.a4}", _dark: "{colors.purple.a4}" },
			},
			active: {
				value: { _light: "{colors.purple.a5}", _dark: "{colors.purple.a5}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a11}", _dark: "{colors.purple.a11}" },
			},
		},
	},
	surface: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a2}", _dark: "{colors.purple.a2}" },
			},
			active: {
				value: { _light: "{colors.purple.a3}", _dark: "{colors.purple.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.purple.a6}", _dark: "{colors.purple.a6}" },
			},
			hover: {
				value: { _light: "{colors.purple.a7}", _dark: "{colors.purple.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a11}", _dark: "{colors.purple.a11}" },
			},
		},
	},
	outline: {
		bg: {
			hover: {
				value: { _light: "{colors.purple.a2}", _dark: "{colors.purple.a2}" },
			},
			active: {
				value: { _light: "{colors.purple.a3}", _dark: "{colors.purple.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.purple.a7}", _dark: "{colors.purple.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a11}", _dark: "{colors.purple.a11}" },
			},
		},
	},
	plain: {
		bg: {
			hover: {
				value: { _light: "{colors.purple.a3}", _dark: "{colors.purple.a3}" },
			},
			active: {
				value: { _light: "{colors.purple.a4}", _dark: "{colors.purple.a4}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.purple.a11}", _dark: "{colors.purple.a11}" },
			},
		},
	},
});
