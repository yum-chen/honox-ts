import { useEffect, useRef, useState } from "hono/jsx";
import {
	InteractiveRoot,
	type RootProps,
	type TabsItem,
	TabsStructure,
	type TabsStructureProps,
} from "../components/ui/tabs-primitive";

export interface TabsIslandProps extends RootProps, TabsStructureProps {
	/** Notified after a tab is added; return a `TabsItem` to override the
	 * auto-generated default, or leave void to accept it. */
	onTabAdd?: () => TabsItem | void;
	onEdit?: (key: any, action: "add" | "remove") => void;
}

export default function TabsIsland(props: TabsIslandProps) {
	const {
		value: valueProp,
		defaultValue,
		onValueChange,
		children,
		items,
		indicator,
		closable,
		editable,
		hideAdd,
		onTabClose,
		onTabAdd,
		addAriaLabel,
		extra,
		tabBarExtraContent,

		activeKey,
		defaultActiveKey,
		onChange,
		onTabClick,
		onTabScroll,
		onEdit,
		classNames,
		styles,
		...rest
	} = props;

	// Normalize items
	const normalizedItems = (items || []).map((item) => {
		const val = item.value ?? item.key;
		const content = item.content ?? item.children;
		return {
			...item,
			value: val as string,
			content,
		};
	});

	// Resolve controlled/uncontrolled initial value; with no explicit signal,
	// default to the first enabled tab so something is always selected.
	const initialVal =
		activeKey !== undefined
			? activeKey
			: valueProp !== undefined
				? valueProp
				: defaultActiveKey !== undefined
					? defaultActiveKey
					: (defaultValue ??
						normalizedItems.find((item) => !item.disabled)?.value);

	const [value, setValue] = useState(initialVal);
	const [tabItems, setTabItems] = useState<TabsItem[]>(normalizedItems);
	const rootRef = useRef<HTMLDivElement>(null);

	const updateIndicator = (activeTrigger: HTMLElement) => {
		const root = rootRef.current;
		if (!root) return;

		const rect = activeTrigger.getBoundingClientRect();
		const rootRect = root.getBoundingClientRect();

		let width = rect.width;
		let height = rect.height;
		let left = rect.left - rootRect.left;
		let top = rect.top - rootRect.top;

		// `indicator={{ size, align }}` shrinks the indicator relative to the
		// active trigger and aligns the remainder.
		const config = typeof indicator === "object" && indicator ? indicator : {};
		if (config.size !== undefined) {
			const vertical = root.getAttribute("data-orientation") === "vertical";
			const origin = vertical ? height : width;
			const size =
				typeof config.size === "function" ? config.size(origin) : config.size;
			const offset =
				config.align === "start"
					? 0
					: config.align === "end"
						? origin - size
						: (origin - size) / 2;
			if (vertical) {
				height = size;
				top += offset;
			} else {
				width = size;
				left += offset;
			}
		}

		root.style.setProperty("--width", `${width}px`);
		root.style.setProperty("--height", `${height}px`);
		root.style.setProperty("--left", `${left}px`);
		root.style.setProperty("--top", `${top}px`);
	};

	// `children` here is a pre-built static subtree (composed via
	// TabsList/TabsTrigger/TabsContent rather than the `items` prop): the
	// same vnode references flow through on every render, so hono/jsx never
	// re-invokes those component functions on state change and context-driven
	// `isSelected` recomputation never happens. Sync selection to the DOM
	// imperatively and synchronously wherever `value` changes, instead of via
	// a `[value]`-keyed effect — don't depend on a re-render to reflect it.
	const syncSelection = (newValue: string | undefined) => {
		const root = rootRef.current;
		if (!root) return;

		let activeTrigger: HTMLElement | null = null;
		for (const trigger of root.querySelectorAll<HTMLElement>(
			'[data-scope="tabs"][data-part="trigger"]',
		)) {
			const isSelected = trigger.getAttribute("data-value") === newValue;
			if (isSelected) activeTrigger = trigger;
			trigger.setAttribute("aria-selected", isSelected ? "true" : "false");
			trigger.tabIndex = isSelected ? 0 : -1;
			if (isSelected) trigger.setAttribute("data-selected", "");
			else trigger.removeAttribute("data-selected");
		}

		for (const content of root.querySelectorAll<HTMLElement>(
			'[data-scope="tabs"][data-part="content"]',
		)) {
			const isSelected = content.getAttribute("data-value") === newValue;
			content.hidden = !isSelected;
			if (isSelected) content.setAttribute("data-selected", "");
			else content.removeAttribute("data-selected");
		}

		if (activeTrigger) updateIndicator(activeTrigger);
	};

	// Closing/adding tabs mutates the list itself, not just which value is
	// selected — that only works through the `items` API, where `TabsStructure`
	// is constructed fresh from this state on every render (unlike a static
	// `children` subtree, a freshly built element genuinely re-renders).
	const handleTabClose = (closedValue: string) => {
		setTabItems((prev) => {
			const closedIndex = prev.findIndex((item) => item.value === closedValue);
			const next = prev.filter((item) => item.value !== closedValue);
			if (value === closedValue && next.length > 0) {
				const neighbor = next[Math.min(closedIndex, next.length - 1)];
				setValue(neighbor.value);
				requestAnimationFrame(() => syncSelection(neighbor.value));
				onChange?.(neighbor.value);
				onValueChange?.(neighbor.value);
			}
			return next;
		});
		onTabClose?.(closedValue);
		onEdit?.(closedValue, "remove");
	};

	const handleTabAdd = () => {
		const created = onTabAdd?.();
		const newItem: TabsItem = created ?? {
			value: `tab-${Date.now()}`,
			label: `New Tab ${tabItems.length + 1}`,
			content: "",
			closable: true,
		};
		setTabItems((prev) => [...prev, newItem]);
		setValue(newItem.value);
		requestAnimationFrame(() => syncSelection(newItem.value));
		onChange?.(newItem.value);
		onValueChange?.(newItem.value);
		onEdit?.("add" as any, "add");
	};

	useEffect(() => {
		const currentVal = activeKey !== undefined ? activeKey : valueProp;
		if (currentVal !== undefined) {
			setValue(currentVal);
			syncSelection(currentVal);
		}
	}, [activeKey, valueProp]);

	// Sync local items state with prop updates
	useEffect(() => {
		if (items) {
			setTabItems(normalizedItems);
		}
	}, [items]);

	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		requestAnimationFrame(() => syncSelection(value));

		const selectValue = (newValue: string) => {
			setValue(newValue);
			syncSelection(newValue);
			onValueChange?.(newValue);
			onChange?.(newValue);
		};

		const handleClick = (e: MouseEvent) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-scope="tabs"][data-part="trigger"]',
			);
			if (trigger && !trigger.hasAttribute("data-disabled")) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue) {
					onTabClick?.(newValue, e);
					selectValue(newValue);
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-scope="tabs"][data-part="trigger"]',
			);
			if (!trigger) return;

			// Closable tabs render as `<div role="tab">`, which has no native
			// Enter/Space activation (buttons synthesize a click themselves).
			if (
				(e.key === "Enter" || e.key === " ") &&
				trigger.tagName !== "BUTTON"
			) {
				const newValue = trigger.getAttribute("data-value");
				if (newValue && !trigger.hasAttribute("data-disabled")) {
					selectValue(newValue);
				}
				e.preventDefault();
				return;
			}

			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-scope="tabs"][data-part="trigger"]:not([data-disabled])',
				),
			);
			const index = triggers.indexOf(trigger);
			const vertical = root.getAttribute("data-orientation") === "vertical";
			const nextKey = vertical ? "ArrowDown" : "ArrowRight";
			const prevKey = vertical ? "ArrowUp" : "ArrowLeft";

			let nextIndex = -1;
			if (e.key === nextKey) {
				nextIndex = (index + 1) % triggers.length;
			} else if (e.key === prevKey) {
				nextIndex = (index - 1 + triggers.length) % triggers.length;
			} else if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = triggers.length - 1;
			}

			if (nextIndex !== -1) {
				const nextTrigger = triggers[nextIndex];
				nextTrigger.focus();
				if (props.activationMode !== "manual") {
					const newValue = nextTrigger.getAttribute("data-value");
					if (newValue) {
						selectValue(newValue);
					}
				}
				e.preventDefault();
			}
		};

		root.addEventListener("click", handleClick);
		root.addEventListener("keydown", handleKeyDown);

		// Notify scroll direction when an overflowing tab bar is scrolled.
		const list = root.querySelector<HTMLElement>(
			'[data-scope="tabs"][data-part="list"]',
		);
		let lastScrollLeft = list?.scrollLeft ?? 0;
		let lastScrollTop = list?.scrollTop ?? 0;
		const handleScroll = () => {
			if (!list) return;
			const deltaLeft = list.scrollLeft - lastScrollLeft;
			const deltaTop = list.scrollTop - lastScrollTop;
			lastScrollLeft = list.scrollLeft;
			lastScrollTop = list.scrollTop;
			if (deltaLeft === 0 && deltaTop === 0) return;
			const direction =
				Math.abs(deltaLeft) >= Math.abs(deltaTop)
					? deltaLeft > 0
						? "right"
						: "left"
					: deltaTop > 0
						? "bottom"
						: "top";
			onTabScroll?.({ direction });
		};
		if (onTabScroll && list) {
			list.addEventListener("scroll", handleScroll, { passive: true });
		}

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("keydown", handleKeyDown);
			if (onTabScroll && list) {
				list.removeEventListener("scroll", handleScroll);
			}
		};
		// Attached once at mount: handlers read fresh DOM state per event
		// rather than closed-over `value`, so they never go stale.
	}, []);

	return (
		<InteractiveRoot
			{...rest}
			value={value}
			onValueChange={(val) => {
				setValue(val);
				onChange?.(val);
				onValueChange?.(val);
			}}
			rootRef={rootRef}
			data-hydrated="true"
			classNames={classNames}
			styles={styles}
		>
			{children || (
				<TabsStructure
					items={tabItems}
					indicator={indicator}
					closable={closable}
					editable={editable}
					hideAdd={hideAdd}
					onTabClose={handleTabClose}
					onTabAdd={handleTabAdd}
					addAriaLabel={addAriaLabel}
					extra={extra}
					tabBarExtraContent={tabBarExtraContent}
				/>
			)}
		</InteractiveRoot>
	);
}
