import type { PropsWithChildren } from "hono/jsx";
import { cloneElement, createContext, useContext, useId } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import type { DialogVariantProps } from "../../../styled-system/recipes";
import { dialog } from "../../../styled-system/recipes";

type DialogStyles = ReturnType<typeof dialog>;

interface DialogContextValue {
	styles: DialogStyles;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	id: string;
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
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = dialog.splitVariantProps(props);
	const { children, open, onOpenChange, id: idProp } = localProps;
	const styles = dialog(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const value = {
		styles,
		open,
		onOpenChange,
		id,
	};

	return (
		<div id={id}>
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
			class={cx(styles.backdrop, classProp, !open && css({ display: "none" }))}
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
}

export function Content(props: ContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles || dialog();
	const open = context?.open;
	const id = context?.id;

	return (
		<div
			role="dialog"
			data-part="content"
			aria-modal="true"
			aria-labelledby={id ? `${id}-title` : undefined}
			aria-describedby={id ? `${id}-description` : undefined}
			class={cx(styles.content, classProp, !open && css({ display: "none" }))}
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
	const styles = context?.styles;

	return (
		<div class={cx(styles?.header, classProp)} {...restProps}>
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
	const styles = context?.styles;

	return (
		<div class={cx(styles?.body, classProp)} {...restProps}>
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
	const styles = context?.styles;

	return (
		<div class={cx(styles?.footer, classProp)} {...restProps}>
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
	const styles = context?.styles;
	const id = context?.id;

	return (
		<h2
			id={id ? `${id}-title` : undefined}
			class={cx(styles?.title, classProp)}
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
	const styles = context?.styles;
	const id = context?.id;

	return (
		<div
			id={id ? `${id}-description` : undefined}
			class={cx(styles?.description, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface CloseTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function CloseTrigger(props: CloseTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useDialogContext();
	const styles = context?.styles;

	const triggerProps = {
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
			aria-label="Close"
			class={cx(styles?.closeTrigger, classProp)}
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
