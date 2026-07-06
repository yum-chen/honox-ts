import type { JSX } from "hono/jsx";
import CollapsibleIsland from "../../islands/collapsible";
import {
	Content,
	Indicator,
	Root as RootPrimitive,
	type RootProps,
	Trigger,
} from "./collapsible-primitive";

export interface CollapsibleProps
	extends Omit<RootProps, "onOpenChange" | "children"> {
	// Content (required)
	trigger: JSX.Element | string;
	content: JSX.Element;

	// Indicator
	indicator?: JSX.Element; // default: null (no indicator)
	indicatorPlacement?: "start" | "end"; // default: "end"

	// State
	defaultOpen?: boolean;
	onOpenChange?: (open: boolean) => void;

	// Behavior
	interactive?: boolean; // default: true (for SSG compatibility)

	// Styling
	triggerClass?: string;
	contentClass?: string;
	indicatorClass?: string;

	// Allow children for more complex compositions if needed
	children?: any;
}

export function Root(
	props: Omit<CollapsibleProps, "trigger" | "content"> & { children?: any },
) {
	const {
		interactive,
		onOpenChange,
		open,
		defaultOpen,
		children,
		...rest
	} = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onOpenChange !== undefined ||
			open !== undefined ||
			defaultOpen !== undefined);

	const handleOpenChange = onOpenChange
		? (details: { open: boolean }) => onOpenChange(details.open)
		: undefined;

	if (isInteractive) {
		return (
			<CollapsibleIsland
				{...rest}
				onOpenChange={handleOpenChange}
				open={open}
				defaultOpen={defaultOpen}
			>
				{children}
			</CollapsibleIsland>
		);
	}

	return (
		<RootPrimitive {...rest} onOpenChange={handleOpenChange} open={open}>
			{children}
		</RootPrimitive>
	);
}

export function Collapsible(props: CollapsibleProps) {
	const {
		trigger,
		content,
		indicator,
		indicatorPlacement = "end",
		triggerClass,
		contentClass,
		indicatorClass,
		children,
		...rest
	} = props;

	const isStringTrigger = typeof trigger === "string";

	return (
		<Root {...rest}>
			<Trigger asChild={!isStringTrigger} class={triggerClass}>
				{isStringTrigger ? (
					<>
						{indicator && indicatorPlacement === "start" && (
							<Indicator class={indicatorClass}>{indicator}</Indicator>
						)}
						{trigger}
						{indicator && indicatorPlacement === "end" && (
							<Indicator class={indicatorClass}>{indicator}</Indicator>
						)}
					</>
				) : (
					trigger
				)}
			</Trigger>
			<Content class={contentClass}>{content}</Content>
			{children}
		</Root>
	);
}

// Attach sub-components to the Collapsible component
Object.assign(Collapsible, {
	Root,
	Trigger,
	Content,
	Indicator,
});

export { Content, Indicator, Trigger };
export default Collapsible;
