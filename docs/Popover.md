# Popover

# Introduction
An interactive element that displays additional content in a layer over its anchor.

# Props

## Root
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Popover sub-components. |
| `open` | `boolean` | Whether the popover is open (controlled). |
| `interactable` | `boolean` | Forces hydration as an island. Defaults to `true`. |
| `id` | `string` | Unique identifier for the popover. |

## Trigger
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `asChild` | `boolean` | Whether to merge props onto the immediate child element. |

# Usage

```tsx
import * as Popover from "../components/ui/popover";
import { Button } from "../components/ui/button";

export default function MyPage() {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button>Open Popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow>
            <Popover.ArrowTip />
          </Popover.Arrow>
          <Popover.Header>
            <Popover.Title>Title</Popover.Title>
            <Popover.Description>Description</Popover.Description>
          </Popover.Header>
          <Popover.Body>
            Popover Body
          </Popover.Body>
          <Popover.Footer>
            <Popover.CloseTrigger asChild>
              <Button variant="outline">Close</Button>
            </Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover.Root>
  );
}
```

# Limitations
This Hono/JSX port currently uses static CSS positioning (absolute positioning relative to the trigger). It does not include dynamic collision detection or flip logic provided by libraries like Floating UI.
