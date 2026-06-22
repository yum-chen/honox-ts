import type { ComponentProps } from "hono/jsx";
import { fileUpload } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

type FileUploadVariantProps = Parameters<typeof fileUpload>[0];

export type FileUploadProps = ComponentProps<"div"> & FileUploadVariantProps;

export const FileUpload = (props: FileUploadProps) => {
	const [variantProps, localProps] = fileUpload.splitVariantProps(props);
	const { class: className, ...rest } = localProps;
	const styles = fileUpload(variantProps);

	return <div class={cx(styles.root, className)} {...rest} />;
};

export const FileUploadDropzone = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.dropzone, className)} {...rest} />;
};

export const FileUploadItem = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.item, className)} {...rest} />;
};

export const FileUploadItemDeleteTrigger = (
	props: ComponentProps<"button">,
) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return (
		<button
			type="button"
			class={cx(styles.itemDeleteTrigger, className)}
			{...rest}
		/>
	);
};

export const FileUploadItemGroup = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.itemGroup, className)} {...rest} />;
};

export const FileUploadItemName = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.itemName, className)} {...rest} />;
};

export const FileUploadItemPreview = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.itemPreview, className)} {...rest} />;
};

export const FileUploadItemPreviewImage = (
	props: ComponentProps<"img">,
) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return (
		<img
			alt=""
			class={cx(styles.itemPreviewImage, className)}
			{...rest}
		/>
	);
};

export const FileUploadItemSizeText = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	return <div class={cx(styles.itemSizeText, className)} {...rest} />;
};

export const FileUploadLabel = (props: ComponentProps<"label">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	// biome-ignore lint/a11y/noLabelWithoutControl: Associated input is handled by Ark/Park UI logic
	return <label class={cx(styles.label, className)} {...rest} />;
};

export const FileUploadTrigger = (
	props: ComponentProps<"button"> & { asChild?: boolean },
) => {
	const { class: className, asChild, ...rest } = props;
	const styles = fileUpload();

	if (asChild && rest.children) {
		// This is a very simplified asChild implementation for Hono
		// biome-ignore lint/suspicious/noExplicitAny: Required for Hono JSX manipulation
		const child = (Array.isArray(rest.children) ? rest.children[0] : rest.children) as any;
		if (child && typeof child === 'object' && 'props' in child) {
			return {
				...child,
				props: {
					...child.props,
					class: cx(styles.trigger, child.props?.class, className),
				},
			};
		}
	}

	return (
		<button
			type="button"
			class={cx(styles.trigger, className)}
			{...rest}
		/>
	);
};
