import CollapsibleIsland from "../../islands/collapsible";
import {
	Content,
	Indicator,
	Root as RootPrimitive,
	type RootProps,
	Trigger,
} from "./collapsible-primitive";

export interface CollapsibleProps extends RootProps {
	interactive?: boolean;
	defaultOpen?: boolean;
}

export function Root(props: CollapsibleProps) {
	const { interactive, onOpenChange, open, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onOpenChange !== undefined ||
			open !== undefined ||
			props.defaultOpen !== undefined);

	if (isInteractive) {
		return (
			<CollapsibleIsland
				{...rest}
				onOpenChange={onOpenChange}
				open={open}
				defaultOpen={props.defaultOpen}
			/>
		);
	}

	return <RootPrimitive {...rest} onOpenChange={onOpenChange} open={open} />;
}

export { Content, Indicator, Trigger };
