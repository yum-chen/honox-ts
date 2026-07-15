import { cx } from "design-system/css";
import { tooltip } from "design-system/recipes";
import {
	type Child,
	cloneElement,
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";

type TooltipStyles = ReturnType<typeof tooltip>;
type TooltipPlacement = "top" | "bottom" | "left" | "right";

function getTooltipPlacementStyle(placement: TooltipPlacement) {
	switch (placement) {
		case "bottom":
			return {
				top: "100%",
				bottom: "auto",
				left: "50%",
				right: "auto",
				transform: "translateX(-50%) translateY(8px)",
			};
		case "left":
			return {
				top: "50%",
				bottom: "auto",
				left: "auto",
				right: "100%",
				transform: "translateY(-50%) translateX(-8px)",
			};
		case "right":
			return {
				top: "50%",
				bottom: "auto",
				left: "100%",
				right: "auto",
				transform: "translateY(-50%) translateX(8px)",
			};
		default: // "top"
			return {
				top: "auto",
				bottom: "100%",
				left: "50%",
				right: "auto",
				transform: "translateX(-50%) translateY(-8px)",
			};
	}
}

function getTooltipArrowStyle(placement: TooltipPlacement) {
	switch (placement) {
		case "bottom":
			return {
				top: "calc(var(--arrow-size) * -0.5)",
				bottom: "auto",
				left: "50%",
				right: "auto",
				transform: "translateX(-50%)",
				position: "absolute",
				width: "var(--arrow-size)",
				height: "var(--arrow-size)",
				zIndex: "1",
			};
		case "left":
			return {
				top: "50%",
				bottom: "auto",
				left: "auto",
				right: "calc(var(--arrow-size) * -0.5)",
				transform: "translateY(-50%)",
				position: "absolute",
				width: "var(--arrow-size)",
				height: "var(--arrow-size)",
				zIndex: "1",
			};
		case "right":
			return {
				top: "50%",
				bottom: "auto",
				left: "calc(var(--arrow-size) * -0.5)",
				right: "auto",
				transform: "translateY(-50%)",
				position: "absolute",
				width: "var(--arrow-size)",
				height: "var(--arrow-size)",
				zIndex: "1",
			};
		default: // "top"
			return {
				top: "auto",
				bottom: "calc(var(--arrow-size) * -0.5)",
				left: "50%",
				right: "auto",
				transform: "translateX(-50%)",
				position: "absolute",
				width: "var(--arrow-size)",
				height: "var(--arrow-size)",
				zIndex: "1",
			};
	}
}

function getTooltipArrowRotation(placement: TooltipPlacement): number {
	switch (placement) {
		case "top":
			return 225;
		case "left":
			return 135;
		case "right":
			return 315;
		default: // "bottom"
			return 45;
	}
}

interface TooltipContextValue {
	id: string;
	open: boolean;
	styles: TooltipStyles;
	placement: TooltipPlacement;
}

const TooltipContext = createContext<TooltipContextValue | null>(null);

const useTooltipContext = () => {
	const context = useContext(TooltipContext);
	return context;
};

export interface TooltipRootProps extends PropsWithChildren {
	id?: string;
	open?: boolean;
	disabled?: boolean;
	interactive?: boolean;
	placement?: TooltipPlacement;
}

export function TooltipRoot(props: TooltipRootProps) {
	const { id: idProp, open = false, placement = "top", children } = props;
	const autoId = useId();
	const id = idProp || autoId;
	const styles = tooltip();

	return (
		<TooltipContext.Provider value={{ id, open, styles, placement }}>
			{children}
		</TooltipContext.Provider>
	);
}

export interface TooltipTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	style?: any;
	[key: string]: unknown;
}

export function TooltipTrigger(props: TooltipTriggerProps) {
	const {
		children,
		class: classProp,
		asChild,
		style: styleProp,
		...restProps
	} = props;
	const context = useTooltipContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	const triggerProps = {
		id: id ? `tooltip-trigger-${id}` : undefined,
		"aria-describedby": open && id ? `tooltip-content-${id}` : undefined,
		"data-state": open ? "open" : "closed",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(styles?.trigger, classProp, child.props?.class),
			style: { ...(styleProp as any), ...(child.props?.style as any) },
		});
	}

	return (
		<div
			style={{ display: "inline-block", ...(styleProp as any) }}
			class={cx(styles?.trigger, classProp)}
			{...triggerProps}
		>
			{children}
		</div>
	);
}

export interface TooltipPositionerProps extends PropsWithChildren {
	class?: string;
	style?: any;
	[key: string]: unknown;
}

export function TooltipPositioner(props: TooltipPositionerProps) {
	const { children, class: classProp, style: styleProp, ...restProps } = props;
	const context = useTooltipContext();
	const open = context?.open;
	const styles = context?.styles;
	const placement = context?.placement ?? "top";

	if (!open) return null;

	return (
		<div
			class={cx(styles?.positioner, classProp)}
			data-state={open ? "open" : "closed"}
			style={{
				position: "absolute",
				width: "max-content",
				pointerEvents: "none",
				zIndex: 1000,
				...getTooltipPlacementStyle(placement),
				...(styleProp as any),
			}}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface TooltipContentProps extends PropsWithChildren {
	class?: string;
	style?: any;
	[key: string]: unknown;
}

export function TooltipContent(props: TooltipContentProps) {
	const { children, class: classProp, style: styleProp, ...restProps } = props;
	const context = useTooltipContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	return (
		<div
			id={id ? `tooltip-content-${id}` : undefined}
			role="tooltip"
			class={cx(styles?.content, classProp)}
			data-state={open ? "open" : "closed"}
			style={styleProp as any}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function TooltipArrow(
	props: PropsWithChildren<{ class?: string; style?: any }>,
) {
	const { children, class: classProp, style: styleProp, ...restProps } = props;
	const context = useTooltipContext();
	const styles = context?.styles;
	const placement = context?.placement ?? "top";
	return (
		<div
			class={cx(styles?.arrow, classProp)}
			style={{
				...getTooltipArrowStyle(placement),
				...(styleProp as any),
			}}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function TooltipArrowTip(props: { class?: string; style?: any }) {
	const { class: classProp, style: styleProp, ...restProps } = props;
	const context = useTooltipContext();
	const styles = context?.styles;
	const placement = context?.placement ?? "top";
	return (
		<div
			class={cx(styles?.arrowTip, classProp)}
			style={{
				position: "absolute",
				inset: "0",
				width: "var(--arrow-size)",
				height: "var(--arrow-size)",
				background: "var(--arrow-background)",
				transform: `rotate(${getTooltipArrowRotation(placement)}deg)`,
				...styleProp,
			}}
			{...restProps}
		/>
	);
}

export interface TooltipBaseProps extends TooltipRootProps {
	content?: Child;
	showArrow?: boolean;
	triggerProps?: TooltipTriggerProps;
	contentProps?: TooltipContentProps;
	asChild?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (details: { open: boolean }) => void;
	classNames?: {
		root?: string;
		trigger?: string;
		positioner?: string;
		content?: string;
		arrow?: string;
		arrowTip?: string;
	};
	styles?: {
		root?: Record<string, string>;
		trigger?: Record<string, string>;
		positioner?: Record<string, string>;
		content?: Record<string, string>;
		arrow?: Record<string, string>;
		arrowTip?: Record<string, string>;
	};
}

export function TooltipBase(props: TooltipBaseProps) {
	const {
		children,
		content,
		showArrow,
		triggerProps,
		contentProps,
		asChild,
		classNames,
		styles,
		...rootProps
	} = props;

	if (rootProps.disabled) return children;

	const positionerStyle: any = {
		...(styles?.positioner as any),
	};
	if (rootProps.interactive) {
		positionerStyle.pointerEvents = "auto";
	}

	return (
		<TooltipRoot {...rootProps}>
			<div
				class={classNames?.root}
				style={{
					position: "relative",
					display: "inline-block",
					...(styles?.root as any),
				}}
			>
				<TooltipTrigger
					asChild={asChild}
					class={classNames?.trigger}
					style={styles?.trigger}
					{...triggerProps}
				>
					{children}
				</TooltipTrigger>
				<TooltipPositioner
					class={classNames?.positioner}
					style={positionerStyle}
				>
					<TooltipContent
						class={classNames?.content}
						style={styles?.content}
						{...contentProps}
					>
						{showArrow && (
							<TooltipArrow class={classNames?.arrow} style={styles?.arrow}>
								<TooltipArrowTip
									class={classNames?.arrowTip}
									style={styles?.arrowTip}
								/>
							</TooltipArrow>
						)}
						{content}
					</TooltipContent>
				</TooltipPositioner>
			</div>
		</TooltipRoot>
	);
}

export function InteractiveTooltip(props: TooltipBaseProps) {
	const {
		open: openProp,
		defaultOpen,
		interactive = true,
		onOpenChange,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);
	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;
	const closeTimeoutRef = useRef<number | null>(null);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChange?.({ open: nextOpen });
	};

	const openTooltip = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		handleOpenChange(true);
	};

	const closeTooltip = () => {
		if (interactive) {
			closeTimeoutRef.current = window.setTimeout(() => {
				handleOpenChange(false);
			}, 100) as unknown as number;
		} else {
			handleOpenChange(false);
		}
	};

	useEffect(() => {
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
			}
		};
	}, []);

	return (
		<TooltipBase
			{...rest}
			open={open}
			interactive={interactive}
			triggerProps={{
				onMouseEnter: openTooltip,
				onMouseLeave: closeTooltip,
				onFocus: openTooltip,
				onBlur: closeTooltip,
				tabIndex: 0,
				...props.triggerProps,
			}}
			contentProps={{
				onMouseEnter: openTooltip,
				onMouseLeave: closeTooltip,
				...props.contentProps,
			}}
		/>
	);
}
