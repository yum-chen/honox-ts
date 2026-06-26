# Alert

# Introduction
Displays a brief, important message in a way that attracts the user's attention without interrupting the user's tasks.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `children` | `any` | Content to be rendered inside the component. |
| `class` | `string` | Custom CSS classes. |
| `status` | `"info" \| "success" | "warning" | "error"` | The status color palette of the alert. |
| `variant` | `"subtle" \| "solid" | "outline"` | The visual style of the alert. |
| `interactive` | `boolean` | Whether to enable client-side hydration. |

# Usage

```tsx
import { Alert, AlertContent, AlertDescription, AlertIndicator, AlertTitle } from "../components/ui";

export default function MyPage() {
  return (
    <Alert status="success">
      <AlertIndicator />
      <AlertContent>
        <AlertTitle>Success</AlertTitle>
        <AlertDescription>Your changes have been saved.</AlertDescription>
      </AlertContent>
    </Alert>
  );
}
```
