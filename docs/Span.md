# Span

# Introduction
A simple `span` component that supports typographic variants from the `text` recipe.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | The text or content. |
| `class` | `string` | Custom CSS classes. |
| `size` | `string` | The font size variant. |
| `variant` | `string` | Typographic style variant (e.g., "heading", "label"). |

# Usage

```tsx
import { Span } from "../components/ui";

export default function MyPage() {
  return (
    <p>
      This is a <Span variant="label" colorPalette="red">highlighted</Span> word.
    </p>
  );
}
```
