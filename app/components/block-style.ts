import { css } from "design-system/css";

// Validated inline styling for CMS-authored layout blocks (Stack/Grid/Layout)
// and non-layout blocks.
//
// PandaCSS's `css()` only extracts values it can see statically in source,
// so it can't read content/pages/*.json directly. Rather than bypassing
// Panda with a raw inline `style` string, this follows Panda's own guidance
// for runtime values (https://panda-css.com/docs/guides/dynamic-styling):
//
// 1. Categorical properties (small closed sets of values) are registered in
//    `staticCss.css` in `panda.config.ts`, generating real utility classes at
//    build-time. At runtime, we resolve them using `cmsCategoricalClass`.
// 2. Continuous properties (margins, paddings, maxWidths, etc.) map to a single
//    *static* `layoutStyleClass` whose declarations read from `--cms-*` custom
//    properties, which we inject in the style attribute.

export const SPACING =
	/^(-?\d+(\.\d+)?(px|rem|em|%)|0|auto)(\s+(-?\d+(\.\d+)?(px|rem|em|%)|0|auto)){0,3}$/;
export const LENGTH = /^(-?\d+(\.\d+)?(px|rem|em|%|vw|vh)|0|none|100%)$/;
export const COLOR = /^(#[0-9a-fA-F]{3,8}|rgba?\([\d.,%\s]+\)|[a-zA-Z\-]+)$/;
// https:// for externally-hosted images, or a root-relative path for ones
// uploaded through the CMS media picker (media_folder -> public_folder: /media).
export const SAFE_URL = /^(https:\/\/|\/)[^\s"'()]+$/;
export const FIT_VALUES = new Set(["cover", "contain", "auto"]);

export const SHADOW_TOKENS: Record<string, string> = {
	none: "none",
	"2xs": "var(--shadows-2xs)",
	xs: "var(--shadows-xs)",
	sm: "var(--shadows-sm)",
	md: "var(--shadows-md)",
	lg: "var(--shadows-lg)",
	xl: "var(--shadows-xl)",
	"2xl": "var(--shadows-2xl)",
};

export const BORDER_STYLE_VALUES = new Set(["solid", "dashed", "dotted", "none"]);

export const BORDER_COLOR_TOKENS: Record<string, string> = {
	default: "var(--colors-border)",
	error: "var(--colors-border-error)",
};

// Categorical property-to-allowed-values mapping
export const CATEGORICAL_PROPERTIES = {
	textAlign: new Set(["left", "center", "right", "justify", "start", "end"]),
	fontWeight: new Set(["bold", "600", "normal", "700"]),
	textTransform: new Set(["uppercase", "none", "lowercase", "capitalize"]),
	borderStyle: BORDER_STYLE_VALUES,
	borderTopStyle: BORDER_STYLE_VALUES,
	borderBottomStyle: BORDER_STYLE_VALUES,
	flexWrap: new Set(["wrap", "nowrap", "wrap-reverse"]),
	justifyContent: new Set(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]),
	color: new Set(["var(--colors-fg-muted)"]),
	borderColor: new Set(["var(--colors-border)", "var(--colors-border-error)"]),
	borderTopColor: new Set(["var(--colors-border)"]),
	borderBottomColor: new Set(["var(--colors-border)"]),
};

// Continuous properties configuration
export const CONTINUOUS_PROPERTIES = {
	margin: SPACING,
	marginTop: SPACING,
	marginBottom: SPACING,
	marginLeft: SPACING,
	marginRight: SPACING,
	padding: SPACING,
	paddingTop: SPACING,
	paddingBottom: SPACING,
	paddingLeft: SPACING,
	paddingRight: SPACING,
	maxWidth: LENGTH,
	width: LENGTH,
	minWidth: LENGTH,
	rowGap: SPACING,
	letterSpacing: /^(-?\d+(\.\d+)?(px|rem|em|%)|0|normal|0\.05em)$/,
	opacity: "opacity", // uses safeOpacity
	backgroundColor: COLOR,
	backgroundImage: SAFE_URL,
	backgroundImageLight: SAFE_URL,
	backgroundFit: FIT_VALUES,
	boxShadow: "boxShadow", // uses SHADOW_TOKENS
	flexShrink: /^\d+$/,
	borderRadius: LENGTH,
	borderWidth: LENGTH,
	borderTopWidth: LENGTH,
	borderBottomWidth: LENGTH,
};

export const CONTINUOUS_VAR_MAP: Record<string, string> = {
	margin: "--cms-margin",
	marginTop: "--cms-margin-top",
	marginBottom: "--cms-margin-bottom",
	marginLeft: "--cms-margin-left",
	marginRight: "--cms-margin-right",
	padding: "--cms-padding",
	paddingTop: "--cms-padding-top",
	paddingBottom: "--cms-padding-bottom",
	paddingLeft: "--cms-padding-left",
	paddingRight: "--cms-padding-right",
	maxWidth: "--cms-max-width",
	width: "--cms-width",
	minWidth: "--cms-min-width",
	rowGap: "--cms-row-gap",
	letterSpacing: "--cms-letter-spacing",
	flexShrink: "--cms-flex-shrink",
	borderRadius: "--cms-border-radius",
	backgroundColor: "--cms-bg-color",
	backgroundImage: "--cms-bg-image",
	backgroundImageLight: "--cms-bg-image-light",
	backgroundFit: "--cms-bg-fit",
	opacity: "--cms-opacity",
	boxShadow: "--cms-box-shadow",
	borderWidth: "--cms-border-width",
	borderTopWidth: "--cms-border-top-width",
	borderBottomWidth: "--cms-border-bottom-width",
};

export const layoutStyleClass = css({
	margin: "var(--cms-margin, initial)",
	marginTop: "var(--cms-margin-top, initial)",
	marginBottom: "var(--cms-margin-bottom, initial)",
	marginLeft: "var(--cms-margin-left, initial)",
	marginRight: "var(--cms-margin-right, initial)",
	padding: "var(--cms-padding, initial)",
	paddingTop: "var(--cms-padding-top, initial)",
	paddingBottom: "var(--cms-padding-bottom, initial)",
	paddingLeft: "var(--cms-padding-left, initial)",
	paddingRight: "var(--cms-padding-right, initial)",
	maxWidth: "var(--cms-max-width, initial)",
	width: "var(--cms-width, initial)",
	minWidth: "var(--cms-min-width, initial)",
	rowGap: "var(--cms-row-gap, initial)",
	letterSpacing: "var(--cms-letter-spacing, initial)",
	flexShrink: "var(--cms-flex-shrink, initial)",
	borderRadius: "var(--cms-border-radius, initial)",
	backgroundColor: "var(--cms-bg-color, initial)",
	backgroundImage: {
		_dark: "var(--cms-bg-image, initial)",
		_light: "var(--cms-bg-image-light, var(--cms-bg-image, initial))",
	},
	backgroundSize: "var(--cms-bg-fit, initial)",
	backgroundPosition: "center",
	backgroundRepeat: "no-repeat",
	opacity: "var(--cms-opacity, initial)",
	boxShadow: "var(--cms-box-shadow, initial)",
	borderWidth: "var(--cms-border-width, initial)",
	borderTopWidth: "var(--cms-border-top-width, initial)",
	borderBottomWidth: "var(--cms-border-bottom-width, initial)",
});

export function safe(value: unknown, pattern: RegExp): string | undefined {
	if (typeof value !== "string") return undefined;
	const trimmed = value.trim();
	return trimmed !== "" && pattern.test(trimmed) ? trimmed : undefined;
}

export function safeOpacity(value: unknown): string | undefined {
	const num = typeof value === "number" ? value : Number(value);
	if (typeof value !== "number" && typeof value !== "string") return undefined;
	if (Number.isNaN(num) || num < 0 || num > 1) return undefined;
	return String(num);
}

export function normalizeColor(val: string): string | undefined {
	const trimmed = val.trim().toLowerCase();
	if (trimmed === "#71717a" || trimmed === "#6b7280" || trimmed === "var(--colors-fg-muted)") {
		return "var(--colors-fg-muted)";
	}
	if (trimmed === "#e5e7eb" || trimmed === "var(--colors-border)" || trimmed === "default") {
		return "var(--colors-border)";
	}
	if (trimmed === "error" || trimmed === "var(--colors-border-error)") {
		return "var(--colors-border-error)";
	}
	return undefined;
}

export function decomposeBorderShorthand(val: string): { width?: string; style?: string; color?: string } {
	const parts = val.trim().split(/\s+/);
	let width: string | undefined;
	let style: string | undefined;
	let color: string | undefined;

	for (const part of parts) {
		const trimmedPart = part.trim();
		if (BORDER_STYLE_VALUES.has(trimmedPart)) {
			style = trimmedPart;
		} else if (LENGTH.test(trimmedPart)) {
			width = trimmedPart;
		} else if (COLOR.test(trimmedPart) || trimmedPart.startsWith("var(")) {
			color = trimmedPart;
		}
	}
	return { width, style, color };
}

export interface ValidatedStyle {
	type: "categorical" | "continuous";
	name: string; // camelCase
	value: string;
}

export function parseAndValidateStyleProperty(
	name: string,
	value: string,
): ValidatedStyle[] {
	const camelName = name.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

	// Decompose border shorthands
	if (camelName === "border" || camelName === "borderTop" || camelName === "borderBottom") {
		const decomposed = decomposeBorderShorthand(value);
		const prefix = camelName === "border" ? "border" : camelName;
		const results: ValidatedStyle[] = [];
		if (decomposed.width) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Width`, decomposed.width));
		}
		if (decomposed.style) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Style`, decomposed.style));
		}
		if (decomposed.color) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Color`, decomposed.color));
		}
		return results;
	}

	// Normalize color properties
	if (
		camelName === "color" ||
		camelName === "borderColor" ||
		camelName === "borderTopColor" ||
		camelName === "borderBottomColor"
	) {
		const normalized = normalizeColor(value);
		if (normalized) {
			return [{ type: "categorical", name: camelName, value: normalized }];
		}
		return [];
	}

	// Check if categorical
	if (camelName in CATEGORICAL_PROPERTIES) {
		const set = CATEGORICAL_PROPERTIES[camelName as keyof typeof CATEGORICAL_PROPERTIES];
		const trimmedVal = value.trim();
		if (set.has(trimmedVal)) {
			return [{ type: "categorical", name: camelName, value: trimmedVal }];
		}
		return [];
	}

	// Check if continuous
	if (camelName === "opacity") {
		const op = safeOpacity(value);
		if (op) {
			return [{ type: "continuous", name: "opacity", value: op }];
		}
	} else if (camelName === "boxShadow") {
		const trimmed = value.trim();
		if (trimmed in SHADOW_TOKENS) {
			return [{ type: "continuous", name: "boxShadow", value: SHADOW_TOKENS[trimmed] }];
		}
	} else if (camelName === "backgroundFit") {
		const trimmed = value.trim().toLowerCase();
		if (FIT_VALUES.has(trimmed)) {
			return [{ type: "continuous", name: "backgroundFit", value: trimmed }];
		}
	} else if (camelName in CONTINUOUS_PROPERTIES) {
		const patternOrRule = CONTINUOUS_PROPERTIES[camelName as keyof typeof CONTINUOUS_PROPERTIES];
		if (patternOrRule instanceof RegExp) {
			const validated = safe(value, patternOrRule);
			if (validated) {
				return [{ type: "continuous", name: camelName, value: validated }];
			}
		}
	}

	return [];
}

export function parseStyleString(styleStr: string): ValidatedStyle[] {
	const results: ValidatedStyle[] = [];
	const declarations = styleStr.split(";");
	for (const decl of declarations) {
		const trimmedDecl = decl.trim();
		if (!trimmedDecl) continue;
		const colonIdx = trimmedDecl.indexOf(":");
		if (colonIdx === -1) continue;
		const prop = trimmedDecl.slice(0, colonIdx).trim();
		const val = trimmedDecl.slice(colonIdx + 1).trim();
		if (prop && val) {
			results.push(...parseAndValidateStyleProperty(prop, val));
		}
	}
	return results;
}

export function cmsCategoricalClass(categoricalStyles: Record<string, string>): string | undefined {
	if (Object.keys(categoricalStyles).length === 0) return undefined;
	return css(categoricalStyles);
}

export interface ExtractedLayoutStyle {
	/** The static Panda class to add — only set when there's a var to back it. */
	class?: string;
	/** Inline `--cms-*` custom-property assignments. */
	style?: string;
}

const EXTENDED_STYLE_KEYS = Array.from(
	new Set([
		...Object.keys(CATEGORICAL_PROPERTIES),
		...Object.keys(CONTINUOUS_PROPERTIES),
		"style",
	])
);

export function extractLayoutStyle(
	props: Record<string, unknown>,
): ExtractedLayoutStyle {
	const vars: string[] = [];
	const categorical: Record<string, string> = {};
	let hasContinuous = false;

	// Loop over all potential continuous/categorical style properties in the block's props
	for (const key of EXTENDED_STYLE_KEYS) {
		if (!(key in props)) continue;
		const value = props[key];
		if (typeof value === "string") {
			const parsed = parseAndValidateStyleProperty(key, value);
			for (const p of parsed) {
				if (p.type === "categorical") {
					categorical[p.name] = p.value;
				} else {
					const varName = CONTINUOUS_VAR_MAP[p.name];
					if (varName) {
						let formattedVal = p.value;
						if (p.name === "backgroundImage" || p.name === "backgroundImageLight") {
							formattedVal = `url("${p.value}")`;
						}
						vars.push(`${varName}: ${formattedVal}`);
						hasContinuous = true;
					}
				}
			}
		} else if (typeof value === "number" && key === "opacity") {
			const op = safeOpacity(value);
			if (op) {
				vars.push(`--cms-opacity: ${op}`);
				hasContinuous = true;
			}
		}
		delete props[key];
	}

	const varsStyle = vars.join("; ");
	const catClass = cmsCategoricalClass(categorical);
	const layoutClass = hasContinuous ? layoutStyleClass : undefined;

	let finalClass: string | undefined;
	if (catClass && layoutClass) {
		finalClass = `${catClass} ${layoutClass}`;
	} else {
		finalClass = catClass || layoutClass;
	}

	return {
		class: finalClass,
		style: varsStyle || undefined,
	};
}
