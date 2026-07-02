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
			props.open !== undefined ||
			props.inputValue !== undefined ||
			props.onToggle !== undefined ||
			props.onInputChange !== undefined);

	if (isInteractive) {
		return <ComboboxIsland {...props} />;
	}

	return (
		<ComboboxPrimitiveRoot {...rest}>
			<ComboboxStructure {...props} />
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
