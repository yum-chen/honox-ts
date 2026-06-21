import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type TextVariantProps, text } from "../../../styled-system/recipes";

type As =
	| "p"
	| "span"
	| "div"
	| "label"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6";

export type TextProps = TextVariantProps &
	JSX.IntrinsicElements["p"] & {
		as?: As;
	};

export const Text = (props: TextProps) => {
	const { as: Component = "p", ...rest } = props;
	const [variantProps, localProps] = text.splitVariantProps(rest);
	return (
		<Component
			{...localProps}
			class={cx(text(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
