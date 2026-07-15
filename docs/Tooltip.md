# Tooltip

# Introduction

A component for displaying contextual information on hover or focus.

# Props

## Tooltip (High-level wrapper)

| Prop           | Type                                        | Description                                                                           |
| :------------- | :------------------------------------------ | :------------------------------------------------------------------------------------ |
| `children`     | `any`                                       | The element that triggers the tooltip.                                                |
| `content`      | `any`                                       | The content to display within the tooltip.                                            |
| `showArrow`    | `boolean`                                   | Whether to show an arrow pointing to the trigger.                                     |
| `open`         | `boolean`                                   | Whether the tooltip is open (controlled).                                             |
| `defaultOpen`  | `boolean`                                   | Initial open state of the tooltip (uncontrolled).                                     |
| `onOpenChange` | `(details: { open: boolean }) => void`      | Called when the tooltip opens or closes.                                              |
| `disabled`     | `boolean`                                   | Whether the tooltip is disabled.                                                      |
| `interactive`  | `boolean`                                   | Whether the tooltip's content is interactive (remains open when hovered) and enables client-side hydration. |
| `asChild`      | `boolean`                                   | Whether to merge props onto the immediate child element instead of wrapping in a div. |
| `placement`    | `"top" \| "bottom" \| "left" \| "right"`    | Which side of the trigger the tooltip opens on. Default `"top"`.                     |
| `classNames`   | `object`                                    | Dictionary of custom CSS classes for individual tooltip slots.                        |
| `styles`       | `object`                                    | Dictionary of custom inline styles for individual tooltip slots.                      |

### Semantic Slots for `classNames` and `styles`

*   `root` - The root relative container element.
*   `trigger` - The trigger button or element.
*   `positioner` - The absolute-positioned layout positioning layer.
*   `content` - The actual tooltip text container box.
*   `arrow` - The outer arrow positioning block.
*   `arrowTip` - The inner rotated arrow tip diamond.

# Usage

## High-level wrapper

```tsx
import { Tooltip } from "../components/ui/tooltip";

export default function MyPage() {
  return (
    <Tooltip content="This is the tooltip content">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Custom Placements

You can position the tooltip on any side of its trigger:

```tsx
import { Tooltip } from "../components/ui/tooltip";

export default function MyPage() {
  return (
    <Tooltip content="Bottom Tooltip" placement="bottom" showArrow={true}>
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Advanced Styling with Slots

You can custom style individual parts of the Tooltip using the `classNames` and `styles` props:

```tsx
import { Tooltip } from "../components/ui/tooltip";

export default function MyPage() {
  return (
    <Tooltip
      content="Sleek Dark Tooltip"
      classNames={{
        content: "custom-tooltip-content",
        arrowTip: "custom-tooltip-arrow-tip",
      }}
      styles={{
        content: { background: "var(--colors-gray-900)", color: "#fff", borderRadius: "8px" },
        arrowTip: { background: "var(--colors-gray-900)" }
      }}
    >
      <button>Hover me</button>
    </Tooltip>
  );
}
```

# Limitations

This Hono/JSX port currently uses static CSS positioning (absolute positioning relative to the trigger). It does not include dynamic collision detection or flip logic provided by libraries like Floating UI.
