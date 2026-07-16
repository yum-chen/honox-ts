import InteractiveTabsIsland from "../../islands/tabs";
import { shouldHydrate } from "./island-utils";
import {
	AddTrigger,
	Content,
	Indicator,
	type RootProps as InteractiveRootProps,
	List,
	Root,
	TabsStructure,
	type TabsStructureProps,
	Trigger,
} from "./tabs-primitive";

type TabsItemFromPrimitive = import("./tabs-primitive").TabsItem;

export interface TabsProps extends InteractiveRootProps, TabsStructureProps {
	interactive?: boolean;
	onEdit?: (key: any, action: "add" | "remove") => void;
}

const TabsRoot = (props: TabsProps) => {
	const {
		interactive,
		children,
		items,
		indicator,
		closable,
		editable,
		hideAdd,
		onTabClose,
		onTabAdd,
		addAriaLabel,
		extra,
		tabBarExtraContent,
		onEdit,
		...rootProps
	} = props;

	const resolvedEditable =
		editable ?? (props.type === "editable-card" ? true : undefined);

	const hasSignal =
		rootProps.value !== undefined ||
		rootProps.defaultValue !== undefined ||
		rootProps.onValueChange !== undefined ||
		rootProps.activeKey !== undefined ||
		rootProps.defaultActiveKey !== undefined ||
		rootProps.onChange !== undefined ||
		rootProps.onTabClick !== undefined ||
		rootProps.onTabScroll !== undefined ||
		onEdit !== undefined ||
		closable !== undefined ||
		resolvedEditable !== undefined ||
		onTabClose !== undefined ||
		onTabAdd !== undefined;

	// With no explicit selection signal, default to the first enabled tab so
	// the initial render always has an active pane (items form only — the
	// composable-children form owns its own Trigger/Content values). Applied
	// after `hasSignal` so the derived default never triggers hydration.
	if (
		items &&
		rootProps.value === undefined &&
		rootProps.activeKey === undefined &&
		rootProps.defaultValue === undefined &&
		rootProps.defaultActiveKey === undefined
	) {
		const firstEnabled = items.find((item) => !item.disabled);
		rootProps.defaultValue = firstEnabled?.value ?? firstEnabled?.key;
	}

	if (shouldHydrate(interactive, hasSignal)) {
		return (
			<InteractiveTabsIsland
				{...rootProps}
				items={items}
				indicator={indicator}
				closable={closable}
				editable={resolvedEditable}
				hideAdd={hideAdd}
				onTabClose={onTabClose}
				onTabAdd={onTabAdd}
				addAriaLabel={addAriaLabel}
				extra={extra}
				tabBarExtraContent={tabBarExtraContent}
				onEdit={onEdit}
			>
				{children}
			</InteractiveTabsIsland>
		);
	}

	return (
		<Root {...rootProps}>
			{children || (
				<TabsStructure
					items={items ?? []}
					indicator={indicator}
					closable={closable}
					editable={resolvedEditable}
					hideAdd={hideAdd}
					onTabClose={onTabClose}
					onTabAdd={onTabAdd}
					addAriaLabel={addAriaLabel}
					extra={extra}
					tabBarExtraContent={tabBarExtraContent}
				/>
			)}
		</Root>
	);
};

type CompoundedComponent = typeof TabsRoot & {
	List: typeof List;
	Trigger: typeof Trigger;
	Content: typeof Content;
	Indicator: typeof Indicator;
	AddTrigger: typeof AddTrigger;
};

const Tabs = TabsRoot as CompoundedComponent;
Tabs.List = List;
Tabs.Trigger = Trigger;
Tabs.Content = Content;
Tabs.Indicator = Indicator;
Tabs.AddTrigger = AddTrigger;

export type { IndicatorConfig as TabsIndicatorConfig } from "./tabs-primitive";

export type { TabsItemFromPrimitive as TabsItem };
export {
	AddTrigger as TabsAddTrigger,
	Content as TabsContent,
	Indicator as TabsIndicator,
	List as TabsList,
	Tabs,
	Trigger as TabsTrigger,
};
export default Tabs;
