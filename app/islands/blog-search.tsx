import { useEffect, useMemo, useState } from "hono/jsx";
import { css } from "styled-system/css";
import { filterEntries, type SearchEntry } from "../utils/search";

export interface BlogSearchProps {
	entries: SearchEntry[];
	initialQuery: string;
}

// Instant full-text search over the blog post grid. The grid itself stays
// server-rendered; this island toggles visibility of the route's
// [data-post-slug] wrappers and #blog-search-empty block. Without JS the
// plain GET form below submits to /blog?q=… and the server filters instead.
export default function BlogSearch({ entries, initialQuery }: BlogSearchProps) {
	const [query, setQuery] = useState(initialQuery);
	const matched = useMemo(
		() => new Set(filterEntries(entries, query)),
		[entries, query],
	);

	// On static (SSG) deployments the page is prerendered without query
	// params, so pick up ?q= from the URL once hydrated.
	useEffect(() => {
		const urlQuery = new URLSearchParams(window.location.search).get("q");
		if (urlQuery !== null && urlQuery !== initialQuery) {
			setQuery(urlQuery);
		}
	}, [initialQuery]);

	useEffect(() => {
		const cards = document.querySelectorAll<HTMLElement>("[data-post-slug]");
		for (const card of cards) {
			card.hidden = !matched.has(card.getAttribute("data-post-slug") ?? "");
		}
		const emptyState = document.getElementById("blog-search-empty");
		if (emptyState) {
			emptyState.hidden = matched.size !== 0;
		}

		// Keep the URL shareable/bookmarkable
		const url = new URL(window.location.href);
		if (query) {
			url.searchParams.set("q", query);
		} else {
			url.searchParams.delete("q");
		}
		window.history.replaceState(null, "", url);
	}, [matched, query]);

	return (
		<form
			action="/blog"
			method="get"
			onSubmit={(event) => event.preventDefault()}
			class={css({ width: "full" })}
		>
			<div class={css({ position: "relative" })}>
				<div
					class={css({
						position: "absolute",
						left: "3",
						top: "50%",
						transform: "translateY(-50%)",
						color: "fg.muted",
						pointerEvents: "none",
						zIndex: "1",
					})}
				>
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
				</div>
				<input
					type="search"
					name="q"
					placeholder="Search articles..."
					value={query}
					onInput={(event) =>
						setQuery((event.target as HTMLInputElement).value)
					}
					class={css({
						width: "full",
						pl: "10",
						pr: "4",
						py: "3",
						borderWidth: "2px",
						borderRadius: "lg",
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
				/>
			</div>
			<div
				class={css({
					mt: "2",
					display: "flex",
					alignItems: "center",
					gap: "3",
					fontSize: "sm",
					color: "fg.muted",
				})}
			>
				<span>
					Showing {matched.size} of {entries.length} article
					{entries.length !== 1 ? "s" : ""}
					{query && ` for "${query}"`}
				</span>
				{query && (
					<button
						type="button"
						onClick={() => setQuery("")}
						class={css({
							color: "blue.10",
							fontWeight: "medium",
							cursor: "pointer",
							bg: "transparent",
							border: "none",
							p: "0",
							fontSize: "sm",
							_hover: { textDecoration: "underline" },
						})}
					>
						Clear
					</button>
				)}
			</div>
		</form>
	);
}
