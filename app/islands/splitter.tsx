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
	const currentSizesRef = useRef(currentSizes);

	// Keep ref in sync with state
	useEffect(() => {
		currentSizesRef.current = currentSizes;
	}, [currentSizes]);

	const updateSizes = (triggerId: string, newRatio: number) => {
		const rootRect = rootRef.current?.getBoundingClientRect();
		if (!rootRect) return;

		const orientation = rootProps.orientation ?? "horizontal";
		const totalSize =
			orientation === "horizontal" ? rootRect.width : rootRect.height;

		// Find panels adjacent to the trigger
		// A trigger with id 'a:b' is between panel 'a' and panel 'b'
		const [prevId, nextId] = triggerId.split(":");
		const prevIndex = currentSizesRef.current.findIndex(
			(s) => s.id.toString() === prevId,
		);
		const nextIndex = currentSizesRef.current.findIndex(
			(s) => s.id.toString() === nextId,
		);

		if (prevIndex === -1 || nextIndex === -1) return;

		const prevSize = currentSizesRef.current[prevIndex].size;
		const nextSize = currentSizesRef.current[nextIndex].size;
		const combinedSize = prevSize + nextSize;

		// Calculate new sizes for the two panels
		// newRatio is the percentage of the root element
		// We need to find what percentage of the root element the previous panels took
		let offset = 0;
		for (let i = 0; i < prevIndex; i++) {
			offset += currentSizesRef.current[i].size;
		}

		let newPrevSize = newRatio - offset;
		newPrevSize = Math.max(0, Math.min(combinedSize, newPrevSize));
		const newNextSize = combinedSize - newPrevSize;

		const newSizes = [...currentSizesRef.current];
		newSizes[prevIndex] = { ...newSizes[prevIndex], size: newPrevSize };
		newSizes[nextIndex] = { ...newSizes[nextIndex], size: newNextSize };

		if (!isControlled) {
			setSizes(newSizes);
		}
		onSizeChange?.(newSizes);
	};

	const handleMove = useRef<(e: MouseEvent | TouchEvent) => void>();
	const handleEnd = useRef<() => void>();

	// Initialize handlers once
	useEffect(() => {
		const moveHandler = (e: MouseEvent | TouchEvent) => {
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

		const endHandler = () => {
			isDragging.current = null;
			document.removeEventListener("mousemove", moveHandler);
			document.removeEventListener("mouseup", endHandler);
			document.removeEventListener("touchmove", moveHandler);
			document.removeEventListener("touchend", endHandler);
		};

		handleMove.current = moveHandler;
		handleEnd.current = endHandler;

		return () => {
			document.removeEventListener("mousemove", moveHandler);
			document.removeEventListener("mouseup", endHandler);
			document.removeEventListener("touchmove", moveHandler);
			document.removeEventListener("touchend", endHandler);
		};
	}, [rootProps.orientation]);

	const handleKeyDown = (triggerId: string) => (e: KeyboardEvent) => {
		const step = 5;
		const [prevId, nextId] = triggerId.split(":");
		const prevIndex = currentSizesRef.current.findIndex(
			(s) => s.id.toString() === prevId,
		);
		if (prevIndex === -1) return;

		let offset = 0;
		for (let i = 0; i <= prevIndex; i++) {
			offset += currentSizesRef.current[i].size;
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

	// Attach listeners to triggers
	useEffect(() => {
		if (rootRef.current && handleMove.current && handleEnd.current) {
			const triggers = rootRef.current.querySelectorAll(
				'[data-part="resize-trigger"]',
			);
			const cleanups: (() => void)[] = [];

			triggers.forEach((trigger) => {
				const triggerId = trigger.id.replace("splitter-trigger-", "");

				const startHandler = (e: MouseEvent | TouchEvent) => {
					isDragging.current = triggerId;
					document.addEventListener("mousemove", handleMove.current!);
					document.addEventListener("mouseup", handleEnd.current!);
					document.addEventListener("touchmove", handleMove.current!, {
						passive: false,
					});
					document.addEventListener("touchend", handleEnd.current!);
				};

				const keyHandler = handleKeyDown(triggerId);

				trigger.addEventListener("mousedown", startHandler as any);
				trigger.addEventListener("touchstart", startHandler as any);
				trigger.addEventListener("keydown", keyHandler as any);

				// Update aria attributes
				const [prevId] = triggerId.split(":");
				const prevPanel = currentSizesRef.current.find(
					(s) => s.id.toString() === prevId,
				);
				if (prevPanel) {
					trigger.setAttribute("aria-valuenow", prevPanel.size.toFixed(0));
					trigger.setAttribute("aria-valuemin", "0");
					trigger.setAttribute("aria-valuemax", "100");
				}

				cleanups.push(() => {
					trigger.removeEventListener("mousedown", startHandler as any);
					trigger.removeEventListener("touchstart", startHandler as any);
					trigger.removeEventListener("keydown", keyHandler as any);
				});
			});

			return () => {
				cleanups.forEach((c) => c());
			};
		}
	}, []);

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
