import type { Child } from "hono/jsx";
import { useRef, useState } from "hono/jsx";
import { tooltip } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";

const slots = tooltip();

export type TooltipProps = {
	children: Child;
	content: Child;
	openDelay?: number;
};

/**
 * Park UI `Tooltip`, ported to Hono/JSX. Replaces the `@ark-ui` headless Tooltip
 * machine with an island that opens on hover/focus (after `openDelay`) and is
 * styled with Park UI's `tooltip` slot recipe.
 */
export default function Tooltip({
	children,
	content,
	openDelay = 300,
}: TooltipProps) {
	const [open, setOpen] = useState(false);
	const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

	const show = () => {
		if (timer.current) clearTimeout(timer.current);
		timer.current = setTimeout(() => setOpen(true), openDelay);
	};
	const hide = () => {
		if (timer.current) clearTimeout(timer.current);
		setOpen(false);
	};

	return (
		// biome-ignore lint/a11y/noStaticElementInteractions: hover/focus wrapper around the projected, focusable trigger element
		<span
			class={css({ position: "relative", display: "inline-flex" })}
			onMouseEnter={show}
			onMouseLeave={hide}
			onFocusin={show}
			onFocusout={hide}
		>
			<span class={slots.trigger}>{children}</span>
			<span
				class={cx(
					slots.positioner,
					css({
						position: "absolute",
						bottom: "100%",
						left: "50%",
						transform: "translateX(-50%)",
						mb: "2",
						pointerEvents: "none",
					}),
				)}
				hidden={!open}
			>
				<span
					role="tooltip"
					class={slots.content}
					data-state={open ? "open" : "closed"}
				>
					{content}
				</span>
			</span>
		</span>
	);
}
