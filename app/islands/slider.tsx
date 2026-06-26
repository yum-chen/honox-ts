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

	const [value, setValue] = useState<number[]>(
		valueProp ?? defaultValue ?? [min],
	);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const rootRef = useRef<HTMLDivElement>(null);
	const activeThumbIndex = useRef<number | null>(null);

	const getValueFromPoint = (clientX: number, clientY: number) => {
		if (!rootRef.current) return null;
		const track = rootRef.current.querySelector('[data-part="control"]');
		if (!track) return null;

		const rect = track.getBoundingClientRect();
		const orientation = rootProps.orientation ?? "horizontal";

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

	const handleStart = (e: MouseEvent | TouchEvent) => {
		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
		const newValue = getValueFromPoint(clientX, clientY);
		if (newValue === null) return;

		// Find closest thumb
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

	const updateThumbValue = (index: number, newValue: number) => {
		const newValues = [...currentValue];
		newValues[index] = newValue;
		// Ensure values are sorted if it's a range
		// For simplicity, we just clamp to neighbors
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
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	const handleKeyDown = (index: number) => (e: KeyboardEvent) => {
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

	useEffect(() => {
		if (rootRef.current) {
			const control = rootRef.current.querySelector('[data-part="control"]');
			const thumbs = rootRef.current.querySelectorAll('[data-part="thumb"]');

			const startListener = (e: MouseEvent | TouchEvent) => handleStart(e);
			if (control) {
				control.addEventListener("mousedown", startListener as any);
				control.addEventListener("touchstart", startListener as any);
			}

			const keyListeners: ((e: KeyboardEvent) => void)[] = [];
			thumbs.forEach((thumb, index) => {
				const keyListener = (e: KeyboardEvent) => handleKeyDown(index)(e);
				thumb.addEventListener("keydown", keyListener as any);
				keyListeners.push(keyListener);
			});

			return () => {
				if (control) {
					control.removeEventListener("mousedown", startListener as any);
					control.removeEventListener("touchstart", startListener as any);
				}
				thumbs.forEach((thumb, index) => {
					thumb.removeEventListener("keydown", keyListeners[index] as any);
				});
			};
		}
	}, [children, currentValue]);

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
