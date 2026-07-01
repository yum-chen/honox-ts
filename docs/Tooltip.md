# Tooltip

# Introduction
A component for displaying contextual information on hover or focus.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | The element that triggers the tooltip. |
| `content` | `any` | The content to display within the tooltip. |
| `showArrow` | `boolean` | Whether to show an arrow pointing to the trigger. |
| `open` | `boolean` | Whether the tooltip is open (controlled). |
| `disabled` | `boolean` | Whether the tooltip is disabled. |
| `interactive` | `boolean` | Whether the tooltip's content is interactive (remains open when hovered). |
| `interactable` | `boolean` | Forces hydration as an island. Defaults to `true`. |
| `asChild` | `boolean` | Whether to merge props onto the immediate child element instead of wrapping in a div. |
| `triggerProps` | `TooltipTriggerProps` | Additional props for the trigger element. |
| `contentProps` | `TooltipContentProps` | Additional props for the content element. |

# Usage

```tsx
import { Tooltip } from "../components/ui";

export default function MyPage() {
  return (
    <Tooltip content="This is the tooltip content">
      <button>Hover me</button>
    </Tooltip>
  );
}
```

## Interactive Content

To allow users to interact with the content inside the tooltip (e.g., clicking a link), use the `interactive` prop:

```tsx
<Tooltip
  interactive
  content={<div>Click <a href="/more">here</a> for details</div>}
>
  <button>Hover me</button>
</Tooltip>
```
