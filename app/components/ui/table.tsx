import TableIsland from "../../islands/table";
import {
	Body,
	Caption,
	Cell,
	Foot,
	Head,
	Header,
	Root,
	Row,
	TableBase,
	type TableColumn,
	type TableProps,
	type TableRow,
} from "./table-primitive";

export function Table<T = Record<string, unknown>>(props: TableProps<T>) {
	if (props.interactive) {
		return <TableIsland {...props} />;
	}
	return <TableBase {...props} />;
}

// Attach sub-components to the Table component
Object.assign(Table, {
	Root,
	Body,
	Caption,
	Cell,
	Foot,
	Head,
	Header,
	Row,
});

export { Body, Caption, Cell, Foot, Head, Header, Root, Row };
export type { TableColumn, TableProps, TableRow };
