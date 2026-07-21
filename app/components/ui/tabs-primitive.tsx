import { cx } from "design-system/css";
import { type TabsVariantProps, tabs } from "design-system/recipes";
import type { JSX } from "hono/jsx";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useId,
} from "hono/jsx";

type TabsStyles = ReturnType<typeof tabs>;

interface TabsContextValue {
	styles: TabsStyles;
	value?: string;
	onValueChange?: (value: string) => void;
	id: string;
	orientation: "horizontal" | "vertical";
	disabled?: boolean;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	if (!context) {
		if (typeof window === "undefined") {
			return {
				id: "ssr-tabs",
				styles: tabs({}),
				orientation: "horizontal",
			} as TabsContextValue;
		}
		throw new Error("useTabsContext must be used within a Tabs.Root");
	}
	return context;
};

export interface RootProps extends TabsVariantProps, PropsWithChildren {
	defaultValue?: string;
	value?: string;
	onValueChange?: (value: string) => void;
	id?: string;
	orientation?: "horizontal" | "vertical";
	disabled?: boolean;
	rootRef?: any;
	class?: string;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = tabs.splitVariantProps(props);
	const {
		children,
		value,
		defaultValue,
		onValueChange,
		id: idProp,
		orientation = "horizontal",
		disabled,
		rootRef,
		...rest
	} = localProps;

	const styles = tabs(variantProps);
	const fallbackId = useId();
	const id = idProp || fallbackId;

	const contextValue: TabsContextValue = {
		styles,
		value: value ?? defaultValue,
		onValueChange,
		id,
		orientation,
		disabled,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<div
				id={id}
				ref={rootRef}
				class={cx(styles.root, localProps.class)}
				data-orientation={orientation}
				data-disabled={disabled ? "" : undefined}
				data-scope="tabs"
				data-part="root"
				{...rest}
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
	const context = useTabsContext();
	return (
		<div
			role="tablist"
			aria-orientation={context.orientation}
			class={cx(context.styles.list, props.class)}
			data-scope="tabs"
			data-part="list"
		>
			{props.children}
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
	const isDisabled = disabled || context.disabled;

	return (
		<button
			type="button"
			role="tab"
			aria-selected={isSelected ? "true" : "false"}
			aria-controls={`${context.id}-panel-${value}`}
			id={`${context.id}-trigger-${value}`}
			disabled={isDisabled}
			class={cx(context.styles.trigger, classProp)}
			data-scope="tabs"
			data-part="trigger"
			data-value={value}
			data-selected={isSelected ? "" : undefined}
			data-state={isSelected ? "active" : "inactive"}
			data-disabled={isDisabled ? "" : undefined}
			tabIndex={isSelected && !isDisabled ? 0 : -1}
			{...rest}
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
	const { value, children, class: classProp, ...rest } = props;
	const context = useTabsContext();
	const isSelected = context.value === value;

	return (
		<div
			role="tabpanel"
			aria-labelledby={`${context.id}-trigger-${value}`}
			id={`${context.id}-panel-${value}`}
			class={cx(context.styles.content, classProp)}
			data-scope="tabs"
			data-part="content"
			data-value={value}
			data-state={isSelected ? "active" : "inactive"}
			data-selected={isSelected ? "" : undefined}
			style={{ display: isSelected ? undefined : "none" }}
			tabIndex={0}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface IndicatorProps {
	class?: string;
	style?: any;
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
			style={style}
			{...rest}
		/>
	);
}

export interface TabItem {
	value: string;
	label: string | JSX.Element;
	content: string | JSX.Element;
	disabled?: boolean;
}

export interface TabsStructureProps {
	items: TabItem[];
}

export const TabsStructure = (props: TabsStructureProps) => {
	const { items } = props;
	return (
		<>
			<List>
				{items.map((item) => (
					<Trigger key={item.value} value={item.value} disabled={item.disabled}>
						{item.label}
					</Trigger>
				))}
				<Indicator />
			</List>
			{items.map((item) => (
				<Content key={item.value} value={item.value}>
					{item.content}
				</Content>
			))}
		</>
	);
};
