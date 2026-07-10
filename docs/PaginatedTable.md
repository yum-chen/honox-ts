# PaginatedTable

# Introduction

An interactive table component designed to display tabular data (such as user directories) with built-in client-side pagination.

# Props

The component currently renders the standard system user directory dataset dynamically:

| Prop    | Type     | Description               |
| :------ | :------- | :------------------------ |
| `title` | `string` | Optional table header title. |

# Usage

```tsx
import { PaginatedTable } from "../components/ui/paginated-table";

export default function MyPage() {
  return <PaginatedTable title="User Directory" />;
}
```

# Hydration

The `PaginatedTable` component integrates client-side hydration (`interactive={true}`) automatically to enable seamless page switching transitions.
