import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { FieldsetVariantProps } from "../../../styled-system/recipes";
import { fieldset } from "../../../styled-system/recipes";

interface FieldsetProps extends FieldsetVariantProps {
	children?: any;
	class?: string;
	id?: string;
	disabled?: boolean;
	invalid?: boolean;
	interactive?: boolean;
	[key: string]: any;
}

interface FieldsetContextValue {
	id: string;
	disabled?: boolean;
	invalid?: boolean;
	helperTextId: string;
	errorTextId: string;
}

const FieldsetContext = createContext<FieldsetContextValue | null>(null);

const useFieldsetContext = () => useContext(FieldsetContext);

function Fieldset(props: FieldsetProps) {
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

function FieldsetLegend(props: { children?: any; class?: string }) {
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

function FieldsetHelperText(props: { children?: any; class?: string }) {
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

function FieldsetErrorText(props: { children?: any; class?: string }) {
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

function FieldsetContent(props: {
	children?: any;
	class?: string;
	[key: string]: any;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<div class={cx(styles.content, classProp)} {...restProps}>
			{children}
		</div>
	);
}

function FieldsetControl(props: {
	children?: any;
	class?: string;
	[key: string]: any;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<div class={cx(styles.control, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export type { FieldsetProps };
export {
	Fieldset,
	FieldsetContent,
	FieldsetControl,
	FieldsetErrorText,
	FieldsetHelperText,
	FieldsetLegend,
	useFieldsetContext,
};
