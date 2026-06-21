import type { JSX } from "hono/jsx";
import { css, cx } from "../../../styled-system/css";
import { type CardVariantProps, card } from "../../../styled-system/recipes";

export type CardProps = CardVariantProps & JSX.IntrinsicElements["div"];

export const Card = (props: CardProps) => {
	const [variantProps, localProps] = card.splitVariantProps(props);
	const styles = card(variantProps);

	return (
		<div
			{...localProps}
			class={cx(styles.root, css(localProps as any), localProps.class)}
		/>
	);
};

export const CardHeader = (props: JSX.IntrinsicElements["div"]) => {
	const styles = card();
	return <div {...props} class={cx(styles.header, props.class)} />;
};

export const CardBody = (props: JSX.IntrinsicElements["div"]) => {
	const styles = card();
	return <div {...props} class={cx(styles.content, props.class)} />;
};

export const CardFooter = (props: JSX.IntrinsicElements["div"]) => {
	const styles = card();
	return <div {...props} class={cx(styles.footer, props.class)} />;
};

export const CardTitle = (props: JSX.IntrinsicElements["h3"]) => {
	const styles = card();
	return <h3 {...props} class={cx(styles.title, props.class)} />;
};

export const CardDescription = (props: JSX.IntrinsicElements["p"]) => {
	const styles = card();
	return <p {...props} class={cx(styles.description, props.class)} />;
};
