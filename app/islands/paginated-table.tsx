import { useState } from "hono/jsx";
import {
	PaginatedTableBase,
	type PaginatedTableBaseProps,
} from "../components/ui/paginated-table-primitive";

interface PaginatedTableIslandProps<T = Record<string, unknown>>
	extends PaginatedTableBaseProps<T> {
	defaultPage?: number;
}

export default function PaginatedTableIsland<T = Record<string, unknown>>(
	props: PaginatedTableIslandProps<T>,
) {
	const {
		currentPage: pageProp,
		defaultPage = 1,
		onPageChange,
		...rest
	} = props;

	const [currentPage, setCurrentPage] = useState(pageProp ?? defaultPage);

	const isControlled = pageProp !== undefined;
	const page = isControlled ? pageProp : currentPage;

	const handlePageChange = (details: { page: number; pageSize: number }) => {
		if (!isControlled) {
			setCurrentPage(details.page);
		}
		onPageChange?.(details);
	};

	return (
		<PaginatedTableBase
			{...rest}
			currentPage={page}
			onPageChange={handlePageChange}
		/>
	);
}
