import { useState } from "hono/jsx";
import { Field as UIField, type FieldProps } from "../components/ui/field";

export default function FieldIsland(props: FieldProps) {
	const { defaultValue, onValueChange, ...rest } = props;
	const [value, setValue] = useState(defaultValue ?? props.value ?? "");

	const handleValueChange = (newValue: string) => {
		setValue(newValue);
		if (onValueChange) onValueChange(newValue);
	};

	return (
		<UIField {...rest} value={value} onValueChange={handleValueChange} />
	);
}
