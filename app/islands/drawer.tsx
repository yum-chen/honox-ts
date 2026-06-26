import { useState } from "hono/jsx";
import {
	Root as DrawerPrimitiveRoot,
	type RootProps,
} from "../components/ui/drawer-primitive";

export default function DrawerIsland(props: RootProps) {
	const { open: openProp, onOpenChange: onOpenChangeProp, ...rest } = props;
	const [isOpen, setIsOpen] = useState(openProp || false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.(nextOpen);
	};

	return (
		<DrawerPrimitiveRoot
			{...rest}
			open={open}
			onOpenChange={handleOpenChange}
		/>
	);
}
