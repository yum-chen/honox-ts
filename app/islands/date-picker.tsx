import {
	InteractiveDatePicker,
	type InteractiveDatePickerProps,
} from "../components/ui/date-picker-primitive";

export default function DatePickerIsland(props: InteractiveDatePickerProps) {
	return <InteractiveDatePicker {...props} data-hydrated="true" />;
}
