# Spinner

# Introduction

A component used to indicate a loading state.

# Props

| Prop       | Type                                                         | Description                                  |
| :--------- | :----------------------------------------------------------- | :------------------------------------------- |
| `children` | `any`                                                        | Content to be rendered inside the component. |
| `class`    | `string`                                                     | Custom CSS classes.                          |
| `size`     | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "inherit"` | The size of the spinner.                     |
| `label`    | `string`                                                     | An accessible label for screen readers.      |

# Usage

```tsx
import { Spinner } from "../components/ui";

export default function MyPage() {
  return <Spinner size="md" label="Loading..." />;
}
```
