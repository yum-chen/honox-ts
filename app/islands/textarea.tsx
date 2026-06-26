import { useState } from "hono/jsx";
import {
	type TextareaProps,
	Textarea as UITextarea,
} from "../components/ui/textarea-primitive";

export default function TextareaIsland(props: TextareaProps) {
	const { defaultValue = "", onValueChange, ...rest } = props;
	const [value, setValue] = useState(defaultValue);

	const handleValueChange = (val: string) => {
		setValue(val);
		onValueChange?.(val);
	};

	return (
		<UITextarea {...rest} value={value} onValueChange={handleValueChange} />
	);
}
