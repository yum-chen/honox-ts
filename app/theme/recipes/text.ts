import { defineRecipe } from "@pandacss/dev";

export const text = defineRecipe({
	className: "text",
	base: {
		color: "fg.default",
	},
	variants: {
		variant: {
			heading: {
				fontWeight: "bold",
			},
			label: {
				fontWeight: "medium",
				textStyle: "sm",
			},
		},
		size: {
			xs: { fontSize: "xs" },
			sm: { fontSize: "sm" },
			md: { fontSize: "md" },
			lg: { fontSize: "lg" },
			xl: { fontSize: "xl" },
			"2xl": { fontSize: "2xl" },
			"3xl": { fontSize: "3xl" },
			"4xl": { fontSize: "4xl" },
			"5xl": { fontSize: "5xl" },
			"6xl": { fontSize: "6xl" },
			"7xl": { fontSize: "7xl" },
		},
	},
});
