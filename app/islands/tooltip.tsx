import { type Child, useState } from "hono/jsx";
import { tooltip } from "@/../styled-system/recipes";

export const Tooltip = ({
	trigger,
	content,
}: {
	trigger: Child;
	content: string;
}) => {
	const [isVisible, setIsVisible] = useState(false);
	const styles = tooltip();

	return (
		<div
			style={{ position: "relative", display: "inline-block" }}
			onMouseEnter={() => setIsVisible(true)}
			onMouseLeave={() => setIsVisible(false)}
			onFocus={() => setIsVisible(true)}
			onBlur={() => setIsVisible(false)}
			role="tooltip"
		>
			<div class={styles.trigger}>{trigger}</div>

			{isVisible && (
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
					<div class={styles.content}>{content}</div>
				</div>
			)}
		</div>
	);
};
