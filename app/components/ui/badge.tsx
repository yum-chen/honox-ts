import type { ComponentProps } from "hono/jsx";
import { badge } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

type BadgeVariantProps = Parameters<typeof badge>[0];

export type BadgeProps = ComponentProps<"span"> & BadgeVariantProps;

export const Badge = (props: BadgeProps) => {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const { class: className, ...rest } = localProps;
	return <span class={cx(badge(variantProps), className)} {...rest} />;
};
