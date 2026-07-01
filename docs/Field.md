# Field

# Introduction

A foundational component for form fields, managing labels, helper text, error messages, and validation state. It supports a flattened API for simple use cases and sub-components for more complex layouts.

# Props

| Prop            | Type                                 | Description                                                                                   |
| :-------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------- |
| `children`      | `any`                                | Content to be rendered inside the component. If provided, the internal input is not rendered. |
| `class`         | `string`                             | Custom CSS classes.                                                                           |
| `id`            | `string`                             | Unique identifier. If not provided, one is generated.                                         |
| `label`         | `Child`                              | The label for the field.                                                                      |
| `helperText`    | `Child`                              | The helper text for the field.                                                                |
| `errorText`     | `Child`                              | The error text for the field.                                                                 |
| `disabled`      | `boolean`                            | Whether the field is disabled.                                                                |
| `invalid`       | `boolean`                            | Whether the field is in an invalid state.                                                     |
| `required`      | `boolean`                            | Whether the field is required.                                                                |
| `readOnly`      | `boolean`                            | Whether the field is read-only.                                                               |
| `value`         | `string`                             | The current value (for interactive mode).                                                     |
| `defaultValue`  | `string`                             | The initial value.                                                                            |
| `onValueChange` | `(val: string) => void`              | Callback triggered when value changes.                                                        |
| `minLength`     | `number`                             | Minimum length validation.                                                                    |
| `validator`     | `(val: string) => boolean \| string` | Custom validation function.                                                                   |
| `interactive`   | `boolean`                            | Forces hydration as an island.                                                                |

# Usage

## Flattened API

The simplest way to use Field is with the flattened props. It will automatically render an input.

```tsx
import { Field } from "../components/ui";

export default function MyPage() {
  return (
    <Field
      label="Username"
      helperText="Choose a unique username."
      placeholder="Type here..."
      minLength={3}
      interactive
    />
  );
}
```

## Composition

For more control, you can wrap other components like `Textarea` or custom inputs.

```tsx
import { Field, Textarea } from "../components/ui";

export default function MyPage() {
  return (
    <Field
      label="Bio"
      helperText="Tell us about yourself."
      errorText="Too short!"
      minLength={10}
      interactive
    >
      <Textarea placeholder="A short bio" />
    </Field>
  );
}
```
