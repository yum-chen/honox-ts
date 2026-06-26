import type { Child } from "hono/jsx";
import {
	Circle,
	CircleRange,
	CircleTrack,
	Label,
	Range,
	Root,
	type RootProps,
	Track,
	ValueText,
	View,
} from "./progress-primitive";

export interface ProgressProps extends RootProps {
	/**
	 * Whether to show the value text.
	 * @default false
	 */
	showValueText?: boolean;
	/**
	 * The custom value text to display.
	 */
	valueText?: Child;
	/**
	 * The label to display.
	 */
	label?: Child;
}

export const Progress = (props: ProgressProps) => {
	const { showValueText, valueText, label, children, ...rest } = props;

	return (
		<Root {...rest}>
			{label && <Label>{label}</Label>}
			<Track>
				<Range />
			</Track>
			{showValueText && <ValueText>{valueText}</ValueText>}
			{children}
		</Root>
	);
};

export {
	Circle,
	CircleRange,
	CircleTrack,
	Label,
	Range,
	Root,
	Track,
	ValueText,
	View,
};
