# Dialog

# Introduction

A modal window overlaid on the page that requires user interaction before continuing.

# Props

## Dialog

| Prop | Type | Description |
| :--- | :--- | :--- |
| `trigger` | `JSX.Element` | Element that opens the dialog when activated. |
| `title` | `string \| JSX.Element` | The dialog title. |
| `description` | `string \| JSX.Element` | The dialog description. |
| `body` | `string \| JSX.Element` | The main body content. |
| `footer` | `string \| JSX.Element` | Custom footer content. |
| `cancel` | `JSX.Element` | Element rendered as a close (cancel) trigger. |
| `confirm` | `JSX.Element` | Element rendered as an action trigger. |
| `closable` | `boolean` | Whether to show the close button. Default: `true`. |
| `interactive` | `boolean` | Enable client-side hydration for interactive behavior. |
| `class` | `string` | Custom CSS classes for the root element. |

Additional props (e.g. `open`, `defaultOpen`, `onOpenChange`, `id`) are forwarded to the underlying dialog primitive.

# Usage

## Basic Dialog

```tsx
import { Dialog, Button } from "../components/ui";

export default function MyPage() {
  return (
    <Dialog
      trigger={<Button>Open Dialog</Button>}
      title="Confirm action"
      description="Are you sure you want to continue?"
      body="This action cannot be undone."
      cancel={<Button variant="outline">Cancel</Button>}
      confirm={<Button>Confirm</Button>}
    />
  );
}
```
