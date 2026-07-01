import { useState } from "hono/jsx";
import {
	Root as DialogPrimitiveRoot,
	type RootProps,
} from "../components/ui/dialog-primitive";

export default function DialogIsland(props: RootProps) {
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
		<DialogPrimitiveRoot
			{...rest}
			open={open}
			onOpenChange={handleOpenChange}
		/>
	);
}
