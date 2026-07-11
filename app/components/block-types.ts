// Shared types for the CMS-driven page block system.
//
// Block props are parsed at runtime from per-type CMS JSON, so their shape
// cannot be statically known — `any` is accepted here on purpose (see the
// biome-ignore comments) rather than pretending the data is typed.

export interface ComponentBlock {
  type: string;
  // biome-ignore lint/suspicious/noExplicitAny: component properties are parsed from dynamic JSON
  [key: string]: any;
}

// biome-ignore lint/suspicious/noExplicitAny: props are parsed from dynamic, per-type CMS JSON
export type BlockProps = Record<string, any>;

/**
 * The single choke-point that strips the meta-keys used for routing and
 * composition (`type`, `children`) so they can never leak onto a component as
 * DOM attributes. Every renderer must derive its props through this helper —
 * there is no other place where `type`/`children` may reach a component.
 */
export function propsOf(block: ComponentBlock): BlockProps {
  const { type, children, ...rest } = block;
  return rest;
}
