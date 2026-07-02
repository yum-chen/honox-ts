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
	console.log("[InteractiveRoot] Rendering");
	const {
		open: openProp,
		defaultOpen,
		onOpenChange: onOpenChangeProp,
		id: idProp,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);
	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `collapsible-${fallbackId}`;
	console.log("[InteractiveRoot] rootId:", rootId, "open:", open);

	const handleOpenChangeRef = useRef<(nextOpen: boolean) => void>(() => {});

	const handleOpenChange = (nextOpen: boolean) => {
		console.log("[InteractiveRoot] handleOpenChange:", nextOpen);
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.({ open: nextOpen });
	};

	// Store the handler in a ref
	useEffect(() => {
		console.log("[InteractiveRoot] Updating handleOpenChangeRef");
		handleOpenChangeRef.current = handleOpenChange;
	}, [isControlled, onOpenChangeProp]);

	// Sync initial DOM state to match component state (fixes hydration mismatch)
	useEffect(() => {
		console.log(
			"[InteractiveRoot] Hydration sync effect, looking for:",
			rootId,
		);
		const root = document.getElementById(rootId);
		console.log("[InteractiveRoot] Root element found:", !!root);
		if (!root) return;
		root.setAttribute("data-state", open ? "open" : "closed");
		const contentElements = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="content"]'),
		);
		contentElements.forEach((content) => {
			content.setAttribute("data-state", open ? "open" : "closed");
			if (open) {
				content.style.cssText =
					"display: block !important; visibility: visible !important;";
			} else {
				content.style.cssText =
					"display: none !important; visibility: hidden !important;";
			}
		});
		const triggers = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
		);
		triggers.forEach((t) => {
			t.setAttribute("data-state", open ? "open" : "closed");
			t.setAttribute("aria-expanded", open ? "true" : "false");
		});
		const indicators = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="indicator"]'),
		);
		indicators.forEach((i) => {
			i.setAttribute("data-state", open ? "open" : "closed");
		});
	}, [rootId, open]);

	useEffect(() => {
		console.log(
			"[InteractiveRoot] Event listener effect, looking for:",
			rootId,
		);
		const root = document.getElementById(rootId);
		console.log("[InteractiveRoot] Root element found for listeners:", !!root);
		if (!root) {
			console.log("[InteractiveRoot] ERROR: Root not found!");
			return;
		}

		const handleClick = (e: Event) => {
			console.log("[InteractiveRoot] Click event!", e.target);
			const target = (e.target as HTMLElement).closest(
				"[data-part]",
			) as HTMLElement;
			if (!target) {
				console.log("[InteractiveRoot] No [data-part] found");
				return;
			}
			const dataPart = target.getAttribute("data-part");
			console.log("[InteractiveRoot] dataPart:", dataPart);

			if (dataPart !== "trigger") {
				console.log("[InteractiveRoot] Not a trigger, ignoring");
				return;
			}
			console.log("[InteractiveRoot] Trigger clicked!");

			const currentOpen = root.getAttribute("data-state") === "open";
			const nextOpen = !currentOpen;
			console.log("[InteractiveRoot] Toggle:", currentOpen, "=>", nextOpen);
			handleOpenChangeRef.current?.(nextOpen);

			// Update attributes manually for immediate feedback and to trigger animations
			root.setAttribute("data-state", nextOpen ? "open" : "closed");
			const contentElements = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="content"]'),
			);
			contentElements.forEach((content) => {
				content.setAttribute("data-state", nextOpen ? "open" : "closed");
				// Also set display styles to ensure visibility
				if (nextOpen) {
					content.style.cssText =
						"display: block !important; visibility: visible !important;";
				} else {
					content.style.cssText =
						"display: none !important; visibility: hidden !important;";
				}
			});
			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
			);
			triggers.forEach((t) => {
				t.setAttribute("data-state", nextOpen ? "open" : "closed");
				t.setAttribute("aria-expanded", nextOpen ? "true" : "false");
			});
			const indicators = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="indicator"]'),
			);
			indicators.forEach((i) => {
				i.setAttribute("data-state", nextOpen ? "open" : "closed");
			});
		};

		root.addEventListener("click", handleClick);
		console.log("[InteractiveRoot] Event listener attached to:", rootId);

		return () => {
			root.removeEventListener("click", handleClick);
			console.log("[InteractiveRoot] Event listener removed");
		};
	}, [rootId]);

	return (
		<Root
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={(details) => {
				handleOpenChangeRef.current?.(details.open);
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
