import type { JSX } from "hono/jsx";

/**
 * Hono types the `class` attribute as `string | Promise<string>`, but Panda's
 * `cx`/recipe helpers only accept plain strings. This narrows `class` back to a
 * string for the ported components while preserving the rest of the element's
 * attribute typing (including `aria-*`/`data-*` passthrough).
 */
export type HTMLProps<Tag extends keyof JSX.IntrinsicElements> =
	JSX.IntrinsicElements[Tag] & { class?: string };
