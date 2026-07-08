import type { PropsWithChildren } from "hono/jsx";
import {
	cloneElement,
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { css, cx } from "styled-system/css";
import type { DialogVariantProps } from "styled-system/recipes";
import { dialog } from "styled-system/recipes";

type DialogStyles = ReturnType<typeof dialog>;

interface DialogContextValue {
	styles: DialogStyles;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	id: string;
	role?: "dialog" | "alertdialog";
}

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
	const context = useContext(DialogContext);
	return context;
};

export interface RootProps extends DialogVariantProps, PropsWithChildren {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	id?: string;
	rootRef?: any;
	role?: "dialog" | "alertdialog";
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = dialog.splitVariantProps(props);
	const { children, open, onOpenChange, id: idProp, rootRef, role } = localProps;
	const styles = dialog(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const value = {
		styles,
		open,
		onOpenChange,
		id,
		role: props.role,
	};

	return (
		<div id={id} ref={rootRef}>
			<DialogContext.Provider value={value}>{children}</DialogContext.Provider>
		</div>
	);
}

export interface TriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function Trigger(props: TriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useDialogContext();
	const open = context?.open;

	const triggerProps = {
		"aria-haspopup": "dialog",
		"aria-expanded": open,
		"data-part": "trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(classProp, child.props?.class),
		});
	}

	return (
		<button type="button" {...triggerProps}>
			{children}
		</button>
	);
}

export interface BackdropProps extends PropsWithChildren {
	class?: string;
}

export function Backdrop(props: BackdropProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const open = context?.open;
	return (
		<div
			class={cx(
				styles.backdrop,
				"dialog__backdrop",
				classProp,
				!open && css({ display: "none" }),
			)}
			data-state={open ? "open" : "closed"}
			data-part="backdrop"
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface PositionerProps extends PropsWithChildren {
	class?: string;
}

export function Positioner(props: PositionerProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const open = context?.open;

	return (
		<div
			class={cx(
				styles.positioner,
				"dialog__positioner",
				classProp,
				!open && css({ display: "none" }),
			)}
			data-state={open ? "open" : "closed"}
			data-part="positioner"
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface ContentProps extends PropsWithChildren {
	class?: string;
	role?: "dialog" | "alertdialog";
}

export function Content(props: ContentProps) {
	const { children, class: classProp, role: roleProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const open = context?.open;
	const id = context?.id;
	const role = roleProp || context?.role || "dialog";
	return (
		<div
			role={role}
			data-part="content"
			aria-modal="true"
			aria-labelledby={id ? `${id}-title` : undefined}
			aria-describedby={id ? `${id}-description` : undefined}
			class={cx(
				styles.content,
				"dialog__content",
				classProp,
				!open && css({ display: "none" }),
			)}
			data-state={open ? "open" : "closed"}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface HeaderProps extends PropsWithChildren {
	class?: string;
}

export function Header(props: HeaderProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.header, "dialog__header", classProp)} {...restProps}>
			{children}
		</div>
	);
}

export interface BodyProps extends PropsWithChildren {
	class?: string;
}

export function Body(props: BodyProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.body, "dialog__body", classProp)} {...restProps}>
			{children}
		</div>
	);
}

export interface FooterProps extends PropsWithChildren {
	class?: string;
}

export function Footer(props: FooterProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.footer, "dialog__footer", classProp)} {...restProps}>
			{children}
		</div>
	);
}

export interface TitleProps extends PropsWithChildren {
	class?: string;
}

export function Title(props: TitleProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const id = context?.id;

	return (
		<h2
			id={id ? `${id}-title` : undefined}
			class={cx(styles.title, "dialog__title", classProp)}
			{...restProps}
		>
			{children}
		</h2>
	);
}

export interface DescriptionProps extends PropsWithChildren {
	class?: string;
}

export function Description(props: DescriptionProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const id = context?.id;

	return (
		<div
			id={id ? `${id}-description` : undefined}
			class={cx(styles.description, "dialog__description", classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface CloseTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	unstyled?: boolean;
}

export function CloseTrigger(props: CloseTriggerProps) {
	const { children, class: classProp, asChild, unstyled, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	const triggerProps = {
		"data-part": "close-trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(
				!unstyled && styles.closeTrigger,
				!unstyled && "dialog__closeTrigger",
				classProp,
				child.props?.class,
			),
		});
	}

	return (
		<button
			type="button"
			aria-label="Close"
			class={cx(
				!unstyled && styles.closeTrigger,
				!unstyled && "dialog__closeTrigger",
				classProp,
			)}
			{...triggerProps}
		>
			{children}
		</button>
	);
}

export interface ActionTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function ActionTrigger(props: ActionTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;

	const triggerProps = {
		"data-part": "action-trigger",
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		return cloneElement(child, {
			...triggerProps,
			class: cx(classProp, child.props?.class),
		});
	}

	return (
		<button type="button" class={cx(classProp)} {...triggerProps}>
			{children}
		</button>
	);
}

// Interactive version with state management and event listeners
export interface InteractiveDialogProps extends RootProps {
	defaultOpen?: boolean;
	role?: "dialog" | "alertdialog";
}

export function InteractiveDialog(props: InteractiveDialogProps) {
	const {
		open: openProp,
		onOpenChange: onOpenChangeProp,
		defaultOpen,
		id: idProp,
		role,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `dialog-${fallbackId}`;
	const rootRef = useRef<HTMLElement>(null);
	const lastFocusedElement = useRef<HTMLElement | null>(null);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.(nextOpen);
	};

	const getElements = () => {
		const root = rootRef.current;
		if (!root) return { positioners: [], backdrops: [], contents: [] };
		return {
			positioners: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
			),
			backdrops: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="backdrop"]'),
			),
			contents: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="content"]'),
			),
		};
	};

	const getFocusableElements = (container: HTMLElement) => {
		return Array.from(
			container.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
			),
		).filter((el) => {
			const style = window.getComputedStyle(el);
			return style.display !== "none" && style.visibility !== "hidden";
		});
	};

	const hide = () => {
		const root = rootRef.current;
		if (!root) return;
		const { positioners, backdrops, contents } = getElements();
		root.setAttribute("data-state", "closed");
		for (const p of positioners) {
			p.style.cssText = "display: none !important;";
			p.setAttribute("data-state", "closed");
		}
		for (const b of backdrops) {
			b.style.cssText = "display: none !important;";
			b.setAttribute("data-state", "closed");
		}
		for (const c of contents) {
			c.setAttribute("data-state", "closed");
			c.style.cssText = "display: none !important;";
		}

		if (lastFocusedElement.current) {
			lastFocusedElement.current.focus();
			lastFocusedElement.current = null;
		}

		const openModals = document.querySelectorAll(
			'[data-state="open"]:is([data-scope="dialog"], [data-scope="drawer"])',
		);
		if (openModals.length === 0) {
			document.body.style.overflow = "";
		}
	};

	const show = () => {
		const root = rootRef.current;
		if (!root) return;
		lastFocusedElement.current = document.activeElement as HTMLElement;

		const { positioners, backdrops, contents } = getElements();
		root.setAttribute("data-state", "open");
		for (const p of positioners) {
			p.style.cssText = "display: flex !important; visibility: visible !important;";
			p.setAttribute("data-state", "open");
		}
		for (const b of backdrops) {
			b.style.cssText = "display: block !important; visibility: visible !important;";
			b.setAttribute("data-state", "open");
		}
		for (const c of contents) {
			c.setAttribute("data-state", "open");
			c.style.cssText = "display: flex !important; visibility: visible !important;";
		}

		if (contents.length > 0) {
			const content = contents[0];
			const focusable = getFocusableElements(content);
			if (focusable.length > 0) {
				focusable[0].focus();
			} else {
				content.setAttribute("tabindex", "-1");
				content.focus();
			}
		}

		document.body.style.overflow = "hidden";
	};

	// Synchronize manual DOM state with React state
	useEffect(() => {
		if (open) show();
		else hide();
	}, [open]);

	// Attach event listeners using event delegation
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const handleClick = (e: Event) => {
			const target = (e.target as HTMLElement).closest(
				"[data-part]",
			) as HTMLElement;
			if (!target) return;
			const dataPart = target.getAttribute("data-part");

			if (dataPart === "backdrop") {
				handleOpenChange(false);
			} else if (dataPart === "trigger") {
				const currentOpen = root.getAttribute("data-state") === "open";
				handleOpenChange(!currentOpen);
			} else if (
				dataPart === "close-trigger" ||
				dataPart === "action-trigger"
			) {
				handleOpenChange(false);
			}
		};

		root.addEventListener("click", handleClick);

		return () => {
			root.removeEventListener("click", handleClick);
		};
	}, []);

	// Manage keyboard listeners only when open
	useEffect(() => {
		if (!open) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				handleOpenChange(false);
				return;
			}

			if (e.key === "Tab") {
				const root = rootRef.current;
				if (!root) return;
				const content = root.querySelector<HTMLElement>('[data-part="content"]');
				if (!content) return;

				const focusableElements = getFocusableElements(content);
				if (focusableElements.length === 0) {
					e.preventDefault();
					return;
				}

				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						lastElement.focus();
						e.preventDefault();
					}
				} else {
					if (document.activeElement === lastElement) {
						firstElement.focus();
						e.preventDefault();
					}
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [open]);

	return (
		<Root
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={handleOpenChange}
			rootRef={rootRef}
			role={role}
		/>
	);
}
