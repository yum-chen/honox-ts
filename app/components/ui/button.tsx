import type { PropsWithChildren } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { ButtonVariantProps } from "../../../styled-system/recipes";
import { button } from "../../../styled-system/recipes";
import { Group, type GroupProps } from "./group";
import { Loader } from "./loader";

export interface ButtonLoadingProps {
	/**
	 * If `true`, the button will show a loading spinner.
	 * @default false
	 */
	loading?: boolean;
	/**
	 * The text to show while loading.
	 */
	loadingText?: any;
	/**
	 * The spinner to show while loading.
	 */
	spinner?: any;
	/**
	 * The placement of the spinner
	 * @default "start"
	 */
	spinnerPlacement?: "start" | "end";
}

export interface ButtonProps
	extends ButtonVariantProps,
		ButtonLoadingProps,
		PropsWithChildren<{
			class?: string;
			type?: "button" | "submit" | "reset";
			disabled?: boolean;
			[key: string]: unknown;
		}> {}

export function Button(props: ButtonProps) {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const {
		loading,
		loadingText,
		children,
		spinner,
		spinnerPlacement,
		class: classProp,
		type = "button",
		disabled,
		...rest
	} = localProps;

	return (
		<button
			type={type}
			class={cx(button(variantProps), classProp)}
			disabled={loading || disabled}
			data-loading={loading ? "" : undefined}
			{...(rest as any)}
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

export interface ButtonGroupProps extends GroupProps, ButtonVariantProps {}

export function ButtonGroup(props: ButtonGroupProps) {
	const [variantProps, localProps] = button.splitVariantProps(props);
	const { children, ...rest } = localProps;

	// In Hono JSX we don't have a clean way to provide context to children easily without Wrapper
	// For now, we'll just render the Group and users should apply variants to buttons if needed
	// or we could potentially clone children if we really wanted to, but that's complex in Hono
	return <Group {...(rest as any)}>{children}</Group>;
}
