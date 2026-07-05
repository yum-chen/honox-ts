import { defineSlotRecipe } from "@pandacss/dev";

export const tabs = defineSlotRecipe({
	className: "tabs",
	slots: ["root", "list", "trigger", "content", "indicator"],
	jsx: ["Tabs"],
	base: {
		root: {
			position: "relative",
			display: "flex",
			alignItems: "start",
			_horizontal: {
				flexDirection: "column",
				gap: "2",
			},
			_vertical: {
				flexDirection: "row",
				gap: "4",
			},
		},
		list: {
			display: "flex",
			position: "relative",
			isolation: "isolate",
			_horizontal: {
				flexDirection: "row",
			},
			_vertical: {
				flexDirection: "column",
			},
		},
		trigger: {
			alignItems: "center",
			cursor: "pointer",
			display: "flex",
			fontWeight: "semibold",
			outline: "0",
			position: "relative",
			transitionProperty: "color",
			transitionDuration: "normal",
			_focusVisible: {
				zIndex: 1,
				outline: "2px solid",
				outlineColor: "colorPalette.default",
				outlineOffset: "2px",
			},
			_disabled: {
				opacity: 0.5,
				cursor: "not-allowed",
			},
		},
		content: {
			_focusVisible: {
				outline: "2px solid",
				outlineColor: "colorPalette.default",
				outlineOffset: "2px",
			},
			_horizontal: {
				width: "100%",
			},
			_vertical: {
				height: "100%",
			},
		},
		indicator: {
			width: "var(--width)",
			height: "var(--height)",
			position: "absolute",
			transitionProperty: "all",
			transitionDuration: "normal",
			zIndex: -1,
		},
	},

	variants: {
		size: {
			xs: {
				list: { gap: "1" },
				trigger: { h: "8", minW: "8", fontSize: "xs", px: "3", gap: "2" },
			},
			sm: {
				list: { gap: "1" },
				trigger: { h: "9", minW: "9", fontSize: "sm", px: "3.5", gap: "2" },
			},
			md: {
				list: { gap: "1" },
				trigger: { h: "10", minW: "10", fontSize: "sm", px: "4", gap: "2" },
			},
			lg: {
				list: { gap: "1" },
				trigger: { h: "11", minW: "11", fontSize: "md", px: "4.5", gap: "2" },
			},
		},
		variant: {
			line: {
				root: {
					alignItems: "stretch",
				},
				list: {
					_horizontal: {
						borderBottomWidth: "1px",
						borderColor: "border.default",
					},
					_vertical: {
						borderStartWidth: "1px",
						borderColor: "border.default",
					},
				},
				indicator: {
					background: "colorPalette.solid.bg",
					_horizontal: {
						bottom: "0",
						height: "0.5",
						left: "var(--left)",
						transform: "translateY(1px)",
					},
					_vertical: {
						left: "0",
						width: "0.5",
						top: "var(--top)",
						transform: "translateX(-1px)",
					},
				},
				trigger: {
					color: "fg.muted",
					_selected: {
						color: "fg.default",
					},
				},
			},
			subtle: {
				indicator: {
					bg: "colorPalette.subtle.bg",
					borderRadius: "l2",
					left: "var(--left)",
					top: "var(--top)",
				},
				trigger: {
					color: "fg.muted",
					_selected: {
						color: "colorPalette.subtle.fg",
					},
				},
			},
			enclosed: {
				list: {
					bg: "bg.subtle",
					borderWidth: "1px",
					borderRadius: "l3",
					p: "1",
				},
				indicator: {
					borderRadius: "l2",
					boxShadow: "sm",
					bg: "bg.default",
					left: "var(--left)",
					top: "var(--top)",
				},
				trigger: {
					color: "fg.muted",
					_selected: {
						color: "fg.default",
					},
				},
			},
		},
		fitted: {
			true: {
				root: {
					alignItems: "stretch",
				},
				trigger: {
					flex: 1,
					textAlign: "center",
					justifyContent: "center",
				},
			},
		},
	},

	defaultVariants: {
		size: "md",
		variant: "line",
	},
});
