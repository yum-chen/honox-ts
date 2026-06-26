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
			textStyle: "sm",
			fontWeight: "medium",
			_disabled: {
				layerStyle: "disabled",
			},
		},
		requiredIndicator: {
			color: "error",
		},
		helperText: {
			color: "fg.muted",
			textStyle: "xs",
			_disabled: {
				layerStyle: "disabled",
			},
		},
		errorText: {
			color: "error",
			textStyle: "xs",
		},
	},
});
