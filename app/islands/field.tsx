import { useState } from "hono/jsx";
import { FieldBase, type FieldProps } from "../components/ui/field-base";

export default function FieldIsland(props: FieldProps) {
	const { defaultValue, onValueChange, ...rest } = props;
	const [value, setValue] = useState(defaultValue ?? props.value ?? "");

	const handleValueChange = (newValue: string) => {
		setValue(newValue);
		if (onValueChange) onValueChange(newValue);
	};

	return (
		<FieldBase {...rest} value={value} onValueChange={handleValueChange} />
	);
}
