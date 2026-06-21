import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type BadgeVariantProps, badge } from "../../../styled-system/recipes";

export type BadgeProps = BadgeVariantProps & JSX.IntrinsicElements["span"];

export const Badge = (props: BadgeProps) => {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	return (
		<span
			{...localProps}
			class={cx(badge(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
