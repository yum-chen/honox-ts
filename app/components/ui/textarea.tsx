import { Textarea as TextareaPrimitive, type TextareaProps as BaseTextareaProps } from "./textarea-primitive";
import TextareaIsland from "../../islands/textarea";

export * from "./textarea-primitive";

export interface TextareaProps extends BaseTextareaProps {
	interactive?: boolean;
	validator?: (value: string) => boolean | string;
	minLength?: number;
	label?: string;
	helperText?: string;
	errorText?: string;
}

export function Textarea(props: TextareaProps) {
	const { interactive, validator, minLength, label, helperText, errorText, ...rest } = props;

	if (interactive || validator || minLength !== undefined || label || helperText || errorText) {
		return <TextareaIsland {...props} />;
	}

	return <TextareaPrimitive {...rest} />;
}
