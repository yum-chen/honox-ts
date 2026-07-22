import { defineSlotRecipe } from "@pandacss/dev";
import { input } from "./input";

export const pinField = defineSlotRecipe({
	className: "pin-field",
	jsx: ["PinField"],
	slots: ["root", "label", "control", "input", "helperText", "errorText"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "1.5",
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
		control: {
			display: "inline-flex",
			gap: "2",
			isolation: "isolate",
		},
		input: {
			...input.base,
			textAlign: "center",
			width: "var(--input-height)",
			px: "1!",
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
	},
	defaultVariants: {
		size: "md",
		variant: "outline",
	},
	variants: {
		size: {
			xs: { input: input.variants?.size?.xs },
			sm: { input: input.variants?.size?.sm },
			md: { input: input.variants?.size?.md },
			lg: { input: input.variants?.size?.lg },
			xl: { input: input.variants?.size?.xl },
			"2xl": { input: input.variants?.size?.["2xl"] },
		},
		variant: {
			outline: { input: input.variants?.variant?.outline },
			subtle: { input: input.variants?.variant?.subtle },
			surface: { input: input.variants?.variant?.surface },
			flushed: { input: input.variants?.variant?.flushed },
		},
	},
});
