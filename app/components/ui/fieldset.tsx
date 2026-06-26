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

export function FieldsetLegend(props: { children?: any; class?: string }) {
	const styles = fieldset();
	return (
		<legend class={cx(styles.legend, props.class)}>{props.children}</legend>
	);
}

export function FieldsetHelperText(props: { children?: any; class?: string }) {
	const styles = fieldset();
	return <p class={cx(styles.helperText, props.class)}>{props.children}</p>;
}

export function FieldsetErrorText(props: { children?: any; class?: string }) {
	const styles = fieldset();
	return <p class={cx(styles.errorText, props.class)}>{props.children}</p>;
}

export function FieldsetContent(props: { children?: any; class?: string }) {
	const styles = fieldset();
	return <div class={cx(styles.content, props.class)}>{props.children}</div>;
}

export function FieldsetControl(props: { children?: any; class?: string }) {
	const styles = fieldset();
	return <div class={cx(styles.control, props.class)}>{props.children}</div>;
}
