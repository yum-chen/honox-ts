import { stack } from "design-system/patterns";
import { useEffect, useState, useRef } from "hono/jsx";
import { CloseButton } from "../components/ui/button";
import {
	ActionTrigger,
	CloseTrigger,
	Description,
	Indicator,
	Root,
	Title,
} from "../components/ui/toast-primitive";

const getPlacementStyles = (placement: string): Record<string, string> => {
	switch (placement) {
		case "top-start":
			return { top: "1rem", left: "1rem", flexDirection: "column-reverse" };
		case "top":
			return {
				top: "1rem",
				left: "50%",
				transform: "translateX(-50%)",
				flexDirection: "column-reverse",
			};
		case "top-end":
			return { top: "1rem", right: "1rem", flexDirection: "column-reverse" };
		case "bottom-start":
			return { bottom: "1rem", left: "1rem", flexDirection: "column" };
		case "bottom":
			return {
				bottom: "1rem",
				left: "50%",
				transform: "translateX(-50%)",
				flexDirection: "column",
			};
		default:
			return { bottom: "1rem", right: "1rem", flexDirection: "column" };
	}
};

interface ToastOptions {
	id: string;
	title?: string;
	description?: string;
	type?: "info" | "success" | "warning" | "error" | "loading";
	duration?: number;
	closable?: boolean;
	action?: {
		label: string;
		onClick: () => void;
	};
}

interface PromiseOptions<T = unknown> {
	loading: Omit<Partial<ToastOptions>, "id" | "type"> & { title?: string };
	success:
		| string
		| ((
				data: T,
		  ) => Omit<Partial<ToastOptions>, "id" | "type"> & { title?: string });
	error:
		| string
		| ((
				err: Error,
		  ) => Omit<Partial<ToastOptions>, "id" | "type"> & { title?: string });
}

interface ToasterProps {
	toaster: ReturnType<typeof createToaster>;
	children?: (toast: ToastOptions) => unknown;
}

function createToaster(
	config: {
		placement?:
			| "top-start"
			| "top"
			| "top-end"
			| "bottom-start"
			| "bottom"
			| "bottom-end";
		overlap?: boolean;
		max?: number;
		duration?: number;
		gap?: number;
		removeDelay?: number;
	} = {},
) {
	const placement = config.placement || "bottom-end";
	const overlap = config.overlap ?? false;
	const max = config.max ?? 24;
	const defaultDuration = config.duration ?? 5000;
	const gap = config.gap ?? 16;
	const removeDelay = config.removeDelay ?? 200;

	let toasts: ToastOptions[] = [];
	const listeners = new Set<(toasts: ToastOptions[]) => void>();

	const notify = () => {
		for (const listener of listeners) {
			listener([...toasts]);
		}
	};

	const dismiss = (id?: string) => {
		if (id) {
			toasts = toasts.filter((t) => t.id !== id);
		} else {
			toasts = [];
		}
		notify();

		if (typeof window !== "undefined") {
			window.dispatchEvent(
				new CustomEvent("park-ui:toast:dismissed", { detail: { id } }),
			);
		}
	};

	const create = (options: Partial<ToastOptions> & { title?: string }) => {
		const id = options.id || Math.random().toString(36).substring(2, 9);
		const duration =
			options.duration !== undefined ? options.duration : defaultDuration;

		const toast: ToastOptions = {
			...options,
			id,
			type: options.type || "info",
			duration,
		};

		if (toasts.length >= max) {
			toasts.shift();
		}

		toasts.push(toast);
		notify();

		return id;
	};

	const update = (id: string, options: Partial<ToastOptions>) => {
		toasts = toasts.map((t) => {
			if (t.id === id) {
				return { ...t, ...options };
			}
			return t;
		});
		notify();
	};

	const success = (
		titleOrOptions: string | (Partial<ToastOptions> & { title?: string }),
		options?: Partial<ToastOptions>,
	) => {
		if (typeof titleOrOptions === "string") {
			return create({ ...options, title: titleOrOptions, type: "success" });
		}
		return create({ ...titleOrOptions, type: "success" });
	};

	const error = (
		titleOrOptions: string | (Partial<ToastOptions> & { title?: string }),
		options?: Partial<ToastOptions>,
	) => {
		if (typeof titleOrOptions === "string") {
			return create({ ...options, title: titleOrOptions, type: "error" });
		}
		return create({ ...titleOrOptions, type: "error" });
	};

	const warning = (
		titleOrOptions: string | (Partial<ToastOptions> & { title?: string }),
		options?: Partial<ToastOptions>,
	) => {
		if (typeof titleOrOptions === "string") {
			return create({ ...options, title: titleOrOptions, type: "warning" });
		}
		return create({ ...titleOrOptions, type: "warning" });
	};

	const info = (
		titleOrOptions: string | (Partial<ToastOptions> & { title?: string }),
		options?: Partial<ToastOptions>,
	) => {
		if (typeof titleOrOptions === "string") {
			return create({ ...options, title: titleOrOptions, type: "info" });
		}
		return create({ ...titleOrOptions, type: "info" });
	};

	const loading = (
		titleOrOptions: string | (Partial<ToastOptions> & { title?: string }),
		options?: Partial<ToastOptions>,
	) => {
		if (typeof titleOrOptions === "string") {
			return create({
				...options,
				title: titleOrOptions,
				type: "loading",
				duration: 0,
			});
		}
		return create({ ...titleOrOptions, type: "loading", duration: 0 });
	};

	const promise = <T,>(
		prom: Promise<T>,
		options: PromiseOptions<T>,
	): Promise<T> => {
		const id = create({ ...options.loading, type: "loading", duration: 0 });

		prom
			.then((data) => {
				const successOptions =
					typeof options.success === "function"
						? options.success(data)
						: { title: options.success };
				update(id, {
					...successOptions,
					type: "success",
					duration: defaultDuration,
				});
			})
			.catch((err) => {
				const errorOptions =
					typeof options.error === "function"
						? options.error(err)
						: { title: options.error };
				update(id, {
					...errorOptions,
					type: "error",
					duration: defaultDuration,
				});
			});

		return prom;
	};

	const subscribe = (callback: (toasts: ToastOptions[]) => void) => {
		listeners.add(callback);
		callback([...toasts]);
		return () => {
			listeners.delete(callback);
		};
	};

	return {
		placement,
		overlap,
		max,
		gap,
		removeDelay,
		create,
		success,
		error,
		warning,
		info,
		loading,
		promise,
		dismiss,
		update,
		subscribe,
		getToasts: () => [...toasts],
		getCount: () => toasts.length,
	};
}

const toaster = createToaster({
	placement: "bottom-end",
	overlap: false,
	max: 24,
});

if (typeof window !== "undefined") {
	window.addEventListener("park-ui:toast:create", (e: unknown) => {
		const customEvent = e as CustomEvent;
		if (customEvent.detail) {
			const { id, ...options } = customEvent.detail;
			toaster.create({ ...options, id });
		}
	});
	window.addEventListener("park-ui:toast:dismiss", (e: unknown) => {
		const customEvent = e as CustomEvent;
		if (customEvent.detail) {
			const { id } = customEvent.detail;
			toaster.dismiss(id);
		}
	});
}

interface ToastItemProps {
	toast: ToastOptions;
	dismiss: (id: string) => void;
	children: any;
}

function ToastItem({ toast, dismiss, children }: ToastItemProps) {
	const [translateX, setTranslateX] = useState(0);
	const [translateY, setTranslateY] = useState(0);
	const [opacity, setOpacity] = useState(1);

	const isDraggingRef = useRef(false);
	const startXRef = useRef(0);
	const startYRef = useRef(0);

	// Refs for tracking synchronous drag coordinate states
	const translateXRef = useRef(0);
	const translateYRef = useRef(0);

	const duration = toast.duration ?? 5000;
	const remainingTimeRef = useRef(duration);
	const lastStartTimeRef = useRef(Date.now());
	const timerRef = useRef<any>(null);

	const startTimer = (ms: number) => {
		if (ms === 0 || ms === Infinity) return;
		lastStartTimeRef.current = Date.now();
		remainingTimeRef.current = ms;
		if (timerRef.current) clearTimeout(timerRef.current);
		timerRef.current = setTimeout(() => {
			dismiss(toast.id);
		}, ms);
	};

	const pauseTimer = () => {
		if (duration === 0 || duration === Infinity) return;
		if (timerRef.current) {
			clearTimeout(timerRef.current);
			timerRef.current = null;
		}
		const elapsed = Date.now() - lastStartTimeRef.current;
		remainingTimeRef.current = Math.max(0, remainingTimeRef.current - elapsed);
	};

	const resumeTimer = () => {
		if (duration === 0 || duration === Infinity) return;
		if (remainingTimeRef.current > 0) {
			startTimer(remainingTimeRef.current);
		}
	};

	useEffect(() => {
		startTimer(duration);
		return () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		};
	}, [toast.id, duration]);

	const handlePointerDown = (e: PointerEvent) => {
		if (e.button !== 0) return;

		// If clicking an interactive child element (button, link, close trigger), don't trigger drag
		const target = e.target as HTMLElement;
		if (target.closest("button, a, [role='button']")) {
			return;
		}

		isDraggingRef.current = true;
		startXRef.current = e.clientX;
		startYRef.current = e.clientY;
		translateXRef.current = 0;
		translateYRef.current = 0;

		pauseTimer();

		const currentTarget = e.currentTarget as HTMLElement;
		currentTarget.setPointerCapture(e.pointerId);
	};

	const handlePointerMove = (e: PointerEvent) => {
		if (!isDraggingRef.current) return;
		const dx = e.clientX - startXRef.current;
		const dy = e.clientY - startYRef.current;

		translateXRef.current = dx;
		translateYRef.current = dy;

		setTranslateX(dx);
		setTranslateY(dy);

		const distance = Math.sqrt(dx * dx + dy * dy);
		const swipeThreshold = 100;
		const newOpacity = Math.max(0.2, 1 - distance / (swipeThreshold * 2));
		setOpacity(newOpacity);
	};

	const handlePointerUp = (e: PointerEvent) => {
		if (!isDraggingRef.current) return;
		isDraggingRef.current = false;

		const currentTarget = e.currentTarget as HTMLElement;
		currentTarget.releasePointerCapture(e.pointerId);

		const dx = translateXRef.current;
		const dy = translateYRef.current;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const swipeThreshold = 80;

		if (distance > swipeThreshold) {
			setOpacity(0);
			setTimeout(() => {
				dismiss(toast.id);
			}, 100);
		} else {
			translateXRef.current = 0;
			translateYRef.current = 0;
			setTranslateX(0);
			setTranslateY(0);
			setOpacity(1);
			resumeTimer();
		}
	};

	const handlePointerEnter = () => {
		if (!isDraggingRef.current) pauseTimer();
	};

	const handlePointerLeave = () => {
		if (!isDraggingRef.current) resumeTimer();
	};

	const handleFocusIn = () => {
		pauseTimer();
	};

	const handleFocusOut = () => {
		resumeTimer();
	};

	return (
		<div
			style={{
				transform: `translate(${translateX}px, ${translateY}px) scale(var(--scale, 1))`,
				opacity: opacity,
				transition: isDraggingRef.current ? "none" : "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
				pointerEvents: "auto",
				touchAction: "none",
			}}
			onpointerdown={handlePointerDown}
			onpointermove={handlePointerMove}
			onpointerup={handlePointerUp}
			onpointerenter={handlePointerEnter}
			onpointerleave={handlePointerLeave}
			onfocusin={handleFocusIn}
			onfocusout={handleFocusOut}
		>
			{children}
		</div>
	);
}

export default function Toaster(props: ToasterProps) {
	const activeToaster = props.toaster || toaster;
	const [toasts, setToasts] = useState<ToastOptions[]>(() =>
		activeToaster.getToasts(),
	);

	useEffect(() => {
		return activeToaster.subscribe((newToasts) => {
			setToasts(newToasts);
		});
	}, [activeToaster]);

	return (
		<section
			role="region"
			aria-live="polite"
			style={{
				position: "fixed",
				display: "flex",
				gap: "0.5rem",
				zIndex: 9999,
				pointerEvents: "none",
				maxWidth: "calc(100vw - 2rem)",
				...getPlacementStyles(activeToaster.placement),
			}}
		>
			{toasts.map((toast) => {
				if (props.children) {
					return (
						<ToastItem
							key={toast.id}
							toast={toast}
							dismiss={activeToaster.dismiss}
						>
							{props.children(toast)}
						</ToastItem>
					);
				}

				return (
					<ToastItem
						key={toast.id}
						toast={toast}
						dismiss={activeToaster.dismiss}
					>
						<Root
							type={toast.type}
							toast={toast}
							dismiss={activeToaster.dismiss}
							style={{ pointerEvents: "auto" }}
						>
							<Indicator />
							<div class={stack({ gap: "3", alignItems: "start", flex: 1 })}>
								<div class={stack({ gap: "1" })}>
									{toast.title && <Title>{toast.title}</Title>}
									{toast.description && (
										<Description>{toast.description}</Description>
									)}
								</div>
								{toast.action && (
									<ActionTrigger>{toast.action.label}</ActionTrigger>
								)}
							</div>
							{toast.closable && (
								<CloseTrigger>
									<CloseButton size="sm" />
								</CloseTrigger>
							)}
						</Root>
					</ToastItem>
				);
			})}
		</section>
	);
}

export type { PromiseOptions, ToasterProps, ToastOptions };
export { createToaster, toaster };
