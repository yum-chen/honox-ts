import type { Child } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { AlertVariantProps } from "../../../styled-system/recipes";
import { alert } from "../../../styled-system/recipes";

const AlertContext = createContext<ReturnType<typeof alert> | null>(null);

const useAlertContext = () => {
	const context = useContext(AlertContext);
	if (!context) {
		return alert();
	}
	return context;
};

export interface AlertProps extends AlertVariantProps {
	children?: Child;
	class?: string;
	interactive?: boolean;
	[key: string]: unknown;
}

export function AlertRoot(props: AlertProps) {
	const [variantProps, localProps] = alert.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = alert(variantProps);

	return (
		<AlertContext.Provider value={styles}>
			<div role="alert" class={cx(styles.root, classProp)} {...restProps}>
				{children}
			</div>
		</AlertContext.Provider>
	);
}

export function AlertTitle(props: { children?: Child; class?: string }) {
	const styles = useAlertContext();
	return <h3 class={cx(styles.title, props.class)}>{props.children}</h3>;
}

export function AlertDescription(props: { children?: Child; class?: string }) {
	const styles = useAlertContext();
	return (
		<div class={cx(styles.description, props.class)}>{props.children}</div>
	);
}

export function AlertContent(props: { children?: Child; class?: string }) {
	const styles = useAlertContext();
	return <div class={cx(styles.content, props.class)}>{props.children}</div>;
}

export function AlertIndicator(props: { children?: Child; class?: string }) {
	const styles = useAlertContext();
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

export function Alert(props: AlertProps) {
	const { interactive, ...rest } = props;
	// Currently no AlertIsland, but following the structure
	return <AlertRoot {...rest} />;
}
