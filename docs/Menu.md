# Menu

# Introduction

A list of actions or options that appears when triggered, supporting items, separators, checkboxes, and radio groups.

# Props

## Menu

| Prop | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `trigger` | `JSX.Element \| ("click" \| "hover" \| "contextMenu")[]` | Element that opens the menu when activated, or an array of trigger modes. | - |
| `triggerMode` | `("click" \| "hover" \| "contextMenu")[]` | The trigger mode which executes the dropdown/menu action. | `["click"]` |
| `items` | `MenuItem[]` | The menu items to render. | - |
| `defaultOpen` | `boolean` | Whether the menu is open by default. | `false` |
| `interactive` | `boolean` | Enable client-side hydration. | `true` |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | The size of the menu. | `"md"` |
| `class` | `string` | Custom CSS classes for the root element. | - |
| `contentClass` | `string` | Custom CSS classes for the content element. | - |
| `positionerClass` | `string` | Custom CSS classes for the positioner element. | - |
| `placement` | `'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end' \| 'left-start' \| 'left-end' \| 'right-start' \| 'right-end'` | Align/placement of popup menu. | `'bottom-start'` |
| `destroyOnHidden` | `boolean` | Whether to destroy (unmount) the menu content when hidden. | `false` |

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

> Note: `submenu` entries with items are fully supported recursively in the flattened API. Use primitive sub-components if you need custom markup.

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

## Cascading Submenu

```tsx
import { Menu, Button } from "../components/ui";

export default function SubmenuPage() {
  return (
    <Menu
      trigger={<Button>More Options</Button>}
      items={[
        { type: "item", label: "New Window", value: "new-window" },
        {
          type: "submenu",
          label: "Recent Files",
          items: [
            { type: "item", label: "project1.zip", value: "p1" },
            { type: "item", label: "notes.txt", value: "notes" },
          ]
        }
      ]}
    />
  );
}
```

## Trigger Modes (Hover / ContextMenu)

```tsx
import { Menu, Button } from "../components/ui";

export default function TriggerModesPage() {
  return (
    <div>
      {/* Opens on hover */}
      <Menu
        trigger={<Button>Hover Me</Button>}
        triggerMode={["hover"]}
        items={[
          { type: "item", label: "Option 1", value: "1" },
          { type: "item", label: "Option 2", value: "2" },
        ]}
      />

      {/* Right-click Context Menu */}
      <Menu
        triggerMode={["contextMenu"]}
        trigger={<div style={{ padding: "50px", border: "1px dashed gray" }}>Right-click inside this area</div>}
        items={[
          { type: "item", label: "Copy", value: "copy" },
          { type: "item", label: "Paste", value: "paste" },
        ]}
      />
    </div>
  );
}
```
