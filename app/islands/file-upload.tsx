import { useState, useRef } from "hono/jsx";
import { fileUpload } from "../../styled-system/recipes";
import { cx } from "../../styled-system/css";
import type { ComponentProps } from "hono/jsx";

type FileUploadVariantProps = Parameters<typeof fileUpload>[0];

export type FileUploadProps = ComponentProps<"div"> & FileUploadVariantProps;

export const FileUpload = (props: FileUploadProps) => {
	const [variantProps, localProps] = fileUpload.splitVariantProps(props);
	const { class: className, children, ...rest } = localProps;
	const styles = fileUpload(variantProps);
	const inputRef = useRef<HTMLInputElement>(null);

	return (
		<div class={cx(styles.root, className)} {...rest}>
			<input
				type="file"
				ref={inputRef}
				style={{ display: "none" }}
				onChange={(e) => {
					const files = (e.target as HTMLInputElement).files;
					if (files) {
						console.log("Files selected:", files);
					}
				}}
			/>
			{children}
		</div>
	);
};

export const FileUploadDropzone = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();
	const [isDragging, setIsDragging] = useState(false);

	return (
		// biome-ignore lint/a11y/useSemanticElements: This is a dropzone, div with role button is acceptable
		<div
			role="button"
			tabIndex={0}
			class={cx(styles.dropzone, className)}
			data-dragging={isDragging ? "" : undefined}
			onDragOver={(e) => {
				e.preventDefault();
				setIsDragging(true);
			}}
			onDragLeave={() => setIsDragging(false)}
			onDrop={(e) => {
				e.preventDefault();
				setIsDragging(false);
				const files = e.dataTransfer?.files;
				if (files) {
					console.log("Files dropped:", files);
				}
			}}
			{...rest}
		/>
	);
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
	// biome-ignore lint/a11y/noLabelWithoutControl: Associated input is handled manually
	return <label class={cx(styles.label, className)} {...rest} />;
};

export const FileUploadTrigger = (props: ComponentProps<"button">) => {
	const { class: className, ...rest } = props;
	const styles = fileUpload();

	return (
		<button
			type="button"
			class={cx(styles.trigger, className)}
			onClick={(e) => {
				const root = e.currentTarget.closest('[class*="fileUpload__root"]');
				const input = root?.querySelector('input[type="file"]') as HTMLInputElement;
				input?.click();
			}}
			{...rest}
		/>
	);
};
