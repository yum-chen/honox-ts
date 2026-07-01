# Fieldset

# Introduction
Groups related form controls and provides a legend.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Content to be rendered inside the component. |
| `class` | `string` | Custom CSS classes. |
| `id` | `string` | Unique identifier. |
| `disabled` | `boolean` | Whether the fieldset is disabled. |
| `invalid` | `boolean` | Whether the fieldset is in an invalid state. |
| `interactive` | `boolean` | Whether to enable client-side hydration. |

# Usage

```tsx
import { Fieldset, FieldsetControl, FieldsetLegend, FieldsetHelperText, FieldsetContent, Field } from "../components/ui";

export default function MyPage() {
  return (
    <Fieldset>
      <FieldsetControl>
        <FieldsetLegend>User Profile</FieldsetLegend>
        <FieldsetHelperText>Manage your info.</FieldsetHelperText>
      </FieldsetControl>
      <FieldsetContent>
        <Field>...</Field>
      </FieldsetContent>
    </Fieldset>
  );
}
```
