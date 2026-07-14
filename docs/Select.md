# Select

A dropdown control for picking one or more options from a list — an accessible, styleable alternative to the native `<select>` element.

## When To Use

- A dropdown menu for displaying choices - an elegant alternative to the native `<select>` element.
- Utilizing [Radio](/components/radio/) is recommended when there are fewer total options (less than 5).
- You probably need [AutoComplete](/components/auto-complete/) if you're looking for an input box that can be typed or selected.

## Props

| Prop | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `items` | `SelectItem[]` | The options to display in the list. | `[]` |
| `label` | `Child` | Label rendered above the trigger and associated with it. | - |
| `placeholder` | `string` | Text shown in the trigger while nothing is selected. | `"Select option"` |
| `allowClear` | `boolean` | Shows a clear button once a selection exists. | `false` |
| `multiple` | `boolean` | Allows selecting several options; the list stays open while toggling. | `false` |
| `mode` | `"multiple" \| "tags"` | Alternate way to configure selection mode. | - |
| `defaultValue` | `string[]` | Initial selection (uncontrolled). Alias of `selectedValues`. | `[]` |
| `selectedValues` | `string[]` | Controlled selection list. | `[]` |
| `deselectable` | `boolean` | In single mode, clicking the selected option again clears it. | `false` |
| `name` | `string` | Name of the hidden native `<select>`, for form submission. | - |
| `disabled` | `boolean` | Disables the whole control. | `false` |
| `invalid` | `boolean` | Marks the control invalid (`aria-invalid`, error border). | `false` |
| `readOnly` | `boolean` | Selection is visible but the list cannot be opened. | `false` |
| `required` | `boolean` | Marks the control required (`aria-required`, hidden select `required`). | `false` |
| `open` | `boolean` | Controlled open state of the dropdown. | `false` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | Size of the trigger and list. Defaults to `md`. | `"md"` |
| `variant` | `"outline" \| "outlined" \| "surface" \| "filled" \| "flushed" \| "underlined" \| "borderless"` | Visual variant of the trigger. | `"outline"` |
| `status` | `"error" \| "warning"` | Visual validation status of the trigger. | - |
| `loading` | `boolean` | Displays a loading spinner inside the indicator group. | `false` |
| `loadingIcon` | `Child` | Custom loading icon to display when `loading` is active. | `<Spinner />` |
| `showSearch` | `boolean \| ShowSearchConfig` | Whether the select dropdown is searchable with an inline input. | `false` |
| `interactive` | `boolean` | Overrides the hydration decision. | - |
| `onValueChange` | `(values: string[]) => void` | Called with the full selection whenever it changes (select, deselect, clear). | - |
| `onItemSelect` | `(value: string) => void` | Called with the value of the option that was interacted with. | - |
| `onClear` | `() => void` | Called when the clear button empties the selection. | - |
| `onOpenChange` | `(open: boolean) => void` | Called when the dropdown opens or closes. | - |

### ShowSearchConfig

| Property | Description | Type | Default |
| :--- | :--- | :--- | :--- |
| `autoClearSearchValue` | Whether the current search will be cleared on selecting an item. Only applies when `multiple` or `mode` is multiple/tags. | `boolean` | `true` |
| `filterOption` | If false, disables filtering. If a custom function, filters items using it: `(searchValue, item) => boolean`. | `boolean \| ((searchValue: string, item: SelectItem) => boolean)` | `true` |
| `optionFilterProp` | Property field name of SelectItem to filter against. Supports string array for multiple properties matching. | `string \| string[]` | `"label"` |
| `filterSort` | Custom sorting compare function for matching search options. | `(optionA: SelectItem, optionB: SelectItem, info: { searchValue: string }) => number` | - |
| `placeholder` | Search input placeholder text. | `string` | `"Search..."` |

### SelectItem

| Prop | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | The display text for the option. Also used for typeahead matching. |
| `value` | `string` | The unique value for the option. |
| `disabled` | `boolean` | Whether the option can be selected. |

# Keyboard Interaction

The trigger is a `role="combobox"` button; focus stays on it while the highlighted option is reported through `aria-activedescendant`. When search input is rendered and focused, keyboard events are routed seamlessly to handle navigation and selection perfectly.

| Key | Behavior |
| :--- | :--- |
| `Enter` / `Space` | Open the list; when open, select the highlighted option (space is ignored when search input is focused). |
| `ArrowDown` / `ArrowUp` | Open the list, or move the highlight (wraps, skips disabled options). |
| `Home` / `End` | Highlight the first / last enabled option. |
| `Escape` | Close the list. |
| `Tab` | Close the list and move focus on. |
| Printable characters | Typeahead matching when search input is closed/disabled. |

# Hydration

**Tier 1 — auto-interactive.** Opening the dropdown and selecting an option require client JS, and there is no static fallback (the native `<select>` is visually hidden and exists only for form submission), so `Select` hydrates by default. Pass `interactive={false}` to force a purely static render.

| `interactive` prop | Result |
| :--- | :--- |
| omitted | Hydrates as an island |
| `true` | Hydrates as an island |
| `false` | Static — no client JS |

# Usage Examples

### Basic Usage

```tsx
import { Select } from "../components/ui";

const items = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Svelte", value: "svelte", disabled: true },
  { label: "Vue", value: "vue" },
  { label: "Hono", value: "hono" },
];

export default function MyPage() {
  return (
    <Select
      items={items}
      label="Framework"
      placeholder="Select a framework"
      allowClear
    />
  );
}
```

### Search and Select

Make select searchable easily by passing `showSearch`:

```tsx
<Select
  showSearch
  items={items}
  label="Searchable Frameworks"
  placeholder="Type to filter..."
/>
```

### Multiple Selection

```tsx
<Select
  multiple
  items={items}
  label="Frameworks"
  placeholder="Select frameworks"
  defaultValue={["hono"]}
/>
```

### Custom Validation Status

```tsx
<Select
  status="warning"
  items={items}
  label="Warning Status"
  placeholder="Warning state illustration"
/>

<Select
  status="error"
  items={items}
  label="Error Status"
  placeholder="Error state illustration"
/>
```

### Loading State

```tsx
<Select
  loading
  items={items}
  label="Frameworks"
  placeholder="Loading frameworks..."
/>
```
