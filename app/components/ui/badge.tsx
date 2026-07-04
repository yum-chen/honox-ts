import type { PropsWithChildren } from "hono/jsx";
import { cx } from "styled-system/css";
import type { BadgeVariantProps } from "styled-system/recipes";
import { badge } from "styled-system/recipes";

export interface BadgeProps
	extends BadgeVariantProps,
		PropsWithChildren<{
			class?: string;
			interactive?: boolean;
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
