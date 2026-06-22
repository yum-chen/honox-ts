import type { ComponentProps } from "hono/jsx";
import { alert } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

type AlertVariantProps = Parameters<typeof alert>[0];

export type AlertProps = ComponentProps<"div"> & AlertVariantProps;

export const Alert = (props: AlertProps) => {
	const [variantProps, localProps] = alert.splitVariantProps(props);
	const { class: className, ...rest } = localProps;
	const styles = alert(variantProps);

	return (
		<div role="alert" class={cx(styles.root, className)} {...rest} />
	);
};

export const AlertContent = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = alert();
	return <div class={cx(styles.content, className)} {...rest} />;
};

export const AlertTitle = (props: ComponentProps<"h5">) => {
	const { class: className, ...rest } = props;
	const styles = alert();
	return <h5 class={cx(styles.title, className)} {...rest} />;
};

export const AlertDescription = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = alert();
	return <div class={cx(styles.description, className)} {...rest} />;
};

export const AlertIcon = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = alert();
	return <div class={cx(styles.icon, className)} {...rest} />;
};
