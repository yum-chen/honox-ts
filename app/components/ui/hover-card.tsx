import HoverCardIsland from "../../islands/hover-card";
import {
	HoverCardArrow as Arrow,
	HoverCardArrowTip as ArrowTip,
	HoverCardContent as Content,
	type HoverCardRootProps,
	HoverCardPositioner as Positioner,
	HoverCardRoot as RootPrimitive,
	HoverCardTrigger as Trigger,
} from "./hover-card-primitive";

export interface HoverCardProps extends HoverCardRootProps {
	interactive?: boolean;
}

export function Root(props: HoverCardProps) {
	const { interactive = true, ...rest } = props;

	if (interactive) {
		return <HoverCardIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

export { Arrow, ArrowTip, Content, Positioner, Trigger };
