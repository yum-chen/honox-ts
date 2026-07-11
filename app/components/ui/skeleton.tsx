import type { PropsWithChildren } from "hono/jsx";
import { css, cx } from "styled-system/css";
import { stack } from "styled-system/patterns";
import { type SkeletonVariantProps, skeleton } from "styled-system/recipes";

interface SkeletonProps
	extends PropsWithChildren<SkeletonVariantProps>,
		Omit<import("hono/jsx").JSX.IntrinsicElements["div"], "children" | "width" | "height" | "size"> {
	class?: string;
	width?: string | number;
	height?: string | number;
	size?: string | number;
}

function Skeleton(props: SkeletonProps) {
	const [variantProps, localProps] = skeleton.splitVariantProps(props);
	const { children, class: classProp, width, height, size, ...restProps } = localProps;

	const styles: Record<string, any> = {};
	if (size !== undefined) {
		styles.boxSize = size;
	}
	if (width !== undefined) {
		styles.width = width;
	}
	if (height !== undefined) {
		styles.height = height;
	}

	const hasStyles = Object.keys(styles).length > 0;

	return (
		<div
			class={cx(skeleton(variantProps), hasStyles ? css(styles) : undefined, classProp)}
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
		<div class={cx(stack({ gap }), css({ width: "full" }), classProp)}>
			{Array.from({ length: noOfLines }).map((_, index) => (
				<Skeleton
					key={index}
					class={css({
						height: "4",
						_last: { maxW: noOfLines === 1 ? "100%" : "80%" },
					})}
					{...skeletonProps}
				/>
			))}
		</div>
	);
}

export {
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	type SkeletonProps,
	type SkeletonCircleProps,
	type SkeletonTextProps,
};
