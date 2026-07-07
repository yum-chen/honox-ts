import { toggleGroupAnatomy } from "@ark-ui/react/anatomy";
import { defineSlotRecipe } from "@pandacss/dev";

export const toggleGroup = defineSlotRecipe({
	className: "toggle-group",
	slots: toggleGroupAnatomy.keys(),
	base: {
		root: {
			display: "flex",
			position: "relative",
			_vertical: {
				flexDirection: "column",
			},
			_horizontal: {
				flexDirection: "row",
			},
		},
		item: {
			alignItems: "center",
			appearance: "none",
			background: "transparent",
			cursor: "pointer",
			color: "fg.muted",
			display: "flex",
			fontWeight: "semibold",
			justifyContent: "center",
			outline: "none",
			position: "relative",
			transitionDuration: "normal",
			transitionProperty: "background, border-color, color, box-shadow",
			transitionTimingFunction: "default",
			userSelect: "none",
			zIndex: "1",
			_selected: {
				background: "bg.subtle",
				color: "colorPalette.text",
			},
			_disabled: {
				layerStyle: "disabled",
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "subtle",
	},
	variants: {
		variant: {
			subtle: {
				item: {
					_selected: {
						background: "bg.subtle",
						color: "fg.default",
					},
				},
			},
			outline: {
				root: {
					borderWidth: "1px",
					borderRadius: "l2",
				},
				item: {
					_selected: {
						background: "bg.subtle",
						color: "fg.default",
					},
				},
			},
		},
		size: {
			sm: {
				item: {
					h: "9",
					minW: "9",
					textStyle: "sm",
					px: "3.5",
				},
			},
			md: {
				item: {
					h: "10",
					minW: "10",
					textStyle: "sm",
					px: "4",
				},
			},
			lg: {
				item: {
					h: "11",
					minW: "11",
					textStyle: "md",
					px: "4.5",
				},
			},
		},
	},
});
