import { badge } from "styled-system/recipes";
import type { BadgeVariantProps } from "styled-system/recipes";

export interface BadgeProps extends BadgeVariantProps {
	children?: any;
	class?: string;
	colorPalette?:
		| "blue"
		| "green"
		| "red"
		| "purple"
		| "orange"
		| "cyan"
		| "yellow"
		| "pink"
		| "teal"
		| "indigo"
		| "gray";
}

// Map variant to the semantic token suffix
const variantTokenMap = {
	solid: {
		bg: "solid-bg",
		fg: "solid-fg",
		border: null,
	},
	subtle: {
		bg: "subtle-bg",
		fg: "subtle-fg",
		border: "subtle-border",
	},
	outline: {
		bg: null,
		fg: "outline-fg",
		border: "outline-border",
	},
	surface: {
		bg: "surface-bg",
		fg: "surface-fg",
		border: "surface-border",
	},
} as const;

export function Badge(props: BadgeProps) {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const className = badge(variantProps);

	// Get variant from variantProps (extracted by splitVariantProps)
	// Get colorPalette from localProps (NOT extracted since it's not in recipe variants)
	const {
		children,
		class: classProp,
		colorPalette = "gray",
		...restLocalProps
	} = localProps;
	const { variant = "subtle" } = variantProps;

	// Set CSS custom properties for colorPalette
	// Park UI preset defines semantic tokens as: --colors-{palette}-{token}
	// Example: --colors-blue-solid-bg → var(--colors-blue-9)
	const tokens =
		variantTokenMap[variant as keyof typeof variantTokenMap] ||
		variantTokenMap.subtle;

	const style = { ...(restLocalProps.style || {}) } as Record<string, any>;

	// Set CSS variables that the recipe CSS references
	// The recipe uses: background: var(--badge-bg)
	// We set: --badge-bg → var(--colors-{palette}-{token})
	if (tokens.bg) {
		style["--badge-bg"] = `var(--colors-${colorPalette}-${tokens.bg})`;
	}
	if (tokens.fg) {
		style["--badge-fg"] = `var(--colors-${colorPalette}-${tokens.fg})`;
	}
	if (tokens.border) {
		style["--badge-border"] = `var(--colors-${colorPalette}-${tokens.border})`;
	}

	// Remove style from restProps to avoid duplication
	const { style: _, ...cleanProps } = restLocalProps;

	return (
		<div
			class={`${className} ${classProp || ""}`.trim()}
			style={style}
			{...cleanProps}
		>
			{children}
		</div>
	);
}
