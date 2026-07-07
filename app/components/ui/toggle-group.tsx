import ToggleGroupIsland from "../../islands/toggle-group";
import {
	Item as ToggleGroupItem,
	Root as ToggleGroupRoot,
	type RootProps as ToggleGroupRootProps,
} from "./toggle-group-primitive";

export interface ToggleGroupProps extends ToggleGroupRootProps {
	interactive?: boolean;
}

export function ToggleGroup(props: ToggleGroupProps) {
	const { interactive, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			rest.value !== undefined ||
			rest.onValueChange !== undefined);

	if (isInteractive) {
		return <ToggleGroupIsland {...rest} />;
	}

	return <ToggleGroupRoot {...rest} />;
}

ToggleGroup.Root = ToggleGroup;
ToggleGroup.Item = ToggleGroupItem;

export { ToggleGroupItem as Item, ToggleGroupRoot as Root };
