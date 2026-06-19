import { text } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { TextVariantProps } from "../../../styled-system/recipes";
import type { PropsWithChildren } from "hono/jsx";

export type TextProps = PropsWithChildren<
	TextVariantProps & {
		as?: "p" | "span" | "div" | "label";
		class?: string;
	}
>;

export const Text = (props: TextProps) => {
	const { as: Component = "p", class: className, ...otherProps } = props;
	const [variantProps, localProps] = text.splitVariantProps(otherProps);

	return (
		<Component
			class={cx(text(variantProps), className)}
			{...localProps}
		/>
	);
};
