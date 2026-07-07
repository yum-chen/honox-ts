import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { cx } from "styled-system/css";
import type { BreadcrumbVariantProps } from "styled-system/recipes";
import { breadcrumb } from "styled-system/recipes";

type BreadcrumbStyles = ReturnType<typeof breadcrumb>;

const BreadcrumbContext = createContext<BreadcrumbStyles | null>(null);

const useBreadcrumbContext = () => {
	const context = useContext(BreadcrumbContext);
	if (!context) {
		throw new Error(
			"Breadcrumb components must be wrapped in <Breadcrumb.Root />",
		);
	}
	return context;
};

interface RootProps extends BreadcrumbVariantProps, PropsWithChildren {
	class?: string;
}

function Root(props: RootProps) {
	const [variantProps, localProps] = breadcrumb.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = breadcrumb(variantProps);

	return (
		<BreadcrumbContext.Provider value={styles}>
			<nav
				aria-label="breadcrumb"
				class={cx(styles.root, classProp)}
				{...restProps}
			>
				{children}
			</nav>
		</BreadcrumbContext.Provider>
	);
}

function List(props: PropsWithChildren<{ class?: string }>) {
	const styles = useBreadcrumbContext();
	return <ol class={cx(styles.list, props.class)}>{props.children}</ol>;
}

function Item(props: PropsWithChildren<{ class?: string }>) {
	const styles = useBreadcrumbContext();
	return <li class={cx(styles.item, props.class)}>{props.children}</li>;
}

interface LinkProps
	extends PropsWithChildren<{
		class?: string;
		href?: string;
		current?: boolean;
		[key: string]: unknown;
	}> {}

function Link(props: LinkProps) {
	const { class: classProp, children, href, current, ...restProps } = props;
	const styles = useBreadcrumbContext();

	if (href) {
		return (
			<a
				class={cx(styles.link, classProp)}
				href={href}
				aria-current={current ? "page" : undefined}
				{...restProps}
			>
				{children}
			</a>
		);
	}

	return (
		<span
			class={cx(styles.link, classProp)}
			aria-current={current ? "page" : undefined}
			{...restProps}
		>
			{children}
		</span>
	);
}

function Separator(props: { children?: Child; class?: string }) {
	const styles = useBreadcrumbContext();
	return (
		<li aria-hidden="true" class={cx(styles.separator, props.class)}>
			{props.children || <ChevronRightIcon />}
		</li>
	);
}

function Ellipsis(props: { class?: string }) {
	const styles = useBreadcrumbContext();
	return (
		<li
			role="presentation"
			aria-hidden="true"
			class={cx(styles.ellipsis, props.class)}
		>
			...
		</li>
	);
}

function ChevronRightIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<title>Chevron Right</title>
			<path d="m9 18 6-6-6-6" />
		</svg>
	);
}

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

function BreadcrumbComponent(props: BreadcrumbProps) {
	const { items, separator, ...rootProps } = props;

	return (
		<Root {...rootProps}>
			<List>
				{items.map((item, index) => {
					const isLast = index === items.length - 1;
					const current = item.current ?? isLast;

					return [
						<Item key={`${index}-item`}>
							<Link href={item.href} current={current}>
								{item.label}
							</Link>
						</Item>,
						!isLast && (
							<Separator key={`${index}-separator`}>{separator}</Separator>
						),
					];
				})}
			</List>
		</Root>
	);
}

const Breadcrumb = Object.assign(BreadcrumbComponent, {
	Root,
	List,
	Item,
	Link,
	Separator,
	Ellipsis,
});

export type { BreadcrumbItem, BreadcrumbProps, LinkProps, RootProps };
export { Breadcrumb, Ellipsis, Item, Link, List, Root, Separator };
