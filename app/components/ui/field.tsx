import FieldIsland from "../../islands/field";
import { type FieldProps as BaseFieldProps, FieldRoot } from "./field-base";

interface FieldProps extends BaseFieldProps {
	interactive?: boolean;
	validator?: (value: string) => boolean | string;
}

function Field(props: FieldProps) {
	const { interactive, validator, ...rest } = props;
	const isInteractive = interactive !== undefined ? interactive : !!validator;
	if (isInteractive) {
		return <FieldIsland {...props} />;
	}
	return <FieldRoot {...rest} />;
}

export * from "./field-base";
export type { FieldProps };
export { Field };
