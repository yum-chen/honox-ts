# Tabs

# Introduction

A highly customizable, production-ready set of layered sections of content shown one at a time, with a selectable tab list. Tabs ships four visual variants (`line`, `subtle`, `enclosed`, `card`), vertical or horizontal orientation supporting all placements (`top`, `bottom`, `left`/`start`, `right`/`end`), dynamic spacing, controlled/uncontrolled state syncing, semantic style mapping, and optional closable/editable tabs for managing an open-ended set of views.

# Props

## Tabs

| Prop | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `items` | `TabsItem[]` | The tabs configured via shorthand array. | `[]` |
| `variant` | `"line" \| "subtle" \| "enclosed" \| "card"` | Visual style. | `"line"` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "small" \| "medium" \| "large"` | Size presets of the tab elements. | `"md"` |
| `colorPalette` | `"gray" \| "blue" \| "green" \| "red" \| "orange" \| "cyan" \| "amber" \| "purple"` | Accent color theme for selection / indicators. | `"gray"` |
| `type` | `"line" \| "card" \| "editable-card"` | Basic style mapping. `"editable-card"` automatically configures the card style and editable triggers. | `"line"` |
| `tabPlacement` / `tabPosition` | `"top" \| "bottom" \| "left" \| "right" \| "start" \| "end"` | Visual layout placement of the tab headers relative to the content pane. | `"top"` |
| `activeKey` / `value` | `string` | The currently active tab key (Controlled). | - |
| `defaultActiveKey` / `defaultValue` | `string` | The initially active tab key (Uncontrolled). | - |
| `onChange` / `onValueChange` | `(key: string) => void` | Callback executed when the active tab is changed. | - |
| `onEdit` | `(key: any, action: "add" \| "remove") => void` | Callback executed when a tab is added or removed (only works under editable configurations). | - |
| `tabBarGutter` | `number \| string` | Custom CSS grid/flex spacing between individual tab headers. | - |
| `tabBarStyle` | `any` | Custom inline style for the tab headers bar / container. | - |
| `destroyOnHidden` / `destroyInactiveTabPane` | `boolean` | Whether to completely unmount/destroy inactive content pane trees instead of just hiding them. | `false` |
| `indicator` | `boolean` | Whether to render the sliding active tab indicator line. | `true` |
| `animated` | `boolean \| { inkBar?: boolean; tabPane?: boolean }` | Fine-grain control over transition animations. | `true` |
| `classNames` | `Record<string, string>` | Custom CSS classes mapped to semantic sub-parts (`root`, `list`/`header`/`tabBar`, `trigger`/`item`, `close`/`remove`, `indicator`, `content`/`body`, `add`). | - |
| `styles` | `Record<string, any>` | Custom inline styles mapped to semantic sub-parts. | - |
| `addIcon` | `JSX.Element` | Custom SVG or icon element for the new tab trigger. | - |
| `removeIcon` | `JSX.Element` | Custom SVG or icon element for close/delete buttons. | - |
| `extra` / `tabBarExtraContent` | `JSX.Element \| { start?, end?, left?, right? }` | Custom content or action nodes rendered alongside the tab list headers. | - |
| `interactive` | `boolean` | Force or prevent client-side island hydration; omitted to auto-detect. | - |

### TabsItem

| Property | Type | Description |
| :--- | :--- | :--- |
| `value` / `key` | `string` | Unique key identifier for the tab pane. |
| `label` | `string \| JSX.Element` | The visible text or elements inside the tab header. |
| `content` / `children` | `string \| JSX.Element` | The content rendered inside the panel pane when active. |
| `disabled` | `boolean` | Whether the individual tab is disabled. |
| `icon` | `JSX.Element` | Optional icon rendered before the label. |
| `closable` | `boolean` | Whether to show a close button. |
| `closeIcon` | `JSX.Element \| boolean \| null` | Per-tab custom close icon override; setting to `null` or `false` hides it. |
| `destroyOnHidden` | `boolean` | Per-tab destroy behavior when inactive. |

---

# Usage

## Basic Tabs

```tsx
import { Tabs } from "../components/ui";

export default function MyPage() {
  return (
    <Tabs
      items={[
        { value: "tab1", label: "Tab 1", content: "Content for tab 1" },
        { value: "tab2", label: "Tab 2", content: "Content for tab 2" },
      ]}
    />
  );
}
```

## Card Variant, Icons, and Color

```tsx
import { Tabs } from "../components/ui";

export default function MyPage() {
  return (
    <Tabs
      variant="card"
      colorPalette="blue"
      defaultValue="overview"
      items={[
        { value: "overview", label: "Overview", icon: <OverviewIcon />, content: <Overview /> },
        { value: "activity", label: "Activity", icon: <ActivityIcon />, content: <Activity /> },
      ]}
    />
  );
}
```

## Editable Tabs (Add & Close)

Closing or adding a tab mutates the tab set itself, so it's only available through the
`items` prop — see **Hydration** below for why the composable JSX form can't support it.

```tsx
import { Tabs } from "../components/ui";

export default function MyPage() {
  let nextId = 3;

  return (
    <Tabs
      editable
      defaultValue="tab1"
      items={[
        { value: "tab1", label: "Tab 1", content: "First view" },
        { value: "tab2", label: "Tab 2", content: "Second view" },
      ]}
      onTabAdd={() => ({
        value: `tab${nextId}`,
        label: `Tab ${nextId++}`,
        content: "A freshly added view",
      })}
      onTabClose={(value) => console.log("closed:", value)}
    />
  );
}
```

## Extra Content and Centering

```tsx
import { Button, Tabs } from "../components/ui";

export default function MyPage() {
  return (
    <Tabs
      centered
      items={[
        { value: "daily", label: "Daily", content: "Daily report" },
        { value: "weekly", label: "Weekly", content: "Weekly report" },
      ]}
      extra={<Button size="sm" variant="outline">Export</Button>}
    />
  );
}
```
# Hydration

Tabs is classified as **Tier-2 (smart auto-detect)** — see `docs/ARCHITECTURE.md` for the
full model.

- It hydrates as a client island when any of `value`, `defaultValue`, `onValueChange`,
  `closable`, `editable`, `onTabClose`, or `onTabAdd` is supplied — selecting a tab, closing
  one, or adding one all need JS. With none of these present, Tabs renders static markup and
  ships no client JS.
- Pass `interactive={true}` / `interactive={false}` to force or forbid hydration outright;
  this is implemented via the shared `shouldHydrate(interactive, hasSignal)` predicate in
  `app/components/ui/island-utils.ts`.
- **`items` vs. composable children:** when hydrated, the island keeps its own reactive copy
  of `items` (seeded from the prop) so `editable`/`closable` can mutate the tab set on the
  fly. The composable `TabsList`/`TabsTrigger`/`TabsContent` form is a pre-built, static
  subtree instead — hono/jsx never re-invokes those components on a state change, so
  selecting a tab is applied by syncing DOM attributes directly rather than through a
  re-render. That sync works for switching tabs, but there's no set of tabs to mutate, so
  `editable`/`closable` only take effect through the `items` prop.
