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

	const updateSizes = (newRatio: number) => {
		if (currentSizes.length >= 2) {
			const newSizes = [
				{ id: currentSizes[0].id, size: newRatio },
				{ id: currentSizes[1].id, size: 100 - newRatio },
			];
			if (!isControlled) {
				setSizes(newSizes);
			}
			onSizeChange?.(newSizes);
		}
	};

	const handleStart = (id: string) => (e: MouseEvent | TouchEvent) => {
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
		updateSizes(newRatio);

		if ("touches" in e) e.preventDefault();
	};

	const handleEnd = () => {
		isDragging.current = null;
		document.removeEventListener("mousemove", handleMove);
		document.removeEventListener("mouseup", handleEnd);
		document.removeEventListener("touchmove", handleMove);
		document.removeEventListener("touchend", handleEnd);
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (currentSizes.length < 2) return;
		const step = 5;
		let newRatio = currentSizes[0].size;

		if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			newRatio = Math.max(0, newRatio - step);
		} else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			newRatio = Math.min(100, newRatio + step);
		} else if (e.key === "Home") {
			newRatio = 0;
		} else if (e.key === "End") {
			newRatio = 100;
		} else {
			return;
		}

		e.preventDefault();
		updateSizes(newRatio);
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
				const id = trigger.id.replace("splitter-trigger-", "");
				const startListener = (e: MouseEvent | TouchEvent) =>
					handleStart(id)(e);
				const keyListener = (e: KeyboardEvent) => handleKeyDown(e);

				trigger.addEventListener("mousedown", startListener as any);
				trigger.addEventListener("touchstart", startListener as any);
				trigger.addEventListener("keydown", keyListener as any);

				// Update aria attributes
				if (currentSizes.length >= 1) {
					trigger.setAttribute(
						"aria-valuenow",
						currentSizes[0].size.toFixed(0),
					);
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
