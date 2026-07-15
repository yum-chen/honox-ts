import {
	InteractivePopoverRoot,
} from "../components/ui/popover-primitive";
import type { PopoverProps } from "../components/ui/popover";

export default function PopoverIsland(props: PopoverProps) {
	return <InteractivePopoverRoot {...props} />;
}
