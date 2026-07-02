import {
	InteractiveRoot,
	type InteractiveRootProps,
} from "../components/ui/collapsible-primitive";

export default function CollapsibleIsland(props: InteractiveRootProps) {
	if (typeof window !== "undefined") {
		console.log("[ISLAND] CollapsibleIsland rendering on client");
	}
	return <InteractiveRoot {...props} />;
}

export type { InteractiveRootProps as CollapsibleIslandProps };
