# Switch

# Introduction
A control that allows the user to toggle between checked and unchecked states.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Label content to be rendered next to the switch. |
| `class` | `string` | Custom CSS classes. |
| `checked` | `boolean` | Whether the switch is checked (controlled). |
| `defaultChecked` | `boolean` | The initial checked state (uncontrolled). |
| `disabled` | `boolean` | Whether the switch is disabled. |
| `onCheckedChange` | `(checked: boolean) => void` | Callback triggered when the checked state changes. |
| `size` | `"sm" | "md" | "lg"` | The size of the switch. |
| `interactive` | `boolean` | Forces hydration as an island. |

# Usage

```tsx
import { Switch } from "../components/ui";

export default function MyPage() {
  return (
    <Switch defaultChecked={true} onCheckedChange={(checked) => console.log(checked)}>
      Enable Notifications
    </Switch>
  );
}
```
