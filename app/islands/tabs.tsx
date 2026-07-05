import { useEffect, useRef, useState } from "hono/jsx";
import {
	InteractiveRoot,
	type InteractiveRootProps,
} from "../components/ui/tabs-primitive";

export default function TabsIsland(props: InteractiveRootProps) {
	const { defaultValue, children, ...rest } = props;
	const [value, setValue] = useState(defaultValue);
	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		const triggers = root.querySelectorAll<HTMLButtonElement>(
			'[data-part="trigger"]',
		);
		const contents = root.querySelectorAll<HTMLDivElement>(
			'[data-part="content"]',
		);
		const indicator = root.querySelector<HTMLDivElement>(
			'[data-part="indicator"]',
		);

		const syncDom = (currentValue: string | undefined) => {
			triggers.forEach((trigger) => {
				const isSelected = trigger.getAttribute("data-value") === currentValue;
				trigger.setAttribute("aria-selected", isSelected.toString());
				if (isSelected) {
					trigger.setAttribute("data-selected", "");
				} else {
					trigger.removeAttribute("data-selected");
				}
			});

			contents.forEach((content) => {
				const isSelected = content.getAttribute("data-value") === currentValue;
				if (isSelected) {
					content.removeAttribute("hidden");
					content.setAttribute("data-selected", "");
				} else {
					content.setAttribute("hidden", "");
					content.removeAttribute("data-selected");
				}
			});

			if (indicator && currentValue) {
				const selectedTrigger = Array.from(triggers).find(
					(t) => t.getAttribute("data-value") === currentValue,
				);
				if (selectedTrigger) {
					const { offsetLeft, offsetTop, offsetWidth, offsetHeight } =
						selectedTrigger;
					indicator.style.setProperty("--left", `${offsetLeft}px`);
					indicator.style.setProperty("--top", `${offsetTop}px`);
					indicator.style.setProperty("--width", `${offsetWidth}px`);
					indicator.style.setProperty("--height", `${offsetHeight}px`);
				}
			}
		};

		const handleTriggerClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest(
				'[data-part="trigger"]',
			) as HTMLButtonElement | null;
			if (trigger && !trigger.disabled) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue) {
					setValue(newValue);
					syncDom(newValue);
				}
			}
		};

		root.addEventListener("click", handleTriggerClick);
		syncDom(value);

		return () => {
			root.removeEventListener("click", handleTriggerClick);
		};
	}, [value]);

	return (
		<div ref={rootRef} style={{ display: "contents" }}>
			<InteractiveRoot {...rest} defaultValue={value}>
				{children}
			</InteractiveRoot>
		</div>
	);
}
