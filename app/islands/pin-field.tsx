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
		case "alpha":
			return /^[a-zA-Z]$/;
		case "alphanumeric":
			return /^[a-zA-Z0-9]$/;
		case "none":
			return /^.*$/;
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
		autoComplete,
		autoSubmit,
		onAutoSubmit,
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
				if (autoSubmit) {
					onAutoSubmit?.(valueAsString);
					const form = root.closest("form");
					if (form) {
						form.requestSubmit();
					}
				}
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
				const cleaned = raw.replace(/\s/g, "");
				if (!cleaned) continue;

				if (!re.test(cleaned)) {
					onValueInvalid?.({ index: cursor, value: cleaned });
					continue;
				}
				nextValue[cursor] = cleaned;
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
				const oldVal = valueRef.current[index] ?? "";
				let newChar = raw;
				if (raw.startsWith(oldVal)) {
					newChar = raw.slice(oldVal.length);
				} else if (raw.endsWith(oldVal)) {
					newChar = raw.slice(0, raw.length - oldVal.length);
				} else {
					newChar = raw[raw.length - 1];
				}

				if (newChar.length > 1) {
					target.value = oldVal;
					fillFrom(index, newChar.split(""));
					return;
				}

				if (!re.test(newChar)) {
					target.value = oldVal;
					onValueInvalid?.({ index, value: newChar });
					return;
				}

				const nextValue = [...valueRef.current];
				nextValue[index] = newChar;
				commit(nextValue);

				if (index < count - 1) {
					focusIndex(index + 1);
				} else if (blurOnComplete) {
					target.blur();
				}
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

			if (disabled || readOnly) return;

			if (e.key === "Backspace") {
				e.preventDefault();
				const nextValue = [...valueRef.current];
				if (target.value !== "") {
					nextValue[index] = "";
					commit(nextValue);
					if (index > 0) {
						focusIndex(index - 1);
					}
				} else if (index > 0) {
					nextValue[index - 1] = "";
					commit(nextValue);
					focusIndex(index - 1);
				}
				return;
			}

			if (e.key === "Delete") {
				e.preventDefault();
				if (target.value !== "") {
					const nextValue = [...valueRef.current];
					nextValue[index] = "";
					commit(nextValue);
				}
				return;
			}

			if (e.key === "ArrowLeft") {
				e.preventDefault();
				if (index > 0) {
					focusIndex(index - 1);
				}
				return;
			}

			if (e.key === "ArrowRight") {
				e.preventDefault();
				if (index < count - 1) {
					focusIndex(index + 1);
				}
				return;
			}

			if (e.key === "Home") {
				e.preventDefault();
				focusIndex(0);
				return;
			}

			if (e.key === "End") {
				e.preventDefault();
				focusIndex(count - 1);
				return;
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
		autoSubmit,
		onAutoSubmit,
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
			autoComplete={autoComplete}
			autoSubmit={autoSubmit}
			onAutoSubmit={onAutoSubmit}
			data-interactive="true"
		>
			{children}
		</Root>
	);
}
