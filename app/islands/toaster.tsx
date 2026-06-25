import { useEffect, useState } from "hono/jsx";
import { toast as toastRecipe } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";
import { IconButton } from "../components/ui/icon-button";
import { XIcon } from "../components/icons";
import { TOAST_EVENT, type ToastOptions } from "../lib/toast";

const slots = toastRecipe();

type ToastEntry = ToastOptions & { id: number };

const accentByType = {
	info: "colorPalette.default",
	success: "colorPalette.default",
	error: "red.default",
	warning: "red.default",
} as const;

/**
 * Park UI `Toaster`, ported to Hono/JSX. Replaces the `@ark-ui` headless Toast
 * machine with an island that renders a fixed toast region and listens for
 * `toast()` events dispatched on `window`, styled with Park UI's `toast` recipe.
 */
export default function Toaster() {
	const [toasts, setToasts] = useState<ToastEntry[]>([]);

	useEffect(() => {
		let counter = 0;
		const onToast = (event: Event) => {
			const detail = (event as CustomEvent<ToastOptions>).detail;
			counter += 1;
			const id = counter;
			setToasts((current) => [...current, { ...detail, id }]);
			const duration = detail.duration ?? 4000;
			if (duration > 0) {
				setTimeout(() => {
					setToasts((current) => current.filter((item) => item.id !== id));
				}, duration);
			}
		};
		window.addEventListener(TOAST_EVENT, onToast);
		return () => window.removeEventListener(TOAST_EVENT, onToast);
	}, []);

	const dismiss = (id: number) =>
		setToasts((current) => current.filter((item) => item.id !== id));

	return (
		<div
			class={cx(
				slots.group,
				css({
					position: "fixed",
					bottom: "4",
					right: "4",
					zIndex: "toast",
					display: "flex",
					flexDirection: "column",
					gap: "3",
					width: "max-content",
					maxW: "sm",
				}),
			)}
		>
			{toasts.map((item) => (
				<div
					key={item.id}
					role="status"
					aria-live="polite"
					data-state="open"
					class={cx(
						slots.root,
						css({
							position: "relative",
							display: "flex",
							flexDirection: "column",
							gap: "1",
							p: "4",
							pr: "10",
							borderRadius: "l2",
							bg: "bg.default",
							boxShadow: "lg",
							borderWidth: "1px",
							borderColor: "border.default",
							borderLeftWidth: "3px",
							borderLeftColor: accentByType[item.type ?? "info"],
							minW: "xs",
						}),
					)}
				>
					<p class={cx(slots.title, css({ fontWeight: "semibold", textStyle: "sm" }))}>
						{item.title}
					</p>
					{item.description ? (
						<p class={cx(slots.description, css({ color: "fg.muted", textStyle: "sm" }))}>
							{item.description}
						</p>
					) : null}
					<IconButton
						variant="ghost"
						size="sm"
						aria-label="Dismiss notification"
						onClick={() => dismiss(item.id)}
						class={cx(
							slots.closeTrigger,
							css({ position: "absolute", top: "2", right: "2" }),
						)}
					>
						<XIcon />
					</IconButton>
				</div>
			))}
		</div>
	);
}
