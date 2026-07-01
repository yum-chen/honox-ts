# Splitter

# Introduction
A component that allows users to resize panels by dragging a separator.

# Props

## Root Props
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `orientation` | `"horizontal" \| "vertical"` | The orientation of the splitter. |
| `size` | `{ id: string \| number; size: number }[]` | The sizes of the panels (controlled). |
| `defaultSize` | `{ id: string \| number; size: number }[]` | The initial sizes of the panels (uncontrolled). |
| `onSizeChange` | `(size: { id: string \| number; size: number }[]) => void` | Callback triggered when panel sizes change. |
| `interactive` | `boolean` | Forces hydration as an island. |

## Panel Props
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `id` | `string \| number` | Unique identifier for the panel. |

## ResizeTrigger Props
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `id` | `string` | Unique identifier for the trigger. |

# Usage

```tsx
import * as Splitter from "../components/ui/splitter";

export default function MyPage() {
  return (
    <Splitter.Root
      defaultSize={[
        { id: '1', size: 50 },
        { id: '2', size: 50 },
      ]}
      interactive
    >
      <Splitter.Panel id="1">Panel 1</Splitter.Panel>
      <Splitter.ResizeTrigger id="1:2" />
      <Splitter.Panel id="2">Panel 2</Splitter.Panel>
    </Splitter.Root>
  );
}
```
