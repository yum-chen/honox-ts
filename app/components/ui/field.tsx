import {
	FieldBase,
	type FieldProps,
} from "./field-base";
import FieldIsland from "../../islands/field";

export const Field = (props: FieldProps) => {
	const isInteractive =
		props.interactive !== false &&
		(props.interactive === true ||
			props.validator !== undefined ||
			props.minLength !== undefined ||
			props.onValueChange !== undefined);

	if (isInteractive) {
		return <FieldIsland {...props} />;
	}
	return <FieldBase {...props} />;
};

export {
	FieldLabel,
	FieldHelperText,
	FieldErrorText,
	FieldRequiredIndicator,
	FieldGroup,
	useFieldContext,
	type FieldProps,
} from "./field-base";
