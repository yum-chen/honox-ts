import type { JSX, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { cx } from "styled-system/css";
import type { TableVariantProps } from "styled-system/recipes";
import { table } from "styled-system/recipes";

type TableStyles = ReturnType<typeof table>;

const TableContext = createContext<TableStyles | null>(null);

const useTableContext = () => {
	const context = useContext(TableContext);
	if (!context) {
		throw new Error("Table components must be wrapped in <Table.Root />");
	}
	return context;
};

type TableRootProps = TableVariantProps &
	JSX.IntrinsicElements["table"] &
	PropsWithChildren;

interface RootProps extends TableRootProps {}

function Root(props: RootProps) {
	const [variantProps, localProps] = table.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = table(variantProps);

	return (
		<TableContext.Provider value={styles}>
			<table class={cx(styles.root, classProp)} {...restProps}>
				{children}
			</table>
		</TableContext.Provider>
	);
}

function Body(props: JSX.IntrinsicElements["tbody"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<tbody class={cx(styles.body, classProp)} {...restProps}>
			{children}
		</tbody>
	);
}

function Caption(props: JSX.IntrinsicElements["caption"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<caption class={cx(styles.caption, classProp)} {...restProps}>
			{children}
		</caption>
	);
}

function Cell(props: JSX.IntrinsicElements["td"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<td class={cx(styles.cell, classProp)} {...restProps}>
			{children}
		</td>
	);
}

function Foot(props: JSX.IntrinsicElements["tfoot"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<tfoot class={cx(styles.foot, classProp)} {...restProps}>
			{children}
		</tfoot>
	);
}

function Head(props: JSX.IntrinsicElements["thead"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<thead class={cx(styles.head, classProp)} {...restProps}>
			{children}
		</thead>
	);
}

function Header(props: JSX.IntrinsicElements["th"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<th class={cx(styles.header, classProp)} {...restProps}>
			{children}
		</th>
	);
}

function Row(props: JSX.IntrinsicElements["tr"] & PropsWithChildren) {
	const styles = useTableContext();
	const { class: classProp, children, ...restProps } = props;
	return (
		<tr class={cx(styles.row, classProp)} {...restProps}>
			{children}
		</tr>
	);
}

export type { RootProps };
export { Body, Caption, Cell, Foot, Head, Header, Root, Row };
