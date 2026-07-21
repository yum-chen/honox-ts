/**
 * Shared accessibility + behavior layer for overlay components
 * (Dialog, Drawer, Popover, Tooltip, and any future modal-like or
 * anchored-floating surface).
 *
 * Keeps a SINGLE source of truth for:
 *  - the stack of currently-open overlay roots (so nested overlays — including a
 *    Dialog opened from within a Drawer — cooperate on `inert` and focus trapping)
 *  - the focus-trap / Escape / scroll-lock / focus-return effect
 *  - click delegation (trigger / backdrop / close-trigger / action-trigger)
 *  - accessible-name tree scan (used by `Content` to wire `aria-labelledby` /
 *    `aria-describedby` only when the corresponding Title / Description is present)
 *  - deferring `display: none` until an element's CSS exit animation actually
 *    finishes, so `_closed` animation styles (defined in the recipes) get a
 *    chance to play instead of being cut off by an instant unmount/hide
 *
 * Primitives must render `data-part="content"`, `data-part="trigger"`,
 * `data-part="backdrop"`, `data-part="positioner"`, `data-part="close-trigger"`,
 * `data-part="action-trigger"`, `data-part="title"`, `data-part="description"`
 * for the behavior layer and detection to work.
 */

// Selector for focusable elements inside an overlay's content.
const FOCUSABLE_SELECTOR =
	"a[href],area[href],button:not([disabled]),input:not([disabled])," +
	"select:not([disabled]),textarea:not([disabled]),iframe:not([disabled])," +
	'object:not([disabled]),embed,[tabindex]:not([tabindex="-1"]),' +
	'[contenteditable]:not([contenteditable="false"])';

/**
 * Stack of currently-open overlay root elements (topmost = last).
 * Drives focus trapping (only the topmost handles keys) and the `inert` math
 * so a nested overlay correctly disables the page AND its parent.
 */
export const openOverlayRoots: HTMLElement[] = [];

/** Query focusable descendants of `container`, excluding hidden/disabled ones. */
export function getFocusable(container: HTMLElement): HTMLElement[] {
	return Array.from(
		container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
	).filter(
		(el) =>
			!el.hasAttribute("disabled") &&
			(el.offsetParent !== null || el === document.activeElement),
	);
}

/**
 * Inert every sibling along the ancestor chain of each open overlay,
 * except the path to an overlay and except ancestors of any open overlay.
 * Recomputes the whole document so closing one overlay restores the rest.
 */
export function applyInert() {
	document.querySelectorAll<HTMLElement>("[inert]").forEach((el) => {
		el.inert = false;
	});
	for (const root of openOverlayRoots) {
		const path = new Set<HTMLElement>();
		let p: HTMLElement | null = root;
		while (p && p !== document.body) {
			path.add(p);
			p = p.parentElement;
		}
		let node: HTMLElement | null = root.parentElement;
		while (node && node !== document.body) {
			for (const sib of Array.from(node.children)) {
				if (path.has(sib as HTMLElement)) continue;
				const protects = openOverlayRoots.some(
					(r) => sib === r || sib.contains(r),
				);
				if (!protects) (sib as HTMLElement).inert = true;
			}
			node = node.parentElement;
		}
	}
}

/**
 * Recursively check whether a `<Title>` / `<Description>` component instance
 * (by function reference) exists in the rendered children tree. Used by `Content`
 * to decide whether to wire `aria-labelledby` / `aria-describedby` — and avoid
 * pointing those attributes at non-existent elements when the part is omitted.
 *
 * Detection is by component TYPE reference (not by a `data-part` prop), because
 * the `data-part` marker is applied inside the component's render and is NOT
 * present on the component element's props at the point `Content` inspects them.
 */
export function hasPart(node: unknown, cmp: unknown): boolean {
	if (node == null || typeof node !== "object") return false;
	if (Array.isArray(node)) return node.some((c) => hasPart(c, cmp));
	const el = node as { type?: unknown; props?: { children?: unknown } };
	if (el.type === cmp) return true;
	if (el.props?.children != null) return hasPart(el.props.children, cmp);
	return false;
}

/**
 * Waits for `el`'s running CSS animation to finish before calling `onDone`,
 * so an exit (`_closed`) animation gets a chance to play instead of being
 * cut off by an instant `display: none`. Falls back to the element's
 * computed `animation-duration` (plus a small buffer) in case `animationend`
 * never fires — e.g. no matching animation, or a duration of 0.
 *
 * Returns a canceler: call it if the hide is superseded (e.g. the overlay is
 * reopened before the exit animation finished) to suppress the pending `onDone`.
 */
export function whenAnimationEnds(
	el: HTMLElement,
	onDone: () => void,
): () => void {
	let settled = false;

	const cleanup = () => {
		el.removeEventListener("animationend", onAnimationEnd);
		clearTimeout(timer);
	};
	const finish = () => {
		if (settled) return;
		settled = true;
		cleanup();
		onDone();
	};
	const onAnimationEnd = (e: AnimationEvent) => {
		if (e.target === el) finish();
	};
	el.addEventListener("animationend", onAnimationEnd);

	const durationMs = getComputedStyle(el)
		.animationDuration.split(",")
		.reduce((max, part) => {
			const match = /^([\d.]+)(ms|s)$/.exec(part.trim());
			if (!match) return max;
			const value = Number.parseFloat(match[1]) * (match[2] === "s" ? 1000 : 1);
			return Math.max(max, value);
		}, 0);
	const timer = window.setTimeout(finish, durationMs + 30);

	return () => {
		settled = true;
		cleanup();
	};
}

export interface OverlayOptions {
	/** Ref holding the overlay root element (the wrapping `<div id=...>`). */
	rootRef: { current: HTMLElement | null };
	/** Whether the overlay is currently open. */
	open: boolean;
	/** Close when Escape is pressed. Default: true. */
	closeOnEscape: boolean;
	/** Close when the backdrop is clicked / interaction occurs outside. Default: true. */
	closeOnInteractOutside: boolean;
	/** Notifies the owner of an open/close request originating from behavior (Escape / outside click). */
	onChange: (open: boolean) => void;
	/** Element to focus when the overlay opens. Defaults to the first focusable. */
	initialFocusEl?: () => HTMLElement | null;
	/** Element to focus when the overlay closes. Defaults to the trigger. */
	finalFocusEl?: () => HTMLElement | null;
}
