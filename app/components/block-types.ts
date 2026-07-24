// Shared types for the CMS-driven page block system.
//
// Block props are parsed at runtime from per-type CMS JSON, so their shape
// cannot be statically known — `any` is accepted here on purpose (see the
// suppression comments below) rather than pretending the data is typed.

export interface ComponentBlock {
	blockType: string;
	// biome-ignore lint/suspicious/noExplicitAny: component properties are parsed from dynamic JSON
	[key: string]: any;
}

// biome-ignore lint/suspicious/noExplicitAny: props are parsed from dynamic, per-type CMS JSON
export type BlockProps = Record<string, any>;

/**
 * The single choke-point that strips the `blockType` meta-key so it never
 * leaks onto a component as a DOM attribute. Named distinctly from `type` so
 * components remain free to have their own `type` prop (e.g. Progress's
 * linear/circular) without colliding with the block discriminator on the
 * same flat JSON object. `children` is deliberately left in the result —
 * container renderers destructure it back out themselves before spreading
 * the remainder, and Hono's `jsx()` always lets explicit JSX children win
 * over a `children` key left in spread props, so leaf renderers that spread
 * the full result are still safe.
 */
export function propsOf(block: ComponentBlock): BlockProps {
	const { blockType, ...rest } = block;
	return rest;
}
