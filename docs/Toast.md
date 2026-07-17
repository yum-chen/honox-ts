# Toast

# Introduction

A transient notification used to provide feedback about an action. Toasts are created imperatively through the `toaster` API. Mount a single `<Toast.Toaster />` to render them.

Our refined Toast system supports custom status color palettes, advanced auto-pause behaviors on hover/focus, smooth pointer-driven drag-to-dismiss gestures, custom positioning configurations, and fully robust promise handling.

> A live, runnable version of every example below is in `app/routes/index.tsx` — the **Toast Component Examples** section. The docs examples are kept in sync with that file.

# Usage

## Mount the Toaster

Place `<Toast.Toaster />` once near your app root (this matches `app/routes/index.tsx`):

```tsx
import { Toast } from "../components/ui";

export default function App() {
  return (
    <>
      {/* ...your application... */}
      <Toast.Toaster />
    </>
  );
}
```

## Show a toast (client components / islands)

From a hydrated client component or island, call `Toast.toaster.*`:

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

## Show a toast (SSG-safe)

The home-page demo triggers toasts by dispatching the underlying `park-ui:toast:create` CustomEvent directly. This works **without client hydration**, which is why the static `onclick` attribute is used instead of a JSX `onClick` handler. The following block is reproduced from `app/routes/index.tsx`:

```tsx
<Toast.Toaster />
<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
  <Button
    variant="outline"
    onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Success', description: 'Action completed successfully', closable: true, type: 'success' } }))"
  >
    Show Success Toast
  </Button>
  <Button
    variant="outline"
    onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Error', description: 'An error occurred', closable: true, type: 'error' } }))"
  >
    Show Error Toast
  </Button>
  <Button
    variant="outline"
    onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Loading', description: 'Please wait...', type: 'loading' } }))"
  >
    Show Loading Toast
  </Button>
</div>
```

> Note: Toast content is created **imperatively** — `title` and `description` accept strings only, so a toast's body cannot be authored as JSX. The `Toaster` renders it internally from the private primitives.

# Advanced Features

## Auto-Pause on Hover and Focus
Auto-dismiss timers automatically pause when the user hovers over a toast item (`pointerenter`) or focuses inside a toast (`focusin`). Once the pointer leaves (`pointerleave`) or focus is shifted out (`focusout`), the remaining duration timer is safely resumed, preventing premature dismissal of active notifications while the user is actively reading or interacting with them.

## Drag / Swipe-to-Dismiss Gesture
Toasts are fully touch and pointer-responsive. By using standard pointer event tracking, a user can grab and swipe/drag a toast in any direction to dismiss it.
- Moving the pointer translates the toast on the screen and dynamically fades out its opacity.
- If the drag distance exceeds the threshold (`80px`), the toast is animated away and dismissed.
- If released before reaching the threshold, the toast is returned to its original position with full opacity, and the timer resumes.

## Promise Handling
You can bind a toast to a promise, managing the loading, success, and error cycles cleanly:

```tsx
import { Toast } from "../components/ui";

const myPromise = fetch("/api/data");

Toast.toaster.promise(myPromise, {
  loading: { title: "Fetching data..." },
  success: (response) => ({ title: "Success!", description: "Data loaded successfully." }),
  error: (err) => ({ title: "Error", description: err.message }),
});
```

# API

`Toast.toaster` provides the following helpers:

| Method | Signature |
| :--- | :--- |
| `create` | `(options: Omit<ToastOptions, "id">) => string` |
| `success` | `(title: string, options?: Partial<ToastOptions>) => string` |
| `error` | `(title: string, options?: Partial<ToastOptions>) => string` |
| `warning` | `(title: string, options?: Partial<ToastOptions>) => string` |
| `info` | `(title: string, options?: Partial<ToastOptions>) => string` |
| `dismiss` | `(id?: string) => void` |

## ToastOptions

| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | `string` | The toast title. |
| `description` | `string` | The toast description. |
| `type` | `"info" \| "success" \| "warning" \| "error" \| "loading"` | Intent/style of the toast. |
| `duration` | `number` | Auto-dismiss duration in milliseconds. |
| `closable` | `boolean` | Whether the toast can be dismissed. |
| `action` | `{ label: string; onClick: () => void }` | Optional action button. |
