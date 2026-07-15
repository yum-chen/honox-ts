import { cx } from "design-system/css";
import type { LinkVariantProps } from "design-system/recipes";
import { link } from "design-system/recipes";
import type { Child, ElementType } from "hono/jsx";
import { cloneElement } from "hono/jsx";

export interface LinkProps extends LinkVariantProps {
	/** Render as a different element/component (e.g. "span", or a router Link). */
	as?: ElementType;
	/**
	 * Merge the link styles onto a single child element instead of rendering an
	 * `<a>`. Enables routing composition (e.g. wrap a framework's `<Link />`).
	 */
	asChild?: boolean;
	children?: Child;
	class?: string;
	[key: string]: unknown;
}

export function Link(props: LinkProps) {
	const [variantProps, localProps] = link.splitVariantProps(props);
	const {
		as: Component = "a",
		asChild,
		children,
		class: classProp,
		href,
		target,
		rel,
		...restProps
	} = localProps;

	// External links open safely by default (mirrors Ark UI Link behavior):
	// a `target="_blank"` without an explicit `rel` gets `noopener noreferrer`.
	const resolvedRel = target === "_blank" && !rel ? "noopener noreferrer" : rel;

	const forwardProps: Record<string, unknown> = {
		...restProps,
		...(href !== undefined ? { href } : {}),
		...(target !== undefined ? { target } : {}),
		...(target === "_blank" || rel !== undefined ? { rel: resolvedRel } : {}),
	};

	const className = cx(link(variantProps), classProp);

	if (asChild && typeof children === "object" && children !== null) {
		const child = children as JSX.Element;
		return cloneElement(child, {
			...forwardProps,
			class: cx(className, child.props?.class),
		});
	}

	return (
		<Component class={className} {...forwardProps}>
			{children}
		</Component>
	);
}
