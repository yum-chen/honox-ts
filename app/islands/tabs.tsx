import { useEffect, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/tabs-primitive";

export interface InteractiveTabsProps extends RootProps {
	onValueChange?: (value: string) => void;
}

export default function InteractiveTabs(props: InteractiveTabsProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		orientation = "horizontal",
		activationMode = "automatic",
		id,
		...rest
	} = props;

	const [value, setValue] = useState(valueProp ?? defaultValue ?? "");
	const rootRef = useRef<HTMLDivElement>(null);
	const valueRef = useRef(value);

	useEffect(() => {
		valueRef.current = value;
	}, [value]);

	useEffect(() => {
		if (valueProp !== undefined) {
			setValue(valueProp);
		}
	}, [valueProp]);

	const updateIndicator = (
		activeItem: HTMLElement,
		listElement: HTMLElement,
	) => {
		const root = rootRef.current;
		if (!root || !activeItem || !listElement) return;

		const rect = activeItem.getBoundingClientRect();
		const listRect = listElement.getBoundingClientRect();

		root.style.setProperty("--width", `${rect.width}px`);
		root.style.setProperty("--height", `${rect.height}px`);
		root.style.setProperty("--left", `${rect.left - listRect.left}px`);
		root.style.setProperty("--top", `${rect.top - listRect.top}px`);
	};

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const listElement = root.querySelector<HTMLElement>('[data-part="list"]');
		const list = listElement || root;

		const activeItem = root.querySelector<HTMLElement>(
			`[data-part="trigger"][data-value="${value}"]`,
		);

		if (activeItem && listElement) {
			requestAnimationFrame(() => {
				updateIndicator(activeItem, listElement);
			});
		}

		// Update trigger selection and content visibility in the DOM
		const triggers = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="trigger"]'),
		);
		const contents = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="content"]'),
		);

		triggers.forEach((trigger) => {
			const triggerVal = trigger.getAttribute("data-value");
			const isSelected = triggerVal === value;
			trigger.setAttribute("aria-selected", isSelected ? "true" : "false");
			trigger.setAttribute("data-state", isSelected ? "active" : "inactive");
			if (isSelected) {
				trigger.setAttribute("data-selected", "");
				trigger.tabIndex = 0;
			} else {
				trigger.removeAttribute("data-selected");
				trigger.tabIndex = -1;
			}
		});

		contents.forEach((content) => {
			const contentVal = content.getAttribute("data-value");
			const isSelected = contentVal === value;
			content.setAttribute("data-state", isSelected ? "active" : "inactive");
			if (isSelected) {
				content.setAttribute("data-selected", "");
				content.hidden = false;
				content.style.display = "";
			} else {
				content.removeAttribute("data-selected");
				content.hidden = true;
				content.style.display = "none";
			}
		});

		const handleClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="trigger"]',
			);
			if (trigger && !trigger.hasAttribute("data-disabled")) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue && newValue !== valueRef.current) {
					setValue(newValue);
					onValueChange?.(newValue);
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="trigger"]',
			);
			if (!trigger) return;

			const activeTriggers = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-part="trigger"]:not([data-disabled])',
				),
			);
			const index = activeTriggers.indexOf(trigger);
			if (index === -1) return;

			let nextIndex = -1;
			const isHorizontal = orientation === "horizontal";

			if (isHorizontal) {
				if (e.key === "ArrowRight") {
					nextIndex = (index + 1) % activeTriggers.length;
				} else if (e.key === "ArrowLeft") {
					nextIndex =
						(index - 1 + activeTriggers.length) % activeTriggers.length;
				}
			} else {
				if (e.key === "ArrowDown") {
					nextIndex = (index + 1) % activeTriggers.length;
				} else if (e.key === "ArrowUp") {
					nextIndex =
						(index - 1 + activeTriggers.length) % activeTriggers.length;
				}
			}

			if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = activeTriggers.length - 1;
			}

			if (nextIndex !== -1) {
				const nextTrigger = activeTriggers[nextIndex];
				nextTrigger.focus();

				if (activationMode === "automatic") {
					const newValue = nextTrigger.getAttribute("data-value");
					if (newValue && newValue !== valueRef.current) {
						setValue(newValue);
						onValueChange?.(newValue);
					}
				}
				e.preventDefault();
			}
		};

		root.addEventListener("click", handleClick);
		root.addEventListener("keydown", handleKeyDown);

		const observer = new ResizeObserver(() => {
			const activeItem = root.querySelector<HTMLElement>(
				`[data-part="trigger"][data-value="${value}"]`,
			);
			if (activeItem && listElement) {
				updateIndicator(activeItem, listElement);
			}
		});
		observer.observe(list);

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
			observer.disconnect();
		};
	}, [value, orientation, activationMode, onValueChange]);

	return (
		<Root
			{...rest}
			id={id}
			orientation={orientation}
			activationMode={activationMode}
			value={value}
			onValueChange={setValue}
			rootRef={rootRef}
			data-hydrated="true"
		>
			{children}
		</Root>
	);
}
// island
