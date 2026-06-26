import { useState } from "hono/jsx";
import {
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
	FieldRoot,
} from "../components/ui/field-primitive";
import { Textarea as UITextarea } from "../components/ui/textarea-primitive";

export interface TextareaIslandProps {
	label?: string;
	helperText?: string;
	errorText?: string;
	validator?: (value: string) => boolean | string;
	minLength?: number;
	id?: string;
	placeholder?: string;
	rows?: number;
	defaultValue?: string;
	class?: string;
	interactive?: boolean;
	[key: string]: any;
}

export default function Textarea(props: TextareaIslandProps) {
	const {
		label,
		helperText,
		errorText,
		validator,
		minLength,
		defaultValue = "",
		class: className,
		...rest
	} = props;
	const [value, setValue] = useState(defaultValue);
	const [localErrorText, setLocalErrorText] = useState<string | null>(null);

	const validate = (val: string) => {
		if (validator) {
			const result = validator(val);
			if (result === false) {
				setLocalErrorText(errorText || "Invalid input");
				return;
			}
			if (typeof result === "string") {
				setLocalErrorText(result);
				return;
			}
		}

		if (minLength !== undefined && val.length < minLength) {
			setLocalErrorText(errorText || `Must be at least ${minLength} characters`);
			return;
		}

		setLocalErrorText(null);
	};

	const isInvalid = localErrorText !== null;

	const content = (
		<UITextarea
			{...rest}
			value={value}
			onInput={(e: { target: { value: string } }) => {
				const val = (e.target as HTMLTextAreaElement).value;
				setValue(val);
				validate(val);
			}}
		/>
	);

	if (label || helperText || errorText || validator || minLength) {
		return (
			<FieldRoot id={rest.id} invalid={isInvalid} class={className}>
				{label && <FieldLabel>{label}</FieldLabel>}
				{content}
				{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
				{isInvalid && (
					<FieldErrorText>{localErrorText || errorText}</FieldErrorText>
				)}
			</FieldRoot>
		);
	}

	return content;
}
