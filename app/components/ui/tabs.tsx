import TabsIsland from "../../islands/tabs";
import { shouldHydrate } from "./island-utils";
import {
	Content,
	Indicator,
	List,
	Root,
	type RootProps,
	TabsStructure,
	type TabsStructureProps,
	Trigger,
} from "./tabs-primitive";

export interface TabsProps extends RootProps, Partial<TabsStructureProps> {
	interactive?: boolean;
}

export function liftItemSlots(items?: any[]) {
	if (!items) return null;
	return <TabsStructure items={items} />;
}

const TabsRoot = (props: TabsProps) => {
	const { interactive, ...rest } = props;

	const hasSignal =
		rest.value !== undefined ||
		rest.defaultValue !== undefined ||
		rest.onValueChange !== undefined;

	if (shouldHydrate(interactive, hasSignal)) {
		const children = props.children || liftItemSlots(props.items);
		const { items, ...islandProps } = rest;
		return (
			<TabsIsland {...(islandProps as any)}>
				{children}
			</TabsIsland>
		);
	}

	return (
		<Root {...rest}>
			{props.children || (rest.items && <TabsStructure items={rest.items} />)}
		</Root>
	);
};

export const Tabs = Object.assign(TabsRoot, {
	Root: TabsRoot,
	List: List,
	Trigger: Trigger,
	Content: Content,
	Indicator: Indicator,
	Items: TabsStructure,
});

export type { TabsProps };
export default Tabs;
