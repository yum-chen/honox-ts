import type { ComponentProps } from "hono/jsx";
import { card } from "../../../styled-system/recipes";
import { cx } from "../../../styled-system/css";

type CardVariantProps = Parameters<typeof card>[0];

export type CardProps = ComponentProps<"div"> & CardVariantProps;

export const Card = (props: CardProps) => {
	const [variantProps, localProps] = card.splitVariantProps(props);
	const { class: className, ...rest } = localProps;
	return <div class={cx(card(variantProps).root, className)} {...rest} />;
};

export const CardHeader = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	return <div class={cx(card().header, className)} {...rest} />;
};

export const CardBody = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	return <div class={cx(card().body, className)} {...rest} />;
};

export const CardFooter = (props: ComponentProps<"div">) => {
	const { class: className, ...rest } = props;
	return <div class={cx(card().footer, className)} {...rest} />;
};

export const CardTitle = (props: ComponentProps<"h3">) => {
	const { class: className, ...rest } = props;
	return <h3 class={cx(card().title, className)} {...rest} />;
};

export const CardDescription = (props: ComponentProps<"p">) => {
	const { class: className, ...rest } = props;
	return <p class={cx(card().description, className)} {...rest} />;
};
