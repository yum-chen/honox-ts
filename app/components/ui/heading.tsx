import { cx } from "../../../styled-system/css";
import type { HeadingVariantProps } from "../../../styled-system/recipes";
import { heading } from "../../../styled-system/recipes";

export interface HeadingProps extends HeadingVariantProps {
	as?: any;
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Heading(props: HeadingProps) {
	const [variantProps, localProps] = heading.splitVariantProps(props);
	const {
		as: Component = "h2",
		children,
		class: classProp,
		...restProps
	} = localProps;

	return (
		<Component class={cx(heading(variantProps), classProp)} {...restProps}>
			{children}
		</Component>
	);
}
