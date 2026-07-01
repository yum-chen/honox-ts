import {
	type Child,
	createContext,
	type PropsWithChildren,
	useContext,
	useId,
	useState,
} from "hono/jsx";
import { cx } from "../../../styled-system/css";
import { popover } from "../../../styled-system/recipes";

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
	if (!context) {
		throw new Error(
			"Popover components must be wrapped in <PopoverRoot /> or <Popover />",
		);
	}
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
	const { id, open, styles, onToggle } = usePopoverContext();

	const triggerProps = {
		id: `popover-trigger-${id}`,
		"aria-haspopup": "dialog",
		"aria-expanded": open ? "true" : "false",
		"aria-controls": open ? `popover-content-${id}` : undefined,
		class: cx(styles.trigger, classProp),
		"data-state": open ? "open" : "closed",
		onClick: onToggle,
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
	const { open, styles } = usePopoverContext();

	if (!open) return null;

	return (
		<div
			class={cx(styles.positioner, classProp)}
			data-state={open ? "open" : "closed"}
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
	const { id, open, styles } = usePopoverContext();

	return (
		<div
			id={`popover-content-${id}`}
			role="dialog"
			class={cx(styles.content, classProp)}
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
	const { styles } = usePopoverContext();
	return (
		<header class={cx(styles.header, classProp)} {...restProps}>
			{children}
		</header>
	);
}

export function PopoverBody(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return (
		<div class={cx(styles.body, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function PopoverFooter(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return (
		<footer class={cx(styles.footer, classProp)} {...restProps}>
			{children}
		</footer>
	);
}

export function PopoverTitle(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return (
		<h2 class={cx(styles.title, classProp)} {...restProps}>
			{children}
		</h2>
	);
}

export function PopoverDescription(
	props: PropsWithChildren<{ class?: string }>,
) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return (
		<p class={cx(styles.description, classProp)} {...restProps}>
			{children}
		</p>
	);
}

export function PopoverCloseTrigger(
	props: PropsWithChildren<{ class?: string }>,
) {
	const { children, class: classProp, ...restProps } = props;
	const { styles, onClose } = usePopoverContext();
	return (
		<button
			type="button"
			class={cx(styles.closeTrigger, classProp)}
			onClick={onClose}
			aria-label="Close"
			{...restProps}
		>
			{children}
		</button>
	);
}

export function PopoverArrow(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return (
		<div class={cx(styles.arrow, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function PopoverArrowTip(props: { class?: string }) {
	const { class: classProp, ...restProps } = props;
	const { styles } = usePopoverContext();
	return <div class={cx(styles.arrowTip, classProp)} {...restProps} />;
}

export function InteractivePopoverRoot(props: PopoverRootProps) {
	const { open: openProp, children, ...rest } = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);

	const handleToggle = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);

	return (
		<PopoverRoot
			{...rest}
			open={isOpen}
			onToggle={handleToggle}
			onClose={handleClose}
		>
			{children}
		</PopoverRoot>
	);
}
