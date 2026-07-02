import ComboboxIsland from "../../islands/combobox";
import {
	ClearTrigger,
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
	Root as ComboboxPrimitiveRoot,
	ComboboxStructure,
	type ComboboxFlattenedProps,
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
	Label,
	Control,
	Input,
	Trigger,
	ClearTrigger,
	IndicatorGroup,
	Positioner,
	Content,
	List,
	Item,
	ItemText,
	ItemIndicator,
	ItemGroup,
	ItemGroupLabel,
	Empty,
	ComboboxPrimitiveRoot as Root,
};
