import {
	cloneElement,
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { css, cx } from "styled-system/css";
import { hoverCard } from "styled-system/recipes";

type HoverCardStyles = ReturnType<typeof hoverCard>;

interface HoverCardContextValue {
	id: string;
	open: boolean;
	styles: HoverCardStyles;
}

interface HoverCardRootProps extends PropsWithChildren {
	id?: string;
	open?: boolean;
	defaultOpen?: boolean;
	openDelay?: number;
	closeDelay?: number;
}

interface HoverCardTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	[key: string]: unknown;
}

interface HoverCardPositionerProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

interface HoverCardContentProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

interface HoverCardArrowProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

interface HoverCardArrowTipProps {
	class?: string;
	[key: string]: unknown;
}

interface InteractiveHoverCardProps extends HoverCardRootProps {
	onOpenChange?: (details: { open: boolean }) => void;
}

const HoverCardContext = createContext<HoverCardContextValue | null>(null);

const useHoverCardContext = () => {
	const context = useContext(HoverCardContext);
	return context;
};

function HoverCardRoot(props: HoverCardRootProps) {
	const { id: idProp, open = false, children } = props;
	const autoId = useId();
	const id = idProp || autoId;
	const styles = hoverCard();

	return (
		<HoverCardContext.Provider value={{ id, open, styles }}>
			{children}
		</HoverCardContext.Provider>
	);
}

function HoverCardTrigger(props: HoverCardTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useHoverCardContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles || hoverCard();

	const triggerProps = {
		id: id ? `hover-card-trigger-${id}` : undefined,
		"aria-haspopup": "dialog",
		"aria-expanded": open ? "true" : "false",
		"aria-controls": open && id ? `hover-card-content-${id}` : undefined,
		"data-state": open ? "open" : "closed",
		"data-part": "trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as { props?: { class?: string } };
		return cloneElement(children as unknown as JSX.Element, {
			...triggerProps,
			class: cx(styles.trigger, classProp, child.props?.class),
		});
	}

	return (
		<div class={cx(styles.trigger, classProp)} {...triggerProps}>
			{children}
		</div>
	);
}

function HoverCardPositioner(props: HoverCardPositionerProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useHoverCardContext();
	const open = context?.open;
	const styles = context?.styles || hoverCard();

	return (
		<div
			class={cx(
				styles.positioner,
				classProp,
				!open && css({ display: "none" }),
			)}
			data-state={open ? "open" : "closed"}
			data-part="positioner"
			style={{
				position: "absolute",
				top: "100%",
				left: "0",
				zIndex: 1000,
			}}
			{...restProps}
		>
			{children}
		</div>
	);
}

function HoverCardContent(props: HoverCardContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useHoverCardContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles || hoverCard();

	return (
		<div
			id={id ? `hover-card-content-${id}` : undefined}
			role="dialog"
			class={cx(styles.content, classProp)}
			data-state={open ? "open" : "closed"}
			data-part="content"
			{...restProps}
		>
			{children}
		</div>
	);
}

function HoverCardArrow(props: HoverCardArrowProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useHoverCardContext();
	const styles = context?.styles || hoverCard();
	return (
		<div class={cx(styles.arrow, classProp)} data-part="arrow" {...restProps}>
			{children || <HoverCardArrowTip />}
		</div>
	);
}

function HoverCardArrowTip(props: HoverCardArrowTipProps) {
	const { class: classProp, ...restProps } = props;
	const context = useHoverCardContext();
	const styles = context?.styles || hoverCard();
	return (
		<div
			class={cx(styles.arrowTip, classProp)}
			data-part="arrow-tip"
			{...restProps}
		/>
	);
}

function HoverCardContextComponent(props: {
	children: (context: HoverCardContextValue | null) => JSX.Element;
}) {
	const context = useHoverCardContext();
	return props.children(context);
}

function InteractiveHoverCardRoot(props: InteractiveHoverCardProps) {
	const {
		open: openProp,
		defaultOpen,
		children,
		id: idProp,
		openDelay = 600,
		closeDelay = 300,
		onOpenChange,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);
	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `hover-card-${fallbackId}`;
	const rootRef = useRef<HTMLDivElement>(null);
	const openTimerRef = useRef<number | null>(null);
	const closeTimerRef = useRef<number | null>(null);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChange?.({ open: nextOpen });
	};

	const configRef = useRef({
		openDelay,
		closeDelay,
		isControlled,
		open,
		handleOpenChange,
	});

	useEffect(() => {
		configRef.current = {
			openDelay,
			closeDelay,
			isControlled,
			open,
			handleOpenChange,
		};
	});

	useEffect(() => {
		if (typeof document === "undefined") {
			return;
		}

		const root = document.getElementById(rootId);
		if (!root) {
			return;
		}

		const getPositioners = () =>
			Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
			);

		const openHoverCard = () => {
			root.setAttribute("data-state", "open");
			getPositioners().forEach((p) => {
				p.style.cssText =
					"display: block !important; position: absolute; top: 100%; left: 0; z-index: 1000;";
				p.setAttribute("data-state", "open");
			});
			const content = root.querySelector<HTMLElement>('[data-part="content"]');
			if (content) {
				content.setAttribute("data-state", "open");
			}
			const trigger = root.querySelector<HTMLElement>('[data-part="trigger"]');
			if (trigger) {
				trigger.setAttribute("data-state", "open");
				trigger.setAttribute("aria-expanded", "true");
			}
			const arrows = root.querySelectorAll<HTMLElement>('[data-part="arrow"]');
			arrows.forEach((a) => {
				a.setAttribute("data-state", "open");
			});
		};

		const closeHoverCard = () => {
			root.setAttribute("data-state", "closed");
			getPositioners().forEach((p) => {
				p.style.cssText =
					"display: none !important; position: absolute; top: 100%; left: 0; z-index: 1000;";
				p.setAttribute("data-state", "closed");
			});
			const content = root.querySelector<HTMLElement>('[data-part="content"]');
			if (content) {
				content.setAttribute("data-state", "closed");
			}
			const trigger = root.querySelector<HTMLElement>('[data-part="trigger"]');
			if (trigger) {
				trigger.setAttribute("data-state", "closed");
				trigger.setAttribute("aria-expanded", "false");
			}
			const arrows = root.querySelectorAll<HTMLElement>('[data-part="arrow"]');
			arrows.forEach((a) => {
				a.setAttribute("data-state", "closed");
			});
		};

		if (open) {
			openHoverCard();
		} else {
			closeHoverCard();
		}
	}, [rootId, open]);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const trigger = root.querySelector('[data-part="trigger"]');
		const content = root.querySelector('[data-part="content"]');

		const handleOpen = () => {
			const { openDelay, handleOpenChange } = configRef.current;
			if (closeTimerRef.current) {
				clearTimeout(closeTimerRef.current);
				closeTimerRef.current = null;
			}
			if (openTimerRef.current) return;

			openTimerRef.current = window.setTimeout(() => {
				handleOpenChange(true);
				openTimerRef.current = null;
			}, openDelay);
		};

		const handleClose = () => {
			const { closeDelay, handleOpenChange } = configRef.current;
			if (openTimerRef.current) {
				clearTimeout(openTimerRef.current);
				openTimerRef.current = null;
			}
			if (closeTimerRef.current) return;

			closeTimerRef.current = window.setTimeout(() => {
				handleOpenChange(false);
				closeTimerRef.current = null;
			}, closeDelay);
		};

		if (trigger) {
			trigger.addEventListener("mouseenter", handleOpen);
			trigger.addEventListener("mouseleave", handleClose);
		}

		if (content) {
			content.addEventListener("mouseenter", handleOpen);
			content.addEventListener("mouseleave", handleClose);
		}

		if (trigger?.matches(":hover")) {
			handleOpen();
		}

		return () => {
			if (trigger) {
				trigger.removeEventListener("mouseenter", handleOpen);
				trigger.removeEventListener("mouseleave", handleClose);
			}
			if (content) {
				content.removeEventListener("mouseenter", handleOpen);
				content.removeEventListener("mouseleave", handleClose);
			}
			if (openTimerRef.current) clearTimeout(openTimerRef.current);
			if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
		};
	}, [rootId]);

	return (
		<div id={rootId} ref={rootRef}>
			<HoverCardRoot {...rest} open={open}>
				{children}
			</HoverCardRoot>
		</div>
	);
}

export type {
	HoverCardArrowProps,
	HoverCardArrowTipProps,
	HoverCardContentProps,
	HoverCardContextValue,
	HoverCardPositionerProps,
	HoverCardRootProps,
	HoverCardStyles,
	HoverCardTriggerProps,
	InteractiveHoverCardProps,
};

export {
	HoverCardArrow,
	HoverCardArrowTip,
	HoverCardContent,
	HoverCardContextComponent as Context,
	HoverCardPositioner,
	HoverCardRoot,
	HoverCardTrigger,
	InteractiveHoverCardRoot,
};
