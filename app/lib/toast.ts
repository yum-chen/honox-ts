export type ToastType = "info" | "success" | "error" | "warning";

export type ToastOptions = {
	title: string;
	description?: string;
	type?: ToastType;
	/** Auto-dismiss delay in ms. Set to 0 to keep open until dismissed. */
	duration?: number;
};

export const TOAST_EVENT = "park-toast";

/**
 * Park UI's imperative toast API, ported to Hono/JSX. Dispatches a DOM event
 * that the `Toaster` island listens for — this bridges island boundaries
 * without a shared React/Solid context.
 */
export const toast = (options: ToastOptions) => {
	if (typeof window === "undefined") return;
	window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: options }));
};
