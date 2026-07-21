import { useEffect, useRef, useState } from "hono/jsx";
import {
	Root,
	type RootProps,
	TabsStructure,
	type TabsStructureProps,
} from "@/components/ui/tabs-primitive";

export interface TabsIslandProps extends RootProps, Partial<TabsStructureProps> {}

export default function TabsIsland(props: TabsIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		items,
		activationMode = "automatic",
		orientation = "horizontal",
		...rest
	} = props;

	const [value, setValue] = useState(valueProp ?? defaultValue);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (valueProp !== undefined) {
			setValue(valueProp);
		}
	}, [valueProp]);

	const updateIndicator = (activeTrigger: HTMLElement) => {
		const root = rootRef.current;
		if (!root) return;

		const list = root.querySelector<HTMLElement>('[data-part="list"]');
		const listElement = list || root;

		const rect = activeTrigger.getBoundingClientRect();
		const listRect = listElement.getBoundingClientRect();

		root.style.setProperty("--width", `${rect.width}px`);
		root.style.setProperty("--height", `${rect.height}px`);
		root.style.setProperty("--left", `${rect.left - listRect.left}px`);
		root.style.setProperty("--top", `${rect.top - listRect.top}px`);
	};

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		// Initial indicator update
		const activeTrigger = root.querySelector<HTMLElement>(
			`[data-part="trigger"][data-value="${value}"]`,
		);
		if (activeTrigger) {
			requestAnimationFrame(() => {
				updateIndicator(activeTrigger);
			});
		}

		const handleClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="trigger"]',
			);
			if (trigger && !trigger.hasAttribute("data-disabled")) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue) {
					setValue(newValue);
					onValueChange?.(newValue as any);
					// Also support Ark UI's detail object callback structure
					(onValueChange as any)?.({ value: newValue });
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const rootElement = rootRef.current;
			if (!rootElement) return;

			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-part="trigger"]',
			);
			if (!trigger) return;

			const triggers = Array.from(
				rootElement.querySelectorAll<HTMLElement>(
					'[data-part="trigger"]:not([data-disabled])',
				),
			);
			const index = triggers.indexOf(trigger);
			if (index === -1) return;

			let nextIndex = -1;

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

			if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = triggers.length - 1;
			}

			if (nextIndex !== -1) {
				const nextTrigger = triggers[nextIndex];
				nextTrigger.focus();

				if (activationMode === "automatic") {
					const newValue = nextTrigger.getAttribute("data-value");
					if (newValue) {
						setValue(newValue);
						onValueChange?.(newValue as any);
						(onValueChange as any)?.({ value: newValue });
					}
				}
				e.preventDefault();
			} else if (
				activationMode === "manual" &&
				(e.key === "Enter" || e.key === " ")
			) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue) {
					setValue(newValue);
					onValueChange?.(newValue as any);
					(onValueChange as any)?.({ value: newValue });
					e.preventDefault();
				}
			}
		};

		root.addEventListener("click", handleClick);
		root.addEventListener("keydown", handleKeyDown);

		// Dynamic resize and mutation observer
		const observer = new ResizeObserver(() => {
			const currentActive = root.querySelector<HTMLElement>(
				`[data-part="trigger"][data-value="${value}"]`,
			);
			if (currentActive) {
				updateIndicator(currentActive);
			}
		});
		observer.observe(root);

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
			observer.disconnect();
		};
	}, [value, onValueChange, activationMode, orientation]);

	return (
		<Root
			{...rest}
			value={value}
			onValueChange={setValue}
			activationMode={activationMode}
			orientation={orientation}
			rootRef={rootRef}
			data-hydrated="true"
		>
			{children || (items && <TabsStructure items={items} />)}
		</Root>
	);
}
// island
