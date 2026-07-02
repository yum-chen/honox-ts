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
	console.log(`[Wrapper] Combobox called with interactive=${interactive}`);

	const isInteractive =
		interactive !== false &&
		(interactive ||
			rest.open !== undefined ||
			rest.inputValue !== undefined ||
			rest.onToggle !== undefined ||
			rest.onInputChange !== undefined);

	console.log(`[Wrapper] Combobox isInteractive=${isInteractive}`);

	if (isInteractive) {
		console.log(`[Wrapper] Combobox returning ComboboxIsland`);
		return <ComboboxIsland {...rest} />;
	}

	return (
		<ComboboxPrimitiveRoot {...rest}>
			<ComboboxStructure {...rest} />
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
