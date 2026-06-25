import { cx } from "../../../styled-system/css";
import type { FieldVariantProps } from "../../../styled-system/recipes";
import { field } from "../../../styled-system/recipes";

export interface FieldProps extends FieldVariantProps {
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Field(props: FieldProps) {
	const [variantProps, localProps] = field.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = field(variantProps);

	return (
		<div class={cx(styles.root, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export function FieldLabel(props: {
	children?: any;
	class?: string;
	for?: string;
}) {
	const styles = field();
	return (
		<label class={cx(styles.label, props.class)} for={props.for}>
			{props.children}
		</label>
	);
}

export function FieldHelperText(props: { children?: any; class?: string }) {
	const styles = field();
	return <div class={cx(styles.helperText, props.class)}>{props.children}</div>;
}

export function FieldErrorText(props: { children?: any; class?: string }) {
	const styles = field();
	return <div class={cx(styles.errorText, props.class)}>{props.children}</div>;
}

export function FieldRequiredIndicator(props: {
	children?: any;
	class?: string;
}) {
	const styles = field();
	return (
		<span class={cx(styles.requiredIndicator, props.class)}>
			{props.children || "*"}
		</span>
	);
}
