import InteractiveTabsIsland from "../../islands/tabs";
import { shouldHydrate } from "./island-utils";
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

type TabsItemFromPrimitive = import("./tabs-primitive").TabsItem;

interface TabsProps extends InteractiveRootProps, TabsStructureProps {
	interactive?: boolean;
}

const TabsRoot = (props: TabsProps) => {
	const { interactive, ...rest } = props;

	const hasSignal =
		rest.value !== undefined ||
		rest.defaultValue !== undefined ||
		rest.onValueChange !== undefined;

	if (shouldHydrate(interactive, hasSignal)) {
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

export const Tabs = TabsRoot;
export type { TabsItemFromPrimitive as TabsItem, TabsProps };
export {
	Content as TabsContent,
	Indicator as TabsIndicator,
	List as TabsList,
	Trigger as TabsTrigger,
};

export default Tabs;
