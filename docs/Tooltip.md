# Tooltip

# Introduction

A component for displaying contextual information on hover or focus.

# Props

## Tooltip (High-level wrapper)

| Prop           | Type      | Description                                                                           |
| :------------- | :-------- | :------------------------------------------------------------------------------------ |
| `children`     | `any`     | The element that triggers the tooltip.                                                |
| `content`      | `any`     | The content to display within the tooltip.                                            |
| `showArrow`    | `boolean` | Whether to show an arrow pointing to the trigger.                                     |
| `open`         | `boolean` | Whether the tooltip is open (controlled).                                             |
| `disabled`     | `boolean` | Whether the tooltip is disabled.                                                      |
| `interactive`  | `boolean` | Whether the tooltip's content is interactive (remains open when hovered) and enables client-side hydration. |
| `asChild`      | `boolean` | Whether to merge props onto the immediate child element instead of wrapping in a div. |

## Root (Composition)

| Prop           | Type      | Description                                        |
| :------------- | :-------- | :------------------------------------------------- |
| `children`     | `any`     | Tooltip sub-components.                            |
| `id`           | `string`  | Unique identifier for the tooltip.                 |
| `open`         | `boolean` | Whether the tooltip is open.                       |
| `disabled`     | `boolean` | Whether the tooltip is disabled.                   |
| `interactive`  | `boolean` | Forces hydration as an island. Defaults to `true`. |

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

## Composition

```tsx
import * as Tooltip from "../components/ui/tooltip";

export default function MyPage() {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>Content</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip.Root>
  );
}
```

# Limitations

This Hono/JSX port currently uses static CSS positioning (absolute positioning relative to the trigger). It does not include dynamic collision detection or flip logic provided by libraries like Floating UI.
