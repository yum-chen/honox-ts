import type { Child } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { TextVariantProps } from "../../../styled-system/recipes";
import { text } from "../../../styled-system/recipes";

export interface SpanProps extends TextVariantProps {
	children?: Child;
	class?: string;
	[key: string]: unknown;
}

export function Span(props: SpanProps) {
	const [variantProps, localProps] = text.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;

	return (
		<span class={cx(text(variantProps), classProp)} {...restProps}>
			{children}
		</span>
	);
}
