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
	const { interactive = true, ...rest } = props;
	if (interactive) {
		return <DrawerIsland {...rest} />;
	}
	return <DrawerPrimitiveRoot {...rest} />;
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
