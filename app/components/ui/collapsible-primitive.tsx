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
import { cx } from "../../../styled-system/css";
import {
	type CollapsibleVariantProps,
	collapsible,
} from "../../../styled-system/recipes";

type CollapsibleStyles = ReturnType<typeof collapsible>;

interface CollapsibleContextValue {
	styles: CollapsibleStyles;
	open: boolean;
	onOpenChange?: (details: { open: boolean }) => void;
	id: string;
}

const CollapsibleContext = createContext<CollapsibleContextValue | null>(null);

const useCollapsibleContext = () => {
	const context = useContext(CollapsibleContext);
	return context;
};

interface RootProps extends CollapsibleVariantProps, PropsWithChildren {
	open?: boolean;
	onOpenChange?: (details: { open: boolean }) => void;
	disabled?: boolean;
	id?: string;
	class?: string;
}

function Root(props: RootProps) {
	const [variantProps, localProps] = collapsible.splitVariantProps(props);
	const {
		children,
		open = false,
		onOpenChange,
		disabled,
		id: idProp,
		class: classProp,
		...restProps
	} = localProps;
	const styles = collapsible(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const value = {
		styles,
		open,
		onOpenChange,
		id,
	};

	return (
		<CollapsibleContext.Provider value={value}>
			<div
				id={id}
				data-scope="collapsible"
				data-part="root"
				data-state={open ? "open" : "closed"}
				data-disabled={disabled ? "" : undefined}
				class={cx(styles.root, classProp)}
				{...restProps}
			>
				{children}
			</div>
		</CollapsibleContext.Provider>
	);
}

interface TriggerProps extends PropsWithChildren {
	class?: string;
	disabled?: boolean;
	asChild?: boolean;
}

function Trigger(props: TriggerProps) {
	const { children, class: classProp, disabled, asChild, ...restProps } = props;
	const context = useCollapsibleContext();
	const styles = context?.styles;
	const open = context?.open;
	const id = context?.id;

	const triggerProps = {
		"aria-expanded": open ? "true" : "false",
		"aria-controls": id ? `${id}-content` : undefined,
		"data-scope": "collapsible",
		"data-part": "trigger",
		"data-state": open ? "open" : "closed",
		"data-disabled": disabled ? "" : undefined,
		disabled: disabled,
		...restProps,
	};

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as any;
		const childProps = child.props || {};
		return cloneElement(child, {
			...triggerProps,
			class: cx(
				styles?.trigger,
				classProp,
				childProps.class || childProps.className,
			),
		});
	}

	return (
		<button
			type="button"
			class={cx(styles?.trigger, classProp)}
			{...triggerProps}
		>
			{children}
		</button>
	);
}

interface ContentProps extends PropsWithChildren {
	class?: string;
}

function Content(props: ContentProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useCollapsibleContext();
	const styles = context?.styles;
	const open = context?.open;
	const id = context?.id;

	return (
		<div
			id={id ? `${id}-content` : undefined}
			data-scope="collapsible"
			data-part="content"
			data-state={open ? "open" : "closed"}
			class={cx(styles?.content, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

interface IndicatorProps extends PropsWithChildren {
	class?: string;
}

function Indicator(props: IndicatorProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useCollapsibleContext();
	const styles = context?.styles;
	const open = context?.open;

	return (
		<div
			data-scope="collapsible"
			data-part="indicator"
			data-state={open ? "open" : "closed"}
			class={cx(styles?.indicator, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

interface InteractiveRootProps extends RootProps {
	defaultOpen?: boolean;
}

function InteractiveRoot(props: InteractiveRootProps) {
	const {
		open: openProp,
		defaultOpen,
		onOpenChange,
		id: idProp,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);
	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `collapsible-${fallbackId}`;

	const onOpenChangeRef = useRef(onOpenChange);
	useEffect(() => {
		onOpenChangeRef.current = onOpenChange;
	}, [onOpenChange]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const handleClick = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest('[data-part="trigger"]');
			if (!target || !root.contains(target)) return;

			const currentOpen = root.getAttribute("data-state") === "open";
			const nextOpen = !currentOpen;

			if (!isControlled) {
				setIsOpen(nextOpen);
			}
			onOpenChangeRef.current?.({ open: nextOpen });

			// Update attributes manually for immediate feedback and to trigger animations
			root.setAttribute("data-state", nextOpen ? "open" : "closed");
			const content = root.querySelector('[data-part="content"]');
			if (content) {
				content.setAttribute("data-state", nextOpen ? "open" : "closed");
			}
			const triggers = root.querySelectorAll('[data-part="trigger"]');
			for (const t of triggers) {
				t.setAttribute("data-state", nextOpen ? "open" : "closed");
				t.setAttribute("aria-expanded", nextOpen ? "true" : "false");
			}
			const indicators = root.querySelectorAll('[data-part="indicator"]');
			for (const i of indicators) {
				i.setAttribute("data-state", nextOpen ? "open" : "closed");
			}
		};

		root.addEventListener("click", handleClick);
		return () => root.removeEventListener("click", handleClick);
	}, [rootId, isControlled]);

	return (
		<Root
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={(details) => {
				if (!isControlled) setIsOpen(details.open);
				onOpenChange?.(details);
			}}
		/>
	);
}

export type {
	ContentProps,
	IndicatorProps,
	InteractiveRootProps,
	RootProps,
	TriggerProps,
};
export { Content, Indicator, InteractiveRoot, Root, Trigger };
