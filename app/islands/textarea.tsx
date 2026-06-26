import { useState } from "hono/jsx";
import {
	Field,
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
} from "../components/ui/field";
import { Textarea as UITextarea } from "../components/ui/textarea";

export interface TextareaProps {
	label?: string;
	helperText?: string;
	errorText?: string;
	minLength?: number;
	id?: string;
	placeholder?: string;
	rows?: number;
	defaultValue?: string;
	class?: string;
}

export default function Textarea(props: TextareaProps) {
	const {
		label,
		helperText,
		errorText,
		minLength,
		defaultValue = "",
		class: className,
		...rest
	} = props;
	const [value, setValue] = useState(defaultValue);
	const isInvalid =
		minLength !== undefined && value.length > 0 && value.length < minLength;

	return (
		<Field id={rest.id} invalid={isInvalid} class={className}>
			{label && <FieldLabel>{label}</FieldLabel>}
			<UITextarea
				{...rest}
				value={value}
				onInput={(e: { target: { value: string } }) =>
					setValue((e.target as HTMLTextAreaElement).value)}
			/>
			{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
			{isInvalid && errorText && <FieldErrorText>{errorText}</FieldErrorText>}
		</Field>
	);
}
