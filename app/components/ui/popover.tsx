import type { JSX } from "hono/jsx";
import PopoverIsland from "../../islands/popover";
import { IconButton } from "./button";
import { shouldHydrate } from "./island-utils";
import {
	Anchor,
	Arrow,
	ArrowTip,
	Body,
	CloseTrigger,
	Content,
	Context,
	Description,
	Footer,
	Header,
	Indicator,
	type InteractivePopoverProps,
	Positioner,
	Root as RootPrimitive,
	RootProvider,
	Title,
	Trigger,
} from "./popover-primitive";

interface PopoverProps extends InteractivePopoverProps {
	interactive?: boolean; // keep — forces island hydration (default true)
	trigger?: JSX.Element; // rendered asChild inside PopoverTrigger
	showArrow?: boolean; // render Arrow + ArrowTip (default true)
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	body?: string | JSX.Element;
	footer?: string | JSX.Element;
	closable?: boolean; // render CloseTrigger (default true)
	closeIcon?: JSX.Element; // custom close icon; defaults to built-in X
	children?: JSX.Element; // extra content after body
	classNames?: {
		root?: string;
		trigger?: string;
		positioner?: string;
		content?: string;
		arrow?: string;
		arrowTip?: string;
		closeTrigger?: string;
		header?: string;
		body?: string;
		footer?: string;
		title?: string;
		description?: string;
	};
	styles?: {
		root?: Record<string, string>;
		trigger?: Record<string, string>;
		positioner?: Record<string, string>;
		content?: Record<string, string>;
		arrow?: Record<string, string>;
		arrowTip?: Record<string, string>;
		closeTrigger?: Record<string, string>;
		header?: Record<string, string>;
		body?: Record<string, string>;
		footer?: Record<string, string>;
		title?: Record<string, string>;
		description?: Record<string, string>;
	};
}

const DefaultCloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Close</title>
		<path d="M18 6 6 18M6 6l12 12" />
	</svg>
);

function Root(props: PopoverProps) {
	const { interactive, classNames, styles, ...rest } = props;

	if (shouldHydrate(interactive, true)) {
		return <PopoverIsland {...rest} classNames={classNames} styles={styles} />;
	}

	return <RootPrimitive {...rest} />;
}

function Popover(props: PopoverProps) {
	const {
		interactive,
		trigger,
		showArrow = true,
		title,
		description,
		body,
		footer,
		closable = true,
		closeIcon,
		children,
		classNames,
		styles,
		...rest
	} = props;

	return (
		<Root {...rest} interactive={interactive} classNames={classNames} styles={styles}>
			{trigger && (
				<Trigger asChild class={classNames?.trigger} style={styles?.trigger}>
					{trigger}
				</Trigger>
			)}
			<Positioner class={classNames?.positioner} style={styles?.positioner}>
				<Content class={classNames?.content} style={styles?.content}>
					{showArrow && (
						<Arrow class={classNames?.arrow} style={styles?.arrow}>
							<ArrowTip class={classNames?.arrowTip} style={styles?.arrowTip} />
						</Arrow>
					)}
					{closable && (
						<CloseTrigger asChild class={classNames?.closeTrigger} style={styles?.closeTrigger}>
							<IconButton variant="plain" size="sm" aria-label="Close">
								{closeIcon ?? <DefaultCloseIcon />}
							</IconButton>
						</CloseTrigger>
					)}
					{(title || description) && (
						<Header class={classNames?.header} style={styles?.header}>
							{title && <Title class={classNames?.title} style={styles?.title}>{title}</Title>}
							{description && <Description class={classNames?.description} style={styles?.description}>{description}</Description>}
						</Header>
					)}
					{body && <Body class={classNames?.body} style={styles?.body}>{body}</Body>}
					{children}
					{footer && <Footer class={classNames?.footer} style={styles?.footer}>{footer}</Footer>}
				</Content>
			</Positioner>
		</Root>
	);
}

const PopoverComponent = Object.assign(Popover, {
	Root,
	RootProvider,
	Anchor,
	Trigger,
	Positioner,
	Arrow,
	ArrowTip,
	Content,
	CloseTrigger,
	Header,
	Body,
	Footer,
	Title,
	Description,
	Indicator,
	Context,
});

export {
	Anchor,
	Arrow,
	ArrowTip,
	Body,
	CloseTrigger,
	Content,
	Context,
	Description,
	Footer,
	Header,
	Indicator,
	PopoverComponent as Popover,
	type PopoverProps,
	Positioner,
	Root,
	RootProvider,
	Title,
	Trigger,
};

export default PopoverComponent;
