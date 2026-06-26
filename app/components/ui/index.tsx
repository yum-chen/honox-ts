import FieldIsland from "../../islands/field";
import TextareaIsland from "../../islands/textarea";
import {
	Alert as AlertImpl,
	AlertContent,
	AlertDescription,
	AlertIndicator,
	type AlertProps,
	AlertTitle,
} from "./alert";
import { Badge, type BadgeProps } from "./badge";
import {
	Field as FieldImpl,
	FieldErrorText,
	FieldGroup,
	FieldHelperText,
	FieldLabel,
	type FieldProps,
	FieldRequiredIndicator,
} from "./field";
import {
	Fieldset,
	FieldsetContent,
	FieldsetControl,
	FieldsetErrorText,
	FieldsetHelperText,
	FieldsetLegend,
	type FieldsetProps,
} from "./fieldset";
import { Heading, type HeadingProps } from "./heading";
import { Text, type TextProps } from "./text";
import { Textarea as TextareaImpl, type TextareaProps } from "./textarea";

export {
	AlertContent,
	AlertDescription,
	AlertIndicator,
	type AlertProps,
	AlertTitle,
} from "./alert";
export { Badge, type BadgeProps } from "./badge";
export {
	FieldErrorText,
	FieldGroup,
	FieldHelperText,
	FieldLabel,
	type FieldProps,
	FieldRequiredIndicator,
} from "./field";
export {
	Fieldset,
	FieldsetContent,
	FieldsetControl,
	FieldsetErrorText,
	FieldsetHelperText,
	FieldsetLegend,
	type FieldsetProps,
} from "./fieldset";
export { Heading, type HeadingProps } from "./heading";
export { Text, type TextProps } from "./text";
export { type TextareaProps } from "./textarea";

export const Alert = AlertImpl;

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
	return <FieldImpl {...props} />;
};

export const Textarea = (props: TextareaProps) => {
	const isInteractive =
		props.interactive !== false &&
		(props.interactive === true ||
			props.validator !== undefined ||
			props.onInput !== undefined);

	if (isInteractive) {
		return <TextareaIsland {...props} />;
	}
	return <TextareaImpl {...props} />;
};
