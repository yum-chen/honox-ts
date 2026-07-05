import type { JSX } from "hono/jsx";
import {
	Content,
	Indicator,
	InteractiveRoot,
	List,
	type RootProps as InteractiveRootProps,
	Root,
	Trigger,
} from "./tabs-primitive";

import InteractiveTabsIsland from "../../islands/tabs";

export interface TabItem {
	value: string;
	label: string | JSX.Element;
	content: string | JSX.Element;
	disabled?: boolean;
}

export interface TabsProps extends InteractiveRootProps {
	items?: TabItem[];
	indicator?: boolean;
	interactive?: boolean;
}

const TabsRoot = (props: TabsProps) => {
	const { items, indicator, interactive = true, children, ...rootProps } = props;

	if (interactive) {
		return (
			<InteractiveTabsIsland {...rootProps}>
				{items && (
					<List>
						{items.map((item) => (
							<Trigger key={item.value} value={item.value} disabled={item.disabled}>
								{item.label}
							</Trigger>
						))}
						{indicator && <Indicator />}
					</List>
				)}
				{items?.map((item) => (
					<Content key={item.value} value={item.value}>
						{item.content}
					</Content>
				))}
				{children}
			</InteractiveTabsIsland>
		);
	}

	return (
		<Root {...rootProps}>
			{items && (
				<List>
					{items.map((item) => (
						<Trigger key={item.value} value={item.value} disabled={item.disabled}>
							{item.label}
						</Trigger>
					))}
					{indicator && <Indicator />}
				</List>
			)}
			{items?.map((item) => (
				<Content key={item.value} value={item.value}>
					{item.content}
				</Content>
			))}
			{children}
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

export {
	Content as TabContent,
	Indicator as TabIndicator,
	List as TabList,
	Trigger as TabTrigger,
};

export default Tabs;
