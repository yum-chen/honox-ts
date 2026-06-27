import TextareaIsland from "../../islands/textarea";
import {
	type TextareaProps as BaseTextareaProps,
	TextareaBase,
} from "./textarea-base";

interface TextareaProps extends BaseTextareaProps {
	interactive?: boolean;
	validator?: (value: string) => boolean | string;
	minLength?: number;
	label?: string;
	helperText?: string;
	errorText?: string;
}

function Textarea(props: TextareaProps) {
	const {
		interactive,
		validator,
		minLength,
		label,
		helperText,
		errorText,
		...rest
	} = props;
	const isInteractive =
		interactive !== undefined
			? interactive
			: !!validator ||
				minLength !== undefined ||
				!!label ||
				!!helperText ||
				!!errorText;

	if (isInteractive) {
		return <TextareaIsland {...props} />;
	}

	return <TextareaBase {...rest} />;
}

export * from "./textarea-base";
export type { TextareaProps };
export { Textarea };
