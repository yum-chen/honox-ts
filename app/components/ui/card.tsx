import type { PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { cx } from "styled-system/css";
import type { CardVariantProps } from "styled-system/recipes";
import { card } from "styled-system/recipes";

type CardStyles = ReturnType<typeof card>;

const CardContext = createContext<CardStyles | null>(null);

const useCardContext = () => {
	const context = useContext(CardContext);
	if (!context) {
		throw new Error("Card components must be wrapped in <Card.Root />");
	}
	return context;
};

interface RootProps extends CardVariantProps, PropsWithChildren {
	class?: string;
}

function Root(props: RootProps) {
	const [variantProps, localProps] = card.splitVariantProps(props);
	const { children, class: classProp, ...restProps } = localProps;
	const styles = card(variantProps);

	return (
		<CardContext.Provider value={styles}>
			<div class={cx(styles.root, classProp)} {...restProps}>
				{children}
			</div>
		</CardContext.Provider>
	);
}

function Header(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const styles = useCardContext();
	return (
		<div class={cx(styles.header, classProp)} {...restProps}>
			{children}
		</div>
	);
}

function Body(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const styles = useCardContext();
	return (
		<div class={cx(styles.body, classProp)} {...restProps}>
			{children}
		</div>
	);
}

function Footer(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const styles = useCardContext();
	return (
		<div class={cx(styles.footer, classProp)} {...restProps}>
			{children}
		</div>
	);
}

function Title(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const styles = useCardContext();
	return (
		<h3 class={cx(styles.title, classProp)} {...restProps}>
			{children}
		</h3>
	);
}

function Description(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...restProps } = props;
	const styles = useCardContext();
	return (
		<div class={cx(styles.description, classProp)} {...restProps}>
			{children}
		</div>
	);
}

export type { RootProps };
export { Body, Description, Footer, Header, Root, Title };
