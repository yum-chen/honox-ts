import { useEffect, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/splitter-primitive";

export interface SplitterIslandProps extends RootProps {
	defaultSize?: { id: string | number; size: number }[];
	size?: { id: string | number; size: number }[];
	onSizeChange?: (size: { id: string | number; size: number }[]) => void;
}

export default function SplitterIsland(props: SplitterIslandProps) {
	const {
		defaultSize,
		size: sizeProp,
		onSizeChange,
		children,
		...rootProps
	} = props;

	const [sizes, setSizes] = useState<{ id: string | number; size: number }[]>(
		sizeProp ?? defaultSize ?? [],
	);
	const isControlled = sizeProp !== undefined;
	const currentSizes = isControlled ? sizeProp : sizes;

	const rootRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef<string | null>(null);

	const updateSizes = (triggerId: string, newRatio: number) => {
		const rootRect = rootRef.current?.getBoundingClientRect();
		if (!rootRect) return;

		const orientation = rootProps.orientation ?? "horizontal";
		const _totalSize =
			orientation === "horizontal" ? rootRect.width : rootRect.height;

		// Find panels adjacent to the trigger
		// A trigger with id 'a:b' is between panel 'a' and panel 'b'
		const [prevId, nextId] = triggerId.split(":");
		const prevIndex = currentSizes.findIndex((s) => s.id.toString() === prevId);
		const nextIndex = currentSizes.findIndex((s) => s.id.toString() === nextId);

		if (prevIndex === -1 || nextIndex === -1) return;

		const prevSize = currentSizes[prevIndex].size;
		const nextSize = currentSizes[nextIndex].size;
		const combinedSize = prevSize + nextSize;

		// Calculate new sizes for the two panels
		// newRatio is the percentage of the root element
		// We need to find what percentage of the root element the previous panels took
		let offset = 0;
		for (let i = 0; i < prevIndex; i++) {
			offset += currentSizes[i].size;
		}

		let newPrevSize = newRatio - offset;
		newPrevSize = Math.max(0, Math.min(combinedSize, newPrevSize));
		const newNextSize = combinedSize - newPrevSize;

		const newSizes = [...currentSizes];
		newSizes[prevIndex] = { ...newSizes[prevIndex], size: newPrevSize };
		newSizes[nextIndex] = { ...newSizes[nextIndex], size: newNextSize };

		if (!isControlled) {
			setSizes(newSizes);
		}
		onSizeChange?.(newSizes);
	};

	const handleStart = (id: string) => (_e: MouseEvent | TouchEvent) => {
		isDragging.current = id;
		document.addEventListener("mousemove", handleMove);
		document.addEventListener("mouseup", handleEnd);
		document.addEventListener("touchmove", handleMove, { passive: false });
		document.addEventListener("touchend", handleEnd);
	};

	const handleMove = (e: MouseEvent | TouchEvent) => {
		if (!isDragging.current || !rootRef.current) return;

		const rootRect = rootRef.current.getBoundingClientRect();
		const orientation = rootProps.orientation ?? "horizontal";

		const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
		const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

		let newRatio: number;
		if (orientation === "horizontal") {
			newRatio = ((clientX - rootRect.left) / rootRect.width) * 100;
		} else {
			newRatio = ((clientY - rootRect.top) / rootRect.height) * 100;
		}

		newRatio = Math.max(0, Math.min(100, newRatio));
		updateSizes(isDragging.current, newRatio);

		if ("touches" in e) e.preventDefault();
	};

	const handleEnd = () => {
		isDragging.current = null;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	const handleKeyDown = (triggerId: string) => (e: KeyboardEvent) => {
		const step = 5;
		const [prevId, _nextId] = triggerId.split(":");
		const prevIndex = currentSizes.findIndex((s) => s.id.toString() === prevId);
		if (prevIndex === -1) return;

		let offset = 0;
		for (let i = 0; i <= prevIndex; i++) {
			offset += currentSizes[i].size;
		}

		let newRatio = offset;

		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			newRatio = Math.max(0, newRatio - step);
		} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			newRatio = Math.min(100, newRatio + step);
		} else if (e.key === "Home") {
			newRatio = 0; // This is not quite right for multi-panel, but matches single
		} else if (e.key === "End") {
			newRatio = 100;
		} else {
			return;
		}

		e.preventDefault();
		updateSizes(triggerId, newRatio);
	};

	useEffect(() => {
		return () => {
			document.removeEventListener("mousemove", handleMove);
			document.removeEventListener("mouseup", handleEnd);
			document.removeEventListener("touchmove", handleMove);
			document.removeEventListener("touchend", handleEnd);
		};
	}, []);

	useEffect(() => {
		if (rootRef.current) {
			const triggers = rootRef.current.querySelectorAll(
				'[data-part="resize-trigger"]',
			);
			const cleanups: (() => void)[] = [];

			triggers.forEach((trigger) => {
				const triggerId = trigger.id.replace("splitter-trigger-", "");
				const startListener = (e: MouseEvent | TouchEvent) =>
					handleStart(triggerId)(e);
				const keyListener = (e: KeyboardEvent) => handleKeyDown(triggerId)(e);

				trigger.addEventListener("mousedown", startListener as any);
				trigger.addEventListener("touchstart", startListener as any);
				trigger.addEventListener("keydown", keyListener as any);

				// Update aria attributes
				const [prevId] = triggerId.split(":");
				const prevPanel = currentSizes.find((s) => s.id.toString() === prevId);
				if (prevPanel) {
					trigger.setAttribute("aria-valuenow", prevPanel.size.toFixed(0));
					trigger.setAttribute("aria-valuemin", "0");
					trigger.setAttribute("aria-valuemax", "100");
				}

				cleanups.push(() => {
					trigger.removeEventListener("mousedown", startListener as any);
					trigger.removeEventListener("touchstart", startListener as any);
					trigger.removeEventListener("keydown", keyListener as any);
				});
			});

			return () => cleanups.forEach((c) => c());
		}
	}, [children, currentSizes]);

	const styleVars = currentSizes.reduce(
		(acc, curr) => {
			acc[`--splitter-panel-${curr.id}`] = `${curr.size} ${curr.size} 0%`;
			return acc;
		},
		{} as Record<string, string>,
	);

	return (
		<Root
			{...rootProps}
			ref={rootRef}
			style={{ ...styleVars, ...(rootProps.style || {}) }}
		>
			{children}
		</Root>
	);
}
