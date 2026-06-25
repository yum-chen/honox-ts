import { type Child, useState } from "hono/jsx";
import { popover } from "@/../styled-system/recipes";
import { IconButton } from "@/components/ui/icon-button";
import { LucideX } from "@/components/ui/icons";

export const Popover = ({
	trigger,
	title,
	children,
}: {
	trigger: Child;
	title?: string;
	children: Child;
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const styles = popover();

	return (
		<div style={{ position: "relative", display: "inline-block" }}>
			<button
				type="button"
				class={styles.trigger}
				onClick={() => setIsOpen(!isOpen)}
			>
				{trigger}
			</button>

			{isOpen && (
				<div
					class={styles.positioner}
					style={{
						position: "absolute",
						bottom: "100%",
						left: "50%",
						transform: "translateX(-50%)",
						marginBottom: "8px",
						zIndex: 100,
					}}
				>
					<div class={styles.content} role="dialog">
						{title && <div class={styles.title}>{title}</div>}
						<div class={styles.description}>{children}</div>
						<IconButton
							variant="ghost"
							size="xs"
							class={styles.closeTrigger}
							onClick={() => setIsOpen(false)}
							aria-label="Close"
						>
							<LucideX />
						</IconButton>
					</div>
				</div>
			)}
		</div>
	);
};
