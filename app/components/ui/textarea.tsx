import { cx } from "../../../styled-system/css";
import type { TextareaVariantProps } from "../../../styled-system/recipes";
import { textarea } from "../../../styled-system/recipes";
import { useFieldContext } from "./field";

export interface TextareaProps extends TextareaVariantProps {
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Textarea(props: TextareaProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = textarea.splitVariantProps(props);
	const {
		class: classProp,
		id = field?.id,
		disabled = field?.disabled,
		invalid = field?.invalid,
		required = field?.required,
		readOnly = field?.readOnly,
		...restProps
	} = localProps;
	const styles = textarea(variantProps);

	const describedBy = [];
	if (field?.hasHelperText) describedBy.push(field.helperTextId);
	if (invalid && field?.hasErrorText) describedBy.push(field.errorTextId);

	return (
		<textarea
			id={id}
			aria-describedby={
				describedBy.length > 0 ? describedBy.join(" ") : undefined
			}
			aria-invalid={invalid ? "true" : undefined}
			aria-required={required ? "true" : undefined}
			disabled={disabled}
			readOnly={readOnly}
			class={cx(styles, classProp)}
			data-invalid={invalid ? "" : undefined}
			{...(restProps as any)}
		/>
	);
}
