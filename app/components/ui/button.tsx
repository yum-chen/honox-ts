import { button } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import type { HTMLProps } from "./types";

export type ButtonProps = HTMLProps<"button"> & ButtonVariantProps;

/**
 * Park UI `Button`, ported to Hono/JSX. Mirrors Park UI's API: `variant`
 * (`solid | outline | ghost | subtle | link`) and `size` (`xs | sm | md | lg |
 * xl | 2xl`), consuming the generated Park UI `button` recipe.
 */
export const Button = (props: ButtonProps) => {
	const [variantProps, rest] = button.splitVariantProps(props);
	const { class: className, type, children, ...htmlProps } = rest;
	return (
		<button
			type={type ?? "button"}
			class={cx(button(variantProps), className)}
			{...htmlProps}
		>
			{children}
		</button>
	);
};
