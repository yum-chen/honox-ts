import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { FieldVariantProps } from "../../../styled-system/recipes";
import { field } from "../../../styled-system/recipes";

interface FieldProps extends FieldVariantProps {
	children?: any;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
	minLength?: number;
	validator?: (value: string) => boolean | string;
	interactive?: boolean;
	[key: string]: any;
}

interface FieldContextValue {
	id: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	value?: string;
	onValueChange?: (value: string) => void;
	minLength?: number;
	labelId: string;
	helperTextId: string;
	errorTextId: string;
	hasHelperText: boolean;
	hasErrorText: boolean;
	errorText?: string;
}

const FieldContext = createContext<FieldContextValue | null>(null);

const useFieldContext = () => useContext(FieldContext);

function FieldRoot(props: FieldProps) {
	const [variantProps, localProps] = field.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		disabled = props.disabled,
		invalid: invalidProp = props.invalid,
		readOnly = props.readOnly,
		required = props.required,
		value,
		onValueChange,
		minLength,
		validator,
		interactive,
		...restProps
	} = localProps;

	const autoId = useId();
	const id = idProp || autoId;
	const styles = field(variantProps);

	let isInvalid = invalidProp;
	let errorText: string | undefined;

	if (isInvalid === undefined) {
		if (validator && value !== undefined) {
			const result = validator(value);
			if (result === false) {
				isInvalid = true;
			} else if (typeof result === "string") {
				isInvalid = true;
				errorText = result;
			}
		} else if (minLength !== undefined && value !== undefined) {
			if (value.length < minLength) {
				isInvalid = true;
				errorText = `Must be at least ${minLength} characters`;
			}
		}
	}

	const contextValue: FieldContextValue = {
		id,
		disabled,
		invalid: isInvalid,
		readOnly,
		required,
		value,
		onValueChange,
		minLength,
		labelId: `field::${id}::label`,
		helperTextId: `field::${id}::helper-text`,
		errorTextId: `field::${id}::error-text`,
		hasHelperText: true,
		hasErrorText: true,
		errorText,
	};

	return (
		<FieldContext.Provider value={contextValue}>
			<div
				class={cx(styles.root, classProp)}
				data-disabled={disabled ? "" : undefined}
				data-invalid={isInvalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
				{...restProps}
			>
				{children}
			</div>
		</FieldContext.Provider>
	);
}

function FieldLabel(props: { children?: any; class?: string; for?: string }) {
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

function FieldHelperText(props: { children?: any; class?: string }) {
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

function FieldErrorText(props: { children?: any; class?: string }) {
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
				{props.children || context.errorText}
			</div>
		);
	}
	return null;
}

function FieldRequiredIndicator(props: { children?: any; class?: string }) {
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

function FieldGroup(props: {
	label?: string;
	helperText?: string;
	errorText?: string;
	children?: any;
}) {
	const { label, helperText, errorText, children } = props;
	return (
		<div style={{ display: "contents" }}>
			{label && <FieldLabel>{label}</FieldLabel>}
			{children}
			{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
			<FieldErrorText>{errorText}</FieldErrorText>
		</div>
	);
}

export type { FieldProps };
export {
	FieldErrorText,
	FieldGroup,
	FieldHelperText,
	FieldLabel,
	FieldRequiredIndicator,
	FieldRoot,
	useFieldContext,
};
