import type { JSX } from "hono/jsx";
import { type BadgeVariantProps, badge } from "@/../styled-system/recipes";
import { cx } from "@/lib/utils";

export type BadgeProps = JSX.IntrinsicElements["span"] & BadgeVariantProps;

export const Badge = (props: BadgeProps) => {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const { class: className, ...rest } = localProps;

	return (
		<span
			class={cx(badge(variantProps), className)}
			{...(rest as JSX.IntrinsicElements["span"])}
		/>
	);
};
