import {
	InteractiveSplitter,
	type InteractiveSplitterProps,
} from "../components/ui/splitter-primitive";

export type { InteractiveSplitterProps as SplitterIslandProps };

export default function SplitterIsland(props: InteractiveSplitterProps) {
	return <InteractiveSplitter {...props} />;
}
