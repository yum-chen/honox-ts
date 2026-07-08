# Collapsible

# Introduction

An interactive component that can be expanded or collapsed to show or hide content.

# Props

| Prop                 | Type                          | Description                                                              |
| :------------------- | :---------------------------- | :----------------------------------------------------------------------- |
| `trigger`            | `JSX.Element \| string`       | The trigger element or string. A string is wrapped in a button.          |
| `content`            | `JSX.Element`                 | The content to be shown or hidden.                                       |
| `indicator`          | `JSX.Element`                 | Optional indicator element (e.g. a chevron).                             |
| `indicatorPlacement` | `"start" \| "end"`            | Where to place the indicator relative to the trigger. Default: `"end"`.  |
| `open`               | `boolean`                     | Whether the collapsible is open (controlled).                            |
| `defaultOpen`        | `boolean`                     | Whether the collapsible is open by default (uncontrolled).               |
| `onOpenChange`       | `(open: boolean) => void`     | Callback for when the open state changes.                                |
| `disabled`           | `boolean`                     | Whether the collapsible is disabled.                                     |
| `interactive`        | `boolean`                     | Enable client-side interactivity. Defaults to `true` when interactive props are present. |
| `class`              | `string`                      | Root element class name.                                                 |
| `triggerClass`       | `string`                      | Trigger element class name.                                              |
| `contentClass`       | `string`                      | Content element class name.                                              |
| `indicatorClass`     | `string`                      | Indicator element class name.                                            |
| `id`                 | `string`                      | ID for the collapsible.                                                  |

# Usage

## Basic Collapsible

```tsx
import { Collapsible } from "../components/ui";

export default function MyPage() {
  return (
    <Collapsible
      trigger="Show more"
      content={<p>Additional details go here.</p>}
      defaultOpen
    />
  );
}
```

## With Indicator and Controlled State

```tsx
import { Collapsible } from "../components/ui";

export default function MyPage() {
  return (
    <Collapsible
      trigger="Details"
      content={<p>Content revealed on toggle.</p>}
      indicatorPlacement="start"
      onOpenChange={(open) => console.log("open:", open)}
    />
  );
}
```
