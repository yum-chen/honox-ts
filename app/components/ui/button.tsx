import type { ComponentProps } from "hono/jsx";
import { button } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

type ButtonVariantProps = Parameters<typeof button>[0];

export type ButtonProps = ComponentProps<"button"> & ButtonVariantProps;

export const Button = (props: ButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { class: className, ...rest } = localProps;
	return <button class={cx(button(variantProps), className)} {...rest} />;
};
