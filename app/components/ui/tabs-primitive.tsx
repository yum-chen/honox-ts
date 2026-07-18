import { cx } from "design-system/css";
import type { TabsVariantProps } from "design-system/recipes";
import { tabs } from "design-system/recipes";
import type { PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";

type TabsStyles = ReturnType<typeof tabs>;

interface TabsContextValue {
	styles: TabsStyles;
	orientation: "horizontal" | "vertical";
	activationMode: "automatic" | "manual";
	value: string;
	rootId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		if (typeof window === "undefined") {
			return {
				styles: tabs({}),
				orientation: "horizontal",
				activationMode: "automatic",
				value: "",
				rootId: "ssr-tabs",
			} as TabsContextValue;
		}
		throw new Error("useTabsContext must be used within a Tabs.Root");
	}
	return context;
};

export interface RootProps extends TabsVariantProps, PropsWithChildren {
	orientation?: "horizontal" | "vertical";
	activationMode?: "automatic" | "manual";
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	class?: string;
	id?: string;
	style?: Record<string, string | number>;
	// biome-ignore lint/suspicious/noExplicitAny: ref can be of any type
	rootRef?: any;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = tabs.splitVariantProps(props);
	const {
		children,
		value: valueProp,
		defaultValue,
		orientation = "horizontal",
		activationMode = "automatic",
		class: classProp,
		id: idProp,
		rootRef,
		...restProps
	} = localProps;

	const styles = tabs(variantProps);
	const fallbackId = useId();
	const rootId = idProp || `tabs-root-${fallbackId}`;
	const value = valueProp ?? defaultValue ?? "";

	const contextValue: TabsContextValue = {
		styles,
		orientation,
		activationMode,
		value,
		rootId,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<div
				id={rootId}
				ref={rootRef}
				data-scope="tabs"
				data-part="root"
				class={cx(styles.root, classProp)}
				data-orientation={orientation}
				{...restProps}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export interface ListProps extends PropsWithChildren {
	class?: string;
	style?: Record<string, string | number>;
}

export function List(props: ListProps) {
	const { children, class: classProp, ...rest } = props;
	const context = useTabsContext();

	return (
		<div
			role="tablist"
			aria-orientation={context.orientation}
			data-scope="tabs"
			data-part="list"
			data-orientation={context.orientation}
			class={cx(context.styles.list, classProp)}
			{...rest}
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
	const { value, disabled, children, class: classProp, ...rest } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;
	const isDisabled = disabled;

	const triggerId = `${context.rootId}-trigger-${value}`;
	const contentId = `${context.rootId}-content-${value}`;

	return (
		<button
			type="button"
			role="tab"
			id={triggerId}
			aria-selected={isSelected ? "true" : "false"}
			aria-controls={contentId}
			disabled={isDisabled}
			class={cx(context.styles.trigger, classProp)}
			data-scope="tabs"
			data-part="trigger"
			data-value={value}
			data-orientation={context.orientation}
			data-state={isSelected ? "active" : "inactive"}
			data-selected={isSelected ? "" : undefined}
			data-disabled={isDisabled ? "" : undefined}
			tabIndex={isSelected ? 0 : -1}
			{...rest}
		>
			{children}
		</button>
	);
}

export interface ContentProps extends PropsWithChildren {
	value: string;
	class?: string;
	style?: Record<string, string | number>;
}

export function Content(props: ContentProps) {
	const { value, children, class: classProp, style, ...rest } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;

	const triggerId = `${context.rootId}-trigger-${value}`;
	const contentId = `${context.rootId}-content-${value}`;

	return (
		<div
			role="tabpanel"
			id={contentId}
			aria-labelledby={triggerId}
			data-scope="tabs"
			data-part="content"
			data-value={value}
			data-orientation={context.orientation}
			data-state={isSelected ? "active" : "inactive"}
			data-selected={isSelected ? "" : undefined}
			class={cx(context.styles.content, classProp)}
			hidden={!isSelected}
			style={{
				display: isSelected ? undefined : "none",
				...style,
			}}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface IndicatorProps {
	class?: string;
	style?: Record<string, string | number>;
}

export function Indicator(props: IndicatorProps) {
	const { class: classProp, style, ...rest } = props;
	const context = useTabsContext();

	return (
		<div
			data-scope="tabs"
			data-part="indicator"
			data-orientation={context.orientation}
			class={cx(context.styles.indicator, classProp)}
			style={{
				position: "absolute",
				left: "var(--left)",
				top: "var(--top)",
				...style,
			}}
			{...rest}
		/>
	);
}
