import { useState } from "hono/jsx";
import {
	Textarea as UITextarea,
	type TextareaProps,
} from "../components/ui/textarea";

export default function TextareaIsland(props: TextareaProps) {
	const { defaultValue, onInput, ...rest } = props;
	const [value, setValue] = useState(defaultValue ?? props.value ?? "");

	const handleInput = (e: any) => {
		setValue(e.target.value);
		if (onInput) onInput(e);
	};

	return <UITextarea {...rest} value={value} onInput={handleInput} />;
}
