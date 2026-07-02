import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useEffect, useId, useRef, useState } from "hono/jsx";
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

interface SliderInteractionContextValue {
	onControlPointerDown: (e: MouseEvent | TouchEvent) => void;
	onThumbKeyDown: (index: number) => (e: KeyboardEvent) => void;
}

const SliderInteractionContext =
	createContext<SliderInteractionContextValue | null>(null);

const useSliderContext = () => {
	const context = useContext(SliderContext);
	return context;
};

const useSliderInteractionContext = () => {
	return useContext(SliderInteractionContext);
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
		value: valueProp,
		defaultValue,
		min = 0,
		max = 100,
		class: classProp,
		id: idProp,
		...restProps
	} = localProps;
	const value = valueProp ?? defaultValue ?? [min];
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
	const interaction = useSliderInteractionContext();
	return (
		<div
			data-part="control"
			class={cx(context?.styles.control, classProp)}
			data-orientation={context?.orientation}
			style={{ position: "relative", ...style }}
			onMouseDown={interaction?.onControlPointerDown}
			onTouchStart={interaction?.onControlPointerDown}
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
	const interaction = useSliderInteractionContext();

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
			tabIndex={interaction ? 0 : undefined}
			style={{ ...thumbStyle, ...style }}
			onKeyDown={interaction?.onThumbKeyDown(index)}
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
		<span class={cx(context?.styles.valueText, classProp)} {...rest}>
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

export interface InteractiveSliderProps extends RootProps {
	onValueChange?: (details: { value: number[] }) => void;
}

export function InteractiveSlider(props: InteractiveSliderProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		min = 0,
		max = 100,
		step = 1,
		orientation = "horizontal",
		...rootProps
	} = props;

	const [value, setValue] = useState<number[]>(
		valueProp ?? defaultValue ?? [min],
	);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const dragControlRef = useRef<HTMLElement | null>(null);
	const activeThumbIndex = useRef<number | null>(null);

	const getValueFromPoint = (clientX: number, clientY: number) => {
		const control = dragControlRef.current;
		if (!control) return null;

		const rect = control.getBoundingClientRect();

		let percent: number;
		if (orientation === "horizontal") {
			percent = (clientX - rect.left) / rect.width;
		} else {
			percent = 1 - (clientY - rect.top) / rect.height;
		}

		percent = Math.max(0, Math.min(1, percent));
		let newValue = min + percent * (max - min);
		newValue = Math.round(newValue / step) * step;
		newValue = Math.max(min, Math.min(max, newValue));
		return newValue;
	};

	const updateThumbValue = (index: number, newValue: number) => {
		const newValues = [...currentValue];
		newValues[index] = newValue;
		if (index > 0 && newValues[index] < newValues[index - 1]) {
			newValues[index] = newValues[index - 1];
		}
		if (
			index < newValues.length - 1 &&
			newValues[index] > newValues[index + 1]
		) {
			newValues[index] = newValues[index + 1];
		}

		if (!isControlled) {
			setValue(newValues);
		}
		// #region agent log
		fetch('http://127.0.0.1:7377/ingest/03b4832f-9674-4f32-bd7b-0d1df1a67f9e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'722a6d'},body:JSON.stringify({sessionId:'722a6d',location:'slider-primitive.tsx:updateThumbValue',message:'slider value updated',data:{index,newValue,newValues,isControlled},timestamp:Date.now(),hypothesisId:'E',runId:'post-fix'})}).catch(()=>{});
		// #endregion
		onValueChange?.({ value: newValues });
	};

	const handleMove = (e: MouseEvent | TouchEvent) => {
		if (activeThumbIndex.current === null) return;
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
		const newValue = getValueFromPoint(clientX, clientY);
		if (newValue !== null) {
			updateThumbValue(activeThumbIndex.current, newValue);
		}
		if ("touches" in e) e.preventDefault();
	};

	const handleEnd = () => {
		activeThumbIndex.current = null;
		dragControlRef.current = null;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	const handleControlPointerDown = (e: MouseEvent | TouchEvent) => {
		dragControlRef.current = e.currentTarget as HTMLElement;
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
		const newValue = getValueFromPoint(clientX, clientY);
		// #region agent log
		fetch('http://127.0.0.1:7377/ingest/03b4832f-9674-4f32-bd7b-0d1df1a67f9e',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'722a6d'},body:JSON.stringify({sessionId:'722a6d',location:'slider-primitive.tsx:handleControlPointerDown',message:'slider drag start',data:{clientX,clientY,newValue,currentValue},timestamp:Date.now(),hypothesisId:'B',runId:'post-fix'})}).catch(()=>{});
		// #endregion
		if (newValue === null) return;

		let closestIndex = 0;
		let minDistance = Math.abs(currentValue[0] - newValue);
		for (let i = 1; i < currentValue.length; i++) {
			const distance = Math.abs(currentValue[i] - newValue);
			if (distance < minDistance) {
				minDistance = distance;
				closestIndex = i;
			}
		}

		activeThumbIndex.current = closestIndex;
		updateThumbValue(closestIndex, newValue);

		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleEnd);
		document.addEventListener("touchmove", handleMove, { passive: false });
		document.addEventListener("touchend", handleEnd);
	};

	const handleThumbKeyDown =
		(index: number) => (e: KeyboardEvent) => {
			const stepValue = e.shiftKey ? step * 10 : step;
			let newValue = currentValue[index];

			if (e.key === "ArrowRight" || e.key === "ArrowUp") {
				newValue = Math.min(max, newValue + stepValue);
			} else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
				newValue = Math.max(min, newValue - stepValue);
			} else if (e.key === "Home") {
				newValue = min;
			} else if (e.key === "End") {
				newValue = max;
			} else {
				return;
			}

			e.preventDefault();
			updateThumbValue(index, newValue);
		};

	useEffect(() => {
		return () => {
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleMove);
			document.removeEventListener("touchend", handleEnd);
		};
	}, []);

	const interactionValue = {
		onControlPointerDown: handleControlPointerDown,
		onThumbKeyDown: handleThumbKeyDown,
	};

	return (
		<SliderInteractionContext.Provider value={interactionValue}>
			<Root
				{...rootProps}
				orientation={orientation}
				value={currentValue}
				min={min}
				max={max}
				step={step}
			>
				{children}
			</Root>
		</SliderInteractionContext.Provider>
	);
}
