import type { JSX, PropsWithChildren } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { SpinnerVariantProps } from "../../../styled-system/recipes";
import { spinner } from "../../../styled-system/recipes";

export interface SpinnerProps
	extends SpinnerVariantProps,
		PropsWithChildren<{
			class?: string;
			label?: string;
		}> {}

export function Spinner(props: SpinnerProps) {
	const [variantProps, localProps] = spinner.splitVariantProps(props);
	const { children, class: classProp, label, ...restProps } = localProps;

	return (
		<span
			class={cx(spinner(variantProps), classProp)}
			{...(restProps as JSX.IntrinsicElements["span"])}
		>
			{label && <span class="sr-only">{label}</span>}
			{children}
		</span>
	);
}
