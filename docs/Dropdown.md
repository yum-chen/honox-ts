# Dropdown

# Introduction

A list of actions or options that appears when triggered. Supports custom
placements with automatic viewport-overflow flipping, an optional arrow,
checkbox/radio/group items, cascading submenus, and click / hover / context
menu trigger modes.

# Props

## Dropdown

| Prop | Type | Description | Default |
| :--- | :--- | :--- | :--- |
| `trigger` | `JSX.Element` | Element that opens the menu when activated. | - |
| `items` | `DropdownItem[]` | The menu items to render. | - |
| `open` | `boolean` | Whether the menu is open (controlled). | - |
| `defaultOpen` | `boolean` | Whether the menu is open by default (uncontrolled). | `false` |
| `disabled` | `boolean` | Disables every trigger mode and renders the trigger inert. | `false` |
| `interactive` | `boolean` | Forces hydration as an island. Defaults to `true`. | `true` |
| `arrow` | `boolean` | Show a pointer arrow pointing from the menu to the trigger. | `false` |
| `placement` | `string` | Menu placement: `"top"` \| `"topLeft"` \| `"topRight"` \| `"bottom"` \| `"bottomLeft"` \| `"bottomRight"` \| `"left"` \| `"leftTop"` \| `"leftBottom"` \| `"right"` \| `"rightTop"` \| `"rightBottom"`. Dash-case aliases (`"bottom-start"`, `"top-end"`, ...) are also accepted. | `"bottomLeft"` |
| `triggerMode` | `("click" \| "hover" \| "contextDropdown")[] \| string` | Trigger interaction modes to open/close the menu. `"contextDropdown"` alone (no `"click"`/`"hover"`) renders the trigger as a plain right-click target instead of a button. | `["click"]` |
| `mouseEnterDelay` | `number` | Delay in ms before opening when `triggerMode` includes `"hover"`. | `150` |
| `mouseLeaveDelay` | `number` | Delay in ms before closing when `triggerMode` includes `"hover"`. | `100` |
| `closeOnEscape` | `boolean` | Close when Escape is pressed. | `true` |
| `onOpenChange` | `(open: boolean) => void` | Called when the menu opens or closes. | - |
| `onSelect` | `(value: string) => void` | Called with an item's `value` when it is activated. | - |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | The size of the menu. | `"md"` |
| `class` | `string` | Custom CSS classes for the root element. | - |
| `contentClass` | `string` | Custom CSS classes for the content element. | - |
| `positionerClass` | `string` | Custom CSS classes for the positioner element. | - |

### DropdownItem

| Property | Type | Description |
| :--- | :--- | :--- |
| `type` | `"item" \| "separator" \| "checkbox" \| "radio" \| "radio-group" \| "submenu" \| "group"` | The kind of menu entry. |
| `label` | `string` | Display text (for `item`, `checkbox`, `radio`, `submenu`, and optionally `group`). |
| `value` | `string` | Unique value (for `item`, `checkbox`, `radio`, `radio-group`). |
| `checked` | `boolean` | Checked state (for `checkbox`, `radio`). |
| `icon` | `JSX.Element` | Leading icon (for `item`, `checkbox`, `radio`, `submenu`). |
| `indicator` | `JSX.Element` | Custom trailing indicator element (for `item`). |
| `items` | `DropdownItem[]` | Nested items (for `radio-group`, `submenu`, `group`). Submenu/group items may themselves be any `DropdownItem`, including further submenus. |
| `disabled` | `boolean` | Whether the item (or, for `submenu`, the whole nested menu) is disabled. |
| `class` | `string` | Custom CSS classes for the item. |

# Usage

## Basic Dropdown

```tsx
import { Dropdown, Button } from "../components/ui";

export default function MyPage() {
  return (
    <Dropdown
      trigger={<Button>Open Dropdown</Button>}
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

## Groups and cascading submenus

```tsx
<Dropdown
  trigger={<Button>Open Dropdown</Button>}
  items={[
    {
      type: "group",
      label: "File",
      items: [
        { type: "item", label: "New", value: "new" },
        { type: "item", label: "Open", value: "open" },
      ],
    },
    { type: "separator" },
    {
      type: "submenu",
      label: "Share",
      items: [
        { type: "item", label: "Email", value: "email" },
        { type: "item", label: "Link", value: "link" },
      ],
    },
  ]}
/>
```

## Custom placement, arrow, and hover trigger

```tsx
<Dropdown
  trigger={<Button>Hover Me</Button>}
  placement="bottomRight"
  triggerMode="hover"
  arrow={true}
  mouseEnterDelay={100}
  mouseLeaveDelay={150}
  items={[
    { type: "item", label: "Profile", value: "profile" },
    { type: "item", label: "Settings", value: "settings" },
    { type: "separator" },
    { type: "item", label: "Logout", value: "logout" },
  ]}
/>
```

## Context menu

A trigger wired for `"contextDropdown"` alone opens on right-click, anchored
at the pointer, instead of behaving like a button:

```tsx
<Dropdown
  trigger={<div>Right-click this area</div>}
  triggerMode="contextDropdown"
  items={[
    { type: "item", label: "Copy", value: "copy" },
    { type: "item", label: "Paste", value: "paste" },
  ]}
/>
```

## Controlled open state

```tsx
const [open, setOpen] = useState(false);

<Dropdown
  open={open}
  onOpenChange={setOpen}
  trigger={<Button>Open Dropdown</Button>}
  items={[{ type: "item", label: "Edit", value: "edit" }]}
/>;
```

# Note

Please ensure that `trigger` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`,
and `onClick` — the trigger element is cloned in place with these (and the
relevant ARIA/`data-*`) attributes attached, rather than wrapped.

# Limitations

The interactive island positions the menu relative to its trigger's own
wrapper (`position: absolute`, not a portal): it flips to the opposite side
when the requested placement would overflow the viewport, and clamps the
cross axis so the menu never renders off-screen. It does not track scroll
containers or resize observers the way Floating UI does — repositioning only
re-runs on window `resize` while open, and scrolling the page moves the menu
along with the trigger for free. A menu opened from deep inside a scrolling
or `overflow: hidden` container can still be visually clipped by that
container, the same tradeoff `Popover` and `Tooltip` make.

Context menus (`triggerMode="contextDropdown"`) and submenus are the
exception: since they aren't anchored to a trigger's box (a context menu
opens at the pointer; a submenu opens beside a menu item), they're positioned
with `position: fixed` and hand-rolled coordinates instead, and are re-run on
Escape/scroll/resize like the rest of the menu.

Each submenu is its own nested interactive island, scoped via a
`data-overlay-root` marker so a parent menu's positioning and outside-click
logic don't reach into a submenu's own content (and vice versa). Selecting a
regular item closes every open menu level it bubbles through; toggling a
checkbox/radio item inside any level keeps the whole stack open.

The `_closed` exit animation (`slide-fade-out`) plays before the menu is
actually removed from layout — closing doesn't hide it instantly.
