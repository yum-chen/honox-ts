import { useState } from "hono/jsx";
import {
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
	FieldRoot,
} from "../components/ui/field-base";
import { TextareaBase } from "../components/ui/textarea-base";

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
	value?: string;
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
		value: valueProp,
		class: className,
		...rest
	} = props;
	const [value, setValue] = useState(valueProp ?? defaultValue);

	const handleValueChange = (val: string) => {
		setValue(val);
		if (props.onValueChange) {
			props.onValueChange(val);
		}
	};

	const content = (
		<TextareaBase
			{...rest}
			value={value}
			onInput={(e: { target: { value: string } }) => {
				handleValueChange(e.target.value);
				if (props.onInput) {
					props.onInput(e);
				}
			}}
		/>
	);

	if (label || helperText || errorText || validator || minLength) {
		return (
			<FieldRoot
				id={rest.id}
				class={className}
				value={value}
				validator={validator}
				minLength={minLength}
			>
				{label && <FieldLabel>{label}</FieldLabel>}
				{content}
				{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
				<FieldErrorText>{errorText}</FieldErrorText>
			</FieldRoot>
		);
	}

	return content;
}
