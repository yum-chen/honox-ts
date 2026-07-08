import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "styled-system/css";
import type { SegmentGroupVariantProps } from "styled-system/recipes";
import { segmentGroup } from "styled-system/recipes";

type SegmentGroupStyles = ReturnType<typeof segmentGroup>;

interface SegmentGroupContextValue {
	styles: SegmentGroupStyles;
	value: string;
	disabled?: boolean;
	onValueChange?: (value: string) => void;
	rootId: string;
}

const SegmentGroupContext = createContext<SegmentGroupContextValue | null>(
	null,
);

const useSegmentGroupContext = () => {
	const context = useContext(SegmentGroupContext);
	return context;
};

export interface RootProps
	extends SegmentGroupVariantProps,
		PropsWithChildren<{
			value?: string;
			defaultValue?: string;
			onValueChange?: (value: string) => void;
			disabled?: boolean;
			class?: string;
			id?: string;
			orientation?: "horizontal" | "vertical";
			[key: string]: unknown;
		}> {}

export function Root(props: RootProps) {
	const [variantProps, localProps] = segmentGroup.splitVariantProps(props);
	const {
		children,
		value: valueProp,
		defaultValue,
		onValueChange,
		disabled,
		class: classProp,
		id,
		orientation = "horizontal",
		...rest
	} = localProps;

	const styles = segmentGroup(variantProps);
	const value = valueProp ?? defaultValue ?? "";
	const rootId = id || useId();

	return (
		<SegmentGroupContext.Provider
			value={{
				styles,
				value,
				disabled,
				onValueChange,
				rootId,
			}}
		>
			<div
				role="radiogroup"
				id={rootId}
				data-scope="segment-group"
				data-part="root"
				data-disabled={disabled ? "" : undefined}
				data-orientation={orientation}
				class={cx(styles.root, classProp)}
				{...(rest as any)}
			>
				{children}
			</div>
		</SegmentGroupContext.Provider>
	);
}

export function Indicator(props: { class?: string; [key: string]: unknown }) {
	const { class: classProp, ...rest } = props;
	const context = useSegmentGroupContext();
	return (
		<div
			data-scope="segment-group"
			data-part="indicator"
			class={cx(context?.styles.indicator, classProp)}
			{...(rest as any)}
		/>
	);
}

export function Label(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useSegmentGroupContext();
	return (
		<div
			data-scope="segment-group"
			data-part="label"
			class={cx(context?.styles.label, classProp)}
			{...(rest as any)}
		>
			{children}
		</div>
	);
}

export interface ItemProps
	extends PropsWithChildren<{
		value: string;
		disabled?: boolean;
		class?: string;
		[key: string]: unknown;
	}> {}

export function Item(props: ItemProps) {
	const {
		children,
		value,
		disabled: disabledProp,
		class: classProp,
		...rest
	} = props;
	const context = useSegmentGroupContext();

	const disabled = context?.disabled || disabledProp;
	const isChecked = context?.value === value;

	return (
		<label
			data-scope="segment-group"
			data-part="item"
			data-value={value}
			data-state={isChecked ? "checked" : "unchecked"}
			data-disabled={disabled ? "" : undefined}
			class={cx(context?.styles.item, classProp)}
			{...(rest as any)}
		>
			{children}
		</label>
	);
}

export function ItemText(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useSegmentGroupContext();
	return (
		<span
			data-scope="segment-group"
			data-part="item-text"
			class={cx(context?.styles.itemText, classProp)}
			{...(rest as any)}
		>
			{children}
		</span>
	);
}

export function ItemControl(props: { class?: string; [key: string]: unknown }) {
	const { class: classProp, ...rest } = props;
	const context = useSegmentGroupContext();
	return (
		<div
			data-scope="segment-group"
			data-part="item-control"
			class={cx(context?.styles.itemControl, classProp)}
			{...(rest as any)}
		/>
	);
}

export function ItemHiddenInput(props: {
	value?: string;
	[key: string]: unknown;
}) {
	const context = useSegmentGroupContext();
	// We'll let the Item handle the checked state via data-state,
	// but the input is useful for forms.
	return (
		<input
			type="radio"
			tabIndex={-1}
			aria-hidden="true"
			disabled={context?.disabled}
			data-scope="segment-group"
			data-part="item-hidden-input"
			value={props.value}
			style={{
				border: "0",
				clip: "rect(0 0 0 0)",
				height: "1px",
				margin: "-1px",
				overflow: "hidden",
				padding: "0",
				position: "absolute",
				width: "1px",
				whiteSpace: "nowrap",
				wordWrap: "normal",
			}}
			{...(props as any)}
		/>
	);
}
