import type { JSX } from "hono/jsx";
import { type ButtonVariantProps, button } from "@/../styled-system/recipes";
import { cx } from "@/lib/utils";

export type ButtonProps = JSX.IntrinsicElements["button"] & ButtonVariantProps;

export const Button = (props: ButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { class: className, ...rest } = localProps;

	return (
		<button
			class={cx(button(variantProps), className)}
			{...(rest as JSX.IntrinsicElements["button"])}
		/>
	);
};
