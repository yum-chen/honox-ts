import { useState } from "hono/jsx";
import { type FieldProps, FieldRoot } from "../components/ui/field-base";

export default function FieldIsland(props: FieldProps) {
	const { value: valueProp, defaultValue = "", ...rest } = props;
	const [value, setValue] = useState(valueProp ?? defaultValue);

	const handleValueChange = (val: string) => {
		setValue(val);
		if (props.onValueChange) {
			props.onValueChange(val);
		}
	};

	return (
		<FieldRoot
			{...rest}
			value={value}
			onValueChange={handleValueChange}
			onInput={(e: any) => {
				if (
					e.target instanceof HTMLInputElement ||
					e.target instanceof HTMLTextAreaElement
				) {
					handleValueChange(e.target.value);
				}
				if (props.onInput) {
					props.onInput(e);
				}
			}}
		/>
	);
}
