import type { HTMLAttributes } from "hono/jsx";
import { type ButtonVariantProps, button } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

export interface ButtonProps
	extends HTMLAttributes,
		ButtonVariantProps {}

export const Button = (props: ButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const styles = button(variantProps);

	return (
		<button
			{...localProps}
			class={cx(styles, localProps.class)}
		/>
	);
};
