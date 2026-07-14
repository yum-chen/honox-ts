# Menu

# Introduction

A list of actions or options that appears when triggered, supporting items, separators, checkboxes, radio groups, trigger modes, and cascading submenus.

# Props

## Menu

| Prop | Type | Description |
| :--- | :--- | :--- |
| `trigger` | `JSX.Element` | Element that opens the menu when activated. |
| `triggerType` | `"trigger" \| "trigger-item" \| "context-trigger"` | The type of trigger rendered for positioning. Default: `"trigger"`. |
| `triggerMode` | `"click" \| "hover" \| "contextMenu"` | The mode that triggers the menu action. Default: `"click"`. |
| `items` | `MenuItem[]` | The menu items to render. |
| `defaultOpen` | `boolean` | Whether the menu is open by default. Default: `false`. |
| `interactive` | `boolean` | Enable client-side hydration. Default: `true`. |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | The size of the menu. |
| `class` | `string` | Custom CSS classes for the root element. |
| `contentClass` | `string` | Custom CSS classes for the content element. |
| `positionerClass` | `string` | Custom CSS classes for the positioner element. |

### MenuItem

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"item" \| "separator" \| "checkbox" \| "radio" \| "radio-group" \| "submenu" \| "group"` | The kind of menu entry. |
| `label` | `string` | Display text (for `item`, `checkbox`, `radio`, `submenu`). |
| `value` | `string` | Unique value (for `item`, `checkbox`, `radio`, `radio-group`). |
| `checked` | `boolean` | Checked state (for `checkbox`, `radio`). |
| `icon` | `JSX.Element` | Leading icon (for `item`, `checkbox`, `radio`, `submenu`). |
| `indicator` | `JSX.Element` | Custom indicator element (for `item`). |
| `items` | `MenuItem[]` | Nested items (for `radio-group`, `submenu`). |
| `disabled` | `boolean` | Whether the item is disabled. |
| `class` | `string` | Custom CSS classes for the item. |

# Usage

## Basic Menu

```tsx
import { Menu, Button } from "../components/ui";

export default function MyPage() {
  return (
    <Menu
      trigger={<Button>Open Menu</Button>}
      items={[
        { type: "item", label: "Edit", value: "edit" },
        { type: "separator" },
        { type: "checkbox", label: "Bold", value: "bold", checked: true },
        {
          type: "radio-group",
          value: "theme",
          label: "Theme",
          items: [
            { type: "radio", label: "Light", value: "light" },
            { type: "radio", label: "Dark", value: "dark" },
          ],
        },
      ]}
    />
  );
}
```

## Hover trigger & Cascading Submenu

```tsx
import { Menu, Button } from "../components/ui";

export default function HoverMenuPage() {
  return (
    <Menu
      trigger={<Button>Preferences</Button>}
      triggerMode="hover"
      items={[
        { type: "item", label: "Profile", value: "profile" },
        {
          type: "submenu",
          label: "Cascading Options",
          items: [
            { type: "item", label: "Advanced Setting 1", value: "adv-1" },
            { type: "item", label: "Advanced Setting 2", value: "adv-2" },
          ],
        },
      ]}
    />
  );
}
```

## Context Menu Trigger Mode

```tsx
import { Menu, Button } from "../components/ui";

export default function ContextMenuPage() {
  return (
    <Menu
      trigger={<div style={{ padding: "40px", border: "1px dashed gray" }}>Right click here</div>}
      triggerMode="contextMenu"
      items={[
        { type: "item", label: "Refactor", value: "refactor" },
        { type: "item", label: "Format Code", value: "format" },
      ]}
    />
  );
}
```
