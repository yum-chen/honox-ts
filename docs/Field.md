# Field

# Introduction
A foundational component for form fields, managing labels, helper text, error messages, and validation state.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Content to be rendered inside the component. |
| `class` | `string` | Custom CSS classes. |
| `id` | `string` | Unique identifier. If not provided, one is generated. |
| `disabled` | `boolean` | Whether the field is disabled. |
| `invalid` | `boolean` | Whether the field is in an invalid state. |
| `required` | `boolean` | Whether the field is required. |
| `readOnly` | `boolean` | Whether the field is read-only. |
| `value` | `string` | The current value (for interactive mode). |
| `defaultValue` | `string` | The initial value. |
| `onValueChange` | `(val: string) => void` | Callback triggered when value changes. |
| `minLength` | `number` | Minimum length validation. |
| `validator` | `(val: string) => boolean` | Custom validation function. |
| `interactive` | `boolean` | Forces hydration as an island. |

# Usage

```tsx
import { Field, FieldLabel, FieldGroup, Textarea } from "../components/ui";

export default function MyPage() {
  return (
    <Field
      id="bio"
      minLength={10}
      interactive={true}
    >
      <FieldGroup
        label="Bio"
        helperText="Tell us about yourself."
        errorText="Too short!"
      >
        <Textarea placeholder="A short bio" />
      </FieldGroup>
    </Field>
  );
}
```
