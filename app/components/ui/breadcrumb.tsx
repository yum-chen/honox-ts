import type { Child } from "hono/jsx";
import type { BreadcrumbVariantProps } from "styled-system/recipes";
import {
	Ellipsis,
	Item,
	Link,
	List,
	Root,
	Separator,
} from "./breadcrumb-primitive";

interface BreadcrumbItem {
	/** Display text or JSX node */
	label: Child;
	/** If present, renders as <a>; otherwise renders as plain text (current page) */
	href?: string;
	/** Marks the current page. Defaults to `true` for the last item. */
	current?: boolean;
}

interface BreadcrumbProps extends BreadcrumbVariantProps {
	items: BreadcrumbItem[];
	/** Custom separator between items. Default: ChevronRight SVG icon. */
	separator?: Child;
	class?: string;
}

function Breadcrumb(props: BreadcrumbProps) {
	const { items, separator, ...rootProps } = props;

	return (
		<Root {...rootProps}>
			<List>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const isCurrent = item.current ?? isLast;

					return (
						<>
							<Item key={index}>
								{item.href && !isCurrent ? (
									<Link href={item.href}>{item.label}</Link>
								) : (
									<Link aria-current="page">{item.label}</Link>
								)}
							</Item>
							{!isLast && <Separator>{separator}</Separator>}
						</>
					);
				})}
			</List>
		</Root>
	);
}

export { Breadcrumb, Ellipsis, Item, Link, List, Root, Separator };
export type { BreadcrumbItem, BreadcrumbProps };
