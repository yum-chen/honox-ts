import { useId } from "hono/jsx";
import { cx } from "../../../../styled-system/css";
import type { FieldVariantProps } from "../../../../styled-system/recipes";
import { field } from "../../../../styled-system/recipes";
import {
	FieldContext,
	type FieldContextValue,
	useFieldContext,
} from "./field-context";

export interface FieldProps extends FieldVariantProps {
	children?: any;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	[key: string]: any;
}

export function FieldRoot(props: FieldProps) {
	const [variantProps, localProps] = field.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		disabled = props.disabled,
		invalid = props.invalid,
		readOnly = props.readOnly,
		required = props.required,
		...restProps
	} = localProps;

	const autoId = useId();
	const id = idProp || autoId;
	const styles = field(variantProps);

	const contextValue: FieldContextValue = {
		id,
		disabled,
		invalid,
		readOnly,
		required,
		labelId: `field::${id}::label`,
		helperTextId: `field::${id}::helper-text`,
		errorTextId: `field::${id}::error-text`,
		hasHelperText: true,
		hasErrorText: true,
	};

	return (
		<FieldContext.Provider value={contextValue}>
			<div
				class={cx(styles.root, classProp)}
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
				{...restProps}
			>
				{children}
			</div>
		</FieldContext.Provider>
	);
}

export function FieldLabel(props: {
	children?: any;
	class?: string;
	for?: string;
}) {
	const context = useFieldContext();
	const styles = field();
	return (
		<label
			id={context?.labelId}
			class={cx(styles.label, props.class)}
			for={props.for || context?.id}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-required={context?.required ? "" : undefined}
		>
			{props.children}
		</label>
	);
}

export function FieldHelperText(props: { children?: any; class?: string }) {
	const context = useFieldContext();
	const styles = field();
	return (
		<div
			id={context?.helperTextId}
			class={cx(styles.helperText, props.class)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-required={context?.required ? "" : undefined}
		>
			{props.children}
		</div>
	);
}

export function FieldErrorText(props: { children?: any; class?: string }) {
	const context = useFieldContext();
	const styles = field();
	if (context?.invalid) {
		return (
			<div
				id={context?.errorTextId}
				class={cx(styles.errorText, props.class)}
				data-disabled={context?.disabled ? "" : undefined}
				data-invalid={context?.invalid ? "" : undefined}
				data-readonly={context?.readOnly ? "" : undefined}
				data-required={context?.required ? "" : undefined}
			>
				{props.children}
			</div>
		);
	}
	return null;
}

export function FieldRequiredIndicator(props: {
	children?: any;
	class?: string;
}) {
	const context = useFieldContext();
	const styles = field();
	return (
		<span
			aria-hidden="true"
			class={cx(styles.requiredIndicator, props.class)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-required={context?.required ? "" : undefined}
		>
			{props.children || "*"}
		</span>
	);
}
