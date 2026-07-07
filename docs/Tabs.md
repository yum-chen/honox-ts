# Tabs

# Introduction

A set of layered sections of content shown one at a time, with a selectable tab list.

# Props

## Tabs

| Prop | Type | Description |
| :--- | :--- | :--- |
| `items` | `TabsItem[]` | The tabs to render (used when no children are provided). |
| `indicator` | `boolean` | Whether to show the active indicator. Default: `true`. |
| `interactive` | `boolean` | Enable client-side hydration. Default: `true`. |
| `class` | `string` | Custom CSS classes for the root element. |

Additional tab state props (e.g. `value`, `defaultValue`, `onValueChange`, `orientation`) are forwarded to the underlying tabs primitive.

### TabsItem

| Property | Type | Description |
| :--- | :--- | :--- |
| `value` | `string` | Unique identifier for the tab. |
| `label` | `string \| JSX.Element` | The tab label. |
| `content` | `string \| JSX.Element` | The panel content shown when active. |
| `disabled` | `boolean` | Whether the tab is disabled. |

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
