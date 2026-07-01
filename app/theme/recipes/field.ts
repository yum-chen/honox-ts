import { defineSlotRecipe } from "@pandacss/dev";

export const field = defineSlotRecipe({
	className: "field",
	slots: [
		"root",
		"errorText",
		"helperText",
		"input",
		"label",
		"requiredIndicator",
	],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "1.5",
			width: "full",
		},
		label: {
			alignItems: "center",
			color: "fg.default",
			display: "flex",
			gap: "0.5",
			textAlign: "start",
			userSelect: "none",
			textStyle: "label",
			_disabled: {
				layerStyle: "disabled",
			},
		},
		requiredIndicator: {
			color: "colorPalette.solid",
		},
		helperText: {
			color: "fg.muted",
			textStyle: "sm",
			_disabled: {
				layerStyle: "disabled",
			},
		},
		errorText: {
			color: "error",
			textStyle: "sm",
		},
		input: {
			appearance: "none",
			borderRadius: "l2",
			height: "var(--input-height)",
			minHeight: "var(--input-height)",
			minW: "var(--input-height)",
			outline: "0",
			position: "relative",
			textAlign: "start",
			transition: "colors",
			transitionProperty: "box-shadow, border-color",
			width: "100%",
			_disabled: {
				layerStyle: "disabled",
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "outline",
	},
	variants: {
		variant: {
			outline: {
				input: {
					borderWidth: "1px",
					borderColor: "gray.outline.border",
					focusVisibleRing: "inside",
					_invalid: {
						focusRingColor: "error",
						borderColor: "error",
					},
				},
			},
			surface: {
				input: {
					bg: "gray.surface.bg",
					borderWidth: "1px",
					borderColor: "gray.surface.border",
					focusVisibleRing: "inside",
					_invalid: {
						focusRingColor: "error",
						borderColor: "error",
					},
				},
			},
			subtle: {
				input: {
					borderWidth: "1px",
					borderColor: "transparent",
					bg: "gray.subtle.bg",
					color: "gray.subtle.fg",
					focusVisibleRing: "inside",
					_invalid: {
						focusRingColor: "error",
						borderColor: "error",
					},
				},
			},
			flushed: {
				input: {
					borderBottomWidth: "1px",
					borderBottomColor: "gray.outline.border",
					borderRadius: "0",
					color: "fg.default",
					px: "0",
					_invalid: {
						borderColor: "error",
					},
					_focus: {
						borderColor: "colorPalette.solid.bg",
						boxShadowColor: "colorPalette.solid.bg",
						boxShadow: "0 1px 0 0 var(--shadow-color)",
						_invalid: {
							borderColor: "error",
							boxShadowColor: "error",
						},
					},
				},
			},
		},
		size: {
			"2xs": {
				input: { textStyle: "xs", px: "1.5", "--input-height": "sizes.7" },
			},
			xs: {
				input: { textStyle: "sm", px: "2", "--input-height": "sizes.8" },
			},
			sm: {
				input: { textStyle: "sm", px: "2.5", "--input-height": "sizes.9" },
			},
			md: {
				input: { textStyle: "md", px: "3", "--input-height": "sizes.10" },
			},
			lg: {
				input: { textStyle: "md", px: "3.5", "--input-height": "sizes.11" },
			},
			xl: {
				input: { textStyle: "lg", px: "4", "--input-height": "sizes.12" },
			},
			"2xl": {
				input: { textStyle: "3xl", px: "4.5", "--input-height": "sizes.16" },
			},
		},
	},
});
