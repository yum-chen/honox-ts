import { button } from "../../../styled-system/recipes";
import { css, cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import type { HTMLProps } from "./types";

export type IconButtonProps = HTMLProps<"button"> & ButtonVariantProps;

/**
 * Park UI `IconButton`, ported to Hono/JSX. Shares the Park UI `button` recipe
 * with {@link Button} but renders square (no horizontal padding) so the size
 * scale produces icon-only buttons whose width matches their height.
 */
export const IconButton = (props: IconButtonProps) => {
	const [variantProps, rest] = button.splitVariantProps(props);
	const { class: className, type, children, ...htmlProps } = rest;
	return (
		<button
			type={type ?? "button"}
			class={cx(button(variantProps), css({ px: "0" }), className)}
			{...htmlProps}
		>
			{children}
		</button>
	);
};
