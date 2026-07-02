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
	const { interactive, onOpenChange, open, defaultOpen } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onOpenChange !== undefined ||
			open !== undefined ||
			defaultOpen !== undefined);

	if (isInteractive) {
		return <CollapsibleIsland {...props} />;
	}

	return <RootPrimitive {...props} />;
}

export { Content, Indicator, Trigger };
