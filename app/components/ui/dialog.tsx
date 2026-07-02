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

export function Root(props: RootProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <DialogIsland {...rest} />;
	}
	return <DialogPrimitiveRoot {...rest} />;
}

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
