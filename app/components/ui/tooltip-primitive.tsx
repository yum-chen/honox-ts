import { css, cx } from "design-system/css";
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
import { whenAnimationEnds } from "./overlay-a11y";
import {
	getArrowRotation,
	getArrowStyle,
	getPlacementStyle,
	type OverlayPlacement,
	positionOverlay,
} from "./overlay-position";

const PLACEMENT_CONFIG = { align: "center" } as const;

type TooltipPlacement = OverlayPlacement;
type TooltipStyles = ReturnType<typeof tooltip>;

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

export type { TooltipPlacement };

export interface TooltipRootProps extends PropsWithChildren {
	id?: string;
	open?: boolean;
	defaultOpen?: boolean;
	onOpenChange?: (details: { open: boolean }) => void;
	disabled?: boolean;
	/** Which side of the trigger the content opens on. Default: "top". Flips
	 * to the opposite side automatically if there isn't enough viewport room. */
	placement?: TooltipPlacement;
	/** Close when Escape is pressed. Default: true. */
	closeOnEscape?: boolean;
	/** Delay (ms) before showing on hover/focus. Default: 100. */
	openDelay?: number;
	/** Delay (ms) before hiding on blur/mouse-out. Default: 100. */
	closeDelay?: number;
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
	[key: string]: unknown;
}

export function TooltipTrigger(props: TooltipTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useTooltipContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	const triggerProps = {
		id: id ? `tooltip-trigger-${id}` : undefined,
		// Content stays mounted (just hidden) at all times, so this can
		// always point at it rather than only while open.
		"aria-describedby": id ? `tooltip-content-${id}` : undefined,
		"data-state": open ? "open" : "closed",
		"data-scope": "tooltip",
		"data-part": "trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(styles?.trigger, classProp, child.props?.class),
		});
	}

	return (
		<div
			style={{ display: "inline-block" }}
			class={cx(styles?.trigger, classProp)}
			{...triggerProps}
		>
			{children}
		</div>
	);
}

export interface TooltipPositionerProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

export function TooltipPositioner(props: TooltipPositionerProps) {
	const { children, class: classProp, style: styleProp, ...restProps } = props;
	const context = useTooltipContext();
	const open = context?.open;
	const styles = context?.styles;
	const placement = context?.placement ?? "top";

	return (
		<div
			class={cx(
				styles?.positioner,
				classProp,
				!open && css({ display: "none" }),
			)}
			data-state={open ? "open" : "closed"}
			data-scope="tooltip"
			data-part="positioner"
			data-placement={placement}
			style={{
				position: "absolute",
				zIndex: "calc(var(--z-index-tooltip) + var(--layer-index, 0))",
				width: "max-content",
				...getPlacementStyle(placement, PLACEMENT_CONFIG),
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
	[key: string]: unknown;
}

export function TooltipContent(props: TooltipContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useTooltipContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	return (
		<div
			id={id ? `tooltip-content-${id}` : undefined}
			role="tooltip"
			class={cx(styles?.content, classProp)}
			data-scope="tooltip"
			data-part="content"
			data-state={open ? "open" : "closed"}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function TooltipArrow(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = useTooltipContext();
	const styles = context?.styles;
	const placement = context?.placement ?? "top";
	return (
		<div
			class={cx(styles?.arrow, classProp)}
			data-scope="tooltip"
			data-part="arrow"
			style={getArrowStyle(placement, PLACEMENT_CONFIG)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function TooltipArrowTip(props: { class?: string }) {
	const { class: classProp, ...restProps } = props;
	const context = useTooltipContext();
	const styles = context?.styles;
	const placement = context?.placement ?? "top";
	return (
		<div
			class={cx(styles?.arrowTip, classProp)}
			data-scope="tooltip"
			data-part="arrow-tip"
			style={{ transform: `rotate(${getArrowRotation(placement)}deg)` }}
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
}

export function TooltipBase(props: TooltipBaseProps) {
	const {
		id,
		children,
		content,
		showArrow,
		triggerProps,
		contentProps,
		asChild,
		open = false,
		...rootProps
	} = props;

	if (rootProps.disabled) return children;

	return (
		<TooltipRoot id={id} {...rootProps} open={open}>
			<div
				id={id}
				data-state={open ? "open" : "closed"}
				style={{ position: "relative", display: "inline-block" }}
			>
				<TooltipTrigger asChild={asChild} {...triggerProps}>
					{children}
				</TooltipTrigger>
				<TooltipPositioner>
					<TooltipContent {...contentProps}>
						{showArrow && (
							<TooltipArrow>
								<TooltipArrowTip />
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
		onOpenChange,
		id: idProp,
		placement = "top",
		closeOnEscape = true,
		openDelay = 100,
		closeDelay = 100,
		disabled,
		children,
		content,
		showArrow,
		triggerProps,
		contentProps,
		asChild,
	} = props;

	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);
	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `tooltip-${fallbackId}`;

	const handleOpenChangeRef = useRef<(nextOpen: boolean) => void>(() => {});
	useEffect(() => {
		handleOpenChangeRef.current = (nextOpen: boolean) => {
			if (!isControlled) {
				setIsOpen(nextOpen);
			}
			onOpenChange?.({ open: nextOpen });
		};
	}, [isControlled, onOpenChange]);

	const closeOnEscapeRef = useRef(closeOnEscape);
	closeOnEscapeRef.current = closeOnEscape;

	const showRef = useRef<() => void>(() => {});
	const hideRef = useRef<() => void>(() => {});
	const isFirstRender = useRef(true);

	// Sync the `open` prop/state into the DOM (controlled parent, or our own
	// hover/focus-driven state below).
	useEffect(() => {
		if (open) {
			showRef.current?.();
		} else if (!isFirstRender.current) {
			hideRef.current?.();
		}
		isFirstRender.current = false;
	}, [open]);

	// Single mount effect: defines show/hide (persistent DOM, display toggled
	// imperatively so the `_closed` exit animation gets a chance to play),
	// flip-aware positioning, and wires up hover/focus delay + Escape dismiss.
	useEffect(() => {
		if (typeof document === "undefined" || disabled) return;

		const root = document.getElementById(rootId);
		if (!root) return;

		const isCurrentlyOpen = () => root.getAttribute("data-state") === "open";
		let cancelPendingHide = () => {};

		const show = () => {
			cancelPendingHide();
			if (isCurrentlyOpen()) return;
			root.setAttribute("data-state", "open");
			const positioners = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
			);
			positioners.forEach((p) => {
				p.style.setProperty("display", "block", "important");
				p.setAttribute("data-state", "open");
			});
			positionOverlay(root, PLACEMENT_CONFIG);
			root
				.querySelector<HTMLElement>('[data-part="content"]')
				?.setAttribute("data-state", "open");
			root
				.querySelector<HTMLElement>('[data-part="trigger"]')
				?.setAttribute("data-state", "open");
		};

		const hide = () => {
			if (!isCurrentlyOpen()) return;
			root.setAttribute("data-state", "closed");
			const positioners = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
			);
			const contentEl = root.querySelector<HTMLElement>(
				'[data-part="content"]',
			);
			positioners.forEach((p) => {
				p.setAttribute("data-state", "closed");
			});
			contentEl?.setAttribute("data-state", "closed");
			root
				.querySelector<HTMLElement>('[data-part="trigger"]')
				?.setAttribute("data-state", "closed");

			cancelPendingHide();
			const animatedEl = contentEl ?? positioners[0];
			if (animatedEl) {
				cancelPendingHide = whenAnimationEnds(animatedEl, () => {
					if (!isCurrentlyOpen()) {
						positioners.forEach((p) => {
							p.style.setProperty("display", "none", "important");
						});
					}
				});
			} else {
				positioners.forEach((p) => {
					p.style.setProperty("display", "none", "important");
				});
			}
		};

		showRef.current = show;
		hideRef.current = hide;

		if (open) show();

		const openTimerRef = { current: null as number | null };
		const closeTimerRef = { current: null as number | null };

		const clearTimers = () => {
			if (openTimerRef.current) {
				clearTimeout(openTimerRef.current);
				openTimerRef.current = null;
			}
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
				closeTimerRef.current = null;
			}
		};

		const requestOpen = (delay: number) => {
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
				closeTimerRef.current = null;
			}
			if (isCurrentlyOpen() || openTimerRef.current) return;
			openTimerRef.current = window.setTimeout(() => {
				openTimerRef.current = null;
				show();
				handleOpenChangeRef.current?.(true);
			}, delay);
		};

		const requestClose = (delay: number) => {
			if (openTimerRef.current) {
				clearTimeout(openTimerRef.current);
				openTimerRef.current = null;
			}
			if (closeTimerRef.current) return;
			closeTimerRef.current = window.setTimeout(() => {
				closeTimerRef.current = null;
				hide();
				handleOpenChangeRef.current?.(false);
			}, delay);
		};

		const trigger = root.querySelector<HTMLElement>('[data-part="trigger"]');
		const contentEl = root.querySelector<HTMLElement>('[data-part="content"]');

		const onTriggerEnter = () => requestOpen(openDelay);
		const onTriggerLeave = () => requestClose(closeDelay);
		// Moving the pointer onto the content itself (a link inside the
		// tooltip, say) keeps it open per WCAG 1.4.13 (Content on Hover or Focus).
		const onContentEnter = () => requestOpen(0);
		const onContentLeave = () => requestClose(closeDelay);
		const onFocus = () => {
			clearTimers();
			show();
			handleOpenChangeRef.current?.(true);
		};
		const onBlur = () => {
			clearTimers();
			hide();
			handleOpenChangeRef.current?.(false);
		};
		const onKeyDown = (e: KeyboardEvent) => {
			if (!isCurrentlyOpen() || e.key !== "Escape" || !closeOnEscapeRef.current)
				return;
			clearTimers();
			hide();
			handleOpenChangeRef.current?.(false);
		};
		const onResize = () => {
			if (isCurrentlyOpen()) positionOverlay(root, PLACEMENT_CONFIG);
		};

		trigger?.addEventListener("mouseenter", onTriggerEnter);
		trigger?.addEventListener("mouseleave", onTriggerLeave);
		trigger?.addEventListener("focus", onFocus);
		trigger?.addEventListener("blur", onBlur);
		contentEl?.addEventListener("mouseenter", onContentEnter);
		contentEl?.addEventListener("mouseleave", onContentLeave);
		document.addEventListener("keydown", onKeyDown);
		window.addEventListener("resize", onResize);

		return () => {
			clearTimers();
			cancelPendingHide();
			trigger?.removeEventListener("mouseenter", onTriggerEnter);
			trigger?.removeEventListener("mouseleave", onTriggerLeave);
			trigger?.removeEventListener("focus", onFocus);
			trigger?.removeEventListener("blur", onBlur);
			contentEl?.removeEventListener("mouseenter", onContentEnter);
			contentEl?.removeEventListener("mouseleave", onContentLeave);
			document.removeEventListener("keydown", onKeyDown);
			window.removeEventListener("resize", onResize);
		};
	}, [rootId, openDelay, closeDelay, disabled]);

	if (disabled) return children;

	return (
		<div
			id={rootId}
			data-tooltip-root
			data-state={open ? "open" : "closed"}
			style={{ position: "relative", display: "inline-block" }}
		>
			<TooltipRoot id={idProp} open={open} placement={placement}>
				<TooltipTrigger asChild={asChild} tabIndex={0} {...triggerProps}>
					{children}
				</TooltipTrigger>
				<TooltipPositioner>
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
		</div>
	);
}
