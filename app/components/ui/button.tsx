import type { JSX, PropsWithChildren } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import { button } from "../../../styled-system/recipes";
import { Spinner } from "./spinner";

export interface ButtonProps
	extends ButtonVariantProps,
		PropsWithChildren<{
			class?: string;
			loading?: boolean;
			loadingText?: string;
			type?: "button" | "submit" | "reset";
			colorPalette?:
				| "blue"
				| "green"
				| "red"
				| "purple"
				| "orange"
				| "cyan"
				| "yellow"
				| "pink"
				| "teal"
				| "indigo"
				| "gray";
		}> {}

export function Button(props: ButtonProps) {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const {
		children,
		class: classProp,
		loading,
		loadingText,
		type = "button",
		colorPalette,
		...restProps
	} = localProps;

	return (
		<button
			type={type}
			class={cx(
				button(variantProps),
				css({ colorPalette: colorPalette || "gray" }),
				classProp,
			)}
			disabled={loading || restProps.disabled}
			data-loading={loading ? "" : undefined}
			{...(restProps as JSX.IntrinsicElements["button"])}
		>
			{loading ? (
				<>
					<Spinner size="inherit" />
					{loadingText || children}
				</>
			) : (
				children
			)}
		</button>
	);
}
