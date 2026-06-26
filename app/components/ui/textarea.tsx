import TextareaIsland from "../../islands/textarea";
import {
	type TextareaProps as BaseTextareaProps,
	Textarea as TextareaPrimitive,
} from "./textarea-primitive";

export * from "./textarea-primitive";

export interface TextareaProps extends BaseTextareaProps {
	interactive?: boolean;
}

export function Textarea(props: TextareaProps) {
	const {
		interactive,
		validator,
		minLength,
		label,
		helperText,
		errorText,
		...rest
	} = props;

	if (
		interactive ||
		validator ||
		minLength !== undefined ||
		label ||
		helperText ||
		errorText
	) {
		return <TextareaIsland {...props} />;
	}

	return <TextareaPrimitive {...rest} />;
}
