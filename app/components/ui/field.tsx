import FieldIsland from "../../islands/field";
import { FieldBase, type FieldProps } from "./field-base";

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
	FieldErrorText,
	FieldGroup,
	FieldHelperText,
	FieldLabel,
	type FieldProps,
	FieldRequiredIndicator,
	useFieldContext,
} from "./field-base";
