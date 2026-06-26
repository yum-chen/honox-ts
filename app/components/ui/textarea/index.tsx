import TextareaIsland from "../../../islands/textarea";
import {
	Field,
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
} from "../field";
import { TextareaRoot, type TextareaProps } from "./textarea-root";

export interface SmartTextareaProps extends TextareaProps {
	interactive?: boolean;
	validator?: (value: string) => boolean;
	label?: string;
	helperText?: string;
	errorText?: string;
}

export function Textarea(props: SmartTextareaProps) {
	const {
		interactive,
		validator,
		label,
		helperText,
		errorText,
		...rest
	} = props;

	const isInteractive = interactive || !!validator;

	const textareaNode = isInteractive ? (
		<TextareaIsland {...rest} validator={validator} />
	) : (
		<TextareaRoot {...rest} />
	);

	if (label || helperText || errorText) {
		return (
			<Field interactive={isInteractive}>
				{label && <FieldLabel>{label}</FieldLabel>}
				{textareaNode}
				{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
				{errorText && <FieldErrorText>{errorText}</FieldErrorText>}
			</Field>
		);
	}

	return textareaNode;
}

export * from "./textarea-root";
