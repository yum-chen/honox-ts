import { defineSlotRecipe } from "@pandacss/dev";
import { input } from "./input";

// Search slot recipe — joins the design system by reusing the shared `input`
// recipe for the field and resolving all accent colors through `colorPalette`
// semantic tokens (so the component themes with the rest of the system instead
// of hardcoding `blue.*`). Focus treatment uses `focusVisibleRing` to match
// every other form control.
export const search = defineSlotRecipe({
	className: "search",
	slots: [
		"root",
		"inputWrap",
		"input",
		"icon",
		"clearTrigger",
		"listbox",
		"item",
		"itemTitle",
		"itemDescription",
		"itemTags",
		"countText",
		"status",
	],
	base: {
		root: {
			width: "full",
			display: "flex",
			flexDirection: "column",
			gap: "1",
		},
		inputWrap: {
			position: "relative",
			width: "full",
		},
		input: {
			...input.base,
			pl: "10",
			pr: "10",
		},
		icon: {
			position: "absolute",
			left: "3",
			top: "50%",
			transform: "translateY(-50%)",
			color: "fg.muted",
			pointerEvents: "none",
			zIndex: "1",
			display: "inline-flex",
		},
		clearTrigger: {
			position: "absolute",
			right: "2",
			top: "50%",
			transform: "translateY(-50%)",
			color: "fg.muted",
			cursor: "pointer",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			boxSize: "6",
			borderRadius: "l1",
			focusVisibleRing: "outside",
			transition: "colors",
			_hover: {
				color: "fg.default",
				background: "gray.plain.bg.hover",
			},
			_disabled: {
				layerStyle: "disabled",
			},
		},
		listbox: {
			position: "absolute",
			top: "calc(100% + 6px)",
			left: "0",
			right: "0",
			bg: "bg.default",
			borderWidth: "1px",
			borderColor: "gray.outline.border",
			borderRadius: "l2",
			boxShadow: "lg",
			zIndex: "dropdown",
			maxHeight: "80",
			overflowY: "auto",
			padding: "1",
		},
		item: {
			display: "flex",
			flexDirection: "column",
			gap: "0.5",
			px: "3",
			py: "2.5",
			borderRadius: "md",
			cursor: "pointer",
			transition: "colors",
			_highlighted: {
				bg: "colorPalette.subtle.bg",
				color: "colorPalette.subtle.fg",
			},
		},
		itemTitle: {
			fontWeight: "medium",
			color: "fg.default",
			textStyle: "sm",
		},
		itemDescription: {
			textStyle: "xs",
			color: "fg.muted",
			lineClamp: "2",
		},
		itemTags: {
			textStyle: "2xs",
			color: "colorPalette.solid.fg",
			mt: "1",
		},
		countText: {
			textStyle: "sm",
			color: "fg.muted",
		},
		status: {
			textStyle: "sm",
			color: "fg.muted",
		},
	},
	defaultVariants: {
		size: "md",
		variant: "outline",
		colorPalette: "blue",
	},
	variants: {
		size: {
			sm: { input: { ...input.variants.size.sm } },
			md: { input: { ...input.variants.size.md } },
			lg: { input: { ...input.variants.size.lg } },
		},
		variant: {
			outline: { input: { ...input.variants.variant.outline } },
			surface: { input: { ...input.variants.variant.surface } },
			subtle: { input: { ...input.variants.variant.subtle } },
		},
		colorPalette: {
			gray: { colorPalette: "gray" },
			blue: { colorPalette: "blue" },
			cyan: { colorPalette: "cyan" },
			green: { colorPalette: "green" },
			orange: { colorPalette: "orange" },
			purple: { colorPalette: "purple" },
			red: { colorPalette: "red" },
			amber: { colorPalette: "amber" },
			teal: { colorPalette: "teal" },
			pink: { colorPalette: "pink" },
			indigo: { colorPalette: "indigo" },
			yellow: { colorPalette: "yellow" },
			success: { colorPalette: "green" },
			error: { colorPalette: "red" },
			warning: { colorPalette: "orange" },
		},
	},
});
