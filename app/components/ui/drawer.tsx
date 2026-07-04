import type { JSX } from "hono/jsx";
import DrawerIsland from "../../islands/drawer";
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

export interface RootProps extends DrawerPrimitiveRootProps {
	interactive?: boolean;
}

export function Root(props: RootProps) {
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
}

export const Drawer = (props: DrawerProps) => {
	const { trigger, title, description, body, footer, children, ...rest } = props;

	return (
		<Root {...rest}>
			{trigger && <Trigger asChild>{trigger}</Trigger>}
			<Backdrop />
			<Positioner>
				<Content>
					<Header>
						{title && <Title>{title}</Title>}
						{description && <Description>{description}</Description>}
					</Header>
					{body && <Body>{body}</Body>}
					{children}
					{footer && <Footer>{footer}</Footer>}
				</Content>
			</Positioner>
		</Root>
	);
};

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

export {
	ActionTrigger,
	Backdrop,
	Body,
	CloseTrigger,
	Content,
	Description,
	Footer,
	Header,
	Positioner,
	Title,
	Trigger,
};
