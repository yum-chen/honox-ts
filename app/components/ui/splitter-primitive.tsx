import type { PropsWithChildren } from "hono/jsx";
import {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { cx } from "styled-system/css";
import type { SplitterVariantProps } from "styled-system/recipes";
import { splitter } from "styled-system/recipes";

type SplitterStyles = ReturnType<typeof splitter>;

interface SplitterContextValue {
	styles: SplitterStyles;
	orientation: "horizontal" | "vertical";
	sizes: SplitterSize[];
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

const useSplitterContext = () => {
	const context = useContext(SplitterContext);
	return context;
};

export interface SplitterSize {
	id: string | number;
	size: number;
	minSize?: number;
	maxSize?: number;
}

export interface RootProps extends SplitterVariantProps, PropsWithChildren {
	orientation?: "horizontal" | "vertical";
	class?: string;
	id?: string;
	style?: Record<string, string | number>;
	sizes?: SplitterSize[];
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = splitter.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		orientation = "horizontal",
		sizes = [],
		...restProps
	} = localProps;
	const styles = splitter(variantProps);
	const fallbackId = useId();
	const id = idProp || `splitter-root-${fallbackId}`;

	const contextValue = {
		styles,
		orientation,
		sizes,
	};

	return (
		<SplitterContext.Provider value={contextValue}>
			<div
				id={id}
				data-scope="splitter"
				data-part="root"
				class={cx(styles.root, classProp)}
				data-orientation={orientation}
				{...restProps}
			>
				{children}
			</div>
		</SplitterContext.Provider>
	);
}

export interface PanelProps extends PropsWithChildren {
	id: string | number;
	class?: string;
	style?: Record<string, string | number>;
}

export function Panel(props: PanelProps) {
	const { children, id, class: classProp, style: styleProp, ...rest } = props;
	const context = useSplitterContext();
	const sizeConfig = context?.sizes.find((s) => String(s.id) === String(id));

	const style = {
		...styleProp,
		flex: sizeConfig ? `${sizeConfig.size} 1 0%` : "1 1 0%",
	};

	return (
		<div
			data-scope="splitter"
			data-part="panel"
			data-id={id}
			class={cx(context?.styles.panel, classProp)}
			style={style}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface ResizeTriggerProps extends PropsWithChildren {
	id: string;
	class?: string;
	style?: Record<string, string | number>;
	disabled?: boolean;
}

export function ResizeTrigger(props: ResizeTriggerProps) {
	const { children, id, class: classProp, disabled, ...rest } = props;
	const context = useSplitterContext();
	const [prevId, nextId] = id.split(":");

	const prevSize =
		context?.sizes.find((s) => String(s.id) === prevId)?.size ?? 50;

	return (
		<button
			type="button"
			role="separator"
			aria-orientation={context?.orientation}
			aria-valuenow={prevSize}
			aria-valuemin={0}
			aria-valuemax={100}
			disabled={disabled}
			data-scope="splitter"
			data-part="resize-trigger"
			data-id={id}
			data-disabled={disabled ? "" : undefined}
			class={cx(context?.styles.resizeTrigger, classProp)}
			{...rest}
		>
			{children}
		</button>
	);
}

export interface InteractiveSplitterProps extends RootProps {
	defaultSize?: SplitterSize[];
	onSizeChange?: (size: SplitterSize[]) => void;
}

export function InteractiveSplitter(props: InteractiveSplitterProps) {
	const {
		defaultSize,
		sizes: sizesProp,
		onSizeChange,
		children,
		orientation = "horizontal",
		...rootProps
	} = props;

	const fallbackId = useId();
	const rootId = rootProps.id || `splitter-${fallbackId}`;

	// Ensure we have some sizes even if not provided
	const getInitialSizes = () => {
		if (sizesProp) return sizesProp;
		if (defaultSize) return defaultSize;

		// If no sizes provided, we'll need to calculate them after mount or assume equal
		// For SSG, equal is a safe bet if not specified
		return [];
	};

	const [sizes, setSizes] = useState<SplitterSize[]>(getInitialSizes());
	const isControlled = sizesProp !== undefined;
	const currentSizes = isControlled ? sizesProp : sizes;
	const sizesRef = useRef<SplitterSize[]>(currentSizes);
	const activeResizeTrigger = useRef<string | null>(null);

	useEffect(() => {
		sizesRef.current = currentSizes;
		const root = document.getElementById(rootId);
		if (!root) return;

		const [variantProps] = splitter.splitVariantProps({
			...rootProps,
			orientation,
		});
		const styles = splitter(variantProps);

		const addClass = (element: Element | null, className?: string) => {
			if (!element || !className) return;
			element.classList.add(...className.split(/\s+/).filter(Boolean));
		};

		const syncDom = (currentSizes: SplitterSize[]) => {
			addClass(root, styles.root);
			root.setAttribute("data-orientation", orientation);

			const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-part="panel"]'));

			// If we don't have sizes yet (e.g. first mount and not provided), initialize them equally
			if (currentSizes.length === 0 && panels.length > 0) {
				const equalSize = 100 / panels.length;
				const newSizes = panels.map(p => ({
					id: p.getAttribute("data-id") || "",
					size: equalSize
				}));
				if (!isControlled) {
					setSizes(newSizes);
					sizesRef.current = newSizes;
				}
				currentSizes = newSizes;
			}

			panels.forEach((panel) => {
				const id = panel.getAttribute("data-id");
				const config = currentSizes.find((s) => String(s.id) === id);
				addClass(panel, styles.panel);
				if (config) {
					panel.style.flex = `${config.size} 1 0%`;
				}
			});

			const triggers = Array.from(root.querySelectorAll<HTMLElement>('[data-part="resize-trigger"]'));
			triggers.forEach((trigger) => {
				addClass(trigger, styles.resizeTrigger);
				trigger.setAttribute("data-orientation", orientation);

				const id = trigger.getAttribute("data-id") || "";
				const [prevId] = id.split(":");
				const prevSize = currentSizes.find(s => String(s.id) === prevId)?.size ?? 0;
				trigger.setAttribute("aria-valuenow", String(Math.round(prevSize)));
			});
		};

		syncDom(currentSizes);

		const updateSizes = (prevId: string, nextId: string, prevPercent: number, nextPercent: number) => {
			const newSizes = sizesRef.current.map(s => {
				if (String(s.id) === prevId) return { ...s, size: prevPercent };
				if (String(s.id) === nextId) return { ...s, size: nextPercent };
				return s;
			});

			sizesRef.current = newSizes;
			syncDom(newSizes);
			if (!isControlled) setSizes(newSizes);
			onSizeChange?.(newSizes);
		};

		const handleMove = (e: MouseEvent | TouchEvent) => {
			if (!activeResizeTrigger.current) return;
			const point = "touches" in e ? e.touches[0] : (e as MouseEvent);
			if (!point) return;

			const [prevId, nextId] = activeResizeTrigger.current.split(":");
			const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-part="panel"]'));
			const prevPanel = panels.find(p => p.getAttribute("data-id") === prevId);
			const nextPanel = panels.find(p => p.getAttribute("data-id") === nextId);

			if (!prevPanel || !nextPanel) return;

			const prevRect = prevPanel.getBoundingClientRect();
			const nextRect = nextPanel.getBoundingClientRect();

			const totalPx = orientation === "horizontal"
				? prevRect.width + nextRect.width
				: prevRect.height + nextRect.height;

			const offsetPx = orientation === "horizontal"
				? point.clientX - prevRect.left
				: point.clientY - prevRect.top;

			const prevConfig = sizesRef.current.find(s => String(s.id) === prevId);
			const nextConfig = sizesRef.current.find(s => String(s.id) === nextId);
			if (!prevConfig || !nextConfig) return;

			const combinedPercent = prevConfig.size + nextConfig.size;
			const newPrevPercent = Math.max(0, Math.min(combinedPercent, (offsetPx / totalPx) * combinedPercent));
			const newNextPercent = combinedPercent - newPrevPercent;

			updateSizes(prevId, nextId, newPrevPercent, newNextPercent);
			if ("touches" in e) e.preventDefault();
		};

		const handleEnd = () => {
			activeResizeTrigger.current = null;
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleMove);
			document.removeEventListener("touchend", handleEnd);
		};

		const handleTriggerDown = (e: MouseEvent | TouchEvent) => {
			const trigger = (e.currentTarget as HTMLElement);
			activeResizeTrigger.current = trigger.getAttribute("data-id");
			document.addEventListener("mousemove", handleMove);
			document.addEventListener("mouseup", handleEnd);
			document.addEventListener("touchmove", handleMove, { passive: false });
			document.addEventListener("touchend", handleEnd);
			e.preventDefault();
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const trigger = e.currentTarget as HTMLElement;
			const id = trigger.getAttribute("data-id") || "";
			const [prevId, nextId] = id.split(":");

			const prevConfig = sizesRef.current.find(s => String(s.id) === prevId);
			const nextConfig = sizesRef.current.find(s => String(s.id) === nextId);
			if (!prevConfig || !nextConfig) return;

			const combinedPercent = prevConfig.size + nextConfig.size;
			const step = e.shiftKey ? 10 : 1;
			let newPrevPercent = prevConfig.size;

			if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
				newPrevPercent = Math.max(0, prevConfig.size - step);
			} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
				newPrevPercent = Math.min(combinedPercent, prevConfig.size + step);
			} else if (e.key === "Home") {
				newPrevPercent = 0;
			} else if (e.key === "End") {
				newPrevPercent = combinedPercent;
			} else {
				return;
			}

			e.preventDefault();
			updateSizes(prevId, nextId, newPrevPercent, combinedPercent - newPrevPercent);
		};

		const triggers = Array.from(root.querySelectorAll<HTMLElement>('[data-part="resize-trigger"]'));
		triggers.forEach(trigger => {
			trigger.addEventListener("mousedown", handleTriggerDown);
			trigger.addEventListener("touchstart", handleTriggerDown, { passive: false });
			trigger.addEventListener("keydown", handleKeyDown);
		});

		return () => {
			triggers.forEach(trigger => {
				trigger.removeEventListener("mousedown", handleTriggerDown);
				trigger.removeEventListener("touchstart", handleTriggerDown);
				trigger.removeEventListener("keydown", handleKeyDown);
			});
		};
	}, [currentSizes, isControlled, onSizeChange, orientation, rootId, rootProps]);

	return (
		<Root {...rootProps} id={rootId} orientation={orientation} sizes={currentSizes}>
			{children}
		</Root>
	);
}
