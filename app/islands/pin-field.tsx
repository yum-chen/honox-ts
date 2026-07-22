import { useEffect, useId, useRef, useState } from "hono/jsx";
import {
	type PinFieldType,
	Root,
	type RootProps,
} from "../components/ui/pin-field-primitive";

export type PinFieldIslandProps = RootProps;

function resolvePattern(type: PinFieldType, pattern?: string): RegExp {
	if (pattern) return new RegExp(pattern);
	switch (type) {
		case "alphabetic":
			return /^[a-zA-Z]$/;
		case "alphanumeric":
			return /^[a-zA-Z0-9]$/;
		default:
			return /^[0-9]$/;
	}
}

export default function PinFieldIsland(props: PinFieldIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		count = 4,
		type = "numeric",
		pattern,
		blurOnComplete,
		autoFocus,
		selectOnFocus,
		disabled,
		readOnly,
		onValueChange,
		onValueComplete,
		onValueInvalid,
		children,
		id: idProp,
		...rest
	} = props;

	const initialValue =
		valueProp ?? defaultValue ?? Array.from({ length: count }, () => "");

	const [value, setValue] = useState<string[]>(initialValue);
	const valueRef = useRef<string[]>(initialValue);

	const fallbackId = useId();
	const rootId = idProp || `pin-field-${fallbackId}`;

	useEffect(() => {
		if (valueProp !== undefined) {
			setValue(valueProp);
			valueRef.current = valueProp;
		}
	}, [valueProp]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;
		if (autoFocus) {
			root
				.querySelector<HTMLInputElement>('[data-part="input"][data-index="0"]')
				?.focus();
		}
	}, [rootId, autoFocus]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const re = resolvePattern(type, pattern);

		const getInputs = () =>
			Array.from(
				root.querySelectorAll<HTMLInputElement>('[data-part="input"]'),
			);

		const getIndex = (target: EventTarget | null): number | null => {
			const el = (target as HTMLElement)?.closest?.<HTMLInputElement>(
				'[data-part="input"]',
			);
			if (!el) return null;
			const index = Number(el.getAttribute("data-index"));
			return Number.isNaN(index) ? null : index;
		};

		const commit = (nextValue: string[]) => {
			valueRef.current = nextValue;
			setValue(nextValue);
			const valueAsString = nextValue.join("");
			onValueChange?.({ value: nextValue, valueAsString });
			const complete =
				nextValue.length === count && nextValue.every((v) => v !== "");
			if (complete) {
				onValueComplete?.({ value: nextValue, valueAsString });
				if (blurOnComplete) {
					(document.activeElement as HTMLElement | null)?.blur?.();
				}
			}
		};

		const focusIndex = (index: number) => {
			getInputs()
				.find((el) => Number(el.getAttribute("data-index")) === index)
				?.focus();
		};

		const fillFrom = (startIndex: number, chars: string[]) => {
			const nextValue = [...valueRef.current];
			let cursor = startIndex;
			for (const raw of chars) {
				if (cursor >= count) break;
				if (!re.test(raw)) {
					onValueInvalid?.({ index: cursor, value: raw });
					continue;
				}
				nextValue[cursor] = raw;
				cursor += 1;
			}
			commit(nextValue);
			const inputs = getInputs();
			const target = inputs.find(
				(el) =>
					Number(el.getAttribute("data-index")) === Math.min(cursor, count - 1),
			);
			target?.focus();
			if (target && cursor >= count) target.select?.();
		};

		const handleInput = (e: Event) => {
			const index = getIndex(e.target);
			if (index === null || disabled || readOnly) return;
			const target = e.target as HTMLInputElement;
			const raw = target.value;

			if (raw.length > 1) {
				target.value = valueRef.current[index] ?? "";
				fillFrom(index, raw.split(""));
				return;
			}

			if (raw === "") {
				const nextValue = [...valueRef.current];
				nextValue[index] = "";
				commit(nextValue);
				return;
			}

			if (!re.test(raw)) {
				target.value = valueRef.current[index] ?? "";
				onValueInvalid?.({ index, value: raw });
				return;
			}

			const nextValue = [...valueRef.current];
			nextValue[index] = raw;
			commit(nextValue);

			if (index < count - 1) {
				focusIndex(index + 1);
			} else if (blurOnComplete) {
				target.blur();
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const index = getIndex(e.target);
			if (index === null) return;
			const target = e.target as HTMLInputElement;

			if (e.key === "Backspace" && target.value === "" && index > 0) {
				e.preventDefault();
				const nextValue = [...valueRef.current];
				nextValue[index - 1] = "";
				commit(nextValue);
				focusIndex(index - 1);
				return;
			}

			if (e.key === "ArrowLeft" && index > 0) {
				e.preventDefault();
				focusIndex(index - 1);
				return;
			}

			if (e.key === "ArrowRight" && index < count - 1) {
				e.preventDefault();
				focusIndex(index + 1);
			}
		};

		const handlePaste = (e: ClipboardEvent) => {
			const index = getIndex(e.target);
			if (index === null || disabled || readOnly) return;
			e.preventDefault();
			const text = e.clipboardData?.getData("text") ?? "";
			if (!text) return;
			fillFrom(index, text.split(""));
		};

		const handleFocusIn = (e: FocusEvent) => {
			if (!selectOnFocus) return;
			const index = getIndex(e.target);
			if (index === null) return;
			(e.target as HTMLInputElement).select();
		};

		root.addEventListener("input", handleInput);
		root.addEventListener("keydown", handleKeyDown);
		root.addEventListener("paste", handlePaste);
		root.addEventListener("focusin", handleFocusIn);

		return () => {
			root.removeEventListener("input", handleInput);
			root.removeEventListener("keydown", handleKeyDown);
			root.removeEventListener("paste", handlePaste);
			root.removeEventListener("focusin", handleFocusIn);
		};
	}, [
		rootId,
		count,
		type,
		pattern,
		disabled,
		readOnly,
		selectOnFocus,
		blurOnComplete,
		onValueChange,
		onValueComplete,
		onValueInvalid,
	]);

	return (
		<Root
			{...rest}
			id={rootId}
			count={count}
			type={type}
			pattern={pattern}
			disabled={disabled}
			readOnly={readOnly}
			value={value}
			data-interactive="true"
		>
			{children}
		</Root>
	);
}
