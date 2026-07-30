import { cx } from "design-system/css";
import { search } from "design-system/recipes";
import { useEffect, useId, useMemo, useRef, useState } from "hono/jsx";
import { CloseIcon } from "../icons/close";
import { SearchIcon as SearchIconImport } from "../icons/search";
import { SETTINGS_SEARCH_INDEX, type SettingsSearchItem } from "../lib/settings-search-index";

const SearchIcon = (props: any) => (
	<SearchIconImport width="20" height="20" {...props} />
);

// Split `text` into plain and highlighted segments for the given tokens
function highlightSegments(
	text: string,
	tokens: string[],
): Array<{ match: boolean; text: string }> {
	if (tokens.length === 0) {
		return [{ match: false, text }];
	}
	const lower = text.toLowerCase();
	const segments: Array<{ match: boolean; text: string }> = [];
	let pos = 0;
	while (pos < text.length) {
		let found = -1;
		let foundLength = 0;
		for (const token of tokens) {
			const index = lower.indexOf(token, pos);
			if (index !== -1 && (found === -1 || index < found)) {
				found = index;
				foundLength = token.length;
			}
		}
		if (found === -1) {
			segments.push({ match: false, text: text.slice(pos) });
			break;
		}
		if (found > pos) {
			segments.push({ match: false, text: text.slice(pos, found) });
		}
		segments.push({
			match: true,
			text: text.slice(found, found + foundLength),
		});
		pos = found + foundLength;
	}
	return segments;
}

function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
	return (
		<>
			{highlightSegments(text, tokens).map((segment, index) =>
				segment.match ? (
					<mark
						key={index}
						style={{
							backgroundColor: "var(--colors-amber-5)",
							color: "inherit",
							borderRadius: "2px",
						}}
					>
						{segment.text}
					</mark>
				) : (
					segment.text
				),
			)}
		</>
	);
}

export interface SettingsSearchProps {
	currentSection: string;
	variant?: "outline" | "surface" | "subtle";
	size?: "sm" | "md" | "lg";
	placeholder?: string;
}

export default function SettingsSearch({
	currentSection,
	variant = "outline",
	size = "md",
	placeholder = "Search setting options..."
}: SettingsSearchProps) {
	const styles = search({ variant, size });
	const [query, setQuery] = useState("");
	const [open, setOpen] = useState(false);
	const [highlighted, setHighlighted] = useState(-1);
	const rootRef = useRef<HTMLDivElement>(null);

	const fallbackId = useId();
	const listboxId = `settings-search-listbox-${fallbackId}`;

	// Tokenize current query for highlight matching
	const tokens = useMemo(() => {
		return query
			.toLowerCase()
			.split(/\s+/)
			.filter((t) => t.length > 0);
	}, [query]);

	// Filter settings in real-time
	const suggestions = useMemo(() => {
		if (!query.trim()) return [];
		const q = query.toLowerCase();
		return SETTINGS_SEARCH_INDEX.filter(
			(item) =>
				item.label.toLowerCase().includes(q) ||
				item.description.toLowerCase().includes(q) ||
				item.sectionName.toLowerCase().includes(q)
		);
	}, [query]);

	// Handle selection/navigation of a setting item
	const handleSelect = (item: SettingsSearchItem) => {
		setQuery("");
		setOpen(false);
		setHighlighted(-1);

		const sameSection = item.section === currentSection;
		const targetUrl = item.section === "home" ? `/settings` : `/settings/${item.section}`;

		if (sameSection) {
			// Instant local highlight
			const element = document.getElementById(item.id);
			if (element) {
				element.scrollIntoView({ behavior: "smooth", block: "center" });
				element.classList.remove("settings-highlighted");
				// Trigger reflow to restart animation if already highlighted
				void element.offsetWidth;
				element.classList.add("settings-highlighted");

				const input = element.querySelector("input, textarea, select") as HTMLElement;
				if (input) {
					input.focus();
				} else {
					element.focus();
				}
			}
		} else {
			// Navigate to different page and pass query param
			window.location.assign(`${targetUrl}?highlight=${item.id}`);
		}
	};

	const handleKeyDown = (event: KeyboardEvent) => {
		if (event.key === "ArrowDown" && suggestions.length > 0) {
			event.preventDefault();
			setOpen(true);
			setHighlighted((prev) => (prev + 1) % suggestions.length);
		} else if (event.key === "ArrowUp" && suggestions.length > 0) {
			event.preventDefault();
			setHighlighted(
				(prev) => (prev - 1 + suggestions.length) % suggestions.length,
			);
		} else if (event.key === "Enter") {
			event.preventDefault();
			const target = suggestions[highlighted];
			if (open && target) {
				handleSelect(target);
			}
		} else if (event.key === "Escape") {
			if (open) {
				setOpen(false);
			} else {
				setQuery("");
			}
		}
	};

	// Close on outside click/pointerdown
	useEffect(() => {
		const handleDocumentClick = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};
		document.addEventListener("pointerdown", handleDocumentClick);
		return () => {
			document.removeEventListener("pointerdown", handleDocumentClick);
		};
	}, []);

	const showDropdown = open && query !== "";

	return (
		<div ref={rootRef} class={styles.root} style={{ marginBottom: "1.5rem", position: "relative" }}>
			<div class={styles.inputWrap}>
				<div class={styles.icon}>
					<SearchIcon />
				</div>
				<input
					type="search"
					role="combobox"
					aria-expanded={showDropdown}
					aria-controls={listboxId}
					aria-autocomplete="list"
					placeholder={placeholder}
					value={query}
					class={styles.input}
					onInput={(event: Event) => {
						setQuery((event.target as HTMLInputElement).value);
						setHighlighted(-1);
						setOpen(true);
					}}
					onFocus={() => {
						if (query) setOpen(true);
					}}
					onKeyDown={handleKeyDown}
				/>
				{query && (
					<button
						type="button"
						aria-label="clear"
						class={styles.clearTrigger}
						onClick={() => {
							setQuery("");
							setHighlighted(-1);
						}}
					>
						<CloseIcon width="16" height="16" />
					</button>
				)}
				{showDropdown && (
					<div id={listboxId} role="listbox" class={styles.listbox}>
						{suggestions.length === 0 && (
							<div class={styles.status}>
								No matches for "{query}"
							</div>
						)}
						{suggestions.map((item, index) => (
							<div
								key={item.id}
								role="option"
								tabIndex={-1}
								aria-selected={index === highlighted}
								data-highlighted={index === highlighted ? "" : undefined}
								class={styles.item}
								onMouseDown={(event: Event) => {
									event.preventDefault();
									handleSelect(item);
								}}
								onMouseOver={() => setHighlighted(index)}
							>
								<div class={styles.itemTitle}>
									<Highlighted text={item.label} tokens={tokens} />
								</div>
								{item.description && (
									<div class={styles.itemDescription}>
										<Highlighted text={item.description} tokens={tokens} />
									</div>
								)}
								<div class={styles.itemTags}>
									{item.sectionName}
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
