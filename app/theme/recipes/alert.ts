import { defineSlotRecipe } from "@pandacss/dev";

export const alert = defineSlotRecipe({
	className: "alert",
	slots: ["root", "content", "description", "indicator", "title"],
	base: {
		root: {
			borderRadius: "l2",
			display: "flex",
			gap: "3",
			p: "4",
			position: "relative",
			width: "full",
		},
		content: {
			display: "flex",
			flexDirection: "column",
			gap: "1",
		},
		description: {
			textStyle: "sm",
		},
		indicator: {
			flexShrink: 0,
			width: "5",
			height: "5",
		},
		title: {
			fontWeight: "semibold",
			textStyle: "sm",
		},
	},
	defaultVariants: {
		variant: "subtle",
	},
	variants: {
		variant: {
			subtle: {
				root: {
					bg: "colorPalette.subtle.bg",
					color: "colorPalette.subtle.fg",
				},
			},
			solid: {
				root: {
					bg: "colorPalette.solid.bg",
					color: "colorPalette.solid.fg",
				},
			},
			outline: {
				root: {
					borderWidth: "1px",
					borderColor: "colorPalette.outline.border",
					color: "colorPalette.outline.fg",
				},
			},
		},
	},
	compoundVariants: [
		{
			variant: "subtle",
			status: "info",
			css: { root: { colorPalette: "cyan" } },
		},
		{
			variant: "subtle",
			status: "success",
			css: { root: { colorPalette: "green" } },
		},
		{
			variant: "subtle",
			status: "error",
			css: { root: { colorPalette: "red" } },
		},
		{
			variant: "solid",
			status: "info",
			css: { root: { colorPalette: "cyan" } },
		},
		{
			variant: "solid",
			status: "success",
			css: { root: { colorPalette: "green" } },
		},
		{
			variant: "solid",
			status: "error",
			css: { root: { colorPalette: "red" } },
		},
		{
			variant: "outline",
			status: "info",
			css: { root: { colorPalette: "cyan" } },
		},
		{
			variant: "outline",
			status: "success",
			css: { root: { colorPalette: "green" } },
		},
		{
			variant: "outline",
			status: "error",
			css: { root: { colorPalette: "red" } },
		},
	],
});
