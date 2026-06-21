import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import {
	type ButtonVariantProps,
	button,
} from "../../../styled-system/recipes";

type ButtonProps = ButtonVariantProps & JSX.IntrinsicElements["button"];

export const Button = (props: ButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	return (
		<button
			{...localProps}
			class={cx(button(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
