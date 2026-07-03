import type { PropsWithChildren } from "hono/jsx";
import {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { cx } from "styled-system/css";
import { type TabsVariantProps, tabs } from "styled-system/recipes";

type TabsStyles = ReturnType<typeof tabs>;

interface TabsContextValue {
	styles: TabsStyles;
	value?: string;
	onValueChange?: (details: { value: string }) => void;
	orientation?: "horizontal" | "vertical";
	lazyMount?: boolean;
	unmountOnExit?: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		throw new Error("useTabsContext must be used within a Tabs.Root");
	}
	return context;
};

export interface RootProps extends TabsVariantProps, PropsWithChildren {
	value?: string;
	defaultValue?: string;
	onValueChange?: (details: { value: string }) => void;
	orientation?: "horizontal" | "vertical";
	id?: string;
	class?: string;
	lazyMount?: boolean;
	unmountOnExit?: boolean;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = tabs.splitVariantProps(props);
	const {
		children,
		value: valueProp,
		defaultValue,
		onValueChange,
		orientation = "horizontal",
		id,
		class: classProp,
		lazyMount,
		unmountOnExit,
		...restProps
	} = localProps;
	const styles = tabs(variantProps);

	const value = valueProp ?? defaultValue;

	const contextValue = {
		styles,
		value,
		onValueChange,
		orientation,
		lazyMount,
		unmountOnExit,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="tabs"
				data-part="root"
				data-orientation={orientation}
				class={cx(styles.root, classProp)}
				{...restProps}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export interface ListProps extends PropsWithChildren {
	class?: string;
}

export function List(props: ListProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	return (
		<div
			role="tablist"
			data-scope="tabs"
			data-part="list"
			data-orientation={context.orientation}
			class={cx(context.styles.list, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface TriggerProps extends PropsWithChildren {
	value: string;
	disabled?: boolean;
	class?: string;
}

export function Trigger(props: TriggerProps) {
	const { children, value, disabled, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isSelected ? "true" : "false"}
			aria-disabled={disabled ? "true" : undefined}
			data-scope="tabs"
			data-part="trigger"
			data-value={value}
			data-state={isSelected ? "active" : "inactive"}
			data-disabled={disabled ? "" : undefined}
			disabled={disabled}
			tabIndex={isSelected ? 0 : -1}
			class={cx(context.styles.trigger, classProp)}
			{...restProps}
		>
			{children}
		</button>
	);
}

export interface ContentProps extends PropsWithChildren {
	value: string;
	class?: string;
}

export function Content(props: ContentProps) {
	const { children, value, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;

	const [hasMounted, setHasMounted] = useState(isSelected);

	useEffect(() => {
		if (isSelected && !hasMounted) {
			setHasMounted(true);
		}
	}, [isSelected, hasMounted]);

	const shouldRender = context.unmountOnExit
		? isSelected
		: context.lazyMount
			? hasMounted
			: true;

	if (!shouldRender) return null;

	return (
		<div
			role="tabpanel"
			data-scope="tabs"
			data-part="content"
			data-value={value}
			data-state={isSelected ? "active" : "inactive"}
			hidden={!isSelected}
			class={cx(context.styles.content, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface IndicatorProps extends PropsWithChildren {
	class?: string;
}

export function Indicator(props: IndicatorProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	return (
		<div
			data-scope="tabs"
			data-part="indicator"
			class={cx(context.styles.indicator, classProp)}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface InteractiveRootProps extends RootProps {
	activationMode?: "manual" | "automatic";
}

export function InteractiveRoot(props: InteractiveRootProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		orientation = "horizontal",
		activationMode = "automatic",
		id: idProp,
		lazyMount,
		unmountOnExit,
		...rest
	} = props;
	const [selectedValue, setSelectedValue] = useState(
		valueProp ?? defaultValue ?? "",
	);
	const isControlled = valueProp !== undefined;
	const value = isControlled ? valueProp : selectedValue;

	const fallbackId = useId();
	const rootId = idProp || `tabs-${fallbackId}`;

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const updateIndicator = (val: string) => {
			const activeTrigger = root.querySelector(
				`[data-part="trigger"][data-value="${val}"]`,
			) as HTMLElement;
			const indicator = root.querySelector(
				'[data-part="indicator"]',
			) as HTMLElement;

			if (activeTrigger && indicator) {
				indicator.style.setProperty("--width", `${activeTrigger.offsetWidth}px`);
				indicator.style.setProperty(
					"--height",
					`${activeTrigger.offsetHeight}px`,
				);

				const x = activeTrigger.offsetLeft;
				const y = activeTrigger.offsetTop;

				indicator.style.transform = `translate3d(${x}px, ${y}px, 0)`;
				indicator.style.position = "absolute";
				indicator.style.transitionProperty = "width, height, transform";
				indicator.style.transitionDuration = "200ms";
			} else if (indicator) {
				indicator.style.setProperty("--width", "0px");
				indicator.style.setProperty("--height", "0px");
			}
		};

		const handleSelection = (newValue: string) => {
			if (!isControlled) {
				setSelectedValue(newValue);
			}
			onValueChange?.({ value: newValue });
		};

		const handleClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest(
				'[data-part="trigger"]',
			) as HTMLElement;
			if (!trigger || trigger.hasAttribute("data-disabled")) return;
			const val = trigger.getAttribute("data-value");
			if (val) handleSelection(val);
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const trigger = (e.target as HTMLElement).closest(
				'[data-part="trigger"]',
			) as HTMLElement;
			if (!trigger) return;

			const triggers = Array.from(
				root.querySelectorAll('[data-part="trigger"]:not([data-disabled])'),
			) as HTMLElement[];
			const currentIndex = triggers.indexOf(trigger);

			let nextIndex = -1;
			if (orientation === "horizontal") {
				if (e.key === "ArrowRight")
					nextIndex = (currentIndex + 1) % triggers.length;
				else if (e.key === "ArrowLeft")
					nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
			} else {
				if (e.key === "ArrowDown")
					nextIndex = (currentIndex + 1) % triggers.length;
				else if (e.key === "ArrowUp")
					nextIndex = (currentIndex - 1 + triggers.length) % triggers.length;
			}

			if (e.key === "Home") nextIndex = 0;
			else if (e.key === "End") nextIndex = triggers.length - 1;

			if (nextIndex !== -1) {
				const nextTrigger = triggers[nextIndex];
				if (nextTrigger) {
					nextTrigger.focus();
					if (activationMode === "automatic") {
						const val = nextTrigger.getAttribute("data-value");
						if (val) handleSelection(val);
					}
					e.preventDefault();
				}
			}

			if (
				activationMode === "manual" &&
				(e.key === "Enter" || e.key === " ")
			) {
				const val = trigger.getAttribute("data-value");
				if (val) handleSelection(val);
				e.preventDefault();
			}
		};

		root.addEventListener("click", handleClick);
		root.addEventListener("keydown", handleKeyDown);

		// Initial indicator position
		updateIndicator(value);

		// Add data-hydrated attribute
		root.setAttribute("data-hydrated", "true");

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
		};
	}, [rootId, isControlled, orientation, activationMode, value, onValueChange]);

	return (
		<Root
			{...rest}
			id={rootId}
			value={value}
			orientation={orientation}
			lazyMount={lazyMount}
			unmountOnExit={unmountOnExit}
		>
			{children}
		</Root>
	);
}

export { TabsContext as Context };
