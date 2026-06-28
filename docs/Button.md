# Button

# Introduction
A clickable component for triggering actions and user interactions.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Content to be rendered inside the component. |
| `class` | `string` | Custom CSS classes. |
| `variant` | `"solid" \| "surface" \| "subtle" \| "outline" \| "plain"` | The visual style of the button. |
| `size` | `"2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | The size of the button. |
| `loading` | `boolean` | If `true`, the button will show a loading spinner. |
| `loadingText` | `string` | The text to show while loading. |
| `type` | `"button" \| "submit" \| "reset"` | The HTML button type. |
| `colorPalette` | `string` | The color theme of the button. |

# Usage

```tsx
import { Button } from "../components/ui";

export default function MyPage() {
  return (
    <Button variant="solid" colorPalette="blue">
      Click me
    </Button>
  );
}
```

## Loading state

```tsx
import { Button } from "../components/ui";

export default function MyPage() {
  return (
    <Button loading loadingText="Saving...">
      Save
    </Button>
  );
}
```
