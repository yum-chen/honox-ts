import { defineSlotRecipe } from "@pandacss/dev";

export const toast = defineSlotRecipe({
	className: "toast",
	slots: [
		"root",
		"title",
		"description",
		"actionTrigger",
		"closeTrigger",
		"indicator",
	],
	jsx: ["Toast", "Toaster"],
	base: {
		root: {
			alignItems: "center",
			background: "gray.surface.bg",
			borderRadius: "l3",
			boxShadow: "lg",
			display: "flex",
			gap: "3",
			height: "var(--height)",
			minWidth: "sm",
			opacity: "var(--opacity)",
			overflowWrap: "anywhere",
			p: "4",
			position: "relative",
			scale: "var(--scale)",
			transitionDuration: "slow",
			transitionProperty: "translate, scale, opacity, height",
			transitionTimingFunction: "default",
			translate: "var(--x) var(--y)",
			width: "full",
			willChange: "translate, opacity, scale",
			zIndex: "var(--z-index)",
		},
		title: {
			color: "fg.default",
			fontWeight: "medium",
			textStyle: "sm",
		},
		description: {
			color: "fg.muted",
			textStyle: "sm",
		},
		actionTrigger: {
			color: "colorPalette.plain.fg",
			cursor: "pointer",
			fontWeight: "semibold",
			textStyle: "sm",
		},
		closeTrigger: {
			position: "absolute",
			top: "2",
			insetEnd: "2",
			cursor: "pointer",
		},
		indicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			color: "colorPalette.text",
			_icon: {
				boxSize: "5",
			},
		},
	},
	defaultVariants: {
		status: "info",
	},
	variants: {
		status: {
			info: {
				root: { colorPalette: "blue" },
			},
			success: {
				root: { colorPalette: "green" },
			},
			warning: {
				root: { colorPalette: "orange" },
			},
			error: {
				root: { colorPalette: "red" },
			},
			loading: {
				root: { colorPalette: "gray" },
			},
		},
	},
});
