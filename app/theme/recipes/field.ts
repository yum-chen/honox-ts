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
			textStyle: "xs",
		},
		helperText: {
			color: "fg.muted",
			textStyle: "xs",
		},
		label: {
			color: "fg.default",
			fontWeight: "medium",
			textStyle: "sm",
		},
		requiredIndicator: {
			color: "error",
		},
	},
});
