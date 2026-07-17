import type { JSX } from "hono/jsx";
import { isValidElement } from "hono/jsx";
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

// HonoX only diverts *top-level* element props into live `<template>` slots;
// anything nested one level deeper (a JSX field inside the `items` array) is
// JSON-serialized instead, which silently drops component vnodes because
// functions can't survive `JSON.stringify`. To carry those across the island
// boundary intact we hoist each element-valued item field into its own
// top-level `__slot_<index>_<field>` prop, which the island reassembles by key.
// See the honox-island-jsx-props-serialization note.
const ITEM_SLOT_FIELDS = [
	"label",
	"content",
	"children",
	"icon",
	"closeIcon",
] as const;

// Mirrors HonoX's own `isElementPropValue` so our hoist decision matches its
// serialize decision exactly (an array counts if any member is element-valued).
const isElementValue = (value: unknown): boolean =>
	Array.isArray(value)
		? value.some(isElementValue)
		: typeof value === "object" && value !== null && isValidElement(value);

function liftItemSlots(items: TabsItemFromPrimitive[] | undefined): {
	items: TabsItemFromPrimitive[] | undefined;
	slots: Record<string, JSX.Element>;
} {
	const slots: Record<string, JSX.Element> = {};
	if (!items) return { items, slots };
	const serializable = items.map((item, index) => {
		let next = item;
		for (const field of ITEM_SLOT_FIELDS) {
			const value = (item as Record<string, unknown>)[field];
			if (isElementValue(value)) {
				// Copy on first hoist so the caller's original item is untouched.
				if (next === item) next = { ...item };
				slots[`__slot_${index}_${field}`] = value as JSX.Element;
				delete (next as Record<string, unknown>)[field];
			}
		}
		return next;
	});
	return { items: serializable, slots };
}

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
		rootProps.deselectable !== undefined ||
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
		const { items: serializableItems, slots } = liftItemSlots(items);
		return (
			<InteractiveTabsIsland
				{...rootProps}
				items={serializableItems as TabsStructureProps["items"]}
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
				{...(slots as Record<string, never>)}
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
