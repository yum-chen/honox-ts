import { useState } from "hono/jsx";
import { type FieldProps, FieldRoot } from "../components/ui/field-primitive";

export default function FieldIsland(props: FieldProps) {
	const { defaultValue = "", onValueChange, ...rest } = props;
	const [value, setValue] = useState(defaultValue);

	const handleValueChange = (val: string) => {
		setValue(val);
		onValueChange?.(val);
	};

	return (
		<FieldRoot {...rest} value={value} onValueChange={handleValueChange} />
	);
}
