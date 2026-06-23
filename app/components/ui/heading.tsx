import type { HTMLAttributes } from "hono/jsx";
import { type TextVariantProps, text } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

export interface HeadingProps extends HTMLAttributes, TextVariantProps {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = (props: HeadingProps) => {
	const { as: Component = "h2", ...rest } = props;
	const [variantProps, localProps] = text.splitVariantProps(rest);
	const styles = text({ variant: "heading", ...variantProps });

	return (
		<Component
			{...localProps}
			class={cx(styles, localProps.class)}
		/>
	);
};
