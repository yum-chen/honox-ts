import { css, cx } from "design-system/css";
import { type SearchVariantProps, search } from "design-system/recipes";
import { useEffect, useId, useMemo, useRef, useState } from "hono/jsx";
import {
	filterEntries,
	rankSearchEntries,
	type SearchIndexDocument,
	type SearchIndexEntry,
	tokenize,
} from "../../utils/search";

type SearchSlot =
	| "root"
	| "inputWrap"
	| "input"
	| "icon"
	| "clearTrigger"
	| "listbox"
	| "item"
	| "itemTitle"
	| "itemDescription"
	| "itemTags"
	| "countText"
	| "status";

type SearchClassNames = Partial<Record<SearchSlot, string>>;
type SearchSlotStyles = Partial<
	Record<SearchSlot, Record<string, string | number>>
>;

// Match text highlight — themed through `colorPalette` (inherits the accent
// set on the root), so it follows the component's palette instead of a
// hardcoded color.
const highlightClass = css({
	bg: "colorPalette.solid.bg",
	color: "colorPalette.solid.fg",
	borderRadius: "xs",
	px: "0.5",
});

function SearchIcon() {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<title>Search</title>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function ClearIcon() {
	return (
		<svg
			width="16"
			height="16"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<title>Clear</title>
			<path d="M18 6 6 18M6 6l12 12" />
		</svg>
	);
}

function escapeRegExp(value: string): string {
	return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Split `text` into plain and highlighted segments for the given tokens,
// using a single combined case-insensitive regex so every occurrence is
// highlighted (and substring-of-another-token edge cases resolve correctly).
function highlightSegments(
	text: string,
	tokens: string[],
): Array<{ match: boolean; text: string }> {
	const pattern = tokens.map(escapeRegExp).filter(Boolean).join("|");
	if (!pattern) {
		return [{ match: false, text }];
	}
	const regex = new RegExp(`(${pattern})`, "gi");
	const segments: Array<{ match: boolean; text: string }> = [];
	let last = 0;
	let match = regex.exec(text);
	while (match !== null) {
		const index = match.index;
		const token = match[0];
		if (index > last) {
			segments.push({ match: false, text: text.slice(last, index) });
		}
		segments.push({ match: true, text: token });
		last = index + token.length;
		// Guard against zero-length matches causing an infinite loop
		if (index === regex.lastIndex) {
			regex.lastIndex++;
		}
		match = regex.exec(text);
	}
	if (last < text.length) {
		segments.push({ match: false, text: text.slice(last) });
	}
	return segments;
}

function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
	return (
		<>
			{highlightSegments(text, tokens).map((segment, key) =>
				segment.match ? (
					<mark key={key} class={highlightClass}>
						{segment.text}
					</mark>
				) : (
					<span key={key}>{segment.text}</span>
				),
			)}
		</>
	);
}

export interface SearchBaseProps extends SearchVariantProps {
	/** URL of the SSG-generated JSON search index */
	src?: string;
	placeholder?: string;
	initialQuery?: string;
	/** Accessible label for the input (defaults to `Search ${itemLabel}`) */
	label?: string;
	/** Delay before a keystroke is applied as the active query (ms) */
	debounceMs?: number;
	/** Maximum entries shown in the autocomplete dropdown */
	maxSuggestions?: number;
	/**
	 * When set, elements carrying this attribute (e.g. "data-post-slug") are
	 * shown/hidden depending on whether their value matches an entry key.
	 */
	filterAttribute?: string;
	/** id of an element to reveal when the filtered list has zero matches */
	emptyStateId?: string;
	/** Result count shown before the index has loaded */
	total?: number;
	/** Noun used in the result count, e.g. "articles" */
	itemLabel?: string;
	/** Show the "Showing X of N" result count row (default true) */
	showCount?: boolean;
	/** No-JS fallback: submit ?q= to this path via a plain GET form */
	action?: string;
	/** Mirror the active query into the address bar as ?q= (default true) */
	syncUrl?: boolean;
	/** Per-slot class overrides (design-system styling hooks) */
	classNames?: SearchClassNames;
	/** Per-slot inline style overrides */
	styles?: SearchSlotStyles;
}

/** Static (non-hydrated) variant: a plain GET form the server can answer. */
export function SearchBase(props: SearchBaseProps) {
	const {
		placeholder = "Search...",
		initialQuery = "",
		action,
		label,
		classNames,
		styles,
		...variantProps
	} = props;
	const classes = search(variantProps);
	const labelText = label ?? "Search";
	const input = (
		<div
			class={cx(classes.inputWrap, classNames?.inputWrap)}
			style={styles?.inputWrap}
			data-part="input-wrap"
		>
			<div
				class={cx(classes.icon, classNames?.icon)}
				style={styles?.icon}
				data-part="icon"
			>
				<SearchIcon />
			</div>
			<input
				type="search"
				name="q"
				placeholder={placeholder}
				value={initialQuery}
				aria-label={labelText}
				class={cx(classes.input, classNames?.input)}
				style={styles?.input}
				data-part="input"
			/>
		</div>
	);
	return action ? (
		<form
			action={action}
			method="get"
			class={cx(classes.root, classNames?.root)}
			style={styles?.root}
			data-part="root"
		>
			{input}
		</form>
	) : (
		<div
			class={cx(classes.root, classNames?.root)}
			style={styles?.root}
			data-part="root"
		>
			{input}
		</div>
	);
}

/**
 * Hydrated search experience over an SSG-pregenerated JSON index:
 * the index is fetched lazily on first interaction, keystrokes are
 * debounced, and matches surface as an autocomplete dropdown. Optionally
 * also filters server-rendered elements in place via `filterAttribute`.
 */
export function InteractiveSearch(props: SearchBaseProps) {
	const {
		src = "/search-index.json",
		placeholder = "Search...",
		initialQuery = "",
		debounceMs = 150,
		maxSuggestions = 8,
		filterAttribute,
		emptyStateId,
		total,
		itemLabel = "results",
		showCount = true,
		action,
		syncUrl = true,
		label,
		classNames,
		styles,
		...variantProps
	} = props;

	const classes = search(variantProps);
	const labelText = label ?? `Search ${itemLabel}`;
	const listboxId = `search-listbox-${useId()}`;

	const [rawQuery, setRawQuery] = useState(initialQuery);
	const [query, setQuery] = useState(initialQuery);
	const [entries, setEntries] = useState<SearchIndexEntry[] | null>(null);
	const [loadFailed, setLoadFailed] = useState(false);
	const [open, setOpen] = useState(false);
	const [highlighted, setHighlighted] = useState(-1);
	const fetchStarted = useRef(false);
	const filteredNodes = useRef<HTMLElement[] | null>(null);

	const ensureLoaded = () => {
		if (fetchStarted.current) return;
		fetchStarted.current = true;
		fetch(src)
			.then((response) => {
				if (!response.ok) throw new Error(`HTTP ${response.status}`);
				return response.json() as Promise<SearchIndexDocument>;
			})
			.then((document_) => setEntries(document_.entries))
			.catch((error) => {
				console.error(`Search: failed to load index from ${src}:`, error);
				setLoadFailed(true);
			});
	};

	// On static (SSG) deployments the page is prerendered without query
	// params, so pick up ?q= from the URL once hydrated.
	useEffect(() => {
		const urlQuery = new URLSearchParams(window.location.search).get("q");
		if (urlQuery !== null && urlQuery !== initialQuery) {
			setRawQuery(urlQuery);
			setQuery(urlQuery);
		}
		if (urlQuery || initialQuery) {
			ensureLoaded();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Debounce keystrokes into the active query
	useEffect(() => {
		const timer = setTimeout(() => setQuery(rawQuery), debounceMs);
		return () => clearTimeout(timer);
	}, [rawQuery, debounceMs]);

	const tokens = useMemo(() => tokenize(query), [query]);
	const matches = useMemo(
		() => (entries ? filterEntries(entries, query) : null),
		[entries, query],
	);
	const ranked = useMemo(
		() => (matches ? rankSearchEntries(matches, query) : []),
		[matches, query],
	);
	const suggestions = query && matches ? ranked.slice(0, maxSuggestions) : [];

	// Keep the highlighted option scrolled into view inside the listbox.
	useEffect(() => {
		if (highlighted >= 0 && open) {
			document
				.getElementById(`${listboxId}-option-${highlighted}`)
				?.scrollIntoView({ block: "nearest" });
		}
	}, [highlighted, open, listboxId]);

	// Filter server-rendered elements in place + keep the URL shareable
	useEffect(() => {
		if (matches && filterAttribute) {
			if (filteredNodes.current === null) {
				filteredNodes.current = Array.from(
					document.querySelectorAll<HTMLElement>(`[${filterAttribute}]`),
				);
			}
			const matchedKeys = new Set(matches.map((match) => match.key));
			for (const element of filteredNodes.current) {
				const key = element.getAttribute(filterAttribute) ?? "";
				element.hidden = !matchedKeys.has(key);
			}
			if (emptyStateId) {
				const emptyState = document.getElementById(emptyStateId);
				if (emptyState) {
					emptyState.hidden = matches.length !== 0;
				}
			}
		}
		if (syncUrl) {
			const url = new URL(window.location.href);
			if (query) {
				url.searchParams.set("q", query);
			} else {
				url.searchParams.delete("q");
			}
			window.history.replaceState(null, "", url);
		}
	}, [matches, filterAttribute, emptyStateId, query, syncUrl]);

	const navigateTo = (entry: SearchIndexEntry) => {
		window.location.assign(entry.href);
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
				navigateTo(target);
			}
		} else if (event.key === "Escape") {
			if (open) {
				setOpen(false);
			} else {
				setRawQuery("");
				setQuery("");
			}
		}
	};

	const showDropdown = open && query !== "" && !loadFailed;
	const activeId =
		highlighted >= 0 && highlighted < suggestions.length
			? `${listboxId}-option-${highlighted}`
			: undefined;

	const statusText = loadFailed
		? "Search index unavailable."
		: !matches
			? "Loading…"
			: suggestions.length === 0
				? `No matches for "${query}"`
				: "";

	const body = (
		<>
			<div
				class={cx(classes.inputWrap, classNames?.inputWrap)}
				style={styles?.inputWrap}
				data-part="input-wrap"
			>
				<div
					class={cx(classes.icon, classNames?.icon)}
					style={styles?.icon}
					data-part="icon"
				>
					<SearchIcon />
				</div>
				<input
					type="search"
					name="q"
					role="combobox"
					aria-label={labelText}
					aria-expanded={showDropdown}
					aria-controls={listboxId}
					aria-autocomplete="list"
					aria-activedescendant={activeId}
					placeholder={placeholder}
					value={rawQuery}
					class={cx(classes.input, classNames?.input)}
					style={styles?.input}
					data-part="input"
					onInput={(event: Event) => {
						setRawQuery((event.target as HTMLInputElement).value);
						setHighlighted(-1);
						setOpen(true);
						ensureLoaded();
					}}
					onFocus={() => {
						ensureLoaded();
						if (rawQuery) setOpen(true);
					}}
					onBlur={() => setOpen(false)}
					onKeyDown={handleKeyDown}
				/>
				{rawQuery && (
					<button
						type="button"
						aria-label="Clear search"
						data-part="clear-trigger"
						class={cx(classes.clearTrigger, classNames?.clearTrigger)}
						style={styles?.clearTrigger}
						onClick={() => {
							setRawQuery("");
							setQuery("");
						}}
						onMouseDown={(event: Event) => event.preventDefault()}
					>
						<ClearIcon />
					</button>
				)}
				{suggestions.length > 0 && showDropdown && (
					<div
						id={listboxId}
						role="listbox"
						aria-label={labelText}
						class={cx(classes.listbox, classNames?.listbox)}
						style={styles?.listbox}
						data-part="listbox"
					>
						{suggestions.map((entry, index) => (
							<div
								key={entry.key}
								id={`${listboxId}-option-${index}`}
								role="option"
								tabIndex={-1}
								aria-selected={index === highlighted}
								data-highlighted={index === highlighted || undefined}
								data-part="item"
								class={cx(classes.item, classNames?.item)}
								style={styles?.item}
								onMouseDown={(event: Event) => {
									event.preventDefault();
									navigateTo(entry);
								}}
								onMouseOver={() => setHighlighted(index)}
								onFocus={() => setHighlighted(index)}
							>
								<div
									class={cx(classes.itemTitle, classNames?.itemTitle)}
									style={styles?.itemTitle}
									data-part="item-title"
								>
									<Highlighted text={entry.title} tokens={tokens} />
								</div>
								{entry.description && (
									<div
										class={cx(
											classes.itemDescription,
											classNames?.itemDescription,
										)}
										style={styles?.itemDescription}
										data-part="item-description"
									>
										<Highlighted text={entry.description} tokens={tokens} />
									</div>
								)}
								{entry.tags && entry.tags.length > 0 && (
									<div
										class={cx(classes.itemTags, classNames?.itemTags)}
										style={styles?.itemTags}
										data-part="item-tags"
									>
										{entry.tags.join(" · ")}
									</div>
								)}
							</div>
						))}
					</div>
				)}
			</div>
			{showDropdown && statusText && (
				<div
					role="status"
					aria-live="polite"
					class={cx(classes.status, classNames?.status)}
					style={styles?.status}
					data-part="status"
				>
					{statusText}
				</div>
			)}
			{showCount && (
				<div
					class={cx(classes.countText, classNames?.countText)}
					style={styles?.countText}
					data-part="count-text"
				>
					<span>
						{matches
							? `Showing ${matches.length} of ${entries?.length ?? 0} ${itemLabel}`
							: total !== undefined
								? `${total} ${itemLabel}`
								: ""}
						{matches && query ? ` for "${query}"` : ""}
					</span>
				</div>
			)}
		</>
	);

	return action ? (
		<form
			action={action}
			method="get"
			onSubmit={(event: Event) => event.preventDefault()}
			class={cx(classes.root, classNames?.root)}
			style={styles?.root}
			data-part="root"
		>
			{body}
		</form>
	) : (
		<div
			class={cx(classes.root, classNames?.root)}
			style={styles?.root}
			data-part="root"
		>
			{body}
		</div>
	);
}
