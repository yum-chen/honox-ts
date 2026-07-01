import FieldIsland from "../../islands/field";
import {
	type FieldProps as BaseFieldProps,
	FieldRoot,
} from "./field-primitive";

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
		return <FieldIsland {...islandProps} />;
	}

	return <FieldRoot {...props} />;
}

export {
	FieldLabel,
	FieldHelperText,
	FieldErrorText,
	FieldRequiredIndicator,
	useFieldContext,
} from "./field-primitive";
