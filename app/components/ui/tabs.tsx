import InteractiveTabs from "../../islands/tabs";
import { shouldHydrate } from "./island-utils";
import {
	Content,
	Indicator,
	List,
	Root,
	type RootProps,
	Trigger,
} from "./tabs-primitive";

interface TabsProps extends RootProps {
	interactive?: boolean;
}

function TabsRoot(props: TabsProps) {
	const { interactive, ...rest } = props;

	const hasSignal =
		rest.value !== undefined ||
		rest.defaultValue !== undefined ||
		rest.onValueChange !== undefined;

	if (shouldHydrate(interactive, hasSignal)) {
		return <InteractiveTabs {...rest}>{props.children}</InteractiveTabs>;
	}

	return <Root {...rest}>{props.children}</Root>;
}

const Tabs = Object.assign(TabsRoot, {
	Root: TabsRoot,
	List,
	Trigger,
	Content,
	Indicator,
});

export { Tabs, type TabsProps };
export default Tabs;
