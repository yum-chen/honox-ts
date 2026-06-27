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

	if (
		interactive ||
		onValueChange ||
		value !== undefined ||
		defaultValue !== undefined ||
		validator ||
		minLength !== undefined
	) {
		return <FieldIsland {...props} />;
	}

	return <FieldRoot {...props} />;
}
