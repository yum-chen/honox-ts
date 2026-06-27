import type { PropsWithChildren } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { AbsoluteCenter } from "./absolute-center";
import { Span } from "./span";
import { Spinner } from "./spinner";

export interface LoaderProps extends PropsWithChildren<{ class?: string }> {
	/**
	 * Whether the loader is visible
	 * @default true
	 */
	visible?: boolean;
	/**
	 * The spinner to display when loading
	 */
	spinner?: any;
	/**
	 * The placement of the spinner
	 * @default "start"
	 */
	spinnerPlacement?: "start" | "end";
	/**
	 * The text to display when loading
	 */
	text?: any;
}

export function Loader(props: LoaderProps) {
	const {
		spinner = <Spinner size="inherit" color="inherit" />,
		spinnerPlacement = "start",
		children,
		text,
		visible = true,
		class: classProp,
		...rest
	} = props;

	if (!visible) return <>{children}</>;

	if (text) {
		return (
			<Span class={cx(css({ display: "contents" }), classProp)} {...rest}>
				{spinnerPlacement === "start" && spinner}
				{text}
				{spinnerPlacement === "end" && spinner}
			</Span>
		);
	}

	if (spinner) {
		return (
			<Span class={cx(css({ display: "contents" }), classProp)} {...rest}>
				<AbsoluteCenter class={css({ display: "inline-flex" })}>
					{spinner}
				</AbsoluteCenter>
				<Span class={css({ visibility: "hidden", display: "contents" })}>
					{children}
				</Span>
			</Span>
		);
	}

	return (
		<Span class={cx(css({ display: "contents" }), classProp)} {...rest}>
			{children}
		</Span>
	);
}
