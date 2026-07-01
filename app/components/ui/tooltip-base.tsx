import {
	type Child,
	createContext,
	type PropsWithChildren,
	useContext,
	useId,
} from "hono/jsx";
import { cx } from "../../../styled-system/css";
import { tooltip } from "../../../styled-system/recipes";

type TooltipStyles = ReturnType<typeof tooltip>;

interface TooltipContextValue {
	id: string;
	open: boolean;
	styles: TooltipStyles;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
	const context = useContext(TooltipContext);
	if (!context) {
		throw new Error(
			"Tooltip components must be wrapped in <TooltipRoot /> or <Tooltip />",
		);
	}
	return context;
};

export interface TooltipRootProps extends PropsWithChildren {
	id?: string;
	open?: boolean;
	disabled?: boolean;
	interactive?: boolean;
}

export function TooltipRoot(props: TooltipRootProps) {
	const { id: idProp, open = false, children } = props;
	const autoId = useId();
	const id = idProp || autoId;
	const styles = tooltip();

	return (
		<TooltipContext.Provider value={{ id, open, styles }}>
			{children}
		</TooltipContext.Provider>
	);
}

export interface TooltipTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	[key: string]: unknown;
}

export function TooltipTrigger(props: TooltipTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const { id, open, styles } = useTooltipContext();

	const triggerProps = {
		id: `tooltip-trigger-${id}`,
		"aria-describedby": open ? `tooltip-content-${id}` : undefined,
		class: cx(styles.trigger, classProp),
		"data-state": open ? "open" : "closed",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return {
			...child,
			props: {
				...child.props,
				...triggerProps,
			},
		};
	}

	return (
		<div style={{ display: "inline-block" }} {...triggerProps}>
			{children}
		</div>
	);
}

export interface TooltipPositionerProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

export function TooltipPositioner(props: TooltipPositionerProps) {
	const { children, class: classProp, ...restProps } = props;
	const { open, styles } = useTooltipContext();

	if (!open) return null;

	return (
		<div
			class={cx(styles.positioner, classProp)}
			data-state={open ? "open" : "closed"}
			style={{
				position: "absolute",
				bottom: "100%",
				left: "50%",
				transform: "translateX(-50%) translateY(-8px)",
				width: "max-content",
				pointerEvents: "none",
				zIndex: 1000,
			}}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface TooltipContentProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

export function TooltipContent(props: TooltipContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const { id, open, styles } = useTooltipContext();

	return (
		<div
			id={`tooltip-content-${id}`}
			role="tooltip"
			class={cx(styles.content, classProp)}
			data-state={open ? "open" : "closed"}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function TooltipArrow(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = useTooltipContext();
	return (
		<div class={cx(styles.arrow, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function TooltipArrowTip(props: { class?: string }) {
	const { class: classProp, ...restProps } = props;
	const { styles } = useTooltipContext();
	return <div class={cx(styles.arrowTip, classProp)} {...restProps} />;
}

export interface TooltipBaseProps extends TooltipRootProps {
	content?: Child;
	showArrow?: boolean;
	triggerProps?: TooltipTriggerProps;
	contentProps?: TooltipContentProps;
	asChild?: boolean;
}

export function TooltipBase(props: TooltipBaseProps) {
	const {
		children,
		content,
		showArrow,
		triggerProps,
		contentProps,
		asChild,
		...rootProps
	} = props;

	if (rootProps.disabled) return children;

	const positionerStyle: any = {};
	if (rootProps.interactive) {
		positionerStyle.pointerEvents = "auto";
	}

	return (
		<TooltipRoot {...rootProps}>
			<TooltipTrigger asChild={asChild} {...triggerProps}>
				{children}
			</TooltipTrigger>
			<TooltipPositioner style={positionerStyle}>
				<TooltipContent {...contentProps}>
					{showArrow && (
						<TooltipArrow>
							<TooltipArrowTip />
						</TooltipArrow>
					)}
					{content}
				</TooltipContent>
			</TooltipPositioner>
		</TooltipRoot>
	);
}
