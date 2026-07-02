import {
	InteractiveCombobox,
	type ComboboxFlattenedProps,
} from "../components/ui/combobox-primitive";

export default function ComboboxIsland(props: ComboboxFlattenedProps) {
	if (typeof window !== "undefined") {
		console.log("[ISLAND] ComboboxIsland rendering on client");
	}
	return <InteractiveCombobox {...props} />;
}
