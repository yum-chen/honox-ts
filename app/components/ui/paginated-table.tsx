import type { PaginatedTableProps } from "../../islands/paginated-table";
import PaginatedTableIsland from "../../islands/paginated-table";

export function PaginatedTable<T = Record<string, any>>(
	props: PaginatedTableProps<T>,
) {
	return <PaginatedTableIsland {...props} />;
}

export default PaginatedTable;
export type { PaginatedTableProps };
