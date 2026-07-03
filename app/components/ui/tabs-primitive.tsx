import type { PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { TabsVariantProps } from "../../../styled-system/recipes";
import { tabs } from "../../../styled-system/recipes";

type TabsStyles = ReturnType<typeof tabs>;

interface TabsContextValue {
	styles: TabsStyles;
	value?: string;
	orientation: "horizontal" | "vertical";
}

export const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	return context;
};

export interface RootProps extends TabsVariantProps, PropsWithChildren {
	value?: string;
	defaultValue?: string;
	orientation?: "horizontal" | "vertical";
	class?: string;
	id?: string;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = tabs.splitVariantProps(props);
	const {
		children,
		value,
		defaultValue,
		orientation = "horizontal",
		class: classProp,
		id: idProp,
		...rest
	} = localProps;

	const styles = tabs(variantProps);
	const fallbackId = useId();
	const id = idProp || `tabs-${fallbackId}`;

	const contextValue: TabsContextValue = {
		styles,
		value: value ?? defaultValue,
		orientation,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="tabs"
				data-part="root"
				data-orientation={orientation}
				class={cx(styles.root, classProp)}
				{...rest}
			>
				{children}
			</div>
		</TabsContext.Provider>
	);
}

export function List(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useTabsContext();
	const styles = context?.styles;
	const orientation = context?.orientation;

	return (
		<div
			data-part="list"
			role="tablist"
			aria-orientation={orientation}
			data-orientation={orientation}
			class={cx(styles?.list, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface TriggerProps extends PropsWithChildren<{
	value: string;
	disabled?: boolean;
	class?: string;
}> {}

export function Trigger(props: TriggerProps) {
	const { children, value, disabled, class: classProp, ...rest } = props;
	const context = useTabsContext();
	const styles = context?.styles;
	const orientation = context?.orientation;
	const selectedValue = context?.value;
	const isSelected = selectedValue === value;

	return (
		<button
			type="button"
			role="tab"
			data-part="trigger"
			data-value={value}
			data-orientation={orientation}
			data-state={isSelected ? "open" : "closed"}
			data-selected={isSelected ? "" : undefined}
			data-disabled={disabled ? "" : undefined}
			aria-selected={isSelected}
			aria-disabled={disabled}
			disabled={disabled}
			class={cx(styles?.trigger, classProp)}
			{...rest}
		>
			{children}
		</button>
	);
}

export interface ContentProps extends PropsWithChildren<{
	value: string;
	class?: string;
}> {}

export function Content(props: ContentProps) {
	const { children, value, class: classProp, ...rest } = props;
	const context = useTabsContext();
	const styles = context?.styles;
	const orientation = context?.orientation;
	const selectedValue = context?.value;
	const isSelected = selectedValue === value;

	return (
		<div
			data-part="content"
			role="tabpanel"
			data-value={value}
			data-orientation={orientation}
			data-state={isSelected ? "open" : "closed"}
			hidden={!isSelected}
			class={cx(styles?.content, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Indicator(props: { class?: string }) {
	const { class: classProp, ...rest } = props;
	const context = useTabsContext();
	const styles = context?.styles;
	const orientation = context?.orientation;

	return (
		<div
			data-part="indicator"
			data-orientation={orientation}
			class={cx(styles?.indicator, classProp)}
			{...rest}
		/>
	);
}
