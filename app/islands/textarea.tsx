import { useState } from "hono/jsx";
import {
	Textarea as UITextarea,
	type TextareaProps as UITextareaProps,
} from "../components/ui/textarea-primitive";

export interface TextareaIslandProps extends UITextareaProps {
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
		<UITextarea
			{...rest}
			value={currentValue}
			onValueChange={handleValueChange}
		/>
	);
}
