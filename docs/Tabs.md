# Tabs

A component for organizing content into switchable panels.

## Introduction

Tabs are used to organize content by grouping related information into separate views that can be toggled. They are useful for saving space while providing easy access to multiple sections of content.

## Props

### Root

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | - | `string` | The controlled selected tab value. |
| defaultValue | - | `string` | The initial selected tab value. |
| onValueChange | - | `(details: { value: string }) => void` | Callback called when the selected tab changes. |
| orientation | `horizontal` | `'horizontal' \| 'vertical'` | The orientation of the tabs. |
| variant | `line` | `'line' \| 'subtle' \| 'enclosed'` | The visual variant of the tabs. |
| size | `md` | `'xs' \| 'sm' \| 'md' \| 'lg'` | The size of the tabs. |
| fitted | `false` | `boolean` | Whether the tabs should take up the full width of the container. |
| interactive | `true` | `boolean` | Whether the component should be hydrated as an island. |

### Trigger

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | - | `string` | The value of the tab (required). |
| disabled | `false` | `boolean` | Whether the tab is disabled. |

### Content

| Prop | Default | Type | Description |
| --- | --- | --- | --- |
| value | - | `string` | The value of the tab (required). |

## Usage

```tsx
import * as Tabs from '@/components/ui/tabs'

export const TabsDemo = () => (
  <Tabs.Root defaultValue="tab-1">
    <Tabs.List>
      <Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
      <Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
      <Tabs.Indicator />
    </Tabs.List>
    <Tabs.Content value="tab-1">Content 1</Tabs.Content>
    <Tabs.Content value="tab-2">Content 2</Tabs.Content>
  </Tabs.Root>
)
```
