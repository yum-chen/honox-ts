# Collapsible

An interactive component which can be expanded or collapsed.

## Usage

```tsx
import * as Collapsible from './ui/collapsible'

const Example = () => (
  <Collapsible.Root defaultOpen>
    <Collapsible.Trigger>Toggle</Collapsible.Trigger>
    <Collapsible.Content>
      Content
    </Collapsible.Content>
  </Collapsible.Root>
)
```

## Props

### Root

| Prop | Type | Description |
| --- | --- | --- |
| `open` | `boolean` | The controlled open state of the collapsible. |
| `defaultOpen` | `boolean` | The initial open state when rendering. |
| `onOpenChange` | `(details: { open: boolean }) => void` | Callback invoked when the open state changes. |
| `disabled` | `boolean` | Whether the collapsible is disabled. |
| `interactive` | `boolean` | Whether to enable client-side interactivity. Defaults to `true` if interactive props are present. |

### Trigger

| Prop | Type | Description |
| --- | --- | --- |
| `disabled` | `boolean` | Whether the trigger is disabled. |

### Content

| Prop | Type | Description |
| --- | --- | --- |
| `class` | `string` | Custom CSS classes for the content. |

### Indicator

| Prop | Type | Description |
| --- | --- | --- |
| `class` | `string` | Custom CSS classes for the indicator. |
