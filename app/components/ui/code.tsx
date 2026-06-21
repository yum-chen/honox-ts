import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type CodeVariantProps, code } from "../../../styled-system/recipes";

export type CodeProps = CodeVariantProps & JSX.IntrinsicElements["code"];

export const Code = (props: CodeProps) => {
	const [variantProps, localProps] = code.splitVariantProps(props);
	return (
		<code
			{...localProps}
			class={cx(code(variantProps), css(localProps as any), localProps.class)}
		/>
	);
};
