import { useEffect, useMemo, useRef, useState } from "hono/jsx";
import { css } from "styled-system/css";
import { filterEntries, type SearchEntry } from "../utils/search";

interface PostData {
	slug: string;
	title: string;
	description?: string;
	tags?: string[];
	date?: string;
	author?: string;
	cover?: string;
	haystack: string;
}

export default function Search({
	endpoint = "/blog/posts.json",
	itemSelector = "[data-post-slug]",
	itemAttr = "data-post-slug",
	emptyStateId = "blog-search-empty",
	debounceMs = 250,
	placeholder = "Search...",
}: SearchProps) {
	// Query state: immediate input, and debounced filter query
	const [inputQuery, setInputQuery] = useState("");
	const [debouncedQuery, setDebouncedQuery] = useState("");

	// Loaded posts search metadata
	const [posts, setPosts] = useState<PostData[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [hasLoaded, setHasLoaded] = useState(false);

	// Autocomplete state
	const [isOpen, setIsOpen] = useState(false);
	const [highlightedIndex, setHighlightedIndex] = useState(-1);

	const rootRef = useRef<HTMLDivElement>(null);

	// Fetch search data lazily on demand
	const ensureDataFetched = async () => {
		if (hasLoaded || isLoading) return;
		setIsLoading(true);
		try {
			const res = await fetch(endpoint);
			if (res.ok) {
				const data: PostData[] = await res.json();
				setPosts(data);
				setHasLoaded(true);
			} else {
				console.error(`Failed to fetch search data from ${endpoint}`);
			}
		} catch (err) {
			console.error(`Error fetching search data from ${endpoint}:`, err);
		} finally {
			setIsLoading(false);
		}
	};

	// Debounce input inputQuery -> debouncedQuery
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedQuery(inputQuery);
		}, debounceMs);
		return () => clearTimeout(timer);
	}, [inputQuery, debounceMs]);

	// Initialize input query from URL on mount (SSG/hydration-friendly)
	useEffect(() => {
		const urlParams = new URLSearchParams(window.location.search);
		const initialQ = urlParams.get("q") || "";
		if (initialQ) {
			setInputQuery(initialQ);
			setDebouncedQuery(initialQ);
			// Fetch search database immediately if there is a search query in URL
			ensureDataFetched();
		}
	}, []);

	// SearchEntries used for the filtering logic
	const searchEntries = useMemo<SearchEntry[]>(() => {
		return posts.map((p) => ({
			slug: p.slug,
			haystack: p.haystack,
		}));
	}, [posts]);

	// Filter matches: if query empty, match all (or if data not loaded yet, let SSR state show all)
	const matchedSlugs = useMemo(() => {
		if (!hasLoaded) {
			return null; // Don't filter elements if database is not loaded yet
		}
		return new Set(filterEntries(searchEntries, debouncedQuery));
	}, [searchEntries, debouncedQuery, hasLoaded]);

	// Toggle on-page elements visibility based on filter matches
	useEffect(() => {
		if (matchedSlugs === null) return;

		const cards = document.querySelectorAll<HTMLElement>(itemSelector);
		let matchCount = 0;

		for (const card of cards) {
			const slug = card.getAttribute(itemAttr) ?? "";
			const matches = matchedSlugs.has(slug);
			card.hidden = !matches;
			if (matches) matchCount++;
		}

		const emptyState = document.getElementById(emptyStateId);
		if (emptyState) {
			emptyState.hidden = matchCount !== 0 || !debouncedQuery;
		}

		// Sync with URL query param
		const url = new URL(window.location.href);
		if (debouncedQuery) {
			url.searchParams.set("q", debouncedQuery);
		} else {
			url.searchParams.delete("q");
		}
		window.history.replaceState(null, "", url);
	}, [matchedSlugs, debouncedQuery, itemSelector, itemAttr, emptyStateId]);

	// Autocomplete suggestions based on inputQuery (using loaded posts or empty)
	const suggestions = useMemo(() => {
		if (!inputQuery.trim() || posts.length === 0) return [];
		const queryLower = inputQuery.toLowerCase();
		return posts
			.filter(
				(post) =>
					post.title.toLowerCase().includes(queryLower) ||
					post.description?.toLowerCase().includes(queryLower) ||
					post.tags?.some((t) => t.toLowerCase().includes(queryLower)),
			)
			.slice(0, 5); // Limit to top 5 suggestions
	}, [posts, inputQuery]);

	// Close autocomplete on click outside
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setIsOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	// Keyboard controls for Autocomplete dropdown
	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "ArrowDown") {
			e.preventDefault();
			ensureDataFetched();
			setIsOpen(true);
			setHighlightedIndex((prev) =>
				prev + 1 < suggestions.length ? prev + 1 : 0,
			);
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			setIsOpen(true);
			setHighlightedIndex((prev) =>
				prev - 1 >= 0 ? prev - 1 : suggestions.length - 1,
			);
		} else if (e.key === "Enter") {
			if (isOpen && highlightedIndex >= 0 && suggestions[highlightedIndex]) {
				e.preventDefault();
				const selected = suggestions[highlightedIndex];
				window.location.href = `/blog/${selected.slug}`;
			}
		} else if (e.key === "Escape") {
			setIsOpen(false);
		}
	};

	return (
		<div
			ref={rootRef}
			class={css({
				position: "relative",
				width: "full",
			})}
		>
			<form
				action="/blog"
				method="get"
				onSubmit={(e) => e.preventDefault()}
				class={css({ width: "full" })}
			>
				<div class={css({ position: "relative" })}>
					<div
						class={css({
							position: "absolute",
							left: "3.5",
							top: "50%",
							transform: "translateY(-50%)",
							color: "fg.muted",
							pointerEvents: "none",
							zIndex: "1",
						})}
					>
						{isLoading ? (
							<svg
								class={css({
									animation: "spin",
									animationDuration: "1s",
									animationIterationCount: "infinite",
								})}
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<title>Loading</title>
								<circle
									cx="12"
									cy="12"
									r="10"
									stroke-dasharray="32"
									stroke-dashoffset="16"
								/>
							</svg>
						) : (
							<svg
								width="18"
								height="18"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
							>
								<title>Search</title>
								<circle cx="11" cy="11" r="8" />
								<path d="m21 21-4.3-4.3" />
							</svg>
						)}
					</div>
					<input
						type="search"
						name="q"
						placeholder={placeholder}
						value={inputQuery}
						onFocus={() => {
							ensureDataFetched();
							setIsOpen(true);
						}}
						onInput={(e) => {
							ensureDataFetched();
							setInputQuery((e.target as HTMLInputElement).value);
							setIsOpen(true);
							setHighlightedIndex(-1);
						}}
						onKeyDown={handleKeyDown}
						class={css({
							width: "full",
							pl: "11",
							pr: "10",
							py: "3",
							borderWidth: "2px",
							borderRadius: "xl",
							bg: "bg",
							color: "fg",
							borderColor: "border",
							fontSize: "md",
							transition: "all 0.2s",
							_focus: {
								outline: "none",
								borderColor: "blue.9",
								shadow: "0 0 0 3px var(--colors-blue-6)",
							},
							_placeholder: { color: "fg.muted" },
						})}
						autocomplete="off"
					/>

					{/* Custom Clear Button inside Input */}
					{inputQuery && (
						<button
							type="button"
							onClick={() => {
								setInputQuery("");
								setDebouncedQuery("");
								setIsOpen(false);
							}}
							class={css({
								position: "absolute",
								right: "3.5",
								top: "50%",
								transform: "translateY(-50%)",
								color: "fg.muted",
								bg: "transparent",
								border: "none",
								p: "1",
								cursor: "pointer",
								borderRadius: "full",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								transition: "colors 0.2s",
								_hover: {
									color: "fg",
									bg: "gray.subtle.bg",
								},
							})}
						>
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
						</button>
					)}
				</div>
			</form>

			{/* Interactive Autocomplete Dropdown List */}
			{isOpen && suggestions.length > 0 && (
				<div
					role="listbox"
					class={css({
						position: "absolute",
						top: "100%",
						left: "0",
						width: "full",
						mt: "2",
						bg: "bg",
						borderWidth: "1px",
						borderColor: "border",
						borderRadius: "xl",
						shadow: "xl",
						zIndex: "1000",
						maxHeight: "360px",
						overflowY: "auto",
						animation: "fade-in 0.2s ease-out",
					})}
				>
					{suggestions.map((post, idx) => {
						const isHighlighted = idx === highlightedIndex;
						return (
							<a
								key={post.slug}
								href={`/blog/${post.slug}`}
								role="option"
								aria-selected={isHighlighted}
								onMouseEnter={() => setHighlightedIndex(idx)}
								class={css({
									display: "block",
									px: "4",
									py: "3",
									textDecoration: "none",
									borderBottomWidth:
										idx !== suggestions.length - 1 ? "1px" : "0",
									borderColor: "border.subtle",
									bg: isHighlighted ? "blue.3" : "transparent",
									transition: "all 0.2s",
									textAlign: "left",
								})}
							>
								<span
									class={css({
										fontSize: "sm",
										fontWeight: "semibold",
										color: isHighlighted ? "blue.11" : "fg",
										display: "block",
									})}
								>
									{post.title}
								</span>
								{post.description && (
									<span
										class={css({
											fontSize: "xs",
											color: "fg.muted",
											display: "-webkit-box",
											lineClamp: "1",
											boxOrient: "vertical",
											overflow: "hidden",
											mt: "0.5",
										})}
									>
										{post.description}
									</span>
								)}
								{post.tags && post.tags.length > 0 && (
									<div class={css({ display: "flex", gap: "1", mt: "1.5" })}>
										{post.tags.slice(0, 3).map((tag) => (
											<span
												key={tag}
												class={css({
													fontSize: "2xs",
													bg: isHighlighted ? "blue.5" : "gray.subtle.bg",
													color: isHighlighted ? "blue.11" : "fg.muted",
													px: "1.5",
													py: "0.5",
													borderRadius: "full",
												})}
											>
												{tag}
											</span>
										))}
									</div>
								)}
							</a>
						);
					})}
				</div>
			)}
		</div>
	);
}

export interface SearchProps {
	/**
	 * Endpoint to lazily fetch JSON search data from.
	 * @default "/blog/posts.json"
	 */
	endpoint?: string;
	/**
	 * Selector for list items to filter on the page.
	 * If provided, matches elements matching this selector.
	 * @default "[data-post-slug]"
	 */
	itemSelector?: string;
	/**
	 * Attribute on the list items representing the identifier (slug).
	 * @default "data-post-slug"
	 */
	itemAttr?: string;
	/**
	 * Optional ID of the empty state block to show/hide.
	 * @default "blog-search-empty"
	 */
	emptyStateId?: string;
	/**
	 * Delay in ms for debouncing input.
	 * @default 250
	 */
	debounceMs?: number;
	/**
	 * Placeholder text for the search input.
	 * @default "Search..."
	 */
	placeholder?: string;
}
