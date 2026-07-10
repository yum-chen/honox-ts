import PaginatedTableIsland from "../../islands/paginated-table";
import { shouldHydrate } from "./island-utils";
import {
	PaginatedTableBase,
	type PaginatedTableBaseProps,
} from "./paginated-table-primitive";

interface PaginatedTableProps<T = Record<string, unknown>>
	extends PaginatedTableBaseProps<T> {
	defaultPage?: number;
	interactive?: boolean;
}

function PaginatedTable<T = Record<string, unknown>>(
	props: PaginatedTableProps<T>,
) {
	const { interactive, ...rest } = props;

	const hasSignal =
		props.onPageChange !== undefined ||
		props.currentPage !== undefined ||
		props.defaultPage !== undefined;

	const isInteractive = shouldHydrate(interactive, hasSignal);

	if (isInteractive) {
		return <PaginatedTableIsland {...(rest as any)} />;
	}

	return <PaginatedTableBase {...rest} />;
}

export type { PaginatedTableProps };
export { PaginatedTable };
export default PaginatedTable;
