import type { Child, PropsWithChildren } from "hono/jsx";
import { createContext, useContext } from "hono/jsx";
import { cx } from "styled-system/css";
import type { ToggleGroupVariantProps } from "styled-system/recipes";
import { toggleGroup } from "styled-system/recipes";

type ToggleGroupStyles = ReturnType<typeof toggleGroup>;

interface ToggleGroupContextValue {
	styles: ToggleGroupStyles;
	value: string[];
	disabled?: boolean;
	onValueChange?: (value: string[]) => void;
}

const ToggleGroupContext = createContext<ToggleGroupContextValue | null>(null);

const useToggleGroupContext = () => {
	const context = useContext(ToggleGroupContext);
	return context;
};

export interface RootProps
	extends ToggleGroupVariantProps,
		PropsWithChildren<{
			value?: string[];
			defaultValue?: string[];
			onValueChange?: (value: string[]) => void;
			multiple?: boolean;
			deselectable?: boolean;
			disabled?: boolean;
			class?: string;
			id?: string;
			[key: string]: unknown;
		}> {}

export function Root(props: RootProps) {
	const [variantProps, localProps] = toggleGroup.splitVariantProps(props);
	const {
		children,
		value: valueProp,
		defaultValue = [],
		onValueChange,
		multiple,
		deselectable,
		disabled,
		class: classProp,
		...rest
	} = localProps;

	const styles = toggleGroup(variantProps);
	const value = valueProp ?? defaultValue;

	return (
		<ToggleGroupContext.Provider
			value={{
				styles,
				value,
				disabled,
				onValueChange,
			}}
		>
			<div
				role="group"
				data-scope="toggle-group"
				data-part="root"
				data-disabled={disabled ? "" : undefined}
				class={cx(styles.root, classProp)}
				{...(rest as any)}
			>
				{children}
			</div>
		</ToggleGroupContext.Provider>
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
	const context = useToggleGroupContext();

	const disabled = context?.disabled || disabledProp;
	const isPressed = context?.value.includes(value);

	return (
		<button
			type="button"
			aria-pressed={isPressed}
			data-scope="toggle-group"
			data-part="item"
			data-value={value}
			data-state={isPressed ? "on" : "off"}
			data-disabled={disabled ? "" : undefined}
			disabled={disabled}
			class={cx(context?.styles.item, classProp)}
			{...(rest as any)}
		>
			{children}
		</button>
	);
}
