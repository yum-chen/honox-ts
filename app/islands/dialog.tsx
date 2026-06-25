import type { Child } from "hono/jsx";
import { useEffect, useState } from "hono/jsx";
import { dialog } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";
import { IconButton } from "../components/ui/icon-button";
import { XIcon } from "../components/icons";

const slots = dialog();

export type DialogProps = {
	trigger: Child;
	title?: string;
	description?: string;
	children?: Child;
};

/**
 * Park UI `Dialog` (modal), ported to Hono/JSX. Replaces the `@ark-ui` headless
 * Dialog machine with an island handling open state, Escape/backdrop dismissal
 * and body scroll-locking. Any descendant carrying `data-dialog-close` closes
 * the dialog, so footer actions work without a serialized closure.
 */
export default function Dialog({
	trigger,
	title,
	description,
	children,
}: DialogProps) {
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) return;
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") setOpen(false);
		};
		document.addEventListener("keydown", onKey);
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = previousOverflow;
		};
	}, [open]);

	return (
		<>
			{/* biome-ignore lint/a11y/noStaticElementInteractions: catches activation bubbling up from the projected, focusable trigger button */}
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard activation is handled by the inner trigger button */}
			<span class={slots.trigger} onClick={() => setOpen(true)}>
				{trigger}
			</span>
			{open ? (
				<>
					<div class={slots.backdrop} data-state="open" />
					{/* biome-ignore lint/a11y/noStaticElementInteractions: backdrop/positioner dismissal; Escape is bound on document and the dialog is focusable */}
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape handling is bound on document; this closes on backdrop/explicit triggers */}
					<div
						class={slots.positioner}
						data-state="open"
						onClick={(event: Event) => {
							const target = event.target as HTMLElement;
							if (
								event.target === event.currentTarget ||
								target.closest("[data-dialog-close]")
							) {
								setOpen(false);
							}
						}}
					>
						<div
							role="dialog"
							aria-modal="true"
							aria-label={title}
							data-state="open"
							class={cx(
								slots.content,
								css({
									p: "6",
									display: "flex",
									flexDirection: "column",
									gap: "6",
									maxW: "md",
									width: "full",
									mx: "4",
								}),
							)}
						>
							{title || description ? (
								<div
									class={css({ display: "flex", flexDirection: "column", gap: "1" })}
								>
									{title ? <h2 class={slots.title}>{title}</h2> : null}
									{description ? (
										<p class={slots.description}>{description}</p>
									) : null}
								</div>
							) : null}
							{children}
							<IconButton
								variant="ghost"
								size="sm"
								aria-label="Close dialog"
								data-dialog-close
								class={cx(
									slots.closeTrigger,
									css({ position: "absolute", top: "3", right: "3" }),
								)}
							>
								<XIcon />
							</IconButton>
						</div>
					</div>
				</>
			) : null}
		</>
	);
}
