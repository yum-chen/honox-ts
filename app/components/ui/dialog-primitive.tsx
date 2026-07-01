import type { PropsWithChildren } from "hono/jsx";
import { cloneElement, createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
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
		<DialogContext.Provider value={value}>{children}</DialogContext.Provider>
	);
}

export interface TriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function Trigger(props: TriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useDialogContext();
	const onOpenChange = context?.onOpenChange;
	const open = context?.open;

	const triggerProps = {
		"aria-haspopup": "dialog",
		"aria-expanded": open,
		onClick: () => onOpenChange?.(!open),
		class: cx(classProp),
		...restProps,
	};

	if (asChild && children) {
		return cloneElement(children as any, triggerProps);
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
	if (!context) return null;
	const { styles, open, onOpenChange } = context;

	if (!open) return null;

	return (
		<div
			class={cx(styles.backdrop, classProp)}
			data-state={open ? "open" : "closed"}
			onClick={() => onOpenChange?.(false)}
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
	if (!context) return null;
	const { styles, open } = context;

	if (!open) return null;

	return (
		<div
			class={cx(styles.positioner, classProp)}
			data-state={open ? "open" : "closed"}
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
	if (!context) return null;
	const { styles, open, id } = context;

	if (!open) return null;

	return (
		<div
			role="dialog"
			id={id}
			aria-modal="true"
			aria-labelledby={`${id}-title`}
			aria-describedby={`${id}-description`}
			class={cx(styles.content, classProp)}
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
	const onOpenChange = context?.onOpenChange;

	const triggerProps = {
		onClick: () => onOpenChange?.(false),
		...restProps,
	};

	return (
		<div class={cx(styles?.closeTrigger, classProp)}>
			{asChild && children ? (
				cloneElement(children as any, triggerProps)
			) : (
				<button type="button" aria-label="Close" {...triggerProps}>
					{children}
				</button>
			)}
		</div>
	);
}

export interface ActionTriggerProps extends PropsWithChildren {
	class?: string;
	asChild?: boolean;
}

export function ActionTrigger(props: ActionTriggerProps) {
	const { children, class: classProp, asChild, ...restProps } = props;
	const context = useDialogContext();
	const onOpenChange = context?.onOpenChange;

	const triggerProps = {
		onClick: () => onOpenChange?.(false),
		class: cx(classProp),
		...restProps,
	};

	if (asChild && children) {
		return cloneElement(children as any, triggerProps);
	}

	return (
		<button type="button" {...triggerProps}>
			{children}
		</button>
	);
}
