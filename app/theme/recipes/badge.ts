import { defineRecipe } from "@pandacss/dev";

export const badge = defineRecipe({
	className: "badge",
	base: {
		alignItems: "center",
		borderRadius: "l2",
		display: "inline-flex",
		fontWeight: "medium",
		px: "2",
		py: "0.5",
		textStyle: "xs",
	},
	defaultVariants: {
		variant: "subtle",
		size: "md",
	},
	variants: {
		variant: {
			solid: {
				bg: "colorPalette.solid.bg",
				color: "colorPalette.solid.fg",
				_hover: {
					bg: "colorPalette.solid.bg.hover",
				},
			},
			subtle: {
				bg: "colorPalette.subtle.bg",
				color: "colorPalette.subtle.fg",
				_hover: {
					bg: "colorPalette.subtle.bg.hover",
				},
			},
			outline: {
				borderWidth: "1px",
				borderColor: "colorPalette.outline.border",
				color: "colorPalette.outline.fg",
				_hover: {
					bg: "colorPalette.outline.bg.hover",
				},
			},
			surface: {
				bg: "colorPalette.surface.bg",
				color: "colorPalette.surface.fg",
				borderWidth: "1px",
				borderColor: "colorPalette.surface.border",
				_hover: {
					bg: "colorPalette.surface.active",
				},
			},
		},
		size: {
			sm: { textStyle: "xs", px: "2", h: "5" },
			md: { textStyle: "xs", px: "2.5", h: "6" },
			lg: { textStyle: "sm", px: "3", h: "7" },
			xl: { textStyle: "sm", px: "3.5", h: "8" },
			"2xl": { textStyle: "md", px: "4", h: "10" },
		},
	},
});
