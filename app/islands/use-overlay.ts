import { useEffect, useRef } from "hono/jsx";
import {
	applyInert,
	getFocusable,
	type OverlayOptions,
	openOverlayRoots,
} from "../components/ui/overlay-a11y";

/**
 * Full overlay behavior: click delegation (open/close via `data-part`) +
 * accessibility layer (focus trap, Escape, inert background, scroll lock,
 * focus return to trigger on close). Runs whenever `open` or the gate props change.
 */
export function useOverlay(opts: OverlayOptions) {
	const {
		rootRef,
		open,
		closeOnEscape,
		closeOnInteractOutside,
		onChange,
		initialFocusEl,
		finalFocusEl,
	} = opts;

	// Keep the latest options in refs to prevent event listener thrashing.
	const onChangeRef = useRef(onChange);
	onChangeRef.current = onChange;

	const closeOnEscapeRef = useRef(closeOnEscape);
	closeOnEscapeRef.current = closeOnEscape;

	const closeOnInteractOutsideRef = useRef(closeOnInteractOutside);
	closeOnInteractOutsideRef.current = closeOnInteractOutside;

	const initialFocusElRef = useRef(initialFocusEl);
	initialFocusElRef.current = initialFocusEl;

	const finalFocusElRef = useRef(finalFocusEl);
	finalFocusElRef.current = finalFocusEl;

	const showRef = useRef<() => void>(() => {});
	const hideRef = useRef<() => void>(() => {});

	// --- Sync open prop changes (for controlled / initial state) ---
	useEffect(() => {
		if (open) {
			showRef.current?.();
		} else {
			hideRef.current?.();
		}
	}, [open]);

	// --- Single mount effect for event-driven DOM behavior and overlay lifecycle ---
	useEffect(() => {
		const root = rootRef.current;
		if (!root) return;

		let prevFocus: HTMLElement | null = null;
		let prevOverflow = "";

		const getElements = () => ({
			positioners: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
			),
			backdrops: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="backdrop"]'),
			),
			contents: Array.from(
				root.querySelectorAll<HTMLElement>('[data-part="content"]'),
			),
		});

		const activate = () => {
			const { contents } = getElements();
			const content = contents[0];
			if (!content) return;

			prevFocus = document.activeElement as HTMLElement | null;
			openOverlayRoots.push(root);
			applyInert();
			prevOverflow = document.body.style.overflow;
			document.body.style.overflow = "hidden";

			// Move focus into the overlay (initialFocusEl > first focusable > content)
			const focusables = getFocusable(content);
			const elToFocus =
				initialFocusElRef.current?.() ?? focusables[0] ?? content;
			if (elToFocus) {
				elToFocus.focus();
			}
		};

		const deactivate = () => {
			const idx = openOverlayRoots.indexOf(root);
			if (idx !== -1) {
				openOverlayRoots.splice(idx, 1);
			}
			applyInert();
			if (openOverlayRoots.length === 0) {
				document.body.style.overflow = prevOverflow || "";
			}
			// Return focus to the trigger (or finalFocusEl) on close
			const elToFocus = finalFocusElRef.current?.() ?? prevFocus;
			if (elToFocus && typeof elToFocus.focus === "function") {
				elToFocus.focus();
			}
		};

		const hide = () => {
			if (root.getAttribute("data-state") === "closed") return;

			const { positioners, backdrops, contents } = getElements();
			root.setAttribute("data-state", "closed");
			for (const p of positioners) {
				p.style.cssText =
					"display: none !important; visibility: hidden !important;";
				p.setAttribute("data-state", "closed");
			}
			for (const b of backdrops) {
				b.style.cssText =
					"display: none !important; visibility: hidden !important;";
				b.setAttribute("data-state", "closed");
			}
			for (const c of contents) {
				c.setAttribute("data-state", "closed");
				c.style.cssText =
					"display: none !important; visibility: hidden !important;";
			}

			deactivate();
		};

		const show = () => {
			if (root.getAttribute("data-state") === "open") return;

			const { positioners, backdrops, contents } = getElements();
			root.setAttribute("data-state", "open");
			for (const p of positioners) {
				p.style.cssText =
					"display: flex !important; visibility: visible !important;";
				p.setAttribute("data-state", "open");
			}
			for (const b of backdrops) {
				b.style.cssText =
					"display: block !important; visibility: visible !important;";
				b.setAttribute("data-state", "open");
			}
			for (const c of contents) {
				c.setAttribute("data-state", "open");
				c.style.cssText =
					"display: flex !important; visibility: visible !important;";
			}

			activate();
		};

		// Assign refs so the sync effect can trigger show/hide
		showRef.current = show;
		hideRef.current = hide;

		// If initially open, activate
		if (open) {
			show();
		}

		const handleClick = (e: Event) => {
			const target = (e.target as HTMLElement).closest(
				"[data-part]",
			) as HTMLElement;
			if (!target) return;
			const dataPart = target.getAttribute("data-part");

			if (dataPart === "backdrop" || dataPart === "positioner") {
				// Only close if we clicked EXACTLY on the backdrop/positioner, not its children (Content)
				if (closeOnInteractOutsideRef.current && e.target === target) {
					hide();
					onChangeRef.current(false);
				}
			} else if (dataPart === "trigger") {
				const currentOpen = root.getAttribute("data-state") === "open";
				const nextOpen = !currentOpen;
				if (nextOpen) {
					show();
				} else {
					hide();
				}
				onChangeRef.current(nextOpen);
			} else if (
				dataPart === "close-trigger" ||
				dataPart === "action-trigger"
			) {
				hide();
				onChangeRef.current(false);
			}
		};

		const onKeyDown = (e: KeyboardEvent) => {
			const isCurrentlyOpen = root.getAttribute("data-state") === "open";
			if (!isCurrentlyOpen) return;

			// Only the topmost (most recently opened) overlay handles keys
			if (openOverlayRoots[openOverlayRoots.length - 1] !== root) return;

			if (e.key === "Escape") {
				if (closeOnEscapeRef.current) {
					e.preventDefault();
					hide();
					onChangeRef.current(false);
				}
				return;
			}
			if (e.key === "Tab") {
				const { contents } = getElements();
				const content = contents[0];
				if (!content) return;

				const f = getFocusable(content);
				if (f.length === 0) {
					e.preventDefault();
					content.focus();
					return;
				}
				const f_el = f[0];
				const last = f[f.length - 1];
				if (e.shiftKey && document.activeElement === f_el) {
					e.preventDefault();
					last.focus();
				} else if (!e.shiftKey && document.activeElement === last) {
					e.preventDefault();
					f_el.focus();
				}
			}
		};

		root.addEventListener("click", handleClick);
		window.addEventListener("keydown", onKeyDown, true);

		return () => {
			root.removeEventListener("click", handleClick);
			window.removeEventListener("keydown", onKeyDown, true);
			hide(); // Clean up overlay state on unmount
		};
	}, [rootRef]);
}
