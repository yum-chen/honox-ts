import { defineSlotRecipe } from "@pandacss/dev";

export const checkbox = defineSlotRecipe({
	className: "checkbox",
	slots: ["root", "label", "control", "indicator", "group"],
	base: {
		root: {
			display: "inline-flex",
			alignItems: "center",
			gap: "3",
			position: "relative",
			verticalAlign: "middle",
			cursor: "pointer",
		},
		control: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: 0,
			borderRadius: "sm",
			borderWidth: "1px",
			borderColor: "border.default",
			bg: "bg.default",
			transitionDuration: "normal",
			transitionProperty: "border-color, background, box-shadow",
			width: "var(--checkbox-size)",
			height: "var(--checkbox-size)",
			_hover: {
				borderColor: "border.emphasized",
			},
			_checked: {
				bg: "colorPalette.solid.bg",
				borderColor: "colorPalette.solid.bg",
				color: "colorPalette.solid.fg",
				_hover: {
					bg: "colorPalette.solid.bg",
					borderColor: "colorPalette.solid.bg",
				},
			},
			_indeterminate: {
				bg: "colorPalette.solid.bg",
				borderColor: "colorPalette.solid.bg",
				color: "colorPalette.solid.fg",
			},
			_disabled: {
				opacity: 0.5,
				cursor: "not-allowed",
			},
			_invalid: {
				borderColor: "error",
			},
			_peerFocusVisible: {
				outline: "2px solid",
				outlineColor: "colorPalette.solid.bg",
				outlineOffset: "2px",
			},
		},
		label: {
			fontWeight: "medium",
			userSelect: "none",
			_disabled: {
				opacity: 0.5,
				cursor: "not-allowed",
			},
		},
		indicator: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			width: "full",
			height: "full",
			"& svg": {
				width: "100%",
				height: "100%",
			},
		},
		group: {
			display: "flex",
			flexDirection: "column",
			gap: "3",
		},
	},
	defaultVariants: {
		size: "md",
	},
	variants: {
		size: {
			sm: {
				root: {
					gap: "2",
					"--checkbox-size": "sizes.4",
				},
				label: { fontSize: "sm" },
			},
			md: {
				root: {
					gap: "3",
					"--checkbox-size": "sizes.5",
				},
				label: { fontSize: "md" },
			},
			lg: {
				root: {
					gap: "4",
					"--checkbox-size": "sizes.6",
				},
				label: { fontSize: "lg" },
			},
		},
	},
});
