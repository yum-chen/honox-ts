import { badge } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { BadgeVariantProps } from "../../../styled-system/recipes";
import type { HTMLProps } from "./types";

export type BadgeProps = HTMLProps<"span"> & BadgeVariantProps;

/**
 * Park UI `Badge`, ported to Hono/JSX. Consumes Park UI's `badge` recipe,
 * mirroring its `variant` (`solid`/`subtle`/`outline`) and `size`
 * (`sm`/`md`/`lg`) API.
 */
export const Badge = (props: BadgeProps) => {
	const [variantProps, rest] = badge.splitVariantProps(props);
	const { class: className, children, ...htmlProps } = rest;
	return (
		<span class={cx(badge(variantProps), className)} {...htmlProps}>
			{children}
		</span>
	);
};
