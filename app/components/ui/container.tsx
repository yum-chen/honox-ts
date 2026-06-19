import { container } from "../../../styled-system/patterns";
import { cx } from "../../../styled-system/css";
import type { ContainerProperties } from "../../../styled-system/patterns";
import type { PropsWithChildren } from "hono/jsx";

export type ContainerProps = PropsWithChildren<
	ContainerProperties & {
		class?: string;
	}
>;

export const Container = (props: ContainerProps) => {
	const { children, class: className, ...otherProps } = props;
	return (
		<div class={cx(container(otherProps), className)}>{children}</div>
	);
};
