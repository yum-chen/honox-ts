import { useCallback, useEffect, useState } from "hono/jsx";
import { toast } from "@/../styled-system/recipes";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { LucideX } from "@/components/ui/icons";

interface ToastData {
	id: string;
	title: string;
	description?: string;
}

export const ToastDemo = () => {
	const [toasts, setToasts] = useState<ToastData[]>([]);
	const styles = toast();

	const addToast = () => {
		const id = Math.random().toString(36).substr(2, 9);
		setToasts((prev) => [
			...prev,
			{
				id,
				title: "Toast Notification",
				description: "This is a toast message.",
			},
		]);
		setTimeout(() => {
			setToasts((prev) => prev.filter((t) => t.id !== id));
		}, 5000);
	};

	const removeToast = (id: string) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<div>
			<Button onClick={addToast}>Show Toast</Button>
			<div
				class={styles.group}
				style={{
					position: "fixed",
					bottom: "1rem",
					right: "1rem",
					zIndex: 9999,
					display: "flex",
					flexDirection: "column",
					gap: "0.5rem",
				}}
			>
				{toasts.map((t) => (
					<div key={t.id} class={styles.root} role="status">
						<div>
							<div class={styles.title}>{t.title}</div>
							{t.description && (
								<div class={styles.description}>{t.description}</div>
							)}
						</div>
						<IconButton
							variant="ghost"
							size="xs"
							class={styles.closeTrigger}
							onClick={() => removeToast(t.id)}
							aria-label="Close"
						>
							<LucideX />
						</IconButton>
					</div>
				))}
			</div>
		</div>
	);
};
