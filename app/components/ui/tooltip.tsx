import TooltipIsland from "../../islands/tooltip";
import { TooltipBase, type TooltipBaseProps } from "./tooltip-base";

export interface TooltipProps extends TooltipBaseProps {
	/**
	 * Whether the tooltip should be interactive (hydrated as an island).
	 * Defaults to true if not explicitly set to false.
	 */
	interactable?: boolean;
}

export function Tooltip(props: TooltipProps) {
	const { interactable = true, ...rest } = props;

	if (interactable) {
		return <TooltipIsland {...rest} />;
	}

	return <TooltipBase {...rest} />;
}

export type { TooltipBaseProps as TooltipPropsValue };
