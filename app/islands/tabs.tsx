import { useEffect, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/tabs-primitive";

export interface TabsIslandProps extends RootProps {}

export default function TabsIsland(props: TabsIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		...rest
	} = props;
	const [value, setValue] = useState(valueProp ?? defaultValue);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (valueProp !== undefined) {
			setValue(valueProp);
		}
	}, [valueProp]);

	const updateIndicator = (activeItem: HTMLElement) => {
		const root = rootRef.current;
		if (!root) return;

		const list = root.querySelector<HTMLElement>('[data-part="list"]') || root;
		const rect = activeItem.getBoundingClientRect();
		const listRect = list.getBoundingClientRect();

		root.style.setProperty("--width", `${rect.width}px`);
		root.style.setProperty("--height", `${rect.height}px`);
		root.style.setProperty("--left", `${rect.left - listRect.left}px`);
		root.style.setProperty("--top", `${rect.top - listRect.top}px`);
	};

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const activeItem = root.querySelector<HTMLElement>(
			`[data-part="trigger"][data-value="${value}"]`,
		);

		if (activeItem) {
			requestAnimationFrame(() => {
				updateIndicator(activeItem);
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
					onValueChange?.(newValue);
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-part="trigger"]:not([data-disabled])',
				),
			);

			const currentTrigger =
				(e.target as HTMLElement).closest<HTMLElement>('[data-part="trigger"]') ||
				root.querySelector<HTMLElement>(
					'[data-part="trigger"][data-state="active"]:not([data-disabled])',
				) ||
				triggers[0];

			if (!currentTrigger) return;

			const index = triggers.indexOf(currentTrigger);

			let nextIndex = -1;
			if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				nextIndex = (index + 1) % triggers.length;
			} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				nextIndex = (index - 1 + triggers.length) % triggers.length;
			} else if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = triggers.length - 1;
			}

			if (nextIndex !== -1) {
				const nextTrigger = triggers[nextIndex];
				nextTrigger.focus();
				const newValue = nextTrigger.getAttribute("data-value");
				if (newValue) {
					setValue(newValue);
					onValueChange?.(newValue);
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
			if (activeItem) {
				updateIndicator(activeItem);
			}
		});
		observer.observe(root);

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
			observer.disconnect();
		};
	}, [value, onValueChange]);

	return (
		<Root
			{...rest}
			value={value}
			onValueChange={setValue}
			rootRef={rootRef}
			data-hydrated="true"
		>
			{children}
		</Root>
	);
}
