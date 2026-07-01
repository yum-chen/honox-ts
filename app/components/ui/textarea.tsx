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
	} = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onValueChange !== undefined ||
			value !== undefined ||
			defaultValue !== undefined ||
			validator !== undefined ||
			minLength !== undefined);

	if (isInteractive) {
		const islandProps = { ...props };
		if (typeof islandProps.validator === "function") {
			islandProps.validator = islandProps.validator.toString();
		}
		return <TextareaIsland {...islandProps} />;
	}

	return <TextareaPrimitive {...props} />;
}
