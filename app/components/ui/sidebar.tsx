import type { JSX } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import {
	type DrawerVariantProps,
	drawer,
} from "../../../styled-system/recipes";

export const Sidebar = (props: DrawerVariantProps & { children: any }) => {
	return <>{props.children}</>;
};

export const SidebarBackdrop = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.backdrop, props.class)} />;
};

export const SidebarPositioner = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.positioner, props.class)} />;
};

export const SidebarContent = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.content, props.class)} />;
};

export const SidebarHeader = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.header, props.class)} />;
};

export const SidebarBody = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.body, props.class)} />;
};

export const SidebarFooter = (props: JSX.IntrinsicElements["div"]) => {
	const styles = drawer();
	return <div {...props} class={cx(styles.footer, props.class)} />;
};

export const SidebarTitle = (props: JSX.IntrinsicElements["h2"]) => {
	const styles = drawer();
	return <h2 {...props} class={cx(styles.title, props.class)} />;
};

export const SidebarDescription = (props: JSX.IntrinsicElements["p"]) => {
	const styles = drawer();
	return <p {...props} class={cx(styles.description, props.class)} />;
};

export const SidebarCloseTrigger = (props: JSX.IntrinsicElements["button"]) => {
	const styles = drawer();
	return <button {...props} class={cx(styles.closeTrigger, props.class)} />;
};

export const SidebarTrigger = (props: JSX.IntrinsicElements["button"]) => {
	const styles = drawer();
	return <button {...props} class={cx(styles.trigger, props.class)} />;
};
