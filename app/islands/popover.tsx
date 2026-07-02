import { useState } from "hono/jsx";
import {
	PopoverRoot,
	type PopoverRootProps,
} from "../components/ui/popover-base";

export default function PopoverIsland(props: PopoverRootProps) {
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

	return <PopoverRoot {...rest} open={open} onOpenChange={handleOpenChange} />;
}
