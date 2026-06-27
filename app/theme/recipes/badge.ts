import { defineRecipe } from "@pandacss/dev";

export const badge = defineRecipe({
	className: "badge",
	base: {
		display: "inline-flex",
		alignItems: "center",
		borderRadius: "l2",
		lineHeight: "1",
		fontWeight: "medium",
		fontVariantNumeric: "tabular-nums",
		whiteSpace: "nowrap",
		userSelect: "none",
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
			},
			subtle: {
				bg: "colorPalette.subtle.bg",
				color: "colorPalette.subtle.fg",
			},
			outline: {
				borderWidth: "1px",
				borderColor: "colorPalette.outline.border",
				color: "colorPalette.outline.fg",
			},
			surface: {
				bg: "colorPalette.surface.bg",
				color: "colorPalette.surface.fg",
				borderWidth: "1px",
				borderColor: "colorPalette.surface.border",
			},
		},
		size: {
			sm: { fontSize: "xs", px: "1.5", h: "4.5", gap: "0.5" },
			md: { fontSize: "xs", px: "2", h: "5", gap: "1" },
			lg: { fontSize: "xs", px: "2.5", h: "5.5", gap: "1" },
			xl: { fontSize: "sm", px: "2.5", h: "6", gap: "1.5" },
			"2xl": { fontSize: "md", px: "3", h: "7", gap: "1.5" },
		},
	},
});
