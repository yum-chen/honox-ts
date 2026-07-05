import type { JSX } from "hono/jsx";
import { useRef } from "hono/jsx";
import { css } from "styled-system/css";
import DrawerIsland from "../../islands/drawer";
import { IconButton } from "./button";
import {
	ActionTrigger,
	Backdrop,
	Body,
	CloseTrigger,
	Content,
	Description,
	Root as DrawerPrimitiveRoot,
	type RootProps as DrawerPrimitiveRootProps,
	Footer,
	Header,
	Positioner,
	Title,
	Trigger,
} from "./drawer-primitive";

interface RootProps extends DrawerPrimitiveRootProps {
	interactive?: boolean;
}

function Root(props: RootProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <DrawerIsland {...rest} />;
	}
	return <DrawerPrimitiveRoot {...rest} />;
}

const CloseIcon = () => (
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
		<title>Close</title>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

export interface DrawerProps extends RootProps {
	trigger?: JSX.Element;
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	body?: string | JSX.Element;
	footer?: string | JSX.Element;
	cancel?: JSX.Element;
	confirm?: JSX.Element;
	closable?: boolean;
}

export function Drawer(props: DrawerProps) {
	const {
		trigger,
		title,
		description,
		body,
		footer,
		cancel,
		confirm,
		closable = true,
		children,
		rootRef: rootRefProp,
		...rest
	} = props;

	const localRef = useRef<HTMLElement>(null);
	const rootRef = rootRefProp || localRef;

	return (
		<Root {...rest} rootRef={rootRef}>
			{trigger && <Trigger asChild>{trigger}</Trigger>}
			<Backdrop />
			<Positioner>
				<Content>
					{closable && (
						<CloseTrigger asChild>
							<IconButton variant="plain" size="sm" aria-label="Close">
								<CloseIcon />
							</IconButton>
						</CloseTrigger>
					)}
					<Header>
						{title && <Title>{title}</Title>}
						{description && <Description>{description}</Description>}
					</Header>
					{body && <Body>{body}</Body>}
					{children}
					{(footer || cancel || confirm) && (
						<Footer>
							{cancel && (
								<CloseTrigger asChild unstyled>
									{cancel}
								</CloseTrigger>
							)}
							{confirm && <ActionTrigger asChild>{confirm}</ActionTrigger>}
							{footer}
						</Footer>
					)}
				</Content>
			</Positioner>
		</Root>
	);
}

export { ActionTrigger, CloseTrigger };
export default Drawer;

// Attach sub-components to the Drawer component
Object.assign(Drawer, {
	Root,
	Trigger,
	Backdrop,
	Positioner,
	Content,
	Header,
	Title,
	Description,
	Body,
	Footer,
	CloseTrigger,
	ActionTrigger,
});

export const DrawerRoot = Root;
export const DrawerTrigger = Trigger;
export const DrawerBackdrop = Backdrop;
export const DrawerPositioner = Positioner;
export const DrawerContent = Content;
export const DrawerHeader = Header;
export const DrawerTitle = Title;
export const DrawerDescription = Description;
export const DrawerBody = Body;
export const DrawerFooter = Footer;
export const DrawerCloseTrigger = CloseTrigger;
export const DrawerActionTrigger = ActionTrigger;
