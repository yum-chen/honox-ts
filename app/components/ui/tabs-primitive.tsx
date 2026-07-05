import {
	createContext,
	type PropsWithChildren,
	useContext,
	useId,
} from "hono/jsx";
import { cx } from "styled-system/css";
import { type TabsVariantProps, tabs } from "styled-system/recipes";

type TabsStyles = ReturnType<typeof tabs>;

interface TabsContextValue {
	id: string;
	value: string | undefined;
	orientation: "horizontal" | "vertical";
	styles: TabsStyles;
}

const TabsContext = createContext<TabsContextValue | null>(null);

export const useTabsContext = () => {
	const context = useContext(TabsContext);
	return context;
};

export interface RootProps extends TabsVariantProps, PropsWithChildren {
	id?: string;
	defaultValue?: string;
	orientation?: "horizontal" | "vertical";
	class?: string;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = tabs.splitVariantProps(props);
	const {
		id: idProp,
		defaultValue,
		orientation = "horizontal",
		children,
		class: classProp,
		...restProps
	} = localProps;
	const autoId = useId();
	const id = idProp || autoId;
	const styles = tabs(variantProps);

	const contextValue: TabsContextValue = {
		id,
		value: defaultValue,
		orientation,
		styles,
	};

	return (
		<TabsContext.Provider value={contextValue}>
			<div
				id={id}
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
}

export function List(props: ListProps) {
	const { children, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const styles = context?.styles || tabs({});

	return (
		<div
			role="tablist"
			aria-orientation={context?.orientation}
			class={cx(styles.list, classProp)}
			data-orientation={context?.orientation}
			data-part="list"
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
	const { value, disabled, children, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const styles = context?.styles || tabs({});
	const isSelected = context?.value === value;

	return (
		<button
			type="button"
			role="tab"
			id={`${context?.id}-trigger-${value}`}
			aria-selected={isSelected}
			aria-controls={`${context?.id}-content-${value}`}
			data-selected={isSelected ? "" : undefined}
			data-value={value}
			data-disabled={disabled ? "" : undefined}
			data-orientation={context?.orientation}
			disabled={disabled}
			class={cx(styles.trigger, classProp)}
			data-part="trigger"
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
	const { value, children, class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const styles = context?.styles || tabs({});
	const isSelected = context?.value === value;

	return (
		<div
			role="tabpanel"
			id={`${context?.id}-content-${value}`}
			aria-labelledby={`${context?.id}-trigger-${value}`}
			data-selected={isSelected ? "" : undefined}
			data-value={value}
			data-orientation={context?.orientation}
			class={cx(styles.content, classProp)}
			data-part="content"
			hidden={!isSelected}
			{...restProps}
		>
			{children}
		</div>
	);
}

export function Indicator(props: { class?: string }) {
	const { class: classProp, ...restProps } = props;
	const context = useTabsContext();
	const styles = context?.styles || tabs({});

	return (
		<div
			data-part="indicator"
			data-orientation={context?.orientation}
			class={cx(styles.indicator, classProp)}
			{...restProps}
		/>
	);
}

export interface InteractiveRootProps extends RootProps {
	// Add interactive specific props if any
}

export function InteractiveRoot(props: InteractiveRootProps) {
	return <Root {...props} />;
}

export { TabsContext as Context };
