import {
	InteractiveRoot,
	type InteractiveRootProps,
} from "../components/ui/collapsible-primitive";

export default function CollapsibleIsland(props: InteractiveRootProps) {
	console.log(`[Island] CollapsibleIsland component mounted`, props);
	return <InteractiveRoot {...props} />;
}

export type { InteractiveRootProps as CollapsibleIslandProps };
