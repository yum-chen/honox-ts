import type { Child } from "hono/jsx";
import { useEffect, useRef, useState } from "hono/jsx";
import { popover } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";
import { IconButton } from "../components/ui/icon-button";
import { XIcon } from "../components/icons";

const slots = popover();

export type PopoverProps = {
	trigger: Child;
	children?: Child;
	title?: string;
	description?: string;
	align?: "start" | "end";
};

/**
 * Park UI `Popover`, ported to Hono/JSX. Replaces the `@ark-ui` headless Popover
 * machine with an island handling toggle/outside-click/Escape dismissal and
 * CSS-anchored positioning, styled with Park UI's `popover` slot recipe. Any
 * descendant carrying `data-popover-close` closes the popover.
 */
export default function Popover({
	trigger,
	children,
	title,
	description,
	align = "start",
}: PopoverProps) {
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
		<div ref={rootRef} class={css({ position: "relative", display: "inline-block" })}>
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
						mt: "2",
						...(align === "end" ? { right: "0" } : { left: "0" }),
					}),
				)}
				hidden={!open}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: closes on descendants flagged with data-popover-close; Escape is bound on document */}
				{/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape handling is bound on document */}
				<div
					class={cx(slots.content, css({ width: "max-content", maxW: "xs" }))}
					data-state={open ? "open" : "closed"}
					onClick={(event: Event) => {
						if ((event.target as HTMLElement).closest("[data-popover-close]")) {
							setOpen(false);
						}
					}}
				>
					{title ? <p class={slots.title}>{title}</p> : null}
					{description ? <p class={slots.description}>{description}</p> : null}
					{children}
					<IconButton
						variant="ghost"
						size="sm"
						aria-label="Close"
						data-popover-close
						class={cx(
							slots.closeTrigger,
							css({ position: "absolute", top: "2", right: "2" }),
						)}
					>
						<XIcon />
					</IconButton>
				</div>
			</div>
		</div>
	);
}
