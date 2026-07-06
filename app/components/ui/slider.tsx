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

export type SliderProps = SliderPrimitiveRootProps;

export function Slider(props: SliderProps) {
	const {
		interactive,
		onChange,
		onDraggingChange,
		value,
		defaultValue,
		children,
		...rest
	} = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onChange !== undefined ||
			onDraggingChange !== undefined ||
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
		<SliderPrimitiveRoot {...rest} value={value} defaultValue={defaultValue}>
			{children || <SliderPrimitiveRoot.SliderStructure {...props} />}
		</SliderPrimitiveRoot>
	);
}

const Root = (props: SliderProps) => {
	const { interactive, onChange, value, defaultValue, ...rest } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onChange !== undefined ||
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
};

// Attach sub-components to the Slider component
Object.assign(Slider, {
	Root,
	Control,
	Label,
	Marker,
	MarkerGroup,
	MarkerIndicator,
	Range,
	Thumb,
	Track,
	ValueText,
	SliderStructure: SliderPrimitiveRoot.SliderStructure,
});

export {
	Root,
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

export default Slider;
