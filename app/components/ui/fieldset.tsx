import type { Child } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { FieldsetVariantProps } from "../../../styled-system/recipes";
import { fieldset } from "../../../styled-system/recipes";

interface FieldsetContextValue {
	id: string;
	disabled?: boolean;
	invalid?: boolean;
	helperTextId: string;
	errorTextId: string;
}

const FieldsetContext = createContext<FieldsetContextValue | null>(null);

export interface FieldsetProps extends FieldsetVariantProps {
	children?: any;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	interactive?: boolean;
	[key: string]: any;
}

export const useFieldsetContext = () => useContext(FieldsetContext);

export interface FieldsetProps extends FieldsetVariantProps {
	children?: Child;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	interactive?: boolean;
	[key: string]: unknown;
}

export function Fieldset(props: FieldsetProps) {
	const [variantProps, localProps] = fieldset.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		disabled = props.disabled,
		invalid = props.invalid,
		...restProps
	} = localProps;

	const autoId = useId();
	const id = idProp || autoId;
	const styles = fieldset(variantProps);

	const contextValue: FieldsetContextValue = {
		id,
		disabled,
		invalid,
		helperTextId: `fieldset::${id}::helper-text`,
		errorTextId: `fieldset::${id}::error-text`,
	};

	const describedBy = [];
	describedBy.push(contextValue.helperTextId);
	if (invalid) describedBy.push(contextValue.errorTextId);

	return (
		<FieldsetContext.Provider value={contextValue}>
			<fieldset
				id={id}
				class={cx(styles.root, classProp)}
				disabled={disabled}
				aria-describedby={describedBy.join(" ")}
				data-invalid={invalid ? "" : undefined}
				{...restProps}
			>
				{children}
			</fieldset>
		</FieldsetContext.Provider>
	);
}

export function FieldsetLegend(props: { children?: Child; class?: string }) {
	const context = useFieldsetContext();
	const styles = fieldset();
	return (
		<legend
			class={cx(styles.legend, props.class)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
		>
			{props.children}
		</legend>
	);
}

export function FieldsetHelperText(props: {
	children?: Child;
	class?: string;
}) {
	const context = useFieldsetContext();
	const styles = fieldset();
	return (
		<p
			id={context?.helperTextId}
			class={cx(styles.helperText, props.class)}
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
		>
			{props.children}
		</p>
	);
}

export function FieldsetErrorText(props: { children?: Child; class?: string }) {
	const context = useFieldsetContext();
	const styles = fieldset();
	if (context?.invalid) {
		return (
			<p
				id={context?.errorTextId}
				class={cx(styles.errorText, props.class)}
				data-disabled={context?.disabled ? "" : undefined}
				data-invalid={context?.invalid ? "" : undefined}
			>
				{props.children}
			</p>
		);
	}
	return null;
}

export function FieldsetContent(props: {
	children?: Child;
	class?: string;
	[key: string]: unknown;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<div class={cx(styles.content, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function FieldsetControl(props: {
	children?: Child;
	class?: string;
	[key: string]: unknown;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<div class={cx(styles.control, classProp)} {...restProps}>
			{children}
		</div>
	);
}
