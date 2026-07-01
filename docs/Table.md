# Table

# Introduction
A flexible component for displaying tabular data.

# Props

| Prop | Type | Description |
| :--- | :--- | :---------- |
| `variant` | `"plain" \| "surface"` | The visual style of the table. |
| `size` | `"md"` | The size of the table cells and padding. |
| `striped` | `boolean` | Whether to show zebra-striping on rows. |
| `interactive` | `boolean` | Whether rows should show hover states. |
| `columnBorder` | `boolean` | Whether to show borders between columns. |
| `stickyHeader` | `boolean` | Whether the header should remain visible while scrolling. |
| `class` | `string` | Custom CSS classes. |

# Usage

```tsx
import { Table } from "../components/ui";

export default function MyPage() {
  return (
    <Table.Root variant="plain">
      <Table.Caption>Product Inventory</Table.Caption>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Category</Table.Header>
          <Table.Header>Price</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Laptop</Table.Cell>
          <Table.Cell>Electronics</Table.Cell>
          <Table.Cell>$999.00</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Coffee Mug</Table.Cell>
          <Table.Cell>Home & Kitchen</Table.Cell>
          <Table.Cell>$15.00</Table.Cell>
        </Table.Row>
      </Table.Body>
      <Table.Foot>
        <Table.Row>
          <Table.Cell colSpan={2}>Total</Table.Cell>
          <Table.Cell>$1,014.00</Table.Cell>
        </Table.Row>
      </Table.Foot>
    </Table.Root>
  );
}
```
