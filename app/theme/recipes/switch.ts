import { defineSlotRecipe } from "@pandacss/dev";

export const switchRecipe = defineSlotRecipe({
	className: "switch",
	slots: ["root", "control", "thumb", "label"],
	base: {
		root: {
			alignItems: "center",
			display: "inline-flex",
			gap: "3",
			position: "relative",
			verticalAlign: "middle",
		},
		control: {
			alignItems: "center",
			background: "bg.muted",
			borderRadius: "full",
			cursor: "pointer",
			display: "inline-flex",
			flexShrink: 0,
			height: "6",
			transitionDuration: "fast",
			transitionProperty: "background",
			width: "11",
			_checked: {
				background: "colorPalette.solid.bg",
			},
		},
		thumb: {
			background: "white",
			borderRadius: "full",
			height: "5",
			width: "5",
			boxShadow: "sm",
			transitionDuration: "fast",
			transitionProperty: "transform, background",
			transform: "translateX(0.125rem)",
			_checked: {
				transform: "translateX(1.375rem)",
			},
		},
		label: {
			color: "fg.default",
			fontWeight: "medium",
			textStyle: "sm",
			userSelect: "none",
		},
	},
	defaultVariants: {
		size: "md",
	},
	variants: {
		size: {
			sm: {
				root: { gap: "2" },
				control: { width: "7", height: "4" },
				thumb: { width: "3", height: "3" },
				label: { textStyle: "xs" },
			},
			md: {
				root: { gap: "3" },
				control: { width: "11", height: "6" },
				thumb: { width: "5", height: "5" },
				label: { textStyle: "sm" },
			},
			lg: {
				root: { gap: "4" },
				control: { width: "14", height: "8" },
				thumb: { width: "6", height: "6" },
				label: { textStyle: "md" },
			},
		},
	},
});
