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
import { popover } from "styled-system/recipes";

type PopoverStyles = ReturnType<typeof popover>;

interface PopoverContextValue {
	id: string;
	open: boolean;
	styles: PopoverStyles;
	onClose?: () => void;
	onToggle?: () => void;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = () => {
	const context = useContext(PopoverContext);
	return context;
};

export interface PopoverRootProps extends PropsWithChildren {
	id?: string;
	open?: boolean;
	onClose?: () => void;
	onToggle?: () => void;
}

export function PopoverRoot(props: PopoverRootProps) {
	const { id: idProp, open = false, children, onClose, onToggle } = props;
	const autoId = useId();
	const id = idProp || autoId;
	const styles = popover();

	return (
		<PopoverContext.Provider value={{ id, open, styles, onClose, onToggle }}>
			{children}
		</PopoverContext.Provider>
	);
}

export interface PopoverTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	[key: string]: unknown;
}

export function PopoverTrigger(props: PopoverTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = usePopoverContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	const triggerProps = {
		id: id ? `popover-trigger-${id}` : undefined,
		"aria-haspopup": "dialog",
		"aria-expanded": open ? "true" : "false",
		"aria-controls": open && id ? `popover-content-${id}` : undefined,
		"data-state": open ? "open" : "closed",
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
		<button type="button" {...triggerProps}>
			{children}
		</button>
	);
}

export interface PopoverPositionerProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

export function PopoverPositioner(props: PopoverPositionerProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const open = context?.open;
	const styles = context?.styles;

	return (
		<div
			class={cx(
				styles?.positioner,
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

export interface PopoverContentProps extends PropsWithChildren {
	class?: string;
	[key: string]: unknown;
}

export function PopoverContent(props: PopoverContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const id = context?.id;
	const open = context?.open;
	const styles = context?.styles;

	return (
		<div
			id={id ? `popover-content-${id}` : undefined}
			role="dialog"
			class={cx(styles?.content, classProp)}
			data-state={open ? "open" : "closed"}
			tabIndex={-1}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function PopoverHeader(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<header class={cx(styles?.header, classProp)} {...restProps}>
			{children}
		</header>
	);
}

export function PopoverBody(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<div class={cx(styles?.body, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function PopoverFooter(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<footer class={cx(styles?.footer, classProp)} {...restProps}>
			{children}
		</footer>
	);
}

export function PopoverTitle(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<h2 class={cx(styles?.title, classProp)} {...restProps}>
			{children}
		</h2>
	);
}

export function PopoverDescription(
	props: PropsWithChildren<{ class?: string }>,
) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<p class={cx(styles?.description, classProp)} {...restProps}>
			{children}
		</p>
	);
}

export interface PopoverCloseTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function PopoverCloseTrigger(props: PopoverCloseTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;

	const triggerProps = {
		"aria-label": "Close",
		"data-part": "close-trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(styles?.closeTrigger, classProp, child.props?.class),
		});
	}

	return (
		<button
			type="button"
			class={cx(styles?.closeTrigger, classProp)}
			{...triggerProps}
		>
			{children}
		</button>
	);
}

export function PopoverArrow(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return (
		<div class={cx(styles?.arrow, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function PopoverArrowTip(props: { class?: string }) {
	const { class: classProp, ...restProps } = props;
	const context = usePopoverContext();
	const styles = context?.styles;
	return <div class={cx(styles?.arrowTip, classProp)} {...restProps} />;
}

export function InteractivePopoverRoot(props: PopoverRootProps) {
	const { open: openProp, children, id: idProp, ...rest } = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);

	const fallbackId = useId();
	const rootId = idProp || `popover-${fallbackId}`;
	const previouslyFocused = useRef<HTMLElement | null>(null);

	const setOpen = (nextOpen: boolean) => setIsOpen(nextOpen);
	const setOpenRef = useRef<(nextOpen: boolean) => void>(setOpen);
	setOpenRef.current = setOpen;

	const openRef = useRef(isOpen);
	openRef.current = isOpen;

	useEffect(() => {
		if (typeof document === "undefined") return;
		const root = document.getElementById(rootId);
		if (!root) return;

		const handleClick = (e: Event) => {
			const target = e.target as HTMLElement;
			const dataPart = target.getAttribute("data-part");

			if (dataPart === "trigger") {
				setOpenRef.current?.(!openRef.current);
			} else if (dataPart === "close-trigger") {
				setOpenRef.current?.(false);
			}
		};

		root.addEventListener("click", handleClick);
		return () => root.removeEventListener("click", handleClick);
	}, [rootId]);

	// Dismiss on Escape and outside-click; manage focus
	useEffect(() => {
		if (typeof document === "undefined" || !isOpen) return;
		const root = document.getElementById(rootId);
		if (!root) return;

		previouslyFocused.current = document.activeElement as HTMLElement;
		const content = root.querySelector<HTMLElement>('[data-part="content"]');
		content?.focus();

		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				e.preventDefault();
				setOpenRef.current?.(false);
			}
		};

		const onPointerDown = (e: MouseEvent) => {
			if (!root.contains(e.target as Node)) {
				setOpenRef.current?.(false);
			}
		};

		document.addEventListener("keydown", onKeyDown);
		document.addEventListener("mousedown", onPointerDown);
		return () => {
			document.removeEventListener("keydown", onKeyDown);
			document.removeEventListener("mousedown", onPointerDown);
			previouslyFocused.current?.focus?.();
		};
	}, [isOpen, rootId]);

	return (
		<div id={rootId}>
			<PopoverRoot {...rest} open={isOpen}>
				{children}
			</PopoverRoot>
		</div>
	);
}
