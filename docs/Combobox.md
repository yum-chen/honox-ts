# Combobox

# Introduction

A widget that combines a text input with a listbox, allowing users to filter and select from a list of options.

# Props

| Prop | Type | Description |
| :--- | :--- | :--- |
| `items` | `ComboboxItem[]` | An array of items to display in the list. |
| `label` | `Child` | The label for the combobox. |
| `placeholder` | `string` | The placeholder text for the input. |
| `allowClear` | `boolean` | Whether to show a clear button in the input. |
| `interactive` | `boolean` | Forces hydration as an island. |
| `open` | `boolean` | Whether the combobox list is open (controlled). |
| `inputValue` | `string` | The current value of the input (controlled). |
| `onToggle` | `() => void` | Callback triggered when the list is toggled. |
| `onInputChange` | `(value: string) => void` | Callback triggered when the input value changes. |
| `onItemSelect` | `(value: string) => void` | Callback triggered when an item is selected. |

## ComboboxItem

| Prop | Type | Description |
| :--- | :--- | :--- |
| `label` | `string` | The display text for the item. |
| `value` | `string` | The unique value for the item. |
| `disabled` | `boolean` | Whether the item is disabled. |

# Usage

```tsx
import { Combobox } from "../components/ui";

const items = [
  { label: "React", value: "react" },
  { label: "Solid", value: "solid" },
  { label: "Svelte", value: "svelte" },
  { label: "Vue", value: "vue" },
  { label: "Hono", value: "hono" },
];

export default function MyPage() {
  return (
    <Combobox
      interactive
      items={items}
      label="Framework"
      placeholder="Select a Framework"
      allowClear
    />
  );
}
```

## Primitives

For more control, you can use the primitive components:

```tsx
import * as Combobox from "../components/ui/combobox";

export default function CustomCombobox() {
  return (
    <Combobox.Root>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.IndicatorGroup>
          <Combobox.ClearTrigger />
          <Combobox.Trigger />
        </Combobox.IndicatorGroup>
      </Combobox.Control>
      <Combobox.Positioner>
        <Combobox.Content>
          <Combobox.List>
            <Combobox.Item value="react">
              <Combobox.ItemText>React</Combobox.ItemText>
              <Combobox.ItemIndicator />
            </Combobox.Item>
          </Combobox.List>
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}
```
