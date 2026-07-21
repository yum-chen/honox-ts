import TabsIsland from "@/islands/tabs";
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
	liftItemSlots,
} from "./tabs-primitive";

export interface TabsProps extends RootProps, Partial<TabsStructureProps> {
	interactive?: boolean;
}

const TabsRoot = (props: TabsProps) => {
	const { interactive, ...rest } = props;

	const hasSignal =
		rest.value !== undefined ||
		rest.defaultValue !== undefined ||
		rest.onValueChange !== undefined;

	const shouldHydrateComponent = shouldHydrate(interactive, hasSignal);

	if (shouldHydrateComponent) {
		if (rest.items) {
			const { serializedItems, slotMap } = liftItemSlots(rest.items);
			return (
				<TabsIsland {...(rest as any)} items={serializedItems}>
					<List>
						{serializedItems.map((item) => (
							<Trigger key={item.value} value={item.value} disabled={item.disabled}>
								{slotMap[item.value].label}
							</Trigger>
						))}
						<Indicator />
					</List>
					{serializedItems.map((item) => (
						<Content key={item.value} value={item.value}>
							{slotMap[item.value].content}
						</Content>
					))}
				</TabsIsland>
			);
		}
		return <TabsIsland {...(rest as any)} />;
	}

	return (
		<Root {...rest}>
			{props.children ||
				(rest.items && <TabsStructure items={rest.items} />)}
		</Root>
	);
};

export const Tabs = Object.assign(TabsRoot, {
	Root: TabsRoot,
	List: List,
	Trigger: Trigger,
	Indicator: Indicator,
	Content: Content,
	Items: TabsStructure,
	liftItemSlots,
});

export {
	Root,
	List,
	Trigger,
	Indicator,
	Content,
	TabsStructure as Items,
	liftItemSlots,
};

export type { TabsProps };
export default Tabs;
