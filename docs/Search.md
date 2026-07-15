# Search

A combobox-style search field with instant client-side filtering over an SSG-pregenerated
JSON index, an autocomplete dropdown, optional in-place DOM filtering, and a no-JS
`GET` form fallback. It is styled by the shared **`search` slot recipe**, so it themes
with the rest of the design system (`colorPalette` accents, `focusVisibleRing` focus
treatment, the standard 1px input border).

## Features

- **Lazy index load** — `/search-index.json` is fetched on first interaction, not on page load.
- **Debounced** keystrokes (default 150ms) before the active query is applied.
- **ARIA 1.2 combobox** — `role="combobox"` + `aria-expanded` / `aria-controls` /
  `aria-autocomplete="list"` / `aria-activedescendant`, with full keyboard navigation.
- **Relevance ranking** — suggestions are sorted (title > tags > description, prefix-match bonus).
- **Match highlighting** — query tokens are highlighted in results, themed via `colorPalette`.
- **In-place filtering** — optionally show/hide server-rendered elements by `filterAttribute`.
- **Theming** — `colorPalette`, `size`, and `variant` flow through the recipe.
- **No-JS fallback** — set `interactive={false}` + `action` to render a plain `GET` form.

## Import

```tsx
import { Search } from "~/components/ui/search";
```

`Search` is auto-interactive (Tier-1): it hydrates unless `interactive={false}` is set,
in which case it degrades to the static `GET` form.

## Examples

```tsx
// Interactive autocomplete
<Search label="Search blog posts" placeholder="Search blog posts..." itemLabel="posts" />

// Tuned: slower debounce, fewer suggestions
<Search label="Search" placeholder="Slower, shorter..." debounceMs={400} maxSuggestions={3} />

// Themed
<Search label="Search" colorPalette="purple" size="lg" placeholder="Purple accent..." />

// No-JS fallback (plain GET form to /blog)
<Search interactive={false} action="/blog" label="Search" placeholder="Search without JS..." />
```

## Props

`Search` accepts all recipe variant props plus the following.

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `label` | `string` | `Search ${itemLabel}` | Accessible label for the input (sets `aria-label`). |
| `src` | `string` | `/search-index.json` | URL of the SSG-generated JSON search index. |
| `placeholder` | `string` | `Search...` | Input placeholder. |
| `initialQuery` | `string` | `""` | Pre-filled query (also picked up from `?q=` on hydration). |
| `debounceMs` | `number` | `150` | Delay before a keystroke becomes the active query. |
| `maxSuggestions` | `number` | `8` | Max entries shown in the autocomplete dropdown. |
| `filterAttribute` | `string` | — | Attribute (e.g. `data-post-slug`) whose elements are shown/hidden by match. |
| `emptyStateId` | `string` | — | Element revealed when the filtered list has zero matches. |
| `total` | `number` | — | Result count shown before the index has loaded. |
| `itemLabel` | `string` | `results` | Noun used in the result count row. |
| `showCount` | `boolean` | `true` | Show the "Showing X of N" result count row. |
| `action` | `string` | — | No-JS fallback: submit `?q=` to this path via `GET`. |
| `syncUrl` | `boolean` | `true` | Mirror the active query into the address bar as `?q=` (`replaceState`). |
| `size` | `sm \| md \| lg` | `md` | Input size (recipe variant). |
| `variant` | `outline \| surface \| subtle` | `outline` | Input variant (recipe variant). |
| `colorPalette` | `blue \| purple \| green \| …` | `blue` | Accent color for focus ring, highlight, and tags. |
| `classNames` | `Partial<Record<SearchSlot, string>>` | — | Per-slot class overrides. |
| `styles` | `Partial<Record<SearchSlot, CSSProperties>>` | — | Per-slot inline style overrides. |

### Recipe slots

`root`, `inputWrap`, `input`, `icon`, `clearTrigger`, `listbox`, `item`, `itemTitle`,
`itemDescription`, `itemTags`, `countText`, `status`. Each carries a `data-part`
attribute, so you can target them from CSS or via the `classNames` prop.

## Accessibility

- The input is a **combobox**; the dropdown is a **listbox** of **option**s.
- Arrow keys move the active option; `aria-activedescendant` keeps focus on the input,
  and the active option is scrolled into view automatically.
- `Enter` navigates to the highlighted suggestion; `Escape` closes the dropdown (or
  clears the query when already closed).
- Loading and "no matches" states are announced via a `role="status"` `aria-live="polite"`
  region placed outside the listbox.
- Always pass a `label` (or rely on the default) so screen-reader users get an accessible name.

## No-JS fallback

When `interactive={false}` and `action` is provided, `Search` renders a plain
`<form method="get">` with a `name="q"` input. The server (e.g. the `/blog` route) reads
`?q=` and filters server-side — no JavaScript required.

## Search index format

The `src` JSON document shape (generated at build time, see `app/utils/search.ts`):

```ts
interface SearchIndexEntry {
  key: string;        // stable id, matched against DOM filter attributes
  href: string;       // navigation target
  title: string;
  description?: string;
  tags?: string[];
  haystack: string;   // precomputed lowercase text blob
}
interface SearchIndexDocument {
  generated: string;
  entries: SearchIndexEntry[];
}
```
