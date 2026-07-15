# DatePicker

# Introduction

A date picker that combines a text input with a popup calendar. It supports single, multiple, and range selection, month/year panel views, quick-select presets, and manual date entry — rendered server-side with HonoX and hydrated as an island only when needed.

# Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | Renders a label associated with the first input (default structure only). |
| `placeholder` | `string` | Placeholder for the input. Defaults to `YYYY-MM-DD`. |
| `selectionMode` | `"single" \| "multiple" \| "range"` | How dates are selected. Defaults to `"single"`. Range mode renders start and end inputs. |
| `value` | `CalendarDate[] \| string[] \| string \| Date[]` | Selected date(s) (controlled). Strings use the `YYYY-MM-DD` format. |
| `defaultValue` | `CalendarDate[] \| string[] \| string \| Date[]` | Initial selected date(s) (uncontrolled). |
| `focusedValue` | `CalendarDate \| string \| Date` | The date the calendar panel is focused on (controlled). |
| `defaultFocusedValue` | `CalendarDate \| string \| Date` | Initial panel date (uncontrolled). |
| `min` | `CalendarDate \| string \| Date` | Earliest selectable date. Earlier cells are disabled; typed dates outside the range are rejected. |
| `max` | `CalendarDate \| string \| Date` | Latest selectable date. |
| `isDateUnavailable` | `(date, locale) => boolean` | Marks individual dates as unselectable (static/composed usage). |
| `view` | `"day" \| "month" \| "year"` | The active panel view (controlled). |
| `open` | `boolean` | Whether the popup calendar is open (controlled). |
| `closeOnSelect` | `boolean` | Close the popup after a completed selection. Defaults to `true`. |
| `locale` | `string` | BCP 47 locale used for month/date formatting. Defaults to `en-US`. |
| `disabled` | `boolean` | Disables the whole picker. |
| `readOnly` | `boolean` | Makes the input read-only. |
| `invalid` | `boolean` | Marks the input invalid (`aria-invalid` + error styling). |
| `colorPalette` | `"blue" \| "green" \| "red" \| "orange" \| "gray" \| "cyan" \| "amber" \| "purple"` | Accent color for the selected date and today indicator. Defaults to `"blue"`. |
| `interactive` | `boolean` | Forces (or suppresses) hydration as an island. |
| `onValueChange` | `(details: { value: CalendarDate[] }) => void` | Called when the selection changes. |
| `onOpenChange` | `(details: { open: boolean }) => void` | Called when the popup opens or closes. |

## CalendarDate

Dates are represented by the `CalendarDate` class (`{ year, month, day }`, month is 1-based) to avoid timezone drift. Helpers are exported alongside the component:

| Helper | Description |
| :--- | :--- |
| `parseDate(str)` | Parses a `YYYY-MM-DD` string, clamping out-of-range parts. |
| `isValidDateString(str)` | Strictly validates a `YYYY-MM-DD` string (including month lengths and leap years). |
| `daysInMonth(year, month)` | Number of days in the given month. |
| `fromJSDate(date)` | Converts a JavaScript `Date` to a `CalendarDate`. |

# Functionality

- **Popup calendar** — opens from the calendar trigger or by clicking the input; closes on outside click, <kbd>Escape</kbd> (focus returns to the trigger), or after selection when `closeOnSelect` is set.
- **Panel views** — click the month/year heading to zoom out from days → months → years; selecting a year or month drills back down. The prev/next arrows page by month, year, or decade depending on the view.
- **Manual entry** — type a date in the input and press <kbd>Enter</kbd> (or blur). Valid `YYYY-MM-DD` values are committed; invalid or out-of-range values revert to the last committed value. Clearing the input clears the selection.
- **Range selection** — the first click sets the start, the second sets the end (automatically ordered); the days in between are highlighted.
- **Presets** — `DatePicker.PresetTrigger` supports the values `today`, `last3Days`, `last7Days`, `last14Days`, `last30Days`, and `last90Days`. In range mode a preset selects the whole span; otherwise it selects the single anchor date.

# Hydration

**Tier 1 — interactive by default.** A `DatePicker` hydrates as an island unless explicitly opted out with `interactive={false}`, in which case it renders as static HTML with no client JS.

| `interactive` prop | Result |
| :--- | :--- |
| omitted | Hydrates as an island |
| `true` | Hydrates as an island |
| `false` | Static — no client JS |

All interactivity decisions in the library route through the shared `shouldHydrate()` helper in `app/components/ui/island-utils.ts`.

# Usage

```tsx
import { DatePicker } from "../components/ui";

export default function MyPage() {
  return (
    <>
      {/* Single date */}
      <DatePicker label="Choose Date" selectionMode="single" />

      {/* Date range with bounds */}
      <DatePicker
        label="Travel Dates"
        selectionMode="range"
        min="2026-01-01"
        max="2026-12-31"
      />

      {/* Preselected value */}
      <DatePicker label="Due Date" defaultValue="2026-07-15" />
    </>
  );
}
```
