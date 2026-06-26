import { cx } from "../../../../styled-system/css";
import type { TextareaVariantProps } from "../../../../styled-system/recipes";
import { textarea } from "../../../../styled-system/recipes";
import { useFieldContext } from "../field";

export interface TextareaProps extends TextareaVariantProps {
	children?: any;
	class?: string;
	[key: string]: any;
}

export function TextareaRoot(props: TextareaProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = textarea.splitVariantProps(props);
	const { class: classProp, ...restProps } = localProps;
	const styles = textarea(variantProps);

	const describedBy = [];
	if (field?.hasHelperText) describedBy.push(field.helperTextId);
	if (field?.invalid && field?.hasErrorText)
		describedBy.push(field.errorTextId);

	return (
		<textarea
			id={field?.id}
			aria-describedby={
				describedBy.length > 0 ? describedBy.join(" ") : undefined
			}
			aria-invalid={field?.invalid ? "true" : undefined}
			aria-required={field?.required ? "true" : undefined}
			disabled={field?.disabled}
			readOnly={field?.readOnly}
			class={cx(styles, classProp)}
			{...(restProps as any)}
		/>
	);
}
