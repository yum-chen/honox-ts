import { cx } from "design-system/css";
import type { ToastVariantProps } from "design-system/recipes";
import { toast as toastRecipe } from "design-system/recipes";
import type { PropsWithChildren } from "hono/jsx";
import { cloneElement, createContext, useContext } from "hono/jsx";
import { Spinner } from "./spinner";

type ToastStyles = ReturnType<typeof toastRecipe>;

interface ToastContextValue {
	styles?: ToastStyles;
	toast?: {
		id: string;
		title?: string;
		description?: string;
		type?: "info" | "success" | "warning" | "error" | "loading";
		duration?: number;
		closable?: boolean;
		action?: {
			label: string;
			onClick: () => void;
		};
	};
	dismiss?: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToastContext = () => {
	const context = useContext(ToastContext);
	return context;
};

export interface RootProps extends ToastVariantProps, PropsWithChildren {
	class?: string;
	type?: string;
	toast?: ToastContextValue["toast"];
	dismiss?: ToastContextValue["dismiss"];
	[key: string]: unknown;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = toastRecipe.splitVariantProps(props);
	const {
		children,
		class: classProp,
		type,
		toast,
		dismiss,
		...rest
	} = localProps;
	const styles = toastRecipe(variantProps);

	const resolvedType = (type as string) || toast?.type || "info";

	return (
		<ToastContext.Provider value={{ styles, toast, dismiss }}>
			<div
				data-scope="toast"
				data-part="root"
				data-type={resolvedType}
				data-state="open"
				class={cx(styles.root, classProp)}
				{...rest}
			>
				{children}
			</div>
		</ToastContext.Provider>
	);
}

export interface TitleProps extends PropsWithChildren {
	class?: string;
}

export function Title(props: TitleProps) {
	const { children, class: classProp, ...rest } = props;
	const context = useToastContext();
	const styles = context?.styles || toastRecipe();
	const content = children ?? context?.toast?.title;

	return (
		<div
			data-scope="toast"
			data-part="title"
			class={cx(styles.title, classProp)}
			{...rest}
		>
			{content}
		</div>
	);
}

export interface DescriptionProps extends PropsWithChildren {
	class?: string;
}

export function Description(props: DescriptionProps) {
	const { children, class: classProp, ...rest } = props;
	const context = useToastContext();
	const styles = context?.styles || toastRecipe();
	const content = children ?? context?.toast?.description;

	return (
		<div
			data-scope="toast"
			data-part="description"
			class={cx(styles.description, classProp)}
			{...rest}
		>
			{content}
		</div>
	);
}

export interface ActionTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	onClick?: (e: unknown) => void;
}

export function ActionTrigger(props: ActionTriggerProps) {
	const { children, class: classProp, asChild, onClick, ...rest } = props;
	const context = useToastContext();
	const styles = context?.styles || toastRecipe();

	const content = children ?? context?.toast?.action?.label;

	const triggerProps = {
		"data-scope": "toast",
		"data-part": "action-trigger",
		class: cx(styles.actionTrigger, classProp),
		onClick: (e: unknown) => {
			if (onClick) onClick(e);
			if (context?.toast?.action?.onClick) {
				context.toast.action.onClick();
			}
			if (context?.toast?.id && context.dismiss) {
				context.dismiss(context.toast.id);
			}
		},
		...rest,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as Record<string, unknown>;
		const childProps = (child.props as Record<string, unknown>) || {};
		return cloneElement(child as Parameters<typeof cloneElement>[0], {
			...triggerProps,
			class: cx(triggerProps.class, childProps.class as string),
		});
	}

	return (
		<button type="button" {...triggerProps}>
			{content}
		</button>
	);
}

export interface CloseTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	onClick?: (e: unknown) => void;
}

export function CloseTrigger(props: CloseTriggerProps) {
	const { children, class: classProp, asChild, onClick, ...rest } = props;
	const context = useToastContext();
	const styles = context?.styles || toastRecipe();

	const triggerProps = {
		"data-scope": "toast",
		"data-part": "close-trigger",
		class: cx(styles.closeTrigger, classProp),
		onClick: (e: unknown) => {
			if (onClick) onClick(e);
			if (context?.toast?.id && context.dismiss) {
				context.dismiss(context.toast.id);
			}
		},
		...rest,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as Record<string, unknown>;
		const childProps = (child.props as Record<string, unknown>) || {};
		return cloneElement(child as Parameters<typeof cloneElement>[0], {
			...triggerProps,
			class: cx(triggerProps.class, childProps.class as string),
		});
	}

	return (
		<button type="button" aria-label="Close" {...triggerProps}>
			{children}
		</button>
	);
}

export interface IndicatorProps extends PropsWithChildren {
	class?: string;
}

export function Indicator(props: IndicatorProps) {
	const { children, class: classProp, ...rest } = props;
	const context = useToastContext();
	const styles = context?.styles || toastRecipe();
	const type = context?.toast?.type || "info";

	let iconContent = children;
	if (!iconContent) {
		if (type === "loading") {
			iconContent = <Spinner size="sm" />;
		} else if (type === "success") {
			iconContent = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Success</title>
					<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
					<polyline points="22 4 12 14.01 9 11.01" />
				</svg>
			);
		} else if (type === "error") {
			iconContent = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Error</title>
					<circle cx="12" cy="12" r="10" />
					<line x1="15" y1="9" x2="9" y2="15" />
					<line x1="9" y1="9" x2="15" y2="15" />
				</svg>
			);
		} else if (type === "warning") {
			iconContent = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Warning</title>
					<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
					<line x1="12" y1="9" x2="12" y2="13" />
					<line x1="12" y1="17" x2="12.01" y2="17" />
				</svg>
			);
		} else {
			// info
			iconContent = (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="18"
					height="18"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Info</title>
					<circle cx="12" cy="12" r="10" />
					<line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12.01" y2="8" />
				</svg>
			);
		}
	}

	return (
		<div
			data-scope="toast"
			data-part="indicator"
			data-type={type}
			class={cx(styles.indicator, classProp)}
			{...rest}
		>
			{iconContent}
		</div>
	);
}

export const Context = (props: {
	children: (context: ToastContextValue | null) => unknown;
}) => {
	const context = useToastContext();
	return props.children(context);
};
