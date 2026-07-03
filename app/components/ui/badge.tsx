import type { PropsWithChildren } from "hono/jsx";
import { css, cx } from "styled-system/css";
import type { BadgeVariantProps } from "styled-system/recipes";
import { badge } from "styled-system/recipes";

export interface BadgeProps
	extends BadgeVariantProps,
		PropsWithChildren<{
			class?: string;
			interactive?: boolean;
			colorPalette?:
				| "blue"
				| "green"
				| "red"
				| "purple"
				| "orange"
				| "cyan"
				| "yellow"
				| "pink"
				| "teal"
				| "indigo"
				| "gray"
				| "success"
				| "error"
				| "warning";
		}> {}

export function Badge(props: BadgeProps) {
	const [variantProps, localProps] = badge.splitVariantProps(props);
	const { children, class: classProp, colorPalette, ...restProps } = localProps;

	const colorPaletteMap: Record<string, string> = {
		success: "green",
		error: "red",
		warning: "orange",
	};

	const resolvedColorPalette =
		(colorPalette && colorPaletteMap[colorPalette]) || colorPalette || "gray";

	return (
		<div
			class={cx(
				badge(variantProps),
				css({ colorPalette: resolvedColorPalette }),
				classProp,
			)}
			{...restProps}
		>
			{children}
		</div>
	);
}
