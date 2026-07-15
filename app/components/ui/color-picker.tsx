/**
 * ColorPicker — hono/jsx styled wrapper (Park UI → hono/jsx port).
 *
 * No React, no @ark-ui/react. Mirrors the Park UI ColorPicker API:
 *   <ColorPicker value="#ff0000" />            // inline picker
 *   <ColorPicker trigger value="#ff0000" />     // swatch trigger + popover
 *   <ColorPicker.Root>...</ColorPicker.Root>   // composed sub-parts
 *
 * Renders the static primitive when there is no interactive signal, otherwise
 * hydrates the island (InteractiveColorPicker) for pointer/keyboard control.
 */
import type { JSX } from "hono/jsx";
import ColorPickerIsland from "../../islands/color-picker";
import { shouldHydrate } from "./island-utils";
import {
	Area,
	AreaBackground,
	AreaThumb,
	type ColorFormat,
	type ColorPickerChangeDetails,
	ColorPickerContent,
	type ColorPickerVariantProps,
	ChannelInput,
	ChannelSlider,
	ChannelSliderLabel,
	ChannelSliderThumb,
	ChannelSliderTrack,
	ChannelSliderValueText,
	Content,
	Control,
	EyeDropperTrigger,
	FormatSelect,
	FormatTrigger,
	type HSVA,
	HiddenInput,
	InteractiveColorPicker,
	Label,
	Positioner,
	Root as ColorPickerPrimitiveRoot,
	Swatch,
	SwatchGroup,
	SwatchIndicator,
	SwatchTrigger,
	TransparencyGrid,
	Trigger,
	ValueSwatch,
	ValueText,
	View,
} from "./color-picker-primitive";

export interface ColorPickerProps extends ColorPickerVariantProps {
	value?: string | HSVA;
	defaultValue?: string | HSVA;
	format?: ColorFormat;
	onValueChange?: (details: ColorPickerChangeDetails) => void;
	presets?: string[];
	name?: string;
	disabled?: boolean;
	readOnly?: boolean;
	/** Render a swatch trigger that opens the picker in a popover. */
	trigger?: boolean;
	label?: string | JSX.Element;
	showArea?: boolean;
	showSliders?: boolean;
	showInputs?: boolean;
	showSwatches?: boolean;
	/** Force static HTML (false) or always-hydrated island (true). */
	interactive?: boolean;
	class?: string;
	id?: string;
}

function ColorPickerRoot(props: ColorPickerProps) {
	const {
		label,
		value,
		defaultValue,
		format,
		onValueChange,
		presets,
		name,
		disabled,
		readOnly,
		trigger,
		showArea,
		showSliders,
		showInputs,
		showSwatches,
		interactive,
		class: classProp,
		id,
		...rest
	} = props;

	const hasSignal =
		onValueChange !== undefined ||
		value !== undefined ||
		defaultValue !== undefined ||
		trigger === true;
	const isInteractive = shouldHydrate(interactive, hasSignal);

	if (isInteractive) {
		return (
			<ColorPickerIsland
				{...rest}
				value={value}
				defaultValue={defaultValue}
				format={format}
				onValueChange={onValueChange}
				presets={presets}
				name={name}
				disabled={disabled}
				readOnly={readOnly}
				trigger={trigger}
				label={label}
				showArea={showArea}
				showSliders={showSliders}
				showInputs={showInputs}
				showSwatches={showSwatches}
				id={id}
				class={classProp}
			/>
		);
	}

	return (
		<ColorPickerPrimitiveRoot
			{...rest}
			value={value}
			defaultValue={defaultValue}
			format={format}
			disabled={disabled}
			readOnly={readOnly}
			id={id}
			class={classProp}
		>
			{label && <Label>{label}</Label>}
			<ColorPickerContent
				presets={presets}
				name={name}
				interactive={false}
				showArea={showArea}
				showSliders={showSliders}
				showInputs={showInputs}
				showSwatches={showSwatches}
			/>
		</ColorPickerPrimitiveRoot>
	);
}

const ColorPicker = Object.assign(ColorPickerRoot, {
	Root: ColorPickerPrimitiveRoot,
	Label,
	Control,
	Area,
	AreaBackground,
	AreaThumb,
	ChannelInput,
	ChannelSlider,
	ChannelSliderLabel,
	ChannelSliderTrack,
	ChannelSliderThumb,
	ChannelSliderValueText,
	Content,
	SwatchGroup,
	Swatch,
	SwatchIndicator,
	SwatchTrigger,
	TransparencyGrid,
	Trigger,
	Positioner,
	FormatSelect,
	FormatTrigger,
	ValueSwatch,
	ValueText,
	View,
	EyeDropperTrigger,
	HiddenInput,
});

export { ColorPicker, type ColorPickerProps };
export default ColorPicker;
