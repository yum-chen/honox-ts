import type { JSX } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import {
	type DialogVariantProps,
	dialog,
} from "../../../styled-system/recipes";

export const Dialog = (props: DialogVariantProps & { children: any }) => {
	return <>{props.children}</>;
};

export const DialogBackdrop = (props: JSX.IntrinsicElements["div"]) => {
	const styles = dialog();
	return <div {...props} class={cx(styles.backdrop, props.class)} />;
};

export const DialogPositioner = (props: JSX.IntrinsicElements["div"]) => {
	const styles = dialog();
	return <div {...props} class={cx(styles.positioner, props.class)} />;
};

export const DialogContent = (props: JSX.IntrinsicElements["div"]) => {
	const styles = dialog();
	return <div {...props} class={cx(styles.content, props.class)} />;
};

export const DialogTitle = (props: JSX.IntrinsicElements["h2"]) => {
	const styles = dialog();
	return <h2 {...props} class={cx(styles.title, props.class)} />;
};

export const DialogDescription = (props: JSX.IntrinsicElements["p"]) => {
	const styles = dialog();
	return <p {...props} class={cx(styles.description, props.class)} />;
};

export const DialogCloseTrigger = (props: JSX.IntrinsicElements["button"]) => {
	const styles = dialog();
	return <button {...props} class={cx(styles.closeTrigger, props.class)} />;
};

export const DialogTrigger = (props: JSX.IntrinsicElements["button"]) => {
	const styles = dialog();
	return <button {...props} class={cx(styles.trigger, props.class)} />;
};
