# Slider

# Introduction
A control that allows the user to select a value from a range.

# Props

## Root Props
| Prop | Type | Description |
| :--- | :--- | :---------- |
| `orientation` | `"horizontal" \| "vertical"` | The orientation of the slider. |
| `value` | `number[]` | The values of the slider (controlled). |
| `defaultValue` | `number[]` | The initial values of the slider (uncontrolled). |
| `min` | `number` | The minimum value. |
| `max` | `number` | The maximum value. |
| `step` | `number` | The step increment. |
| `onValueChange` | `(details: { value: number[] }) => void` | Callback triggered when values change. |
| `interactive` | `boolean` | Forces hydration as an island. |

# Usage

```tsx
import * as Slider from "../components/ui/slider";

export default function MyPage() {
  return (
    <Slider.Root
      defaultValue={[30]}
      min={0}
      max={100}
      interactive
    >
      <Slider.Label>Volume</Slider.Label>
      <Slider.Control>
        <Slider.Track>
          <Slider.Range />
        </Slider.Track>
        <Slider.Thumb index={0} />
      </Slider.Control>
    </Slider.Root>
  );
}
```

## With Markers

```tsx
<Slider.Root defaultValue={[50]} interactive>
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0} />
    <Slider.MarkerGroup>
      <Slider.Marker value={0}>
        <Slider.MarkerIndicator />
        <span>0</span>
      </Slider.Marker>
      <Slider.Marker value={50}>
        <Slider.MarkerIndicator />
        <span>50</span>
      </Slider.Marker>
      <Slider.Marker value={100}>
        <Slider.MarkerIndicator />
        <span>100</span>
      </Slider.Marker>
    </Slider.MarkerGroup>
  </Slider.Control>
</Slider.Root>
```
