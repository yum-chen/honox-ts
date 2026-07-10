import type { JSX, PropsWithChildren } from "hono/jsx";
import { css } from "styled-system/css";
import { Pagination } from "./pagination";
import { Table, type TableProps } from "./table";

interface PaginatedTableBaseProps<T = Record<string, unknown>>
	extends Omit<TableProps<T>, "footer">,
		PropsWithChildren {
	pageSize?: number;
	currentPage?: number;
	onPageChange?: (details: { page: number; pageSize: number }) => void;
	id?: string;
	paginationClass?: string;
	tableClass?: string;
}

function PaginatedTableBase<T = Record<string, unknown>>(
	props: PaginatedTableBaseProps<T>,
) {
	const {
		columns = [],
		rows = [],
		pageSize = 10,
		currentPage = 1,
		onPageChange,
		id,
		paginationClass,
		tableClass,
		caption,
		variant,
		striped,
		stickyHeader,
		columnBorder,
		class: classProp,
		captionClass,
		headClass,
		bodyClass,
		footClass,
		rowClass,
		cellClass,
		headerClass,
		...rest
	} = props;

	const totalItems = rows.length;
	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = rows.slice(startIndex, endIndex);

	return (
		<div
			id={id}
			class={css({
				width: "full",
				display: "flex",
				flexDirection: "column",
				gap: "4",
				alignItems: "center",
			})}
		>
			<Table
				variant={variant}
				striped={striped}
				stickyHeader={stickyHeader}
				columnBorder={columnBorder}
				class={tableClass || classProp}
				caption={caption}
				captionClass={captionClass}
				headClass={headClass}
				bodyClass={bodyClass}
				footClass={footClass}
				rowClass={rowClass}
				cellClass={cellClass}
				headerClass={headerClass}
				columns={columns}
				rows={currentData}
				{...rest}
			/>
			<Pagination
				interactive={false}
				count={totalItems}
				pageSize={pageSize}
				page={currentPage}
				onPageChange={onPageChange}
				class={paginationClass}
			/>
		</div>
	);
}

export type { PaginatedTableBaseProps };
export { PaginatedTableBase };
