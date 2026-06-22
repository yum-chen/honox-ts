import type { ComponentProps } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import { text } from "../../../styled-system/recipes";

type HeadingVariantProps = Parameters<typeof text>[0];

export type HeadingProps = ComponentProps<"h1"> &
	HeadingVariantProps & {
		as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	};

export const Heading = (props: HeadingProps) => {
	const { as: Component = "h2", ...rest } = props;
	const [variantProps, localProps] = text.splitVariantProps({
		variant: "heading",
		...rest,
	});
	const { class: className, ...others } = localProps;
	return <Component class={cx(text(variantProps), className)} {...others} />;
};
