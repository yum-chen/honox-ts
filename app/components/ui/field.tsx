import FieldIsland from "../../islands/field";
import { type FieldProps as BaseFieldProps, FieldRoot } from "./field-base";

export interface FieldProps extends BaseFieldProps {
	interactive?: boolean;
	defaultValue?: string;
}

export function Field(props: FieldProps) {
	const {
		interactive,
		onValueChange,
		value,
		defaultValue,
		validator,
		minLength,
		label,
		helperText,
		errorText,
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
		return (
			<FieldIsland
				label={label}
				helperText={helperText}
				errorText={errorText}
				onValueChange={onValueChange}
				value={value}
				defaultValue={defaultValue}
				validator={validator}
				minLength={minLength}
				{...rest}
			/>
		);
	}

	return (
		<FieldRoot
			label={label}
			helperText={helperText}
			errorText={errorText}
			{...rest}
		/>
	);
}
