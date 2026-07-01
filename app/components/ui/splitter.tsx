import SplitterIsland, {
	type SplitterIslandProps,
} from "../../islands/splitter";
import {
	Panel,
	ResizeTrigger,
	Root as SplitterPrimitiveRoot,
} from "./splitter-primitive";

export interface RootProps extends SplitterIslandProps {
	interactive?: boolean;
}

export function Root(props: RootProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <SplitterIsland {...rest} />;
	}
	return <SplitterPrimitiveRoot {...rest} />;
}

export { Panel, ResizeTrigger };
