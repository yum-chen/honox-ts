export const globalCss = {
	extend: {
		"*": {
			"--global-color-border": "colors.border",
			"--global-color-placeholder": "colors.fg.subtle",
			"--global-color-selection": "colors.colorPalette.subtle.bg",
			"--global-color-focus-ring": "colors.colorPalette.solid.bg",
		},
		html: {
			colorPalette: "gray",
		},
		body: {
			background: "canvas",
			color: "fg.default",
		},
		".sr-only": {
			position: "absolute",
			width: "1px",
			height: "1px",
			padding: "0",
			margin: "-1px",
			overflow: "hidden",
			clip: "rect(0, 0, 0, 0)",
			whiteSpace: "nowrap",
			borderWidth: "0",
		},
	},
};
