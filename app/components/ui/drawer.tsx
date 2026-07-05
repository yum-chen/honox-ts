import type { JSX } from "hono/jsx";
import { useRef } from "hono/jsx";
import DrawerIsland from "../../islands/drawer";
import { CloseButton } from "./close-button";
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
							<CloseButton />
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
							{cancel && <CloseTrigger asChild>{cancel}</CloseTrigger>}
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
