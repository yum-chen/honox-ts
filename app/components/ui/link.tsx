import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type LinkVariantProps, link } from "../../../styled-system/recipes";

export type LinkProps = LinkVariantProps & JSX.IntrinsicElements["a"];

export const Link = (props: LinkProps) => {
	const [variantProps, localProps] = link.splitVariantProps(props);
	return (
		<a
			{...localProps}
			class={cx(link(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
