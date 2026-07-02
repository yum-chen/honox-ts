import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { SliderVariantProps } from "../../../styled-system/recipes";
import { slider } from "../../../styled-system/recipes";

type SliderStyles = ReturnType<typeof slider>;

interface SliderContextValue {
	styles: SliderStyles;
	orientation: "horizontal" | "vertical";
	value: number[];
	min: number;
	max: number;
}

const SliderContext = createContext<SliderContextValue | null>(null);

const useSliderContext = () => {
	const context = useContext(SliderContext);
	return context;
};

export interface RootProps extends SliderVariantProps, PropsWithChildren {
	orientation?: "horizontal" | "vertical";
	value?: number[];
	defaultValue?: number[];
	min?: number;
	max?: number;
	step?: number;
	class?: string;
	id?: string;
	style?: Record<string, string | number>;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = slider.splitVariantProps(props);
	const {
		children,
		orientation = "horizontal",
		value = [0],
		min = 0,
		max = 100,
		class: classProp,
		id: idProp,
		...restProps
	} = localProps;
	const styles = slider(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const contextValue = {
		styles,
		orientation,
		value,
		min,
		max,
	};

	return (
		<SliderContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="slider"
				data-part="root"
				class={cx(styles.root, classProp)}
				data-orientation={orientation}
				style={{
					...(restProps.style || {}),
				}}
				{...restProps}
			>
				{children}
			</div>
		</SliderContext.Provider>
	);
}

export function Label(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useSliderContext();
	return (
		<label class={cx(context?.styles.label, classProp)} {...rest}>
			{children}
		</label>
	);
}

export function Control(
	props: PropsWithChildren<{ class?: string; style?: any }>,
) {
	const { children, class: classProp, style, ...rest } = props;
	const context = useSliderContext();
	return (
		<div
			data-part="control"
			class={cx(context?.styles.control, classProp)}
			data-orientation={context?.orientation}
			style={{ position: "relative", ...style }}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Track(
	props: PropsWithChildren<{ class?: string; style?: any }>,
) {
	const { children, class: classProp, style, ...rest } = props;
	const context = useSliderContext();
	return (
		<div
			data-part="track"
			class={cx(context?.styles.track, classProp)}
			data-orientation={context?.orientation}
			style={{ position: "relative", width: "100%", height: "100%", ...style }}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Range(
	props: PropsWithChildren<{ class?: string; style?: any }>,
) {
	const { children, class: classProp, style, ...rest } = props;
	const context = useSliderContext();

	const min = context?.min ?? 0;
	const max = context?.max ?? 100;
	const values = context?.value ?? [0];

	let rangeStyle = {};
	if (values.length === 1) {
		const percent = ((values[0] - min) / (max - min)) * 100;
		rangeStyle =
			context?.orientation === "horizontal"
				? {
						left: "0%",
						width: `${percent}%`,
						height: "100%",
						position: "absolute",
					}
				: {
						bottom: "0%",
						height: `${percent}%`,
						width: "100%",
						position: "absolute",
					};
	} else {
		const startPercent = ((values[0] - min) / (max - min)) * 100;
		const endPercent = ((values[values.length - 1] - min) / (max - min)) * 100;
		rangeStyle =
			context?.orientation === "horizontal"
				? {
						left: `${startPercent}%`,
						width: `${endPercent - startPercent}%`,
						height: "100%",
						position: "absolute",
					}
				: {
						bottom: `${startPercent}%`,
						height: `${endPercent - startPercent}%`,
						width: "100%",
						position: "absolute",
					};
	}

	return (
		<div
			data-part="range"
			class={cx(context?.styles.range, classProp)}
			data-orientation={context?.orientation}
			style={{ ...rangeStyle, ...style }}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Thumb(
	props: PropsWithChildren<{
		class?: string;
		index: number;
		name?: string;
		style?: any;
	}>,
) {
	const { children, index, name, class: classProp, style, ...rest } = props;
	const context = useSliderContext();

	const min = context?.min ?? 0;
	const max = context?.max ?? 100;
	const value = context?.value[index] ?? 0;
	const percent = ((value - min) / (max - min)) * 100;

	const thumbStyle =
		context?.orientation === "horizontal"
			? {
					left: `${percent}%`,
					position: "absolute",
					transform: "translateX(-50%)",
				}
			: {
					bottom: `${percent}%`,
					position: "absolute",
					transform: "translateY(50%)",
				};

	return (
		<div
			role="slider"
			aria-valuemin={min}
			aria-valuemax={max}
			aria-valuenow={value}
			aria-orientation={context?.orientation}
			data-scope="slider"
			data-part="thumb"
			class={cx(context?.styles.thumb, classProp)}
			data-orientation={context?.orientation}
			tabIndex={0}
			style={{ ...thumbStyle, ...style }}
			{...rest}
		>
			<input type="hidden" name={name} value={value} />
			{children}
		</div>
	);
}

export function ValueText(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useSliderContext();
	return (
		<span
			data-part="value-text"
			class={cx(context?.styles.valueText, classProp)}
			{...rest}
		>
			{children || context?.value.join(", ")}
		</span>
	);
}

export function MarkerGroup(
	props: PropsWithChildren<{ class?: string; style?: any }>,
) {
	const { children, class: classProp, style, ...rest } = props;
	const context = useSliderContext();
	return (
		<div
			data-part="marker-group"
			class={cx(context?.styles.markerGroup, classProp)}
			data-orientation={context?.orientation}
			style={{
				position: "absolute",
				width: "100%",
				height: "100%",
				top: 0,
				left: 0,
				pointerEvents: "none",
				...style,
			}}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Marker(
	props: PropsWithChildren<{ class?: string; value: number; style?: any }>,
) {
	const { children, class: classProp, value, style, ...rest } = props;
	const context = useSliderContext();

	const min = context?.min ?? 0;
	const max = context?.max ?? 100;
	const percent = ((value - min) / (max - min)) * 100;

	const markerStyle =
		context?.orientation === "horizontal"
			? {
					left: `${percent}%`,
					position: "absolute",
					transform: "translateX(-50%)",
				}
			: {
					bottom: `${percent}%`,
					position: "absolute",
					transform: "translateY(50%)",
				};

	return (
		<div
			data-part="marker"
			class={cx(context?.styles.marker, classProp)}
			data-orientation={context?.orientation}
			style={{ ...markerStyle, ...style }}
			{...rest}
		>
			{children}
		</div>
	);
}

export function MarkerIndicator(props: { class?: string }) {
	const { class: classProp, ...rest } = props;
	const context = useSliderContext();
	return (
		<div
			data-part="marker-indicator"
			class={cx(context?.styles.markerIndicator, classProp)}
			data-orientation={context?.orientation}
			{...rest}
		/>
	);
}
