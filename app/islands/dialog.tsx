import { type Child, useState } from "hono/jsx";
import { dialog } from "@/../styled-system/recipes";
import { IconButton } from "@/components/ui/icon-button";
import { LucideX } from "@/components/ui/icons";
import { cx } from "@/lib/utils";

export const Dialog = ({
	trigger,
	title,
	description,
	children,
}: {
	trigger: string;
	title: string;
	description?: string;
	children: Child;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const styles = dialog();

	return (
		<>
			<button
				type="button"
				class={styles.trigger}
				onClick={() => setIsOpen(true)}
			>
				{trigger}
			</button>

			{isOpen && (
				<>
					{/* biome-ignore lint/a11y/noStaticElementInteractions: Backdrop click is standard */}
					<div
						class={styles.backdrop}
						onClick={() => setIsOpen(false)}
						onKeyUp={(e) => e.key === "Escape" && setIsOpen(false)}
						role="presentation"
					/>
					<div class={styles.positioner}>
						<div class={cx(styles.content)} role="dialog" aria-modal="true">
							<div class={styles.title}>{title}</div>
							{description && (
								<div class={styles.description}>{description}</div>
							)}
							<div style={{ marginTop: "1rem" }}>{children}</div>
							<IconButton
								variant="ghost"
								size="sm"
								class={styles.closeTrigger}
								onClick={() => setIsOpen(false)}
								aria-label="Close"
							>
								<LucideX />
							</IconButton>
						</div>
					</div>
				</>
			)}
		</>
	);
};
