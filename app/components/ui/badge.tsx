import { cx } from "design-system/css";
import type { BadgeVariantProps } from "design-system/recipes";
import { badge } from "design-system/recipes";
import type { PropsWithChildren } from "hono/jsx";

export interface BadgeProps
	extends BadgeVariantProps,
		PropsWithChildren<{
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
				| "gray"
				| "success"
				| "error"
				| "warning";
		}> {}

export function Badge(props: BadgeProps) {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;

	return (
		<div class={cx(badge(variantProps), classProp)} {...restProps}>
			{children}
		</div>
	);
}
