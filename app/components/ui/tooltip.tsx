import TooltipIsland from "../../islands/tooltip";
import {
	TooltipArrow as Arrow,
	TooltipArrowTip as ArrowTip,
	TooltipContent as Content,
	TooltipPositioner as Positioner,
	TooltipRoot as RootPrimitive,
	TooltipBase,
	type TooltipBaseProps,
	type TooltipRootProps,
	TooltipTrigger as Trigger,
} from "./tooltip-primitive";

export interface TooltipProps extends TooltipRootProps {
	/**
	 * Whether the tooltip should be interactive (hydrated as an island).
	 * Defaults to true if not explicitly set to false.
	 */
	interactive?: boolean;
}

export function Root(props: TooltipProps) {
	const { interactive, ...rest } = props;

	const isInteractive = interactive !== false;

	if (isInteractive) {
		return <TooltipIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

/**
 * A high-level Tooltip component for common use cases.
 */
export function Tooltip(props: TooltipBaseProps & { interactive?: boolean }) {
	const { interactive, ...rest } = props;

	const isInteractive = interactive !== false;

	if (isInteractive) {
		return <TooltipIsland {...rest} />;
	}

	return <TooltipBase {...rest} />;
}

export { Arrow, ArrowTip, Content, Positioner, Trigger };
