/**
 * Shared placement geometry for trigger-anchored floating surfaces
 * (Popover, Tooltip, and any future anchored overlay).
 *
 * Every consumer renders `data-part="trigger"`, `data-part="positioner"`,
 * `data-part="content"`, `data-part="arrow"` / `data-part="arrow-tip"`, and
 * sets `data-placement` (the requested side) on its positioner(s) for
 * `positionOverlay` to read and `data-effective-placement` to be written back to.
 *
 * There is no ResizeObserver / scroll-container tracking here (unlike
 * Floating UI) — repositioning is meant to be re-run on demand (on open and
 * on window `resize`) by the caller.
 */

const CENTER_ARROW_OFFSET = "50%";

export type OverlayPlacement = "top" | "bottom" | "left" | "right";

export interface OverlayPlacementConfig {
	/**
	 * Cross-axis alignment of the positioner relative to the trigger.
	 * "start" aligns the positioner's leading edge with the trigger's
	 * (Popover's convention, for wide content). "center" centers the
	 * positioner over the trigger (Tooltip's convention, for narrow content).
	 */
	align: "start" | "center";
	/** Arrow inset from the aligned edge. Only used when `align` is "start". */
	arrowOffset?: string;
	/** Minimum gap from the viewport edge, in pixels. Default: 8. */
	viewportGap?: number;
}

/** Base (non-flipped) positioner offset + cross-axis alignment for a placement. */
export function getPlacementStyle(
	placement: OverlayPlacement,
	config: OverlayPlacementConfig,
) {
	const gap = "var(--arrow-size)";
	const center = config.align === "center";
	const crossTransform = (axis: "X" | "Y") =>
		center ? `translate${axis}(-50%)` : "none";

	switch (placement) {
		case "top":
			return {
				top: "auto",
				bottom: "100%",
				left: center ? "50%" : "0",
				right: "auto",
				transform: crossTransform("X"),
				marginBottom: gap,
				marginTop: "0",
			};
		case "left":
			return {
				top: center ? "50%" : "0",
				bottom: "auto",
				left: "auto",
				right: "100%",
				transform: crossTransform("Y"),
				marginRight: gap,
				marginLeft: "0",
			};
		case "right":
			return {
				top: center ? "50%" : "0",
				bottom: "auto",
				left: "100%",
				right: "auto",
				transform: crossTransform("Y"),
				marginLeft: gap,
				marginRight: "0",
			};
		default:
			return {
				top: "100%",
				bottom: "auto",
				left: center ? "50%" : "0",
				right: "auto",
				transform: crossTransform("X"),
				marginTop: gap,
				marginBottom: "0",
			};
	}
}

/** Arrow inset from the positioner's aligned edge, per placement. */
export function getArrowStyle(
	placement: OverlayPlacement,
	config: OverlayPlacementConfig,
) {
	const size = "var(--arrow-size)";
	const neg = `calc(${size} * -0.5)`;
	const center = config.align === "center";
	const inset = center ? CENTER_ARROW_OFFSET : (config.arrowOffset ?? "16px");
	const crossTransform = (axis: "X" | "Y") =>
		center ? `translate${axis}(-50%)` : "none";

	switch (placement) {
		case "top":
			return {
				top: "auto",
				bottom: neg,
				left: inset,
				right: "auto",
				transform: crossTransform("X"),
			};
		case "left":
			return {
				top: inset,
				bottom: "auto",
				left: "auto",
				right: neg,
				transform: crossTransform("Y"),
			};
		case "right":
			return {
				top: inset,
				bottom: "auto",
				left: neg,
				right: "auto",
				transform: crossTransform("Y"),
			};
		default:
			return {
				top: neg,
				bottom: "auto",
				left: inset,
				right: "auto",
				transform: crossTransform("X"),
			};
	}
}

/** Diamond rotation that points the arrow tip back at the trigger. */
export function getArrowRotation(placement: OverlayPlacement): number {
	switch (placement) {
		case "top":
			return 225;
		case "left":
			return 135;
		case "right":
			return 315;
		default:
			return 45;
	}
}

export function getTransformOrigin(
	placement: OverlayPlacement,
	align: OverlayPlacementConfig["align"],
): string {
	const center = align === "center";
	switch (placement) {
		case "top":
			return center ? "bottom center" : "bottom left";
		case "left":
			return center ? "center right" : "top right";
		case "right":
			return center ? "center left" : "top left";
		default:
			return center ? "top center" : "top left";
	}
}

/**
 * Resolves the effective placement and applies it to every positioner + arrow
 * within `root`, flipping to the opposite side when the requested placement
 * would overflow the viewport and the opposite side has more room. Also
 * re-clamps the cross axis so the content never renders off-screen, and is
 * meant to be re-run on open and on resize while open.
 */
export function positionOverlay(
	root: HTMLElement,
	config: OverlayPlacementConfig,
) {
	if (typeof window === "undefined") return;
	const gap = config.viewportGap ?? 8;
	const trigger = root.querySelector<HTMLElement>('[data-part="trigger"]');
	const triggerRect = trigger?.getBoundingClientRect();

	for (const positioner of root.querySelectorAll<HTMLElement>(
		'[data-part="positioner"]',
	)) {
		const preferred =
			(positioner.getAttribute("data-placement") as OverlayPlacement) ||
			"bottom";
		let placement = preferred;
		Object.assign(positioner.style, getPlacementStyle(placement, config));

		const content = positioner.querySelector<HTMLElement>(
			'[data-part="content"]',
		);
		const contentRect = (content ?? positioner).getBoundingClientRect();

		if (triggerRect) {
			const spaceBelow = window.innerHeight - triggerRect.bottom;
			const spaceAbove = triggerRect.top;
			const spaceRight = window.innerWidth - triggerRect.right;
			const spaceLeft = triggerRect.left;

			if (
				placement === "bottom" &&
				contentRect.height > spaceBelow - gap &&
				spaceAbove > spaceBelow
			) {
				placement = "top";
			} else if (
				placement === "top" &&
				contentRect.height > spaceAbove - gap &&
				spaceBelow > spaceAbove
			) {
				placement = "bottom";
			} else if (
				placement === "right" &&
				contentRect.width > spaceRight - gap &&
				spaceLeft > spaceRight
			) {
				placement = "left";
			} else if (
				placement === "left" &&
				contentRect.width > spaceLeft - gap &&
				spaceRight > spaceLeft
			) {
				placement = "right";
			}

			if (placement !== preferred) {
				Object.assign(positioner.style, getPlacementStyle(placement, config));
			}
		}

		// Clamp the cross axis so the content stays within the viewport, by
		// nudging the existing alignment transform rather than the base offset.
		const rect = positioner.getBoundingClientRect();
		const base = config.align === "center" ? "-50%" : "0px";
		if (placement === "top" || placement === "bottom") {
			let shift = 0;
			const overflowRight = rect.right - (window.innerWidth - gap);
			if (overflowRight > 0) shift -= overflowRight;
			if (rect.left + shift < gap) shift += gap - (rect.left + shift);
			if (shift !== 0) {
				positioner.style.transform = `translateX(calc(${base} + ${shift}px))`;
			}
		} else {
			let shift = 0;
			const overflowBottom = rect.bottom - (window.innerHeight - gap);
			if (overflowBottom > 0) shift -= overflowBottom;
			if (rect.top + shift < gap) shift += gap - (rect.top + shift);
			if (shift !== 0) {
				positioner.style.transform = `translateY(calc(${base} + ${shift}px))`;
			}
		}

		positioner.setAttribute("data-effective-placement", placement);
		positioner.style.setProperty(
			"--transform-origin",
			getTransformOrigin(placement, config.align),
		);

		const arrow = positioner.querySelector<HTMLElement>('[data-part="arrow"]');
		if (arrow) {
			Object.assign(arrow.style, getArrowStyle(placement, config));
			const tip = arrow.querySelector<HTMLElement>('[data-part="arrow-tip"]');
			if (tip) {
				tip.style.transform = `rotate(${getArrowRotation(placement)}deg)`;
			}
		}
	}
}
