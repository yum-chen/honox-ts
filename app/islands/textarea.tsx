import { useState } from "hono/jsx";
import {
	TextareaBase,
	type TextareaBaseProps,
} from "../components/ui/textarea-base";

export interface TextareaIslandProps extends TextareaBaseProps {
	defaultValue?: string;
}

export default function TextareaIsland(props: TextareaIslandProps) {
	const { value: valueProp, defaultValue = "", onValueChange, ...rest } = props;
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
		<TextareaBase
			{...rest}
			value={currentValue}
			onValueChange={handleValueChange}
		/>
	);
}
