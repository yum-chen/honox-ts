import { cx } from "../../../styled-system/css";
import type { FieldsetVariantProps } from "../../../styled-system/recipes";
import { fieldset } from "../../../styled-system/recipes";

export interface FieldsetProps extends FieldsetVariantProps {
	children?: any;
	class?: string;
	[key: string]: any;
}

export function Fieldset(props: FieldsetProps) {
	const [variantProps, localProps] = fieldset.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = fieldset(variantProps);

	return (
		<fieldset class={cx(styles.root, classProp)} {...restProps}>
			{children}
		</fieldset>
	);
}

export function FieldsetLegend(props: {
	children?: any;
	class?: string;
	[key: string]: any;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<legend class={cx(styles.legend, classProp)} {...restProps}>
			{children}
		</legend>
	);
}

export function FieldsetHelperText(props: {
	children?: any;
	class?: string;
	[key: string]: any;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<p class={cx(styles.helperText, classProp)} {...restProps}>
			{children}
		</p>
	);
}

export function FieldsetErrorText(props: {
	children?: any;
	class?: string;
	[key: string]: any;
}) {
	const { children, class: classProp, ...restProps } = props;
	const styles = fieldset();
	return (
		<p class={cx(styles.errorText, classProp)} {...restProps}>
			{children}
		</p>
	);
}

export function FieldsetContent(props: {
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

export function FieldsetControl(props: {
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
