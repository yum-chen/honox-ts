import { useEffect, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/slider-primitive";

export interface SliderIslandProps extends RootProps {
	onValueChange?: (details: { value: number[] }) => void;
}

export default function SliderIsland(props: SliderIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		min = 0,
		max = 100,
		step = 1,
		...rootProps
	} = props;

	const orientation = rootProps.orientation ?? "horizontal";

	const [value, setValue] = useState<number[]>(
		valueProp ?? defaultValue ?? [min],
	);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const rootRef = useRef<HTMLDivElement>(null);
	const activeThumbIndex = useRef<number | null>(null);
	const valueRef = useRef<number[]>(currentValue);
	valueRef.current = currentValue;

	const percentForValue = (v: number) =>
		((v - min) / Math.max(1, max - min)) * 100;

	const syncDom = (values: number[]) => {
		const root = rootRef.current;
		if (!root) return;

		const thumbs = root.querySelectorAll<HTMLElement>('[data-part="thumb"]');
		for (let i = 0; i < thumbs.length; i++) {
			const thumb = thumbs[i];
			const v = values[i] ?? min;
			const percent = percentForValue(v);
			thumb.setAttribute("aria-valuenow", String(v));
			if (orientation === "vertical") {
				thumb.style.bottom = `${percent}%`;
				thumb.style.left = "";
			} else {
				thumb.style.left = `${percent}%`;
				thumb.style.bottom = "";
			}
			const input = thumb.querySelector<HTMLInputElement>(
				'input[type="hidden"]',
			);
			if (input) input.value = String(v);
		}

		const range = root.querySelector<HTMLElement>('[data-part="range"]');
		if (range) {
			if (values.length === 1) {
				const percent = percentForValue(values[0]);
				if (orientation === "vertical") {
					range.style.bottom = "0%";
					range.style.height = `${percent}%`;
					range.style.left = "";
					range.style.width = "100%";
				} else {
					range.style.left = "0%";
					range.style.width = `${percent}%`;
					range.style.bottom = "";
					range.style.height = "100%";
				}
			} else {
				const startPercent = percentForValue(values[0]);
				const endPercent = percentForValue(values[values.length - 1]);
				if (orientation === "vertical") {
					range.style.bottom = `${startPercent}%`;
					range.style.height = `${endPercent - startPercent}%`;
					range.style.left = "";
					range.style.width = "100%";
				} else {
					range.style.left = `${startPercent}%`;
					range.style.width = `${endPercent - startPercent}%`;
					range.style.bottom = "";
					range.style.height = "100%";
				}
			}
		}

		const valueText = root.querySelector('[data-part="value-text"]');
		if (valueText) {
			valueText.textContent = values.join(", ");
		}
	};

	const getValueFromPoint = (clientX: number, clientY: number) => {
		if (!rootRef.current) return null;
		const track = rootRef.current.querySelector('[data-part="control"]');
		if (!track) return null;

		const rect = track.getBoundingClientRect();

		let percent: number;
		if (orientation === "horizontal") {
			percent = (clientX - rect.left) / rect.width;
		} else {
			percent = 1 - (clientY - rect.top) / rect.height;
		}

		percent = Math.max(0, Math.min(1, percent));
		const raw = min + percent * (max - min);
		const rounded = Math.round(raw / step) * step;
		return Math.max(min, Math.min(max, rounded));
	};

	const updateThumbValue = (index: number, newValue: number) => {
		const newValues = [...valueRef.current];
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

		valueRef.current = newValues;
		syncDom(newValues);
		if (!isControlled) {
			setValue(newValues);
		}
		onValueChange?.({ value: newValues });
	};

	const handleMove = (e: MouseEvent | TouchEvent) => {
		if (activeThumbIndex.current === null) return;
		const point = "touches" in e ? e.touches[0] : e;
		if (!point) return;
		const newValue = getValueFromPoint(point.clientX, point.clientY);
		if (newValue !== null) {
			updateThumbValue(activeThumbIndex.current, newValue);
		}
		if ("touches" in e) e.preventDefault();
	};

	const handleEnd = () => {
		activeThumbIndex.current = null;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	const handleStart = (e: MouseEvent | TouchEvent) => {
		const point = "touches" in e ? e.touches[0] : e;
		if (!point) return;
		const newValue = getValueFromPoint(point.clientX, point.clientY);
		if (newValue === null) return;

		const values = valueRef.current;
		let closestIndex = 0;
		let minDistance = Math.abs(values[0] - newValue);
		for (let i = 1; i < values.length; i++) {
			const distance = Math.abs(values[i] - newValue);
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

	const handleKeyDown = (index: number) => (e: KeyboardEvent) => {
		const stepValue = e.shiftKey ? step * 10 : step;
		let newValue = valueRef.current[index];

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

	useEffect(() => {
		if (!rootRef.current) return;

		const control = rootRef.current.querySelector('[data-part="control"]');
		const thumbs = rootRef.current.querySelectorAll('[data-part="thumb"]');

		const startListener = (e: Event) =>
			handleStart(e as MouseEvent | TouchEvent);
		if (control) {
			control.addEventListener("mousedown", startListener);
			control.addEventListener("touchstart", startListener);
		}

		const keyListeners: ((e: Event) => void)[] = [];
		thumbs.forEach((thumb, index) => {
			const keyListener = (e: Event) =>
				handleKeyDown(index)(e as KeyboardEvent);
			thumb.addEventListener("keydown", keyListener);
			keyListeners.push(keyListener);
		});

		return () => {
			if (control) {
				control.removeEventListener("mousedown", startListener);
				control.removeEventListener("touchstart", startListener);
			}
			thumbs.forEach((thumb, index) => {
				thumb.removeEventListener("keydown", keyListeners[index]);
			});
		};
	}, []);

	return (
		<Root
			{...rootProps}
			value={currentValue}
			min={min}
			max={max}
			step={step}
			ref={rootRef}
		>
			{children}
		</Root>
	);
}
