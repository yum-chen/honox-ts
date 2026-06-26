import FieldIsland from "../../islands/field";
import {
	type FieldProps as BaseFieldProps,
	FieldRoot,
} from "./field-primitive";

export * from "./field-primitive";

export interface FieldProps extends BaseFieldProps {
	interactive?: boolean;
}

export function Field(props: FieldProps) {
	const { interactive, validator, minLength, ...rest } = props;
	if (interactive || validator || minLength !== undefined) {
		return <FieldIsland {...props} />;
	}
	return <FieldRoot {...rest} />;
}
