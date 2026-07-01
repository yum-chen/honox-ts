import type { PropsWithChildren } from "hono/jsx";
import DrawerIsland from "../../islands/drawer";
import {
	Backdrop,
	Body,
	CloseTrigger,
	Content,
	Description,
	Footer,
	Header,
	Positioner,
	Root as DrawerPrimitiveRoot,
	type RootProps as DrawerPrimitiveRootProps,
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

export {
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
