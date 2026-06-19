import { text } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { TextVariantProps } from "../../../styled-system/recipes";
import type { PropsWithChildren } from "hono/jsx";

export type HeadingProps = PropsWithChildren<
	TextVariantProps & {
		as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
		class?: string;
	}
>;

export const Heading = (props: HeadingProps) => {
	const { as: Component = "h2", class: className, ...otherProps } = props;
	const [variantProps, localProps] = text.splitVariantProps(otherProps);

	return (
		<Component
			class={cx(text({ variant: "heading", ...variantProps }), className)}
			{...localProps}
		/>
	);
};
