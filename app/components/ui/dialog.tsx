import type { JSX } from "hono/jsx";
import DialogIsland from "../../islands/dialog";
import {
	Backdrop,
	Body,
	Content,
	Description,
	Root as DialogPrimitiveRoot,
	type RootProps as DialogPrimitiveRootProps,
	Footer,
	Header,
	Positioner,
	Title,
	Trigger,
} from "./dialog-primitive";

export interface RootProps extends DialogPrimitiveRootProps {
	interactive?: boolean;
}

function Root(props: RootProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <DialogIsland {...rest} />;
	}
	return <DialogPrimitiveRoot {...rest} />;
}

export interface DialogProps extends RootProps {
	trigger?: JSX.Element;
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	body?: string | JSX.Element;
	footer?: string | JSX.Element;
}

export function Dialog(props: DialogProps) {
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

export default Dialog;
