import type { Child } from "hono/jsx";
import { useEffect, useRef, useState } from "hono/jsx";
import { menu } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";

const slots = menu();

export type MenuProps = {
	trigger: Child;
	children: Child;
	align?: "start" | "end";
};

/**
 * Park UI `Menu` (dropdown), ported to Hono/JSX. Replaces the `@ark-ui` headless
 * Menu machine with a self-contained island: click/Escape/outside-click handling
 * and CSS-anchored positioning, styled with Park UI's `menu` slot recipe.
 */
export default function Menu({ trigger, children, align = "start" }: MenuProps) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!open) return;
		const onDocPointer = (event: Event) => {
			const node = rootRef.current;
			if (node && !node.contains(event.target as Node)) setOpen(false);
		};
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("pointerdown", onDocPointer);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("pointerdown", onDocPointer);
			document.removeEventListener("keydown", onKey);
		};
	}, [open]);

	return (
		<div
			ref={rootRef}
			class={css({ position: "relative", display: "inline-block" })}
		>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: catches activation bubbling up from the projected, focusable trigger button */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard activation is handled by the inner trigger button */}
			<span class={slots.trigger} onClick={() => setOpen((value) => !value)}>
				{trigger}
			</span>
			<div
				class={cx(
					slots.positioner,
					css({
						position: "absolute",
						top: "100%",
						mt: "1",
						...(align === "end" ? { right: "0" } : { left: "0" }),
					}),
				)}
				hidden={!open}
			>
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: closing on item activation; items are keyboard-focusable buttons */}
				<div
					role="menu"
					class={cx(slots.content, css({ width: "max-content", minW: "48" }))}
					data-state={open ? "open" : "closed"}
					onClick={(event: Event) => {
						if ((event.target as HTMLElement).closest("[data-menu-item]")) {
							setOpen(false);
						}
					}}
				>
					{children}
				</div>
			</div>
		</div>
	);
}
