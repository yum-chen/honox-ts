import { useState } from "hono/jsx";
import {
	TextareaBase,
	type TextareaProps,
} from "../components/ui/textarea-base";

export default function TextareaIsland(props: TextareaProps) {
	const { defaultValue, onInput, ...rest } = props;
	const [value, setValue] = useState(defaultValue ?? props.value ?? "");

	const handleInput = (e: any) => {
		setValue(e.target.value);
		if (onInput) onInput(e);
	};

	return <TextareaBase {...rest} value={value} onInput={handleInput} />;
}
