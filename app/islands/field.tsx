import { useState } from "hono/jsx";
import {
	FieldRoot,
	type FieldProps as UIFieldProps,
} from "../components/ui/field-base";

export interface FieldIslandProps extends UIFieldProps {
	defaultValue?: string;
}

export default function FieldIsland(props: FieldIslandProps) {
	const {
		value: valueProp,
		defaultValue = "",
		onValueChange,
		label,
		helperText,
		errorText,
		...rest
	} = props;
	const [value, setValue] = useState(valueProp ?? defaultValue);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const handleValueChange = (val: string) => {
		if (!isControlled) {
			setValue(val);
		}
		onValueChange?.(val);
	};

	return (
		<FieldRoot
			{...rest}
			label={label}
			helperText={helperText}
			errorText={errorText}
			value={currentValue}
			onValueChange={handleValueChange}
		/>
	);
}
