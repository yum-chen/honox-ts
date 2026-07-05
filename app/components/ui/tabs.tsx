import InteractiveTabsIsland from "../../islands/tabs";
import {
	Content,
	Indicator,
	type RootProps as InteractiveRootProps,
	List,
	Root,
	TabsStructure,
	type TabsStructureProps,
	Trigger,
} from "./tabs-primitive";

export type { TabsItem } from "./tabs-primitive";

export interface TabsProps extends InteractiveRootProps, TabsStructureProps {
	interactive?: boolean;
}

const TabsRoot = (props: TabsProps) => {
	const { interactive = true, ...rest } = props;

	if (interactive) {
		return <InteractiveTabsIsland {...rest} />;
	}

	return (
		<Root {...rest}>
			{props.children || (
				<TabsStructure items={rest.items} indicator={rest.indicator} />
			)}
		</Root>
	);
};

export const Tabs = Object.assign(TabsRoot, {
	Root: TabsRoot,
	List,
	Trigger,
	Content,
	Indicator,
});

export default Tabs;
