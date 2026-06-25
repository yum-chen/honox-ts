import type { JSX } from "hono/jsx";
import { button, type ButtonVariantProps } from "@/../styled-system/recipes";
import { cx } from "@/lib/utils";

export type IconButtonProps = JSX.IntrinsicElements["button"] &
	ButtonVariantProps;

export const IconButton = (props: IconButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { class: className, ...rest } = localProps;

	return (
		<button
			class={cx(button(variantProps), className)}
			style={{ padding: 0, width: "auto", aspectRatio: "1/1" }}
			{...(rest as JSX.IntrinsicElements["button"])}
		/>
	);
};
