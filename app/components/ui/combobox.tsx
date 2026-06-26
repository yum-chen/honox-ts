import ComboboxIsland from "../../islands/combobox";
import {
	ClearTrigger,
	type ComboboxFlattenedProps,
	Root as ComboboxPrimitiveRoot,
	ComboboxStructure,
	Content,
	Control,
	Empty,
	IndicatorGroup,
	Input,
	Item,
	ItemGroup,
	ItemGroupLabel,
	ItemIndicator,
	ItemText,
	Label,
	List,
	Positioner,
	Trigger,
} from "./combobox-primitive";

export interface ComboboxProps extends ComboboxFlattenedProps {
	interactive?: boolean;
}

export function Combobox(props: ComboboxProps) {
	const { interactive, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			rest.open !== undefined ||
			rest.inputValue !== undefined ||
			rest.onToggle !== undefined ||
			rest.onInputChange !== undefined);

	if (isInteractive) {
		return <ComboboxIsland {...rest} />;
	}

	return (
		<ComboboxPrimitiveRoot {...rest}>
			<ComboboxStructure {...rest} />
		</ComboboxPrimitiveRoot>
	);
}

export {
	ClearTrigger,
	ComboboxPrimitiveRoot as Root,
	Content,
	Control,
	Empty,
	IndicatorGroup,
	Input,
	Item,
	ItemGroup,
	ItemGroupLabel,
	ItemIndicator,
	ItemText,
	Label,
	List,
	Positioner,
	Trigger,
};
