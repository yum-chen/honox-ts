import { cx } from "../../../styled-system/css";
import type { TextareaVariantProps } from "../../../styled-system/recipes";
import { textarea } from "../../../styled-system/recipes";

export interface TextareaProps extends TextareaVariantProps {
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Textarea(props: TextareaProps) {
	const [variantProps, localProps] = textarea.splitVariantProps(props);
	const { class: classProp, ...restProps } = localProps;
	const styles = textarea(variantProps);

	return <textarea class={cx(styles, classProp)} {...(restProps as any)} />;
}
