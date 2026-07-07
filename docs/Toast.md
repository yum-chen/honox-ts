# Toast

# Introduction

A transient notification used to provide feedback about an action. Supports an imperative API and a composable primitive API.

# Props

Toast is exported as a namespace. The primitives accept the props below; `type` controls the visual intent.

## Toast.Root

| Prop | Type | Description |
| :--- | :--- | :--- |
| `type` | `"info" \| "success" \| "warning" \| "error" \| "loading"` | The intent/style of the toast. |
| `class` | `string` | Custom CSS classes for the root element. |

## Toast.Title / Toast.Description / Toast.Indicator

| Prop | Type | Description |
| :--- | :--- | :--- |
| `class` | `string` | Custom CSS classes for the element. |

## Toast.ActionTrigger / Toast.CloseTrigger

| Prop | Type | Description |
| :--- | :--- | :--- |
| `asChild` | `boolean` | Render as the child element (slot). |
| `class` | `string` | Custom CSS classes for the element. |

# Imperative API

`Toast.toaster` provides shortcut helpers:

| Method | Signature |
| :--- | :--- |
| `create` | `(options: Omit<ToastOptions, "id">) => string` |
| `success` | `(title: string, options?: Partial<...>) => string` |
| `error` | `(title: string, options?: Partial<...>) => string` |
| `warning` | `(title: string, options?: Partial<...>) => string` |
| `info` | `(title: string, options?: Partial<...>) => string` |
| `dismiss` | `(id?: string) => void` |

### ToastOptions

| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The toast title. |
| `description` | `string` | The toast description. |
| `type` | `"info" \| "success" \| "warning" \| "error" \| "loading"` | Intent. |
| `duration` | `number` | Auto-dismiss duration in ms. |
| `closable` | `boolean` | Whether the toast can be dismissed. |
| `action` | `{ label: string; onClick: () => void }` | Optional action button. |

# Usage

## Imperative Toast

```tsx
import { Toast, Button } from "../components/ui";

export default function MyPage() {
  return (
    <Button
      onClick={() =>
        Toast.toaster.success("Saved!", { description: "Your changes are live." })
      }
    >
      Save
    </Button>
  );
}
```

## Composable Toast

```tsx
import { Toast } from "../components/ui";

export default function MyToast() {
  return (
    <Toast.Root type="success">
      <Toast.Title>Success</Toast.Title>
      <Toast.Description>Operation completed.</Toast.Description>
      <Toast.CloseTrigger>Dismiss</Toast.CloseTrigger>
    </Toast.Root>
  );
}
```

# Sub-components

`Toast.Root`, `Toast.Title`, `Toast.Description`, `Toast.ActionTrigger`, `Toast.CloseTrigger`, `Toast.Indicator`, `Toast.Toaster`
