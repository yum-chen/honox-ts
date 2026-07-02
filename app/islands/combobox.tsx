import {
	InteractiveCombobox,
	type ComboboxFlattenedProps,
} from "../components/ui/combobox-primitive";

export default function ComboboxIsland(props: ComboboxFlattenedProps) {
	console.log(`[Island] ComboboxIsland component mounted`, props);
	return <InteractiveCombobox {...props} />;
}
