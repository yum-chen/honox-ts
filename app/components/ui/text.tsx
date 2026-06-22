import type { ComponentProps } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import { text } from "../../../styled-system/recipes";

type TextVariantProps = Parameters<typeof text>[0];

export type TextProps = ComponentProps<"p"> &
	TextVariantProps & {
		as?: "p" | "span" | "div" | "label";
	};

export const Text = (props: TextProps) => {
	const { as: Component = "p", ...rest } = props;
	const [variantProps, localProps] = text.splitVariantProps(rest);
	const { class: className, ...others } = localProps;
	return <Component class={cx(text(variantProps), className)} {...others} />;
};
