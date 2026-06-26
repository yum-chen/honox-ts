# Textarea

# Introduction
A multi-line text input component that integrates with the `Field` context.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `class` | `string` | Custom CSS classes. |
| `value` | `string` | The current value. |
| `defaultValue` | `string` | The initial value. |
| `onInput` | `(e: any) => void` | Event handler for input changes. |
| `rows` | `number` | Number of visible text lines. |
| `placeholder` | `string` | Hint text. |
| `validator` | `(val: string) => boolean` | Custom validation logic. |
| `interactive` | `boolean` | Forces hydration as an island. |

# Usage

```tsx
import { Textarea, Field, FieldGroup } from "../components/ui";

export default function MyPage() {
  return (
    <Field>
       <FieldGroup label="Bio">
         <Textarea placeholder="Write here..." rows={4} interactive={true} />
       </FieldGroup>
    </Field>
  );
}
```
