import type { Child } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import type { BadgeVariantProps } from "../../../styled-system/recipes";
import { badge } from "../../../styled-system/recipes";

export interface BadgeProps extends BadgeVariantProps {
	children?: Child;
	class?: string;
	interactive?: boolean;
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

export function Badge(props: BadgeProps) {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const { children, class: classProp, colorPalette, ...restProps } = localProps;

	return (
		<div
			class={cx(
				badge(variantProps),
				css({ colorPalette: colorPalette || "gray" }),
				classProp,
			)}
			{...restProps}
		>
			{children}
		</div>
	);
}
