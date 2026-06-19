import { button } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import type { PropsWithChildren } from "hono/jsx";

export type ButtonProps = PropsWithChildren<
	ButtonVariantProps & {
		class?: string;
		type?: "button" | "submit" | "reset";
		onClick?: any;
		id?: string;
	}
>;

export const Button = (props: ButtonProps) => {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { class: className, ...otherProps } = localProps;

	return (
		<button
			class={cx(button(variantProps), className)}
			{...otherProps}
		/>
	);
};
