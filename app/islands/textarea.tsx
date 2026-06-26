import { useEffect, useState } from "hono/jsx";
import { useFieldContext } from "../components/ui/field";
import {
	type TextareaProps,
	TextareaRoot,
} from "../components/ui/textarea/textarea-root";

export interface InteractiveTextareaProps extends TextareaProps {
	validator?: (value: string) => boolean;
	onValueChange?: (value: string) => void;
}

export default function TextareaIsland(props: InteractiveTextareaProps) {
	const { validator, onValueChange, defaultValue = "", ...rest } = props;
	const [value, setValue] = useState(defaultValue);
	const field = useFieldContext();

	const handleInput = (e: any) => {
		const newValue = e.target.value;
		setValue(newValue);
		onValueChange?.(newValue);
		if (validator && field?.setInvalid) {
			field.setInvalid(!validator(newValue));
		}
	};

	// Initial validation
	useEffect(() => {
		if (validator && field?.setInvalid) {
			field.setInvalid(!validator(value));
		}
	}, []);

	return <TextareaRoot {...rest} value={value} onInput={handleInput} />;
}
