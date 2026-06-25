import type { Child } from "hono/jsx";
import { useState } from "hono/jsx";
import { accordion } from "../../styled-system/recipes";
import { css, cx } from "../../styled-system/css";
import { ChevronDownIcon } from "../components/icons";

const slots = accordion();

const toArray = (value?: string | string[]) =>
	value === undefined ? [] : Array.isArray(value) ? value : [value];

export type AccordionItem = {
	value: string;
	title: Child;
	content: Child;
	disabled?: boolean;
};

export type AccordionProps = {
	items: AccordionItem[];
	/** Allow multiple panels open at once. */
	multiple?: boolean;
	/** Allow the open panel to be collapsed (single mode only). Defaults to true. */
	collapsible?: boolean;
	/** Initially open value(s). */
	defaultValue?: string | string[];
};

/**
 * Park UI `Accordion`, ported to Hono/JSX. Replaces the `@ark-ui` headless
 * Accordion machine with an island that manages expand/collapse state, styled
 * with Park UI's `accordion` slot recipe.
 */
export default function Accordion({
	items,
	multiple = false,
	collapsible = true,
	defaultValue,
}: AccordionProps) {
	const [open, setOpen] = useState<string[]>(toArray(defaultValue));

	const toggle = (value: string) => {
		setOpen((current) => {
			const isOpen = current.includes(value);
			if (multiple) {
				return isOpen
					? current.filter((item) => item !== value)
					: [...current, value];
			}
			if (isOpen) return collapsible ? [] : current;
			return [value];
		});
	};

	return (
		<div class={slots.root}>
			{items.map((item) => {
				const expanded = open.includes(item.value);
				return (
					<div key={item.value} class={slots.item} data-state={expanded ? "open" : "closed"}>
						<h3 class={css({ display: "flex" })}>
							<button
								type="button"
								class={slots.itemTrigger}
								data-state={expanded ? "open" : "closed"}
								aria-expanded={expanded}
								disabled={item.disabled}
								onClick={() => toggle(item.value)}
							>
								{item.title}
								<span
									class={cx(
										slots.itemIndicator,
										css({
											transition: "transform 0.2s",
											transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
										}),
									)}
								>
									<ChevronDownIcon />
								</span>
							</button>
						</h3>
						<div
							class={slots.itemContent}
							data-state={expanded ? "open" : "closed"}
							hidden={!expanded}
						>
							{item.content}
						</div>
					</div>
				);
			})}
		</div>
	);
}
