import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type InputVariantProps, input } from "../../../styled-system/recipes";

export type InputProps = InputVariantProps & JSX.IntrinsicElements["input"];

export const Input = (props: InputProps) => {
	const [variantProps, localProps] = input.splitVariantProps(props);
	return (
		<input
			{...localProps}
			class={cx(input(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
