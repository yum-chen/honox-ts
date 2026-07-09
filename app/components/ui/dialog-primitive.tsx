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
	dialogRole?: "dialog" | "alertdialog";
}

const DialogContext = createContext<DialogContextValue | null>(null);

const useDialogContext = () => {
	const context = useContext(DialogContext);
	return context;
};

interface RootProps extends DialogVariantProps, PropsWithChildren {
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	id?: string;
	rootRef?: any;
	dialogRole?: "dialog" | "alertdialog";
}

function Root(props: RootProps) {
	const [variantProps, localProps] = dialog.splitVariantProps(props);
	const {
		children,
		open,
		onOpenChange,
		id: idProp,
		rootRef,
		dialogRole,
	} = localProps;
	const styles = dialog(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const value = {
		styles,
		open,
		onOpenChange,
		id,
		dialogRole,
	};

	return (
		<div id={id} ref={rootRef} data-dialog-root="">
			<DialogContext.Provider value={value}>{children}</DialogContext.Provider>
		</div>
	);
}

interface TriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

function Trigger(props: TriggerProps) {
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

interface BackdropProps extends PropsWithChildren {
	class?: string;
}

function Backdrop(props: BackdropProps) {
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

interface PositionerProps extends PropsWithChildren {
	class?: string;
}

function Positioner(props: PositionerProps) {
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

interface ContentProps extends PropsWithChildren {
	class?: string;
	"aria-label"?: string;
}

function Content(props: ContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const open = context?.open;
	const id = context?.id;
	const hasAriaLabel = restProps["aria-label"] !== undefined;
	return (
		// biome-ignore lint/a11y/useAriaPropsSupportedByRole: dynamic role is dialog or alertdialog
		<div
			role={context?.dialogRole ?? "dialog"}
			data-part="content"
			aria-modal="true"
			tabIndex={-1}
			{...(hasAriaLabel
				? {}
				: { "aria-labelledby": id ? `${id}-title` : undefined })}
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

interface HeaderProps extends PropsWithChildren {
	class?: string;
}

function Header(props: HeaderProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.header, "dialog__header", classProp)} {...restProps}>
			{children}
		</div>
	);
}

interface BodyProps extends PropsWithChildren {
	class?: string;
}

function Body(props: BodyProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.body, "dialog__body", classProp)} {...restProps}>
			{children}
		</div>
	);
}

interface FooterProps extends PropsWithChildren {
	class?: string;
}

function Footer(props: FooterProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();

	return (
		<div class={cx(styles.footer, "dialog__footer", classProp)} {...restProps}>
			{children}
		</div>
	);
}

interface TitleProps extends PropsWithChildren {
	class?: string;
}

function Title(props: TitleProps) {
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

interface DescriptionProps extends PropsWithChildren {
	class?: string;
}

function Description(props: DescriptionProps) {
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

interface CloseTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
	unstyled?: boolean;
}

function CloseTrigger(props: CloseTriggerProps) {
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

interface ActionTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

function ActionTrigger(props: ActionTriggerProps) {
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

// Interactive version with state management and full a11y behavior
// (focus trap, Escape, inert background, scroll lock, focus return).

const FOCUSABLE_SELECTOR =
	"a[href],area[href],button:not([disabled]),input:not([disabled])," +
	"select:not([disabled]),textarea:not([disabled]),iframe:not([disabled])," +
	'object:not([disabled]),embed,[tabindex]:not([tabindex="-1"]),' +
	'[contenteditable]:not([contenteditable="false"])';

const openDialogRoots: HTMLElement[] = [];
let originalOverflow: string | undefined;

function getFocusable(container: HTMLElement): HTMLElement[] {
	return Array.from(
		container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
	).filter(
		(el) =>
			!el.hasAttribute("disabled") &&
			(el.offsetParent !== null ||
				window.getComputedStyle(el).display !== "none" ||
				el === document.activeElement),
	);
}

function applyInert() {
	for (const el of Array.from(
		document.querySelectorAll<HTMLElement>("[inert]"),
	)) {
		el.inert = false;
	}
	for (const root of openDialogRoots) {
		const path = new Set<HTMLElement>();
		let p: HTMLElement | null = root;
		while (p && p !== document.body) {
			path.add(p);
			p = p.parentElement;
		}
		let node: HTMLElement | null = root.parentElement;
		while (node && node !== document.body) {
			for (const sib of Array.from(node.children)) {
				if (path.has(sib as HTMLElement)) continue;
				const protects = openDialogRoots.some(
					(r) => sib === r || sib.contains(r),
				);
				if (!protects) (sib as HTMLElement).inert = true;
			}
			node = node.parentElement;
		}
	}
}

function syncDom(root: HTMLElement, open: boolean) {
	root.setAttribute("data-state", open ? "open" : "closed");

	const positioners = Array.from(
		root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
	).filter((el) => el.closest("[data-dialog-root]") === root);
	const backdrops = Array.from(
		root.querySelectorAll<HTMLElement>('[data-part="backdrop"]'),
	).filter((el) => el.closest("[data-dialog-root]") === root);
	const contents = Array.from(
		root.querySelectorAll<HTMLElement>('[data-part="content"]'),
	).filter((el) => el.closest("[data-dialog-root]") === root);
	const triggers = Array.from(
		root.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
	).filter((el) => el.closest("[data-dialog-root]") === root);

	for (const p of positioners) {
		p.setAttribute("data-state", open ? "open" : "closed");
		p.style.cssText = open
			? "display: flex !important; visibility: visible !important;"
			: "display: none !important; visibility: hidden !important;";
	}

	for (const b of backdrops) {
		b.setAttribute("data-state", open ? "open" : "closed");
		b.style.cssText = open
			? "display: block !important; visibility: visible !important;"
			: "display: none !important; visibility: hidden !important;";
	}

	for (const c of contents) {
		c.setAttribute("data-state", open ? "open" : "closed");
		c.style.cssText = open
			? "display: flex !important; visibility: visible !important;"
			: "display: none !important; visibility: hidden !important;";
	}

	for (const t of triggers) {
		t.setAttribute("aria-expanded", open ? "true" : "false");
	}
}

interface InteractiveDialogProps extends RootProps {
	defaultOpen?: boolean;
	/** Close when Escape is pressed. Default: true. */
	closeOnEscape?: boolean;
	/** Close when the backdrop is clicked / interaction occurs outside. Default: true. */
	closeOnInteractOutside?: boolean;
	/** Element to focus when the dialog opens. Defaults to the first focusable. */
	initialFocusEl?: () => HTMLElement | null;
	/** Element to focus when the dialog closes. Defaults to the trigger. */
	finalFocusEl?: () => HTMLElement | null;
}

function InteractiveDialog(props: InteractiveDialogProps) {
	const {
		open: openProp,
		onOpenChange: onOpenChangeProp,
		defaultOpen,
		id: idProp,
		dialogRole,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		initialFocusEl,
		finalFocusEl,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `dialog-${fallbackId}`;
	const rootRef = useRef<HTMLElement>(null);

	const handleOpenChangeRef = useRef<(nextOpen: boolean) => void>(() => {});

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.(nextOpen);
	};

	// Store the handler in a ref
	useEffect(() => {
		handleOpenChangeRef.current = handleOpenChange;
	}, [isControlled, onOpenChangeProp]);

	// Stable reference for all interactive configuration values
	const configRef = useRef({
		closeOnEscape,
		closeOnInteractOutside,
		initialFocusEl,
		finalFocusEl,
	});
	useEffect(() => {
		configRef.current = {
			closeOnEscape,
			closeOnInteractOutside,
			initialFocusEl,
			finalFocusEl,
		};
	});

	// Click delegation (open / close). Backdrop dismiss is gated by closeOnInteractOutside.
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
				if (configRef.current.closeOnInteractOutside) {
					syncDom(root, false);
					handleOpenChangeRef.current?.(false);
				}
			} else if (dataPart === "trigger") {
				const currentOpen = root.getAttribute("data-state") === "open";
				const nextOpen = !currentOpen;
				syncDom(root, nextOpen);
				handleOpenChangeRef.current?.(nextOpen);
			} else if (
				dataPart === "close-trigger" ||
				dataPart === "action-trigger"
			) {
				syncDom(root, false);
				handleOpenChangeRef.current?.(false);
			}
		};

		root.addEventListener("click", handleClick);

		return () => {
			root.removeEventListener("click", handleClick);
		};
	}, []);

	// Accessibility behavior layer: focus trap, Escape, inert background, scroll lock,
	// focus return to trigger on close. Runs whenever `open` changes.
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		// Always synchronize DOM state when open state changes
		syncDom(root, open);

		if (!open) return;
		const content = root.querySelector<HTMLElement>('[data-part="content"]');
		if (!content) return;

		const prevFocus = document.activeElement as HTMLElement | null;
		openDialogRoots.push(root);
		applyInert();

		// Handle body scroll locking
		if (openDialogRoots.length === 1) {
			originalOverflow = document.body.style.overflow;
		}
		document.body.style.overflow = "hidden";

		// Move focus into the dialog (initialFocusEl > first focusable > content)
		const focusables = getFocusable(content);
		(configRef.current.initialFocusEl?.() ?? focusables[0] ?? content).focus();

		const onKeyDown = (e: KeyboardEvent) => {
			// Only the topmost (most recently opened) dialog handles keys
			if (openDialogRoots[openDialogRoots.length - 1] !== root) return;

			if (e.key === "Escape") {
				if (configRef.current.closeOnEscape) {
					e.preventDefault();
					handleOpenChangeRef.current?.(false);
				}
				return;
			}
			if (e.key === "Tab") {
				const f = getFocusable(content);
				if (f.length === 0) {
					e.preventDefault();
					content.focus();
					return;
				}
				const first = f[0];
				const last = f[f.length - 1];
				if (e.shiftKey && document.activeElement === first) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					first.focus();
				}
			}
		};
		root.addEventListener("keydown", onKeyDown);

		return () => {
			root.removeEventListener("keydown", onKeyDown);
			const i = openDialogRoots.indexOf(root);
			if (i !== -1) openDialogRoots.splice(i, 1);
			applyInert();

			if (openDialogRoots.length === 0 && originalOverflow !== undefined) {
				document.body.style.overflow = originalOverflow;
				originalOverflow = undefined;
			}

			// Return focus to the trigger (or finalFocusEl) on close
			(configRef.current.finalFocusEl?.() ?? prevFocus)?.focus?.();
		};
	}, [open]);

	return (
		<Root
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={handleOpenChange}
			rootRef={rootRef}
			dialogRole={dialogRole}
		/>
	);
}

export type {
	ActionTriggerProps,
	BackdropProps,
	BodyProps,
	CloseTriggerProps,
	ContentProps,
	DescriptionProps,
	FooterProps,
	HeaderProps,
	InteractiveDialogProps,
	PositionerProps,
	RootProps,
	TitleProps,
	TriggerProps,
};

export {
	ActionTrigger,
	Backdrop,
	Body,
	CloseTrigger,
	Content,
	Description,
	Footer,
	Header,
	InteractiveDialog,
	Positioner,
	Root,
	Title,
	Trigger,
};
