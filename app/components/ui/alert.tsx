import { cx } from "../../../styled-system/css";
import type { AlertVariantProps } from "../../../styled-system/recipes";
import { alert } from "../../../styled-system/recipes";

export interface AlertProps extends AlertVariantProps {
	children?: any;
	class?: string;
	interactive?: boolean;
	[key: string]: any;
}

export function Alert(props: AlertProps) {
	const [variantProps, localProps] = alert.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = alert(variantProps);

	return (
		<div role="alert" class={cx(styles.root, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function AlertTitle(props: { children?: any; class?: string }) {
	const styles = alert();
	return <h3 class={cx(styles.title, props.class)}>{props.children}</h3>;
}

export function AlertDescription(props: { children?: any; class?: string }) {
	const styles = alert();
	return (
		<div class={cx(styles.description, props.class)}>{props.children}</div>
	);
}

export function AlertContent(props: { children?: any; class?: string }) {
	const styles = alert();
	return <div class={cx(styles.content, props.class)}>{props.children}</div>;
}

export function AlertIndicator(props: { children?: any; class?: string }) {
	const styles = alert();
	return (
		<span class={cx(styles.indicator, props.class)}>
			{props.children || (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<title>Info</title>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12.01" y2="8" />
				</svg>
			)}
		</span>
	);
}
