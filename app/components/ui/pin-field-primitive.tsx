import { cx } from "design-system/css";
import type { PinFieldVariantProps } from "design-system/recipes";
import { pinField } from "design-system/recipes";
import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { type ValidatorFn, validateField } from "./field-primitive";

type PinFieldStyles = ReturnType<typeof pinField>;

export type PinFieldType =
	| "numeric"
	| "alphanumeric"
	| "alphabetic"
	| "alpha"
	| "none";

interface PinFieldContextValue {
	id: string;
	styles: PinFieldStyles;
	value: string[];
	count: number;
	type: PinFieldType;
	placeholder: string;
	mask?: boolean;
	otp?: boolean;
	autoComplete?: string;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	invalid?: boolean;
	name?: string;
	labelId: string;
	helperTextId: string;
	errorTextId: string;
	hasHelperText: boolean;
	hasErrorText: boolean;
	errorText?: string;
}

const PinFieldContext = createContext<PinFieldContextValue | null>(null);

export const usePinFieldContext = () => useContext(PinFieldContext);

export interface RootProps extends PinFieldVariantProps, PropsWithChildren {
	id?: string;
	count?: number;
	value?: string[];
	defaultValue?: string[];
	type?: PinFieldType;
	placeholder?: string;
	mask?: boolean;
	otp?: boolean;
	blurOnComplete?: boolean;
	autoFocus?: boolean;
	selectOnFocus?: boolean;
	pattern?: string;
	disabled?: boolean;
	readOnly?: boolean;
	required?: boolean;
	invalid?: boolean;
	name?: string;
	class?: string;
	label?: Child;
	helperText?: Child;
	errorText?: Child;
	validator?: ValidatorFn | string;
	validatorSource?: string;
	dir?: "ltr" | "rtl";
	autoComplete?: string;
	autoSubmit?: boolean;
	onAutoSubmit?: (value: string) => void;
	onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
	onValueComplete?: (details: {
		value: string[];
		valueAsString: string;
	}) => void;
	onValueInvalid?: (details: { index: number; value: string }) => void;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = pinField.splitVariantProps(props);
	const {
		children,
		id: idProp,
		count = 4,
		value: valueProp,
		defaultValue,
		type = "numeric",
		placeholder = "○",
		mask,
		otp,
		autoComplete,
		autoSubmit: _autoSubmit,
		onAutoSubmit: _onAutoSubmit,
		blurOnComplete: _blurOnComplete,
		autoFocus: _autoFocus,
		selectOnFocus: _selectOnFocus,
		pattern: _pattern,
		disabled,
		readOnly,
		required,
		invalid: invalidProp,
		name,
		class: classProp,
		label,
		helperText,
		errorText: errorTextProp,
		validator,
		validatorSource,
		dir,
		onValueChange: _onValueChange,
		onValueComplete: _onValueComplete,
		onValueInvalid: _onValueInvalid,
		...restProps
	} = localProps;
	const effectiveValidator = validator ?? validatorSource;

	const fallbackId = useId();
	const id = idProp || `pin-field-${fallbackId}`;

	const value =
		valueProp ?? defaultValue ?? Array.from({ length: count }, () => "");
	const complete = value.length === count && value.every((v) => v !== "");

	const { isInvalid: validatedInvalid, errorText: validatedErrorText } =
		validateField(value.join(""), undefined, effectiveValidator);
	const invalid = invalidProp !== undefined ? invalidProp : validatedInvalid;
	const errorText = validatedErrorText;

	const styles = pinField(variantProps);

	const contextValue: PinFieldContextValue = {
		id,
		styles,
		value,
		count,
		type,
		placeholder,
		mask,
		otp,
		autoComplete,
		disabled,
		readOnly,
		required,
		invalid,
		name,
		labelId: `pin-field::${id}::label`,
		helperTextId: `pin-field::${id}::helper-text`,
		errorTextId: `pin-field::${id}::error-text`,
		hasHelperText: !!helperText,
		hasErrorText: !!(errorTextProp || errorText),
		errorText:
			errorText ||
			(typeof errorTextProp === "string" ? errorTextProp : undefined),
	};

	return (
		<PinFieldContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="pin-field"
				data-part="root"
				data-complete={complete ? "" : undefined}
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				dir={dir}
				class={cx(styles.root, classProp)}
				{...restProps}
			>
				{children || (
					<>
						{label && <Label>{label}</Label>}
						<Control>
							<Inputs />
						</Control>
						<HiddenInput />
						{helperText && <HelperText>{helperText}</HelperText>}
						<ErrorText>{errorText || errorTextProp}</ErrorText>
					</>
				)}
			</div>
		</PinFieldContext.Provider>
	);
}

export function Label(
	props: PropsWithChildren<{ class?: string; for?: string }>,
) {
	const { children, class: classProp, for: forProp, ...rest } = props;
	const context = usePinFieldContext();
	const styles = context?.styles;
	return (
		<label
			id={context?.labelId}
			data-part="label"
			for={forProp || (context ? `${context.id}-input-0` : undefined)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			class={cx(styles?.label, classProp)}
			{...rest}
		>
			{children}
		</label>
	);
}

export function Control(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = usePinFieldContext();
	const styles = context?.styles;
	return (
		<div
			data-scope="pin-field"
			data-part="control"
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			class={cx(styles?.control, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface InputProps {
	index: number;
	class?: string;
	[key: string]: unknown;
}

export function Input(props: InputProps) {
	const { index, class: classProp, ...rest } = props;
	const context = usePinFieldContext();
	if (!context) {
		return <input data-part="input" data-index={index} {...rest} />;
	}
	const {
		styles,
		value,
		count,
		type,
		placeholder,
		mask,
		otp,
		autoComplete: contextAutoComplete,
		disabled,
		readOnly,
		required,
		invalid,
		id,
		hasHelperText,
		hasErrorText,
		helperTextId,
		errorTextId,
	} = context;
	const filled = value[index] !== undefined && value[index] !== "";
	const describedBy = [
		hasHelperText ? helperTextId : null,
		invalid && hasErrorText ? errorTextId : null,
	]
		.filter(Boolean)
		.join(" ");
	return (
		<input
			id={`${id}-input-${index}`}
			data-scope="pin-field"
			data-part="input"
			data-index={index}
			data-filled={filled ? "" : undefined}
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
			data-readonly={readOnly ? "" : undefined}
			inputMode={type === "numeric" ? "numeric" : "text"}
			type={mask ? "password" : "text"}
			autoComplete={contextAutoComplete ?? (otp ? "one-time-code" : "off")}
			maxLength={1}
			placeholder={placeholder}
			disabled={disabled}
			readOnly={readOnly}
			required={required}
			aria-label={`Pin code ${index + 1} of ${count}`}
			aria-invalid={invalid ? "true" : undefined}
			aria-describedby={describedBy || undefined}
			value={value[index] ?? ""}
			class={cx(styles?.input, classProp)}
			{...rest}
		/>
	);
}

export function Inputs(props: { class?: string }) {
	const context = usePinFieldContext();
	const count = context?.count ?? 0;
	return (
		<>
			{Array.from({ length: count }, (_, index) => (
				<Input key={index} index={index} {...props} />
			))}
		</>
	);
}

export function HiddenInput(
	props: { name?: string } & Record<string, unknown>,
) {
	const { name, ...rest } = props;
	const context = usePinFieldContext();
	const value = context?.value ?? [];
	return (
		<input
			type="hidden"
			data-part="hidden-input"
			name={name || context?.name}
			value={value.join("")}
			{...rest}
		/>
	);
}

export function HelperText(props: { children?: Child; class?: string }) {
	const context = usePinFieldContext();
	const styles = context?.styles;
	return (
		<div
			id={context?.helperTextId}
			data-part="helper-text"
			class={cx(styles?.helperText, props.class)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
		>
			{props.children}
		</div>
	);
}

export function ErrorText(props: { children?: Child; class?: string }) {
	const context = usePinFieldContext();
	const styles = context?.styles;
	const content = props.children || context?.errorText;
	if (context?.invalid && content) {
		return (
			<div
				id={context?.errorTextId}
				data-part="error-text"
				aria-live="polite"
				class={cx(styles?.errorText, props.class)}
				data-disabled={context?.disabled ? "" : undefined}
				data-invalid={context?.invalid ? "" : undefined}
				data-readonly={context?.readOnly ? "" : undefined}
			>
				{content}
			</div>
		);
	}
	return null;
}
