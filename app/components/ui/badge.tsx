import type { BadgeVariantProps } from "styled-system/recipes";
import { badge } from "styled-system/recipes";

export interface BadgeProps extends BadgeVariantProps {
	children?: any;
	class?: string;
}

export function Badge(props: BadgeProps) {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const className = badge(variantProps);

	const { children, class: classProp, ...restProps } = localProps

	return (
		<div class={`${className} ${classProp || ""}`.trim()} {...restProps}>
			{children}
		</div>
	);
}
