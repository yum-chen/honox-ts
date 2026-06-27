import TextareaIsland from "../../islands/textarea";
import {
	type TextareaProps as BaseTextareaProps,
	Textarea as TextareaPrimitive,
} from "./textarea-primitive";

export interface TextareaProps extends BaseTextareaProps {
	interactive?: boolean;
	defaultValue?: string;
}

export function Textarea(props: TextareaProps) {
	const {
		interactive,
		onValueChange,
		value,
		defaultValue,
		validator,
		minLength,
		...rest
	} = props;

	if (
		interactive ||
		onValueChange ||
		value !== undefined ||
		defaultValue !== undefined ||
		validator ||
		minLength !== undefined
	) {
		return <TextareaIsland {...props} />;
	}

	return <TextareaPrimitive {...rest} />;
}
