import type { JSX } from "hono/jsx";
import DrawerIsland from "../../islands/drawer";
import {
	Backdrop,
	Body,
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
}

export function Drawer(props: DrawerProps) {
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
}

export default Drawer;
