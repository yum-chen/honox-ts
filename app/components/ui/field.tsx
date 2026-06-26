import FieldIsland from "../../islands/field";
import {
	type FieldProps as BaseFieldProps,
	FieldRoot,
} from "./field-primitive";

export * from "./field-primitive";

export interface FieldProps extends BaseFieldProps {
	interactive?: boolean;
	validator?: (value: string) => boolean | string;
}

export function Field(props: FieldProps) {
	const { interactive, validator, ...rest } = props;
	if (interactive || validator) {
		return <FieldIsland {...props} />;
	}
	return <FieldRoot {...rest} />;
}
