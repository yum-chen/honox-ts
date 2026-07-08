import FieldIsland from "../../islands/field";
import {
	type FieldProps as BaseFieldProps,
	FieldRoot,
} from "./field-primitive";
import { shouldHydrate } from "./island-utils";

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

	const hasSignal =
		onValueChange !== undefined ||
		value !== undefined ||
		defaultValue !== undefined ||
		validator !== undefined ||
		minLength !== undefined;
	const isInteractive = shouldHydrate(interactive, hasSignal);

	if (isInteractive) {
		return <FieldIsland {...props} />;
	}

	return <FieldRoot {...props} />;
}

export default Field;
