import type { HTMLAttributes } from "hono/jsx";
import { type TextVariantProps, text } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

export interface TextProps extends HTMLAttributes, TextVariantProps {
	as?: "p" | "span" | "div" | "label";
}

export const Text = (props: TextProps) => {
	const { as: Component = "p", ...rest } = props;
	const [variantProps, localProps] = text.splitVariantProps(rest);
	const styles = text(variantProps);

	return (
		<Component
			{...localProps}
			class={cx(styles, localProps.class)}
		/>
	);
};
