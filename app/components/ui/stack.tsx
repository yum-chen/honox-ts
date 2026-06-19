import { stack } from "../../../styled-system/patterns";
import { cx } from "../../../styled-system/css";
import type { StackProperties } from "../../../styled-system/patterns";
import type { PropsWithChildren } from "hono/jsx";

export type StackProps = PropsWithChildren<
	StackProperties & {
		class?: string;
	}
>;

export const Stack = (props: StackProps) => {
	const { children, class: className, ...otherProps } = props;
	return (
		<div class={cx(stack(otherProps), className)}>{children}</div>
	);
};
