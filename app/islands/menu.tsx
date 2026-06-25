import { type Child, useState } from "hono/jsx";
import { menu } from "@/../styled-system/recipes";

export const Menu = ({
	trigger,
	items,
}: {
	trigger: Child;
	items: { label: string; onClick?: () => void }[];
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const styles = menu();

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
					style={{ position: "absolute", top: "100%", left: 0, zIndex: 10 }}
				>
					<ul class={styles.content}>
						{items.map((item) => (
							<li
								key={item.label}
								class={styles.item}
								onClick={() => {
									item.onClick?.();
									setIsOpen(false);
								}}
								onKeyUp={(e) => {
									if (e.key === "Enter" || e.key === " ") {
										item.onClick?.();
										setIsOpen(false);
									}
								}}
							>
								<button
									type="button"
									style={{
										background: "none",
										border: "none",
										color: "inherit",
										padding: 0,
										font: "inherit",
										cursor: "pointer",
										outline: "inherit",
										width: "100%",
										textAlign: "left",
									}}
								>
									{item.label}
								</button>
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};
