import { useEffect, useRef, useState } from "hono/jsx";
import { tabs } from "../../styled-system/recipes";
import { Root, type RootProps } from "../components/ui/tabs-primitive";

export interface TabsIslandProps extends RootProps {
	onValueChange?: (details: { value: string }) => void;
}

export default function TabsIsland(props: TabsIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		orientation = "horizontal",
		id: idProp,
		...rootProps
	} = props;

	const [value, setValue] = useState(valueProp ?? defaultValue);
	const isControlled = valueProp !== undefined;
	const currentValue = isControlled ? valueProp : value;
	const valueRef = useRef(currentValue);

	useEffect(() => {
		valueRef.current = currentValue;
		const root = document.getElementById(idProp!);
		if (!root) return;

		const [variantProps] = tabs.splitVariantProps({
			...rootProps,
			orientation,
		});
		const styles = tabs(variantProps);

		const addClass = (element: Element | null, className?: string) => {
			if (!element || !className) return;
			element.classList.add(...className.split(/\s+/).filter(Boolean));
		};

		const syncDom = (selectedValue?: string) => {
			addClass(root, styles.root);

			const list = root.querySelector('[data-part="list"]');
			addClass(list, styles.list);

			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
			);
			const contents = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="content"]'),
			);
			const indicator = root.querySelector<HTMLElement>(
				'[data-part="indicator"]',
			);

			if (indicator) {
				addClass(indicator, styles.indicator);
				indicator.setAttribute("data-orientation", orientation);
				indicator.style.position = "absolute";
			}

			triggers.forEach((trigger) => {
				const val = trigger.getAttribute("data-value");
				const isSelected = val === selectedValue;
				addClass(trigger, styles.trigger);
				trigger.setAttribute("data-state", isSelected ? "open" : "closed");
				trigger.setAttribute("aria-selected", String(isSelected));
				trigger.setAttribute("data-orientation", orientation);
				if (isSelected) {
					trigger.setAttribute("data-selected", "");
				} else {
					trigger.removeAttribute("data-selected");
				}

				if (isSelected && indicator) {
					indicator.style.setProperty("--width", `${trigger.offsetWidth}px`);
					indicator.style.setProperty("--height", `${trigger.offsetHeight}px`);
					indicator.style.left = `${trigger.offsetLeft}px`;
					indicator.style.top = `${trigger.offsetTop}px`;
				}
			});

			contents.forEach((content) => {
				const val = content.getAttribute("data-value");
				const isSelected = val === selectedValue;
				addClass(content, styles.content);
				content.setAttribute("data-state", isSelected ? "open" : "closed");
				content.setAttribute("data-orientation", orientation);
				content.hidden = !isSelected;
			});
		};

		// Initial sync
		syncDom(currentValue);
		// Sync after layout
		const timer = setTimeout(() => syncDom(valueRef.current), 100);

		const handleTriggerClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest(
				'[data-part="trigger"]',
			) as HTMLElement;
			if (!trigger || trigger.hasAttribute("data-disabled")) return;

			const newValue = trigger.getAttribute("data-value");
			if (newValue && newValue !== valueRef.current) {
				if (!isControlled) setValue(newValue);
				onValueChange?.({ value: newValue });
				syncDom(newValue);
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const trigger = (e.target as HTMLElement).closest(
				'[data-part="trigger"]',
			) as HTMLElement;
			if (!trigger) return;

			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="trigger"]:not([data-disabled])'),
			);
			const index = triggers.indexOf(trigger);
			let nextIndex = index;

			if (orientation === "horizontal") {
				if (e.key === "ArrowRight") {
					nextIndex = (index + 1) % triggers.length;
				} else if (e.key === "ArrowLeft") {
					nextIndex = (index - 1 + triggers.length) % triggers.length;
				}
			} else {
				if (e.key === "ArrowDown") {
					nextIndex = (index + 1) % triggers.length;
				} else if (e.key === "ArrowUp") {
					nextIndex = (index - 1 + triggers.length) % triggers.length;
				}
			}

			if (nextIndex !== index) {
				const nextTrigger = triggers[nextIndex];
				nextTrigger?.focus();
				// Automatic activation
				const newValue = nextTrigger?.getAttribute("data-value");
				if (newValue) {
					if (!isControlled) setValue(newValue);
					onValueChange?.({ value: newValue });
					syncDom(newValue);
				}
				e.preventDefault();
			}
		};

		root.addEventListener("click", handleTriggerClick);
		root.addEventListener("keydown", handleKeyDown);

		// Handle resize for indicator
		const resizeObserver = new ResizeObserver(() => syncDom(valueRef.current));
		resizeObserver.observe(root);

		return () => {
			clearTimeout(timer);
			root.removeEventListener("click", handleTriggerClick);
			root.removeEventListener("keydown", handleKeyDown);
			resizeObserver.disconnect();
		};
	}, [currentValue, idProp, isControlled, onValueChange, orientation, rootProps]);

	return (
		<Root {...props} id={idProp} value={currentValue}>
			{children}
		</Root>
	);
}
