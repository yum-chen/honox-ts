import type { PropsWithChildren } from "hono/jsx";
import { cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { type SkeletonVariantProps, skeleton } from "styled-system/recipes";

interface SkeletonProps
	extends PropsWithChildren<Omit<SkeletonVariantProps, "variant">>,
		Omit<import("hono/jsx").JSX.IntrinsicElements["div"], "children" | "width" | "height" | "size"> {
	class?: string;
	width?: string | number;
	height?: string | number;
	size?: string | number;
	variant?: "pulse" | "shine" | "none" | "circle" | "text";
	noOfLines?: number;
	gap?: string | number;
}

function getPandaSize(val: string | number) {
	if (typeof val === "number") {
		return `var(--sizes-${val})`;
	}
	if (/^\d+(\.\d+)?$/.test(val)) {
		return `var(--sizes-${val})`;
	}
	return val;
}

function Skeleton(props: SkeletonProps) {
	const [variantProps, localProps] = skeleton.splitVariantProps(props);
	const { children, class: classProp, style: styleProp, width, height, size, noOfLines, gap, ...restProps } = localProps;

	// Check if the user specified the visual variant ("circle" or "text") via the variant prop or explicitly
	const isCircle = variantProps.circle || props.variant === "circle";
	const isText = props.variant === "text";

	if (isText) {
		return <SkeletonText noOfLines={noOfLines} gap={gap} class={classProp} {...restProps} />;
	}

	// Resolve direct dimensions using inline styles and Panda tokens
	const styles: Record<string, string> = {};
	if (size !== undefined) {
		const sizeValue = getPandaSize(size);
		styles.width = sizeValue;
		styles.height = sizeValue;
	}
	if (width !== undefined) {
		styles.width = getPandaSize(width);
	}
	if (height !== undefined) {
		styles.height = getPandaSize(height);
	}

	const inlineStyles = [
		...Object.entries(styles).map(([k, v]) => `${k}:${v}`),
		styleProp,
	].filter(Boolean).join(";");

	// Resolve animation variant. If it is circle/text shape variant, default animation is pulse
	const resolvedVariant = (props.variant === "circle" || props.variant === "text")
		? undefined
		: props.variant;

	return (
		<div
			class={cx(
				skeleton({
					...variantProps,
					circle: isCircle,
					variant: resolvedVariant,
				}),
				classProp,
			)}
			style={inlineStyles || undefined}
			{...restProps}
		>
			{children}
		</div>
	);
}

interface SkeletonCircleProps extends SkeletonProps {}

function SkeletonCircle(props: SkeletonCircleProps) {
	return <Skeleton circle {...props} />;
}

interface SkeletonTextProps extends SkeletonProps {
	/**
	 * Number of lines to display
	 * @default 3
	 */
	noOfLines?: number;
	gap?: string | number;
}

function SkeletonText(props: SkeletonTextProps) {
	const {
		noOfLines = 3,
		gap = "2",
		class: classProp,
		...skeletonProps
	} = props;

	return (
		<div class={cx(stack({ gap }), classProp)} style="width: 100%;">
			{Array.from({ length: noOfLines }).map((_, index) => (
				<Skeleton
					key={index}
					height="4"
					style={{
						maxWidth: index === noOfLines - 1 ? (noOfLines === 1 ? "100%" : "80%") : undefined,
					}}
					{...skeletonProps}
				/>
			))}
		</div>
	);
}

export {
	Skeleton,
	type SkeletonProps,
};
