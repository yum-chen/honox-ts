import type { JSX } from "hono/jsx";
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
	trigger?: JSX.Element;
	content?: JSX.Element;
	arrow?: boolean | JSX.Element;
	triggerClass?: string;
	positionerClass?: string;
	contentClass?: string;
	arrowClass?: string;
	arrowTipClass?: string;
}

export function Root(props: HoverCardProps) {
	const { interactive = true, ...rest } = props;

	if (interactive) {
		return <HoverCardIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

export function HoverCard(props: HoverCardProps) {
	const {
		trigger,
		content,
		arrow = true,
		children,
		triggerClass,
		positionerClass,
		contentClass,
		arrowClass,
		arrowTipClass,
		...rest
	} = props;

	return (
		<Root {...rest}>
			{trigger && (
				<Trigger asChild class={triggerClass}>
					{trigger}
				</Trigger>
			)}
			<Positioner class={positionerClass}>
				<Content class={contentClass}>
					{content}
					{children}
					{arrow === true && (
						<Arrow class={arrowClass}>
							<ArrowTip class={arrowTipClass} />
						</Arrow>
					)}
					{typeof arrow === "object" && arrow}
				</Content>
			</Positioner>
		</Root>
	);
}

// Attach sub-components to the HoverCard component
Object.assign(HoverCard, {
	Root,
	Trigger,
	Positioner,
	Content,
	Arrow,
	ArrowTip,
});

export { Arrow, ArrowTip, Content, Positioner, Trigger };
export const HoverCardRoot = Root;
export const HoverCardTrigger = Trigger;
export const HoverCardPositioner = Positioner;
export const HoverCardContent = Content;
export const HoverCardArrow = Arrow;
export const HoverCardArrowTip = ArrowTip;

export default HoverCard;
