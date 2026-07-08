import type { Child } from "hono/jsx";
import SegmentGroupIsland from "../../islands/segment-group";
import {
	Indicator as SegmentGroupIndicator,
	Item as SegmentGroupItem,
	ItemControl as SegmentGroupItemControl,
	ItemHiddenInput as SegmentGroupItemHiddenInput,
	ItemText as SegmentGroupItemText,
	Label as SegmentGroupLabel,
	Root as SegmentGroupRoot,
	type RootProps as SegmentGroupRootProps,
} from "./segment-group-primitive";

export interface SegmentGroupProps extends SegmentGroupRootProps {
	interactive?: boolean;
}

export function SegmentGroup(props: SegmentGroupProps) {
	const { interactive, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			rest.value !== undefined ||
			rest.onValueChange !== undefined);

	if (isInteractive) {
		return <SegmentGroupIsland {...rest} />;
	}

	return <SegmentGroupRoot {...rest} />;
}

SegmentGroup.Root = SegmentGroup;
SegmentGroup.Indicator = SegmentGroupIndicator;
SegmentGroup.Item = SegmentGroupItem;
SegmentGroup.ItemControl = SegmentGroupItemControl;
SegmentGroup.ItemHiddenInput = SegmentGroupItemHiddenInput;
SegmentGroup.ItemText = SegmentGroupItemText;
SegmentGroup.Label = SegmentGroupLabel;

interface ItemData {
	value: string;
	label: Child;
	disabled?: boolean;
}

export interface SegmentGroupItemsProps {
	items: Array<string | ItemData>;
}

export const SegmentGroupItems = (props: SegmentGroupItemsProps) => {
	const { items } = props;
	const data = items.map((item) =>
		typeof item === "string" ? { value: item, label: item } : item,
	);

	return (
		<>
			{data.map((item) => (
				<SegmentGroup.Item
					key={item.value}
					value={item.value}
					disabled={item.disabled}
				>
					<SegmentGroup.ItemText>{item.label}</SegmentGroup.ItemText>
					<SegmentGroup.ItemControl />
					<SegmentGroup.ItemHiddenInput value={item.value} />
				</SegmentGroup.Item>
			))}
		</>
	);
};

SegmentGroup.Items = SegmentGroupItems;

export {
	SegmentGroupIndicator as Indicator,
	SegmentGroupItem as Item,
	SegmentGroupItemControl as ItemControl,
	SegmentGroupItemHiddenInput as ItemHiddenInput,
	SegmentGroupItemText as ItemText,
	SegmentGroupLabel as Label,
	SegmentGroupRoot as Root,
};
