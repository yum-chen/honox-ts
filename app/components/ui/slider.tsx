import SliderIsland from "../../islands/slider";
import {
	Control,
	Label,
	Marker,
	MarkerGroup,
	MarkerIndicator,
	Range,
	Root as SliderPrimitiveRoot,
	type RootProps as SliderPrimitiveRootProps,
	Thumb,
	Track,
	ValueText,
} from "./slider-primitive";

type SliderRootValue = SliderPrimitiveRootProps["value"];

const serializeValue = (value: SliderRootValue) => {
	if (Array.isArray(value)) return value.join(",");
	return value;
};

export interface RootProps extends SliderPrimitiveRootProps {
	interactive?: boolean;
	onValueChange?: (details: { value: number[] }) => void;
}

export function Root(props: RootProps) {
	const { interactive, onValueChange, value, defaultValue, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onValueChange !== undefined ||
			value !== undefined ||
			defaultValue !== undefined);

	if (isInteractive) {
		return (
			<SliderIsland
				{...props}
				value={serializeValue(value)}
				defaultValue={serializeValue(defaultValue)}
			/>
		);
	}

	return (
		<SliderPrimitiveRoot {...rest} value={value} defaultValue={defaultValue} />
	);
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
