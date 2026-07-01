import PopoverIsland from "../../islands/popover";
import {
	PopoverArrow as Arrow,
	PopoverArrowTip as ArrowTip,
	PopoverBody as Body,
	PopoverCloseTrigger as CloseTrigger,
	PopoverContent as Content,
	PopoverDescription as Description,
	PopoverFooter as Footer,
	PopoverHeader as Header,
	type PopoverRootProps,
	PopoverPositioner as Positioner,
	PopoverRoot as RootPrimitive,
	PopoverTitle as Title,
	PopoverTrigger as Trigger,
} from "./popover-base";

export interface PopoverProps extends PopoverRootProps {
	interactable?: boolean;
}

export function Root(props: PopoverProps) {
	const { interactable = true, ...rest } = props;

	if (interactable) {
		return <PopoverIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

export {
	Arrow,
	ArrowTip,
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
