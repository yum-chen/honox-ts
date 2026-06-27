import { cx } from "../../../styled-system/css";
import type { TextareaVariantProps } from "../../../styled-system/recipes";
import { textarea } from "../../../styled-system/recipes";
import { useFieldContext } from "./field-base";

interface TextareaProps extends TextareaVariantProps {
	children?: any;
	class?: string;
	value?: string;
	onInput?: (e: any) => void;
	[key: string]: any;
}

function TextareaBase(props: TextareaProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = textarea.splitVariantProps(props);
	const {
		class: classProp,
		value: valueProp,
		onInput,
		...restProps
	} = localProps;
	const styles = textarea(variantProps);

	const describedBy = [];
	if (field?.hasHelperText) describedBy.push(field.helperTextId);
	if (field?.invalid && field?.hasErrorText)
		describedBy.push(field.errorTextId);

	const value = valueProp !== undefined ? valueProp : field?.value;

	const handleInput = (e: any) => {
		if (onInput) onInput(e);
		if (field?.onValueChange) {
			field.onValueChange(e.target.value);
		}
	};

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
			value={value}
			onInput={handleInput}
			{...(restProps as any)}
		/>
	);
}

export type { TextareaProps };
export { TextareaBase };
