import { type Child, useState } from "hono/jsx";
import { accordion } from "@/../styled-system/recipes";
import { LucideChevronDown } from "@/components/ui/icons";

export const Accordion = ({
	items,
}: {
	items: { value: string; trigger: string; content: Child }[];
}) => {
	const [expandedValue, setExpandedValue] = useState<string | null>(null);
	const styles = accordion();

	return (
		<div class={styles.root}>
			{items.map((item) => {
				const isExpanded = expandedValue === item.value;
				return (
					<div
						key={item.value}
						class={styles.item}
						data-state={isExpanded ? "open" : "closed"}
					>
						<button
							type="button"
							class={styles.itemTrigger}
							onClick={() => setExpandedValue(isExpanded ? null : item.value)}
						>
							<span>{item.trigger}</span>
							<LucideChevronDown
								class={styles.itemIndicator}
								style={{
									transform: isExpanded ? "rotate(180deg)" : "none",
									transition: "transform 0.2s",
								}}
							/>
						</button>
						{isExpanded && <div class={styles.itemContent}>{item.content}</div>}
					</div>
				);
			})}
		</div>
	);
};
