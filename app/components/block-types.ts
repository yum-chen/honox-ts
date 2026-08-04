import {
	parseStyleString,
	cmsCategoricalClass,
	layoutStyleClass,
	CONTINUOUS_VAR_MAP,
} from "./block-style";

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

const LAYOUT_BLOCKS = new Set(["grid", "stack", "card", "layout"]);

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

	// Process raw style string if present
	if (typeof rest.style === "string") {
		const rawStyle = rest.style;
		const parsedStyles = parseStyleString(rawStyle);

		if (LAYOUT_BLOCKS.has(blockType)) {
			// For layout blocks, parse the style string and merge the validated properties
			// directly into props, so extractLayoutStyle can process them.
			for (const p of parsedStyles) {
				rest[p.name] = p.value;
			}
			delete rest.style;
		} else {
			// For non-layout blocks, apply the style parsing here
			const categorical: Record<string, string> = {};
			const continuousVars: string[] = [];
			let hasContinuous = false;

			for (const p of parsedStyles) {
				if (p.type === "categorical") {
					categorical[p.name] = p.value;
				} else {
					const varName = CONTINUOUS_VAR_MAP[p.name];
					if (varName) {
						let formattedVal = p.value;
						if (p.name === "backgroundImage" || p.name === "backgroundImageLight") {
							formattedVal = `url("${p.value}")`;
						}
						continuousVars.push(`${varName}: ${formattedVal}`);
						hasContinuous = true;
					}
				}
			}

			// Generate classes and inline style assignments
			const catClass = cmsCategoricalClass(categorical);
			const layClass = hasContinuous ? layoutStyleClass : undefined;

			let extraClass: string | undefined;
			if (catClass && layClass) {
				extraClass = `${catClass} ${layClass}`;
			} else {
				extraClass = catClass || layClass;
			}

			if (extraClass) {
				rest.class = typeof rest.class === "string" && rest.class
					? `${rest.class} ${extraClass}`
					: extraClass;
			}

			const varsStyle = continuousVars.join("; ");
			if (varsStyle) {
				rest.style = varsStyle;
			} else {
				delete rest.style;
			}
		}
	}

	return rest;
}
