import { createContext, useContext, useId, useState } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { FieldVariantProps } from "../../../styled-system/recipes";
import { field } from "../../../styled-system/recipes";

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

export interface FieldProps extends FieldVariantProps {
	children?: any;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	label?: string | any;
	helperText?: string | any;
	errorText?: string | any;
	value?: string;
	onValueChange?: (value: string) => void;
	minLength?: number;
	validator?: ((value: string) => boolean | string) | string;
	[key: string]: any;
}

const getValidator = (validator?: FieldProps["validator"]) => {
	if (typeof validator === "function") return validator;
	if (typeof validator === "string") {
		try {
			// biome-ignore lint/security/noGlobalEval: serialized function
			return eval(validator);
		} catch (e) {
			console.error("Failed to parse validator string", e);
		}
	}
	return undefined;
};

export const useFieldContext = () => useContext(FieldContext);

export function FieldRoot(props: FieldProps) {
	const [variantProps, localProps] = field.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		disabled = props.disabled,
		invalid: invalidProp = props.invalid,
		readOnly = props.readOnly,
		required = props.required,
		label,
		helperText,
		errorText: errorTextProp,
		value: valueProp,
		onValueChange,
		minLength,
		validator: validatorProp,
		interactive: _interactive,
		defaultValue,
		...restProps
	} = localProps;

	const value = valueProp ?? defaultValue;

	const autoId = useId();
	const id = idProp || autoId;
	const styles = field(variantProps);

	let isInvalid = invalidProp;
	let errorText: string | undefined;

	const validator = getValidator(validatorProp);

	if (isInvalid === undefined || isInvalid === false) {
		if (minLength !== undefined && value !== undefined) {
			if (value.length < minLength) {
				isInvalid = true;
				errorText = `Must be at least ${minLength} characters`;
			}
		}

		if (!isInvalid && validator && value !== undefined) {
			const result = validator(value);
			if (result === false) {
				isInvalid = true;
			} else if (typeof result === "string") {
				isInvalid = true;
				errorText = result;
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
		hasHelperText: !!helperText,
		hasErrorText: !!(errorTextProp || errorText),
		errorText: errorText || errorTextProp,
	};

	const describedBy = [
		contextValue.hasHelperText ? contextValue.helperTextId : null,
		isInvalid && contextValue.hasErrorText ? contextValue.errorTextId : null,
	]
		.filter(Boolean)
		.join(" ");

	const isChildrenEmpty =
		children === undefined ||
		children === null ||
		(typeof children === "string" && children.trim() === "") ||
		(Array.isArray(children) &&
			children.every(
				(child) =>
					child === undefined ||
					child === null ||
					(typeof child === "string" && child.trim() === ""),
			));

	const { class: restClass, ...otherRestProps } = restProps;

	return (
		<FieldContext.Provider value={contextValue}>
			<div
				class={cx(styles.root, classProp)}
				data-disabled={disabled ? "" : undefined}
				data-invalid={isInvalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
				{...(!isChildrenEmpty ? otherRestProps : {})}
			>
				{label && <FieldLabel>{label}</FieldLabel>}
				{!isChildrenEmpty ? (
					children
				) : (
					<input
						id={id}
						disabled={disabled}
						readOnly={readOnly}
						required={required}
						aria-invalid={isInvalid ? "true" : undefined}
						aria-describedby={describedBy || undefined}
						value={value}
						defaultValue={defaultValue}
						onInput={(e: any) => {
							onValueChange?.(e.currentTarget.value);
						}}
						class={cx(styles.input, restClass)}
						{...otherRestProps}
					/>
				)}
				{helperText && <FieldHelperText>{helperText}</FieldHelperText>}
				<FieldErrorText />
			</div>
		</FieldContext.Provider>
	);
}

export function FieldLabel(props: {
	children?: any;
	class?: string;
	for?: string;
	[key: string]: any;
}) {
	const context = useFieldContext();
	const styles = field();
	const { children, class: classProp, for: forProp, ...rest } = props;
	return (
		<label
			id={context?.labelId}
			for={forProp || context?.id}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-required={context?.required ? "" : undefined}
			class={cx(styles.label, classProp)}
			{...rest}
		>
			{children}
			{context?.required && <FieldRequiredIndicator />}
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
				{props.children || context.errorText}
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

export function InteractiveField(props: FieldProps) {
	const { value: valueProp, defaultValue = "", onValueChange, ...rest } = props;
	const [value, setValue] = useState(valueProp ?? defaultValue);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const handleValueChange = (val: string) => {
		if (!isControlled) {
			setValue(val);
		}
		onValueChange?.(val);
	};

	return (
		<FieldRoot
			{...rest}
			value={currentValue}
			onValueChange={handleValueChange}
		/>
	);
}
