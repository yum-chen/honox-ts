import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import { button } from "../../../styled-system/recipes";
import { Group, type GroupProps } from "./group";
import { Loader } from "./loader";

const ButtonContext = createContext<
	ButtonVariantProps & { colorPalette?: string }
>({});

export interface ButtonLoadingProps {
	loading?: boolean;
	loadingText?: Child;
	spinner?: Child;
	spinnerPlacement?: "start" | "end";
}

export interface ButtonProps
	extends ButtonVariantProps,
		ButtonLoadingProps,
		PropsWithChildren<{
			class?: string;
			type?: "button" | "submit" | "reset";
			disabled?: boolean;
			interactive?: boolean;
			colorPalette?: string;
			[key: string]: unknown;
		}> {}

export function Button(props: ButtonProps) {
	const groupVariantProps = useContext(ButtonContext);
	const mergedProps = { ...groupVariantProps, ...props };
	const [variantProps, localProps] = button.splitVariantProps(mergedProps);
	const {
		loading,
		loadingText,
		children,
		spinner,
		spinnerPlacement,
		class: classProp,
		type = "button",
		disabled,
		colorPalette,
		interactive,
		...rest
	} = localProps;

	return (
		<button
			type={type}
			class={cx(
				button(variantProps),
				css({
					colorPalette: colorPalette || mergedProps.colorPalette || "gray",
				}),
				classProp,
			)}
			disabled={loading || disabled}
			aria-busy={loading}
			aria-disabled={loading || disabled}
			data-loading={loading ? "" : undefined}
			{...(rest as Record<string, unknown>)}
		>
			{loading ? (
				<Loader
					spinner={spinner}
					text={loadingText}
					spinnerPlacement={spinnerPlacement}
				>
					{children}
				</Loader>
			) : (
				children
			)}
		</button>
	);
}

export interface ButtonGroupProps extends GroupProps, ButtonVariantProps {
	colorPalette?: string;
}

export function ButtonGroup(props: ButtonGroupProps) {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { children, colorPalette, ...rest } = localProps;

	return (
		<ButtonContext.Provider value={{ ...variantProps, colorPalette }}>
			<Group {...(rest as Record<string, unknown>)}>{children}</Group>
		</ButtonContext.Provider>
	);
}
