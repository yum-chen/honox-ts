import SliderIsland, { type SliderIslandProps } from "../../islands/slider";
import {
	Control,
	Label,
	Marker,
	MarkerGroup,
	MarkerIndicator,
	Range,
	Root as SliderPrimitiveRoot,
	Thumb,
	Track,
	ValueText,
} from "./slider-primitive";

export interface RootProps extends SliderIslandProps {
	interactive?: boolean;
}

export function Root(props: RootProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <SliderIsland {...rest} />;
	}
	return <SliderPrimitiveRoot {...rest} />;
}

export {
	Control,
	Label,
	Marker,
	MarkerGroup,
	MarkerIndicator,
	Range,
	Thumb,
	Track,
	ValueText,
};
