import { useEffect, useId, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/segment-group-primitive";

export default function SegmentGroupIsland(props: RootProps) {
	const {
		value: valueProp,
		defaultValue = "",
		onValueChange,
		id: idProp,
		...rest
	} = props;

	const [value, setValue] = useState<string>(valueProp ?? defaultValue);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;

	const fallbackId = useId();
	const rootId = idProp || `segment-group-${fallbackId}`;

	const onValueChangeRef = useRef(onValueChange);
	useEffect(() => {
		onValueChangeRef.current = onValueChange;
	}, [onValueChange]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const handleClick = (e: MouseEvent) => {
			const target = (e.target as HTMLElement).closest(
				'[data-part="item"]',
			) as HTMLElement;
			if (!target || target.hasAttribute("data-disabled")) return;

			const itemValue = target.getAttribute("data-value");
			if (!itemValue) return;

			if (!isControlled) {
				setValue(itemValue);
			}
			onValueChangeRef.current?.(itemValue);
		};

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

		root.addEventListener("click", handleClick as any);
		root.addEventListener("keydown", handleKeyDown as any);
		return () => {
			root.removeEventListener("click", handleClick as any);
			root.removeEventListener("keydown", handleKeyDown as any);
		};
	}, [rootId, currentValue, isControlled]);

	// Sync DOM attributes and indicator position
	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const items = root.querySelectorAll<HTMLElement>('[data-part="item"]');
		let activeItem: HTMLElement | null = null;
		for (const item of items) {
			const itemValue = item.getAttribute("data-value");
			const isChecked = itemValue === currentValue;
			const state = isChecked ? "checked" : "unchecked";

			item.setAttribute("data-state", state);
			if (isChecked) {
				activeItem = item;
				item.tabIndex = 0;
			} else {
				item.tabIndex = -1;
			}
		}

		const indicator = root.querySelector<HTMLElement>(
			'[data-part="indicator"]',
		);
		if (indicator && activeItem) {
			const rect = activeItem.getBoundingClientRect();
			const rootRect = root.getBoundingClientRect();
			indicator.style.setProperty("--width", `${rect.width}px`);
			indicator.style.setProperty("--height", `${rect.height}px`);
			indicator.style.setProperty("--left", `${rect.left - rootRect.left}px`);
			indicator.style.setProperty("--top", `${rect.top - rootRect.top}px`);
			indicator.style.display = "block";
		} else if (indicator) {
			indicator.style.display = "none";
		}
	}, [rootId, currentValue]);

	return (
		<Root id={rootId} value={currentValue} data-hydrated="true" {...rest}>
			{props.children}
		</Root>
	);
}
