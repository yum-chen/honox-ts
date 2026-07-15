/**
 * ColorPicker — hono/jsx primitive (server-renderable + island logic).
 *
 * Ported from Ark UI / Park UI ColorPicker to hono/jsx with ZERO React
 * dependency. Every part carries `data-scope="colorPicker"` and a `data-part`
 * matching the Ark UI anatomy, so styling and behaviour stay faithful to the
 * reference components.
 *
 * Two ways to use it:
 *   1. Static (SSG / no-JS): render <Root value=...>{<ColorPickerContent/>}</Root>
 *   2. Interactive (island): render <InteractiveColorPicker .../> which owns
 *      colour state, attaches pointer/keyboard handlers, and re-renders.
 */
import type { JSX } from "hono/jsx";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { cx } from "styled-system/css";
import type { ColorPickerVariantProps } from "styled-system/recipes";
import { colorPicker } from "styled-system/recipes";

export type ColorFormat = "hex" | "rgba" | "hsla";

/** Internal colour model: HSV + alpha. h:0-360, s/v:0-100, a:0-1 */
export interface HSVA {
	h: number;
	s: number;
	v: number;
	a: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// Colour math (zero dependencies)
// ─────────────────────────────────────────────────────────────────────────────
const clamp = (n: number, min: number, max: number) =>
	Math.min(max, Math.max(min, n));

const clampHsva = (c: Partial<HSVA>): HSVA => ({
	h: clamp(Number(c.h ?? 0), 0, 360),
	s: clamp(Number(c.s ?? 0), 0, 100),
	v: clamp(Number(c.v ?? 100), 0, 100),
	a: clamp(Number(c.a ?? 1), 0, 1),
});

export function hsvToRgb(h: number, s: number, v: number) {
	const hh = ((h % 360) + 360) % 360;
	const sat = s / 100;
	const val = v / 100;
	const c = val * sat;
	const x = c * (1 - Math.abs(((hh / 60) % 2) - 1));
	const m = val - c;
	let r = 0;
	let g = 0;
	let b = 0;
	if (hh < 60) [r, g, b] = [c, x, 0];
	else if (hh < 120) [r, g, b] = [x, c, 0];
	else if (hh < 180) [r, g, b] = [0, c, x];
	else if (hh < 240) [r, g, b] = [0, x, c];
	else if (hh < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
}

export function rgbToHsv(r: number, g: number, b: number) {
	const rn = r / 255;
	const gn = g / 255;
	const bn = b / 255;
	const max = Math.max(rn, gn, bn);
	const min = Math.min(rn, gn, bn);
	const d = max - min;
	let h = 0;
	if (d !== 0) {
		if (max === rn) h = ((gn - bn) / d) % 6;
		else if (max === gn) h = (bn - rn) / d + 2;
		else h = (rn - gn) / d + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
	}
	const s = max === 0 ? 0 : d / max;
	return { h, s: Math.round(s * 100), v: Math.round(max * 100) };
}

function rgbToHex(r: number, g: number, b: number) {
	const to = (n: number) =>
		clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
	return `#${to(r)}${to(g)}${to(b)}`;
}

export function hexToRgb(hex: string) {
	let h = hex.replace("#", "").trim();
	if (h.length === 3 || h.length === 4) {
		h = h
			.split("")
			.map((c) => c + c)
			.join("");
	}
	if (h.length !== 6 && h.length !== 8) return null;
	const r = Number.parseInt(h.slice(0, 2), 16);
	const g = Number.parseInt(h.slice(2, 4), 16);
	const b = Number.parseInt(h.slice(4, 6), 16);
	const a = h.length === 8 ? Number.parseInt(h.slice(6, 8), 16) / 255 : 1;
	if ([r, g, b].some(Number.isNaN)) return null;
	return { r, g, b, a };
}

function hslToRgb(h: number, s: number, l: number) {
	const sat = s / 100;
	const lig = l / 100;
	const c = (1 - Math.abs(2 * lig - 1)) * sat;
	const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
	const m = lig - c / 2;
	let r = 0;
	let g = 0;
	let b = 0;
	if (h < 60) [r, g, b] = [c, x, 0];
	else if (h < 120) [r, g, b] = [x, c, 0];
	else if (h < 180) [r, g, b] = [0, c, x];
	else if (h < 240) [r, g, b] = [0, x, c];
	else if (h < 300) [r, g, b] = [x, 0, c];
	else [r, g, b] = [c, 0, x];
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
	};
}

export function parseColor(input: unknown): HSVA {
	if (input == null) return { h: 0, s: 0, v: 100, a: 1 };
	if (typeof input === "object") {
		const o = input as Record<string, unknown>;
		if (
			"h" in o &&
			"s" in o &&
			"v" in o &&
			o.h != null &&
			o.s != null &&
			o.v != null
		) {
			return clampHsva({
				h: Number(o.h),
				s: Number(o.s),
				v: Number(o.v),
				a: o.a != null ? Number(o.a) : 1,
			});
		}
		if ("r" in o && o.r != null && o.g != null && o.b != null) {
			const { h, s, v } = rgbToHsv(Number(o.r), Number(o.g), Number(o.b));
			return clampHsva({ h, s, v, a: o.a != null ? Number(o.a) : 1 });
		}
		return { h: 0, s: 0, v: 100, a: 1 };
	}

	const str = String(input).trim().toLowerCase();
	if (str.startsWith("#")) {
		const rgb = hexToRgb(str);
		if (rgb) {
			const { h, s, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
			return clampHsva({ h, s, v, a: rgb.a });
		}
	}
	const rgbMatch = str.match(/rgba?\(([^)]+)\)/);
	if (rgbMatch) {
		const parts = rgbMatch[1]
			.split(/[,\s/]+/)
			.filter(Boolean)
			.map(Number);
		if (parts.length >= 3 && parts.slice(0, 3).every(Number.isFinite)) {
			const { h, s, v } = rgbToHsv(parts[0], parts[1], parts[2]);
			return clampHsva({ h, s, v, a: parts[3] ?? 1 });
		}
	}
	const hslMatch = str.match(/hsla?\(([^)]+)\)/);
	if (hslMatch) {
		const parts = hslMatch[1].split(/[,\s/]+/).filter(Boolean);
		const h = Number.parseFloat(parts[0]);
		const s = Number.parseFloat(parts[1]);
		const l = Number.parseFloat(parts[2]);
		if ([h, s, l].every(Number.isFinite)) {
			const rgb = hslToRgb(h, s, l);
			const { h: hh, s: ss, v } = rgbToHsv(rgb.r, rgb.g, rgb.b);
			return clampHsva({
				h: hh,
				s: ss,
				v,
				a: parts[3] != null ? Number(parts[3]) : 1,
			});
		}
	}
	return { h: 0, s: 0, v: 100, a: 1 };
}

export function hsvaToHex(c: HSVA, includeAlpha = false) {
	const { r, g, b } = hsvToRgb(c.h, c.s, c.v);
	const base = rgbToHex(r, g, b);
	if (!includeAlpha || c.a >= 1) return base;
	const a = Math.round(c.a * 255)
		.toString(16)
		.padStart(2, "0");
	return `${base}${a}`;
}

export function hsvaToCss(c: HSVA) {
	const { r, g, b } = hsvToRgb(c.h, c.s, c.v);
	return `rgba(${r}, ${g}, ${b}, ${Number(c.a.toFixed(3))})`;
}

export function hsvaToRgbaString(c: HSVA) {
	const { r, g, b } = hsvToRgb(c.h, c.s, c.v);
	return `rgba(${r}, ${g}, ${b}, ${Number(c.a.toFixed(3))})`;
}

export function hsvaToHslaString(c: HSVA) {
	return `hsla(${Math.round(c.h)}, ${Math.round(c.s)}%, ${Math.round(
		c.v,
	)}%, ${Number(c.a.toFixed(3))})`;
}

export const hueGradient =
	"linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)";

// ─────────────────────────────────────────────────────────────────────────────
// Context
// ─────────────────────────────────────────────────────────────────────────────
type ColorPickerStyles = ReturnType<typeof colorPicker>;

interface ColorPickerContextValue {
	styles: ColorPickerStyles;
	/** Resolved live colour. */
	value: HSVA;
	format: ColorFormat;
	disabled?: boolean;
	readOnly?: boolean;
	id: string;
}

const ColorPickerContext = createContext<ColorPickerContextValue | null>(null);

export const useColorPickerContext = () =>
	useContext(ColorPickerContext) as ColorPickerContextValue | null;

// ─────────────────────────────────────────────────────────────────────────────
// Root (provider)
// ─────────────────────────────────────────────────────────────────────────────
export interface RootProps extends ColorPickerVariantProps, PropsWithChildren {
	value?: string | HSVA;
	defaultValue?: string | HSVA;
	format?: ColorFormat;
	disabled?: boolean;
	readOnly?: boolean;
	name?: string;
	id?: string;
	class?: string;
	style?: Record<string, string | number>;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = colorPicker.splitVariantProps(props);
	const {
		children,
		value,
		defaultValue,
		format = "hex",
		disabled,
		readOnly,
		id: idProp,
		class: classProp,
		style,
		...rest
	} = localProps;
	const autoId = useId();
	const id = idProp || `color-picker-${autoId}`;
	const resolved = parseColor(value ?? defaultValue ?? "#ffffff");
	const styles = colorPicker(variantProps);

	const contextValue: ColorPickerContextValue = {
		styles,
		value: resolved,
		format,
		disabled,
		readOnly,
		id,
	};

	return (
		<ColorPickerContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="colorPicker"
				data-part="root"
				class={cx(styles.root, classProp)}
				style={style as Record<string, string>}
				{...rest}
			>
				{children}
			</div>
		</ColorPickerContext.Provider>
	);
}

export function RootProvider(props: RootProps) {
	return <Root {...props} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Structural parts
// ─────────────────────────────────────────────────────────────────────────────
export function Label(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<span data-part="label" class={cx(ctx?.styles.label, classProp)}>
			{children}
		</span>
	);
}

export function Control(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div data-part="control" class={cx(ctx?.styles.control, classProp)}>
			{children}
		</div>
	);
}

export function Area(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	const interactive = !ctx?.disabled && !ctx?.readOnly;
	return (
		<div
			data-part="area"
			class={cx(ctx?.styles.area, classProp)}
			tabIndex={interactive ? 0 : undefined}
			role="slider"
			aria-label="Saturation and brightness"
			aria-valuetext={`Saturation ${Math.round(ctx?.value.s ?? 0)}%, Brightness ${Math.round(
				ctx?.value.v ?? 0,
			)}%`}
		>
			{children}
		</div>
	);
}

export function AreaBackground(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	const hueColor = `hsl(${Math.round(ctx?.value.h ?? 0)}, 100%, 50%)`;
	return (
		<div
			data-part="areaBackground"
			class={cx(ctx?.styles.areaBackground, classProp)}
			style={{ backgroundColor: hueColor }}
		/>
	);
}

export function AreaThumb(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	const left = `${ctx?.value.s ?? 0}%`;
	const top = `${100 - (ctx?.value.v ?? 0)}%`;
	return (
		<div
			data-part="areaThumb"
			class={cx(ctx?.styles.areaThumb, classProp)}
			style={{
				left,
				top,
				background: hsvaToCss(ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 }),
			}}
		/>
	);
}

export function ChannelSlider(
	props: PropsWithChildren<{ channel: "hue" | "alpha"; class?: string }>,
) {
	const { children, channel, class: classProp } = props;
	const ctx = useColorPickerContext();
	const interactive = !ctx?.disabled && !ctx?.readOnly;
	return (
		<div
			data-part="channel-slider"
			data-channel={channel}
			class={cx(ctx?.styles.channelSlider, classProp)}
			tabIndex={interactive ? 0 : undefined}
			role="slider"
			aria-label={channel === "hue" ? "Hue" : "Alpha"}
			aria-valuenow={
				channel === "hue"
					? Math.round(ctx?.value.h ?? 0)
					: Math.round((ctx?.value.a ?? 1) * 100)
			}
			aria-valuemin={0}
			aria-valuemax={channel === "hue" ? 360 : 100}
		>
			{children}
		</div>
	);
}

export function ChannelSliderLabel(
	props: PropsWithChildren<{ channel?: "hue" | "alpha"; class?: string }>,
) {
	const { children, channel, class: classProp } = props;
	const ctx = useColorPickerContext();
	const text =
		children ??
		(channel === "hue" ? "Hue" : channel === "alpha" ? "Alpha" : "Channel");
	return (
		<span
			data-part="channel-slider-label"
			class={cx(ctx?.styles.channelSliderLabel, classProp)}
		>
			{text}
		</span>
	);
}

export function ChannelSliderTrack(props: {
	channel: "hue" | "alpha";
	class?: string;
}) {
	const { channel, class: classProp } = props;
	const ctx = useColorPickerContext();
	const value = ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 };
	let background = hueGradient;
	if (channel === "alpha") {
		const { r, g, b } = hsvToRgb(value.h, value.s, value.v);
		background = `linear-gradient(to right, rgba(${r}, ${g}, ${b}, 0), rgba(${r}, ${g}, ${b}, 1))`;
	}
	return (
		<div
			data-part="channel-slider-track"
			data-channel={channel}
			class={cx(ctx?.styles.channelSliderTrack, classProp)}
			style={{ background }}
		/>
	);
}

export function ChannelSliderThumb(props: {
	channel: "hue" | "alpha";
	class?: string;
}) {
	const { channel, class: classProp } = props;
	const ctx = useColorPickerContext();
	const value = ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 };
	const percent =
		channel === "hue" ? (value.h / 360) * 100 : (value.a ?? 1) * 100;
	return (
		<div
			data-part="channel-slider-thumb"
			data-channel={channel}
			class={cx(ctx?.styles.channelSliderThumb, classProp)}
			style={{
				left: `${percent}%`,
				...(channel === "alpha"
					? { background: hsvaToCss(value) }
					: { background: `hsl(${Math.round(value.h)}, 100%, 50%)` }),
			}}
		/>
	);
}

export function ChannelSliderValueText(props: {
	channel: "hue" | "alpha";
	class?: string;
}) {
	const { channel, class: classProp } = props;
	const ctx = useColorPickerContext();
	const value = ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 };
	const text =
		channel === "hue"
			? `${Math.round(value.h)}`
			: `${Math.round((value.a ?? 1) * 100)}%`;
	return (
		<span
			data-part="channel-slider-value-text"
			class={cx(ctx?.styles.channelSliderValueText, classProp)}
		>
			{text}
		</span>
	);
}

export function TransparencyGrid(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div
			data-part="transparency-grid"
			class={cx(ctx?.styles.transparencyGrid, classProp)}
			style={{ position: "absolute", inset: "0", borderRadius: "l2" }}
		/>
	);
}

export function SwatchGroup(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div
			data-part="swatch-group"
			class={cx(ctx?.styles.swatchGroup, classProp)}
		>
			{children}
		</div>
	);
}

export function Swatch(props: {
	value: string;
	active?: boolean;
	class?: string;
}) {
	const { value, active, class: classProp } = props;
	const ctx = useColorPickerContext();
	const interactive = !ctx?.disabled && !ctx?.readOnly;
	const hex = hsvaToHex(parseColor(value), true);
	return (
		<button
			type="button"
			data-part="swatch"
			data-value={value}
			class={cx(ctx?.styles.swatch, classProp)}
			style={{ background: hex }}
			disabled={!interactive}
			aria-label={`Select colour ${hex}`}
			aria-pressed={active ? "true" : undefined}
		>
			{active && <SwatchIndicator />}
		</button>
	);
}

export function SwatchIndicator(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div
			data-part="swatch-indicator"
			class={cx(ctx?.styles.swatchIndicator, classProp)}
		/>
	);
}

export function SwatchTrigger(
	props: PropsWithChildren<{ class?: string; id?: string }>,
) {
	const { children, class: classProp, id } = props;
	const ctx = useColorPickerContext();
	return (
		<button
			type="button"
			data-part="swatch-trigger"
			id={id}
			class={cx(ctx?.styles.swatchTrigger, classProp)}
			style={{
				background: hsvaToCss(ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 }),
			}}
		>
			{children}
		</button>
	);
}

export function ValueSwatch(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div
			data-part="value-swatch"
			class={cx(ctx?.styles.valueSwatch, classProp)}
			style={{
				background: hsvaToCss(ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 }),
			}}
		/>
	);
}

export function ValueText(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	const value = ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 };
	const text =
		ctx?.format === "hex"
			? hsvaToHex(value, value.a < 1)
			: ctx?.format === "hsla"
				? hsvaToHslaString(value)
				: hsvaToRgbaString(value);
	return (
		<span data-part="value-text" class={cx(ctx?.styles.valueText, classProp)}>
			{text}
		</span>
	);
}

export function View(
	props: PropsWithChildren<{ format?: ColorFormat; class?: string }>,
) {
	const { children, format, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div
			data-part="view"
			data-format={format ?? ctx?.format ?? "hex"}
			class={cx(ctx?.styles.view, classProp)}
		>
			{children}
		</div>
	);
}

export function ChannelInput(props: {
	channel: "hex" | "r" | "g" | "b" | "a" | "h" | "s" | "v";
	value: string;
	class?: string;
	readOnly?: boolean;
	"aria-label"?: string;
}) {
	const { channel, value, class: classProp, readOnly, ...rest } = props;
	const ctx = useColorPickerContext();
	return (
		<input
			type="text"
			data-part="channel-input"
			data-channel={channel}
			class={cx(ctx?.styles.channelInput, classProp)}
			value={value}
			readOnly={readOnly}
			aria-label={rest["aria-label"] ?? channel}
			{...rest}
		/>
	);
}

export function FormatSelect(props: { class?: string }) {
	const { class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<select
			data-part="format-select"
			class={cx(ctx?.styles.formatSelect, classProp)}
		>
			<option value="hex" selected={ctx?.format === "hex"}>
				HEX
			</option>
			<option value="rgba" selected={ctx?.format === "rgba"}>
				RGBA
			</option>
			<option value="hsla" selected={ctx?.format === "hsla"}>
				HSLA
			</option>
		</select>
	);
}

export function FormatTrigger(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<button
			type="button"
			data-part="format-trigger"
			class={cx(ctx?.styles.formatTrigger, classProp)}
		>
			{children ?? ctx?.format?.toUpperCase()}
		</button>
	);
}

export function EyeDropperTrigger(
	props: PropsWithChildren<{ class?: string }>,
) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<button
			type="button"
			data-part="eye-dropper-trigger"
			class={cx(ctx?.styles.eyeDropperTrigger, classProp)}
			disabled={!("EyeDropper" in (globalThis as any))}
			aria-label="Pick colour from screen"
		>
			{children ?? "🎯"}
		</button>
	);
}

export function HiddenInput(props: { name?: string; value: string }) {
	return <input type="hidden" name={props.name} value={props.value} />;
}

export function Positioner(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div data-part="positioner" class={cx(ctx?.styles.positioner, classProp)}>
			{children}
		</div>
	);
}

export function Content(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div data-part="content" class={cx(ctx?.styles.content, classProp)}>
			{children}
		</div>
	);
}

export function Trigger(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp } = props;
	const ctx = useColorPickerContext();
	return (
		<div data-part="trigger" class={cx(ctx?.styles.trigger, classProp)}>
			{children}
		</div>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared content (used by both static + interactive)
// ─────────────────────────────────────────────────────────────────────────────
export interface ColorPickerContentProps {
	presets?: string[];
	name?: string;
	interactive?: boolean;
	showArea?: boolean;
	showSliders?: boolean;
	showInputs?: boolean;
	showSwatches?: boolean;
}

export function ColorPickerContent(props: ColorPickerContentProps) {
	const {
		presets = [],
		name,
		interactive = false,
		showArea = true,
		showSliders = true,
		showInputs = true,
		showSwatches = true,
	} = props;
	const ctx = useColorPickerContext();
	const value = ctx?.value ?? { h: 0, s: 0, v: 100, a: 1 };
	const format = ctx?.format ?? "hex";
	const disabled = !!ctx?.disabled;
	const readOnly = !!ctx?.readOnly;
	const inputsReadOnly = !interactive || disabled || readOnly;

	const rgb = hsvToRgb(value.h, value.s, value.v);
	const hex = hsvaToHex(value, value.a < 1);
	const rowStyle: Record<string, string> = {
		display: "flex",
		gap: "6px",
		alignItems: "center",
	};

	return (
		<>
			{showArea && (
				<Control>
					<Area>
						<AreaBackground />
						<AreaThumb />
					</Area>
				</Control>
			)}

			{showSliders && (
				<>
					<ChannelSlider channel="hue">
						<ChannelSliderLabel channel="hue" />
						<div style={{ position: "relative", flex: "1" }}>
							<ChannelSliderTrack channel="hue" />
							<ChannelSliderThumb channel="hue" />
						</div>
						<ChannelSliderValueText channel="hue" />
					</ChannelSlider>
					<ChannelSlider channel="alpha">
						<ChannelSliderLabel channel="alpha" />
						<div style={{ position: "relative", flex: "1" }}>
							<TransparencyGrid />
							<ChannelSliderTrack channel="alpha" />
							<ChannelSliderThumb channel="alpha" />
						</div>
						<ChannelSliderValueText channel="alpha" />
					</ChannelSlider>
				</>
			)}

			{showInputs && (
				<View format={format}>
					{format === "hex" && (
						<ChannelInput
							channel="hex"
							value={hex}
							readOnly={inputsReadOnly}
							aria-label="Hex colour value"
						/>
					)}
					{format === "rgba" && (
						<div style={{ ...rowStyle }}>
							<ChannelInput
								channel="r"
								value={String(rgb.r)}
								readOnly={inputsReadOnly}
								aria-label="Red"
							/>
							<ChannelInput
								channel="g"
								value={String(rgb.g)}
								readOnly={inputsReadOnly}
								aria-label="Green"
							/>
							<ChannelInput
								channel="b"
								value={String(rgb.b)}
								readOnly={inputsReadOnly}
								aria-label="Blue"
							/>
							<ChannelInput
								channel="a"
								value={String(Math.round(value.a * 100))}
								readOnly={inputsReadOnly}
								aria-label="Alpha percentage"
							/>
						</div>
					)}
					{format === "hsla" && (
						<div style={{ ...rowStyle }}>
							<ChannelInput
								channel="h"
								value={String(Math.round(value.h))}
								readOnly={inputsReadOnly}
								aria-label="Hue"
							/>
							<ChannelInput
								channel="s"
								value={String(Math.round(value.s))}
								readOnly={inputsReadOnly}
								aria-label="Saturation"
							/>
							<ChannelInput
								channel="v"
								value={String(Math.round(value.v))}
								readOnly={inputsReadOnly}
								aria-label="Lightness"
							/>
							<ChannelInput
								channel="a"
								value={String(Math.round(value.a * 100))}
								readOnly={inputsReadOnly}
								aria-label="Alpha percentage"
							/>
						</div>
					)}
					<FormatSelect />
				</View>
			)}

			{showSwatches && presets.length > 0 && (
				<SwatchGroup>
					{presets.map((preset) => (
						<Swatch
							key={preset}
							value={preset}
							active={hsvaToHex(parseColor(preset), true) === hex}
						/>
					))}
				</SwatchGroup>
			)}

			{name && <HiddenInput name={name} value={hex} />}
		</>
	);
}

// ─────────────────────────────────────────────────────────────────────────────
// Interactive (island) component
// ─────────────────────────────────────────────────────────────────────────────
export interface ColorPickerChangeDetails {
	value: string;
	hsva: HSVA;
}

export interface InteractiveColorPickerProps extends ColorPickerVariantProps {
	value?: string | HSVA;
	defaultValue?: string | HSVA;
	format?: ColorFormat;
	onValueChange?: (details: ColorPickerChangeDetails) => void;
	presets?: string[];
	name?: string;
	disabled?: boolean;
	readOnly?: boolean;
	/** Render a swatch trigger that opens the picker in a popover. */
	trigger?: boolean;
	/** Optional label rendered above the picker (inside Root). */
	label?: string | JSX.Element;
	showArea?: boolean;
	showSliders?: boolean;
	showInputs?: boolean;
	showSwatches?: boolean;
	class?: string;
	id?: string;
}

const DEFAULT_PRESETS = [
	"#ef4444",
	"#f97316",
	"#eab308",
	"#22c55e",
	"#06b6d4",
	"#3b82f6",
	"#8b5cf6",
	"#ec4899",
	"#64748b",
	"#1e293b",
	"#f8fafc",
	"#000000",
	"#ffffff",
	"#7c3aed",
];

export function InteractiveColorPicker(props: InteractiveColorPickerProps) {
	const {
		value,
		defaultValue,
		format = "hex",
		onValueChange,
		presets = DEFAULT_PRESETS,
		name,
		disabled,
		readOnly,
		trigger = false,
		label,
		showArea = true,
		showSliders = true,
		showInputs = true,
		showSwatches = true,
		class: classProp,
		id: idProp,
		...rest
	} = props;

	const autoId = useId();
	const id = idProp || `color-picker-${autoId}`;
	const [open, setOpen] = useState(false);
	const isControlled = value !== undefined;
	const [color, setColor] = useState<HSVA>(() =>
		parseColor(isControlled ? value : (defaultValue ?? "#7c3aed")),
	);
	const [activeFormat, setActiveFormat] = useState<ColorFormat>(format);

	const colorRef = useRef(color);
	colorRef.current = color;
	const formatRef = useRef(activeFormat);
	formatRef.current = activeFormat;
	const disabledRef = useRef(!!disabled);
	disabledRef.current = !!disabled;
	const readOnlyRef = useRef(!!readOnly);
	readOnlyRef.current = !!readOnly;
	const triggerRef = useRef(trigger);
	triggerRef.current = trigger;
	const onValueChangeRef = useRef(onValueChange);
	onValueChangeRef.current = onValueChange;
	const openRef = useRef(open);
	openRef.current = open;

	const interactive = !disabledRef.current && !readOnlyRef.current;

	const emit = (next: HSVA) => {
		colorRef.current = next;
		setColor(next);
		onValueChangeRef.current?.({
			value: hsvaToHex(next, next.a < 1),
			hsva: next,
		});
	};

	// ── Geometry helpers ────────────────────────────────────────────────────
	const getArea = (clientX: number, clientY: number) => {
		const root = document.getElementById(id);
		const area = root?.querySelector<HTMLElement>('[data-part="area"]');
		if (!area) return;
		const rect = area.getBoundingClientRect();
		const x = clamp((clientX - rect.left) / rect.width, 0, 1);
		const y = clamp((clientY - rect.top) / rect.height, 0, 1);
		const s = Math.round(x * 100);
		const v = Math.round((1 - y) * 100);
		const cur = colorRef.current;
		if (s === Math.round(cur.s) && v === Math.round(cur.v)) return;
		emit({ ...cur, s, v });
	};
	const getHue = (clientX: number) => {
		const root = document.getElementById(id);
		const track = root?.querySelector<HTMLElement>(
			'[data-part="channel-slider-track"][data-channel="hue"]',
		);
		if (!track) return;
		const rect = track.getBoundingClientRect();
		const x = clamp((clientX - rect.left) / rect.width, 0, 1);
		const h = Math.round(x * 360);
		const cur = colorRef.current;
		if (h === Math.round(cur.h)) return;
		emit({ ...cur, h });
	};
	const getAlpha = (clientX: number) => {
		const root = document.getElementById(id);
		const track = root?.querySelector<HTMLElement>(
			'[data-part="channel-slider-track"][data-channel="alpha"]',
		);
		if (!track) return;
		const rect = track.getBoundingClientRect();
		const x = clamp((clientX - rect.left) / rect.width, 0, 1);
		const a = Number(x.toFixed(3));
		const cur = colorRef.current;
		if (a === Number(cur.a.toFixed(3))) return;
		emit({ ...cur, a });
	};

	// ── Effect: attach pointer / keyboard / delegation listeners ─────────────
	useEffect(() => {
		if (!interactive) return;
		const root = document.getElementById(id);
		if (!root) return;

		// Pointer drag with capture — robust even when leaving the element.
		const startDrag = (
			el: HTMLElement,
			onMove: (clientX: number, clientY: number) => void,
		) => {
			return (e: PointerEvent) => {
				const pid = e.pointerId;
				el.setPointerCapture?.(pid);
				onMove(e.clientX, e.clientY);
				const move = (ev: PointerEvent) => onMove(ev.clientX, ev.clientY);
				const up = (ev: PointerEvent) => {
					el.releasePointerCapture?.(pid);
					el.removeEventListener("pointermove", move);
					el.removeEventListener("pointerup", up);
				};
				el.addEventListener("pointermove", move);
				el.addEventListener("pointerup", up);
			};
		};

		const areaEl = root.querySelector<HTMLElement>('[data-part="area"]');
		const hueEl = root.querySelector<HTMLElement>(
			'[data-part="channel-slider"][data-channel="hue"]',
		);
		const alphaEl = root.querySelector<HTMLElement>(
			'[data-part="channel-slider"][data-channel="alpha"]',
		);

		const areaDown = areaEl ? startDrag(areaEl, (x, y) => getArea(x, y)) : null;
		const hueDown = hueEl ? startDrag(hueEl, (x) => getHue(x)) : null;
		const alphaDown = alphaEl ? startDrag(alphaEl, (x) => getAlpha(x)) : null;

		areaEl?.addEventListener("pointerdown", areaDown as any);
		hueEl?.addEventListener("pointerdown", hueDown as any);
		alphaEl?.addEventListener("pointerdown", alphaDown as any);

		// Keyboard: area adjusts saturation (X) & brightness (Y); sliders adjust h/a.
		const areaKey = (e: KeyboardEvent) => {
			const cur = colorRef.current;
			const step = e.shiftKey ? 10 : 1;
			let { s, v } = cur;
			if (e.key === "ArrowRight") s = clamp(s + step, 0, 100);
			else if (e.key === "ArrowLeft") s = clamp(s - step, 0, 100);
			else if (e.key === "ArrowUp") v = clamp(v + step, 0, 100);
			else if (e.key === "ArrowDown") v = clamp(v - step, 0, 100);
			else if (e.key === "Home") {
				s = 0;
				v = 0;
			} else if (e.key === "End") {
				s = 100;
				v = 100;
			} else return;
			e.preventDefault();
			emit({ ...cur, s, v });
		};
		const hueKey = (e: KeyboardEvent) => {
			const cur = colorRef.current;
			const step = e.shiftKey ? 10 : 1;
			let h = cur.h;
			if (e.key === "ArrowRight") h = clamp(h + step, 0, 360);
			else if (e.key === "ArrowLeft") h = clamp(h - step, 0, 360);
			else if (e.key === "Home") h = 0;
			else if (e.key === "End") h = 360;
			else return;
			e.preventDefault();
			emit({ ...cur, h });
		};
		const alphaKey = (e: KeyboardEvent) => {
			const cur = colorRef.current;
			const step = e.shiftKey ? 0.1 : 0.01;
			let a = cur.a;
			if (e.key === "ArrowRight") a = clamp(a + step, 0, 1);
			else if (e.key === "ArrowLeft") a = clamp(a - step, 0, 1);
			else if (e.key === "Home") a = 0;
			else if (e.key === "End") a = 1;
			else return;
			e.preventDefault();
			emit({ ...cur, a: Number(a.toFixed(3)) });
		};

		areaEl?.addEventListener("keydown", areaKey);
		hueEl?.addEventListener("keydown", hueKey);
		alphaEl?.addEventListener("keydown", alphaKey);

		// Swatch click → set colour (delegation).
		const onSwatchClick = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="swatch"]',
			);
			if (!target) return;
			const data = target.getAttribute("data-value");
			if (!data) return;
			emit(parseColor(data));
		};
		root.addEventListener("click", onSwatchClick);

		// Channel-input edits → parse and merge.
		const onInputChange = (e: Event) => {
			const target = e.target as HTMLInputElement;
			if (target.getAttribute("data-part") !== "channel-input") return;
			const channel = target.getAttribute("data-channel");
			const raw = target.value.trim();
			const cur = colorRef.current;
			if (channel === "hex") {
				const parsed = parseColor(raw);
				if (hsvaToHex(parsed) !== "#000000" || raw === "#000000") emit(parsed);
				return;
			}
			const num = Number(raw);
			if (!Number.isFinite(num)) return;
			if (channel === "r") {
				const { h, s, v } = rgbToHsv(
					clamp(num, 0, 255),
					hsvToRgb(cur.h, cur.s, cur.v).g,
					hsvToRgb(cur.h, cur.s, cur.v).b,
				);
				emit({ ...cur, h, s, v });
			} else if (channel === "g") {
				const rgb = hsvToRgb(cur.h, cur.s, cur.v);
				const { h, s, v } = rgbToHsv(rgb.r, clamp(num, 0, 255), rgb.b);
				emit({ ...cur, h, s, v });
			} else if (channel === "b") {
				const rgb = hsvToRgb(cur.h, cur.s, cur.v);
				const { h, s, v } = rgbToHsv(rgb.r, rgb.g, clamp(num, 0, 255));
				emit({ ...cur, h, s, v });
			} else if (channel === "a") {
				emit({ ...cur, a: clamp(num / 100, 0, 1) });
			} else if (channel === "h") {
				emit({ ...cur, h: clamp(num, 0, 360) });
			} else if (channel === "s") {
				emit({ ...cur, s: clamp(num, 0, 100) });
			} else if (channel === "v") {
				emit({ ...cur, v: clamp(num, 0, 100) });
			}
		};
		root.addEventListener("change", onInputChange);

		// Format select → switch format.
		const onFormatChange = (e: Event) => {
			const target = e.target as HTMLSelectElement;
			if (target.getAttribute("data-part") !== "format-select") return;
			const next = target.value as ColorFormat;
			if (next === "hex" || next === "rgba" || next === "hsla") {
				formatRef.current = next;
				setActiveFormat(next);
			}
		};
		root.addEventListener("change", onFormatChange);

		// EyeDropper trigger.
		const onRootClick = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="eye-dropper-trigger"]',
			);
			if (!target) return;
			const ed = (globalThis as any).EyeDropper;
			if (!ed) return;
			ed.open()
				.then((res: { sRGBHex: string }) => emit(parseColor(res.sRGBHex)))
				.catch(() => {});
		};
		root.addEventListener("click", onRootClick);

		// Trigger / popover open-close.
		const onTriggerClick = (e: MouseEvent) => {
			if (!triggerRef.current) return;
			const target = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="swatch-trigger"]',
			);
			if (!target) return;
			e.preventDefault();
			setOpen((o) => !o);
		};
		root.addEventListener("click", onTriggerClick);

		const onOutside = (e: MouseEvent) => {
			if (!triggerRef.current || !openRef.current) return;
			const t = e.target as HTMLElement;
			if (t.closest('[data-part="swatch-trigger"]')) return;
			if (t.closest('[data-part="positioner"]')) return;
			setOpen(false);
		};
		const onEscape = (e: KeyboardEvent) => {
			if (triggerRef.current && e.key === "Escape" && openRef.current) {
				setOpen(false);
			}
		};
		if (triggerRef.current) {
			document.addEventListener("mousedown", onOutside);
			document.addEventListener("keydown", onEscape);
		}

		return () => {
			areaEl?.removeEventListener("pointerdown", areaDown as any);
			hueEl?.removeEventListener("pointerdown", hueDown as any);
			alphaEl?.removeEventListener("pointerdown", alphaDown as any);
			areaEl?.removeEventListener("keydown", areaKey);
			hueEl?.removeEventListener("keydown", hueKey);
			alphaEl?.removeEventListener("keydown", alphaKey);
			root.removeEventListener("click", onSwatchClick);
			root.removeEventListener("change", onInputChange);
			root.removeEventListener("change", onFormatChange);
			root.removeEventListener("click", onRootClick);
			root.removeEventListener("click", onTriggerClick);
			document.removeEventListener("mousedown", onOutside);
			document.removeEventListener("keydown", onEscape);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, interactive, open, trigger]);

	// Sync the hidden <input>/thumb positions when colour changes (covers
	// hydration + controlled updates).
	useEffect(() => {
		if (!interactive) return;
		const root = document.getElementById(id);
		if (!root) return;
		const hex = hsvaToHex(color, color.a < 1);
		const hidden = root.querySelector<HTMLInputElement>('input[type="hidden"]');
		if (hidden) hidden.value = hex;
	}, [id, interactive, color]);

	const content = (
		<ColorPickerContent
			presets={presets}
			name={trigger ? undefined : name}
			interactive={interactive}
			showArea={showArea}
			showSliders={showSliders}
			showInputs={showInputs}
			showSwatches={showSwatches}
		/>
	);

	return (
		<Root
			{...rest}
			id={id}
			value={color}
			format={activeFormat}
			disabled={disabled}
			readOnly={readOnly}
			class={classProp}
		>
			{trigger ? (
				<>
					{label && <Label>{label}</Label>}
					<Trigger>
						<SwatchTrigger />
					</Trigger>
					{open && (
						<Positioner>
							<Content>{content}</Content>
						</Positioner>
					)}
					{name && (
						<HiddenInput name={name} value={hsvaToHex(color, color.a < 1)} />
					)}
				</>
			) : (
				<>
					{label && <Label>{label}</Label>}
					{content}
				</>
			)}
		</Root>
	);
}
