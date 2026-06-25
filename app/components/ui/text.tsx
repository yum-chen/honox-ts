import { cx } from "../../../styled-system/css";
import type { TextVariantProps } from "../../../styled-system/recipes";
import { text } from "../../../styled-system/recipes";

export interface TextProps extends TextVariantProps {
	as?: any;
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Text(props: TextProps) {
	const [variantProps, localProps] = text.splitVariantProps(props);
	const {
		as: Component = "p",
		children,
		class: classProp,
		...restProps
	} = localProps;

	return (
		<Component class={cx(text(variantProps), classProp)} {...restProps}>
			{children}
		</Component>
	);
}
