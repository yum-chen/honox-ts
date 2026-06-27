import { defineSemanticTokens } from "@pandacss/dev";

export const orange = defineSemanticTokens.colors({
	"1": { value: { _light: "#fefcfb", _dark: "#17120e" } },
	"2": { value: { _light: "#fff7ed", _dark: "#1f1612" } },
	"3": { value: { _light: "#ffeed5", _dark: "#351e12" } },
	"4": { value: { _light: "#ffe1bb", _dark: "#4a2512" } },
	"5": { value: { _light: "#ffd3a1", _dark: "#5c2d12" } },
	"6": { value: { _light: "#ffc284", _dark: "#703917" } },
	"7": { value: { _light: "#ffac66", _dark: "#8a4a21" } },
	"8": { value: { _light: "#ff914d", _dark: "#b05a2e" } },
	"9": { value: { _light: "#f76b15", _dark: "#f76b15" } },
	"10": { value: { _light: "#eb5e0b", _dark: "#ff801f" } },
	"11": { value: { _light: "#bd4e0e", _dark: "#ffa057" } },
	"12": { value: { _light: "#5e2c0f", _dark: "#ffe0c2" } },
	a1: { value: { _light: "#cc550004", _dark: "#ff660009" } },
	a2: { value: { _light: "#ff900012", _dark: "#ff702511" } },
	a3: { value: { _light: "#ff94002a", _dark: "#ff6d182b" } },
	a4: { value: { _light: "#ff900044", _dark: "#ff681244" } },
	a5: { value: { _light: "#ff89005e", _dark: "#ff6b145a" } },
	a6: { value: { _light: "#ff80007b", _dark: "#ff771a72" } },
	a7: { value: { _light: "#ff740099", _dark: "#ff7e2f90" } },
	a8: { value: { _light: "#ff6600b2", _dark: "#ff7d39ba" } },
	a9: { value: { _light: "#f6630bea", _dark: "#fe6b14f0" } },
	a10: { value: { _light: "#e95406f4", _dark: "#ff801ffa" } },
	a11: { value: { _light: "#ba4808f1", _dark: "#ffa057" } },
	a12: { value: { _light: "#4f2106f0", _dark: "#ffe0c2f7" } },
	solid: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.orange.9}", _dark: "{colors.orange.9}" },
			},
			hover: {
				value: { _light: "{colors.orange.10}", _dark: "{colors.orange.10}" },
			},
		},
		fg: { DEFAULT: { value: { _light: "white", _dark: "white" } } },
	},
	subtle: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
			},
			hover: {
				value: { _light: "{colors.orange.a4}", _dark: "{colors.orange.a4}" },
			},
			active: {
				value: { _light: "{colors.orange.a5}", _dark: "{colors.orange.a5}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
			},
		},
	},
	surface: {
		bg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a2}", _dark: "{colors.orange.a2}" },
			},
			active: {
				value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.orange.a6}", _dark: "{colors.orange.a6}" },
			},
			hover: {
				value: { _light: "{colors.orange.a7}", _dark: "{colors.orange.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
			},
		},
	},
	outline: {
		bg: {
			hover: {
				value: { _light: "{colors.orange.a2}", _dark: "{colors.orange.a2}" },
			},
			active: {
				value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
			},
		},
		border: {
			DEFAULT: {
				value: { _light: "{colors.orange.a7}", _dark: "{colors.orange.a7}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
			},
		},
	},
	plain: {
		bg: {
			hover: {
				value: { _light: "{colors.orange.a3}", _dark: "{colors.orange.a3}" },
			},
			active: {
				value: { _light: "{colors.orange.a4}", _dark: "{colors.orange.a4}" },
			},
		},
		fg: {
			DEFAULT: {
				value: { _light: "{colors.orange.a11}", _dark: "{colors.orange.a11}" },
			},
		},
	},
});
