import type { JSX } from "hono/jsx";
import { useRef } from "hono/jsx";
import DialogIsland from "../../islands/dialog";
import {
	ActionTrigger,
	Backdrop,
	Body,
	CloseTrigger,
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

export interface DialogProps extends RootProps {
	trigger?: JSX.Element;
	title?: string | JSX.Element;
	description?: string | JSX.Element;
	body?: string | JSX.Element;
	footer?: string | JSX.Element;
	cancel?: JSX.Element;
	confirm?: JSX.Element;
	closable?: boolean;
}

export function Dialog(props: DialogProps) {
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
						<CloseTrigger
							asChild
							class="dialog__closeTrigger dialog__closeTrigger--size_sm"
						>
							<button
								type="button"
								aria-label="Close"
								style={{
									position: "absolute",
									top: "12px",
									right: "12px",
									cursor: "pointer",
								}}
							>
								<CloseIcon />
							</button>
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
export default Dialog;

// Attach sub-components to the Dialog component
Object.assign(Dialog, {
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

export const DialogRoot = Root;
export const DialogTrigger = Trigger;
export const DialogBackdrop = Backdrop;
export const DialogPositioner = Positioner;
export const DialogContent = Content;
export const DialogHeader = Header;
export const DialogTitle = Title;
export const DialogDescription = Description;
export const DialogBody = Body;
export const DialogFooter = Footer;
export const DialogCloseTrigger = CloseTrigger;
export const DialogActionTrigger = ActionTrigger;
