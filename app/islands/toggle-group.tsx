import { useEffect, useId, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/toggle-group-primitive";

export default function ToggleGroupIsland(props: RootProps) {
	const {
		value: valueProp,
		defaultValue = [],
		onValueChange,
		multiple,
		deselectable = true,
		id: idProp,
		...rest
	} = props;

	const [value, setValue] = useState<string[]>(valueProp ?? defaultValue);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const fallbackId = useId();
	const rootId = idProp || `toggle-group-${fallbackId}`;

	const onValueChangeRef = useRef(onValueChange);
	useEffect(() => {
		onValueChangeRef.current = onValueChange;
	}, [onValueChange]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			const target = (e.target as HTMLElement).closest(
				'[data-part="item"]',
			) as HTMLElement;
			if (!target || target.hasAttribute("data-disabled")) return;

			if (e.key === "Enter" || e.key === " ") {
				e.preventDefault();
				target.click();
			} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				e.preventDefault();
				const items = Array.from(
					root.querySelectorAll<HTMLElement>(
						'[data-part="item"]:not([data-disabled])',
					),
				);
				const index = items.indexOf(target);
				const nextIndex = (index + 1) % items.length;
				items[nextIndex]?.focus();
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				e.preventDefault();
				const items = Array.from(
					root.querySelectorAll<HTMLElement>(
						'[data-part="item"]:not([data-disabled])',
					),
				);
				const index = items.indexOf(target);
				const nextIndex = (index - 1 + items.length) % items.length;
				items[nextIndex]?.focus();
			}
		};

		const handleClick = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest(
				'[data-part="item"]',
			) as HTMLElement;
			if (!target || target.hasAttribute("data-disabled")) {
				return;
			}

			const itemValue = target.getAttribute("data-value");
			if (!itemValue) return;

			let nextValue: string[];
			if (multiple) {
				if (currentValue.includes(itemValue)) {
					nextValue = currentValue.filter((v) => v !== itemValue);
				} else {
					nextValue = [...currentValue, itemValue];
				}
			} else {
				if (currentValue.includes(itemValue)) {
					if (deselectable) {
						nextValue = [];
					} else {
						nextValue = [itemValue];
					}
				} else {
					nextValue = [itemValue];
				}
			}

			if (!isControlled) {
				setValue(nextValue);
			}
			onValueChangeRef.current?.(nextValue);
		};

		root.addEventListener("click", handleClick as any);
		root.addEventListener("keydown", handleKeyDown as any);
		return () => {
			root.removeEventListener("click", handleClick as any);
			root.removeEventListener("keydown", handleKeyDown as any);
		};
	}, [rootId, multiple, deselectable, currentValue, isControlled]);

	// Sync DOM attributes
	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const items = root.querySelectorAll('[data-part="item"]');
		for (const item of items) {
			const itemValue = item.getAttribute("data-value");
			const isPressed = itemValue ? currentValue.includes(itemValue) : false;
			const state = isPressed ? "on" : "off";

			item.setAttribute("data-state", state);
			item.setAttribute("aria-pressed", isPressed.toString());
		}
	}, [rootId, currentValue]);

	return (
		<Root id={rootId} value={currentValue} data-hydrated="true" {...rest}>
			{props.children}
		</Root>
	);
}
