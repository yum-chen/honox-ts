import type {
	ContentProps,
	IndicatorProps,
	InteractiveRootProps,
	ListProps,
	RootProps,
	TriggerProps,
} from "./tabs-primitive";
import { Content, Indicator, List, Root, Trigger } from "./tabs-primitive";
import InteractiveTabsIsland from "../../islands/tabs";

export interface TabsProps extends InteractiveRootProps {
	interactive?: boolean;
}

const TabsRoot = (props: TabsProps) => {
	const { interactive = true, ...rootProps } = props;
	if (interactive) {
		return <InteractiveTabsIsland {...rootProps} />;
	}
	return <Root {...rootProps} />;
};

export const Tabs = Object.assign(TabsRoot, {
	Root: TabsRoot,
	List,
	Trigger,
	Content,
	Indicator,
});

export type {
	ContentProps,
	IndicatorProps,
	InteractiveRootProps,
	ListProps,
	RootProps,
	TriggerProps,
};
