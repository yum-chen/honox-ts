import { defineSlotRecipe } from "@pandacss/dev";

export const alert = defineSlotRecipe({
	className: "alert",
	slots: ["root", "content", "description", "indicator", "title"],
	base: {
		root: {
			alignItems: "flex-start",
			borderRadius: "l3",
			display: "flex",
			position: "relative",
			width: "full",
		},
		content: {
			display: "flex",
			flex: "1",
			flexDirection: "column",
			gap: "1",
		},
		description: {
			display: "inline",
		},
		indicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
		},
		title: {
			fontWeight: "semibold",
		},
	},
	defaultVariants: {
		size: "md",
		status: "info",
		variant: "subtle",
	},
	variants: {
		status: {
			info: {
				root: { colorPalette: "cyan" },
			},
			warning: {
				root: { colorPalette: "orange" },
			},
			success: {
				root: { colorPalette: "green" },
			},
			error: {
				root: { colorPalette: "red" },
			},
			neutral: {
				root: { colorPalette: "gray" },
			},
		},
		variant: {
			subtle: {
				root: {
					bg: "colorPalette.subtle.bg",
					color: "colorPalette.subtle.fg",
					gap: "3",
					p: "4",
					textStyle: "sm",
				},
				indicator: {
					width: "5",
					height: "5",
					"& svg": {
						width: "5",
						height: "5",
					},
				},
			},
			solid: {
				root: {
					bg: "colorPalette.solid.bg",
					color: "colorPalette.solid.fg",
				},
			},
			surface: {
				root: {
					bg: "colorPalette.surface.bg",
					borderWidth: "1px",
					borderColor: "colorPalette.surface.border",
					color: "colorPalette.surface.fg",
				},
			},
			outline: {
				root: {
					borderWidth: "1px",
					borderStyle: "solid",
					borderColor: "colorPalette.outline.border",
					color: "colorPalette.outline.fg",
				},
			},
		},
		size: {
			sm: {
				root: {
					gap: "2",
					p: "3",
					textStyle: "xs",
				},
				indicator: {
					width: "4",
					height: "4",
					"& svg": {
						width: "4",
						height: "4",
					},
				},
			},
			md: {
				root: {
					gap: "3",
					p: "4",
					textStyle: "sm",
				},
				indicator: {
					width: "5",
					height: "5",
					"& svg": {
						width: "5",
						height: "5",
					},
				},
			},
			lg: {
				root: {
					gap: "4",
					p: "4",
					textStyle: "md",
				},
				indicator: {
					width: "6",
					height: "6",
					"& svg": {
						width: "6",
						height: "6",
					},
				},
			},
		},
	},
});
