import type { Child } from "hono/jsx";
import { icon as iconRecipe } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";
import type { IconVariantProps } from "../../../styled-system/recipes";

// Hono's JSX namespace doesn't declare SVG elements, so SVG attributes flow
// through its permissive index signature. We type icon props directly.
export type IconProps = IconVariantProps & {
	class?: string;
	[attribute: string]: unknown;
};

/**
 * Framework-agnostic SVG icon factory — a drop-in replacement for the
 * `lucide-react` icon components. Icons inherit `currentColor` and follow the
 * lucide drawing conventions (24x24 grid, 2px round strokes) so they render
 * identically inside Park UI's recipes.
 */
export const createIcon = (children: Child, displayName: string) => {
	const Icon = ({ size, class: className, ...props }: IconProps) => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			width="1em"
			height="1em"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			aria-hidden="true"
			class={cx(size ? iconRecipe({ size }) : undefined, className)}
			{...props}
		>
			{children}
		</svg>
	);
	Icon.displayName = displayName;
	return Icon;
};
