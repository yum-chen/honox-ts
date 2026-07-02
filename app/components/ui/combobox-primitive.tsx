import type { Child } from "hono/jsx";
import {
	createContext,
	type PropsWithChildren,
	useContext,
	useState,
} from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { ComboboxVariantProps } from "../../../styled-system/recipes/index.mjs";
import { combobox } from "../../../styled-system/recipes/index.mjs";

type ComboboxStyles = ReturnType<typeof combobox>;

interface ComboboxContextValue {
	styles: ComboboxStyles;
	open: boolean;
	inputValue: string;
	onToggle?: () => void;
	onClose?: () => void;
	onInputChange?: (value: string) => void;
	onItemSelect?: (value: string) => void;
}

const ComboboxContext = createContext<ComboboxContextValue | null>(null);

const useComboboxContext = () => {
	const context = useContext(ComboboxContext);
	return context;
};

export interface ComboboxItem {
	label: string;
	value: string;
	disabled?: boolean;
}

export interface RootProps extends ComboboxVariantProps, PropsWithChildren {
	open?: boolean;
	inputValue?: string;
	onToggle?: () => void;
	onClose?: () => void;
	onInputChange?: (value: string) => void;
	onItemSelect?: (value: string) => void;
	class?: string;
	id?: string;
	style?: any;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = combobox.splitVariantProps(props);
	const {
		children,
		open = false,
		inputValue = "",
		onToggle,
		onClose,
		onInputChange,
		onItemSelect,
		class: classProp,
		style,
		...rest
	} = localProps;

	const styles = combobox(variantProps);

	return (
		<ComboboxContext.Provider
			value={{
				styles,
				open,
				inputValue,
				onToggle,
				onClose,
				onInputChange,
				onItemSelect,
			}}
		>
			<div
				data-scope="combobox"
				data-part="root"
				class={cx(styles.root, classProp)}
				style={{ position: "relative", ...style }}
				{...rest}
			>
				{children}
			</div>
		</ComboboxContext.Provider>
	);
}

export function Label(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<label
			data-scope="combobox"
			data-part="label"
			class={cx(context?.styles.label, classProp)}
			{...rest}
		>
			{children}
		</label>
	);
}

export function Control(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="control"
			class={cx(context?.styles.control, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Input(props: any) {
	const { class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<input
			role="combobox"
			aria-autocomplete="list"
			aria-expanded={context?.open}
			aria-haspopup="listbox"
			data-scope="combobox"
			data-part="input"
			class={cx(context?.styles.input, classProp)}
			value={context?.inputValue}
			onInput={(e: any) => context?.onInputChange?.(e.target.value)}
			{...rest}
		/>
	);
}

export function Trigger(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<button
			type="button"
			aria-label="open"
			aria-haspopup="listbox"
			aria-expanded={context?.open}
			data-scope="combobox"
			data-part="trigger"
			class={cx(context?.styles.trigger, classProp)}
			onClick={context?.onToggle}
			{...rest}
		>
			{children || (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Open</title>
					<path d="m7 15 5 5 5-5" />
					<path d="m7 9 5-5 5 5" />
				</svg>
			)}
		</button>
	);
}

export function ClearTrigger(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<button
			type="button"
			aria-label="clear"
			data-scope="combobox"
			data-part="clear-trigger"
			class={cx(context?.styles.clearTrigger, classProp)}
			onClick={() => context?.onInputChange?.("")}
			{...rest}
		>
			{children || (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Clear</title>
					<path d="M18 6 6 18" />
					<path d="m6 6 12 12" />
				</svg>
			)}
		</button>
	);
}

export function IndicatorGroup(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="indicator-group"
			class={cx(context?.styles.indicatorGroup, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Positioner(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	if (!context?.open) return null;
	return (
		<div
			data-scope="combobox"
			data-part="positioner"
			class={cx(context?.styles.positioner, classProp)}
			style={{
				position: "absolute",
				top: "100%",
				left: "0",
				width: "100%",
				zIndex: 1000,
			}}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Content(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="content"
			data-state={context?.open ? "open" : "closed"}
			class={cx(context?.styles.content, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function List(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			role="listbox"
			data-scope="combobox"
			data-part="list"
			class={cx(context?.styles.list, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Item(
	props: PropsWithChildren<{
		value: string;
		disabled?: boolean;
		class?: string;
		[key: string]: any;
	}>,
) {
	const { children, value, disabled, class: classProp, ...rest } = props;
	const context = useComboboxContext();

	return (
		<div
			role="option"
			aria-disabled={disabled}
			data-scope="combobox"
			data-part="item"
			data-value={value}
			data-disabled={disabled ? "" : undefined}
			class={cx(context?.styles.item, classProp)}
			onClick={() => !disabled && context?.onItemSelect?.(value)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function ItemText(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<span
			data-scope="combobox"
			data-part="item-text"
			class={cx(context?.styles.itemText, classProp)}
			{...rest}
		>
			{children}
		</span>
	);
}

export function ItemIndicator(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="item-indicator"
			class={cx(context?.styles.itemIndicator, classProp)}
			{...rest}
		>
			{children || (
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<title>Selected</title>
					<path d="M20 6 9 17l-5-5" />
				</svg>
			)}
		</div>
	);
}

export function ItemGroup(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			role="group"
			data-scope="combobox"
			data-part="item-group"
			class={cx(context?.styles.itemGroup, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function ItemGroupLabel(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="item-group-label"
			class={cx(context?.styles.itemGroupLabel, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export function Empty(props: PropsWithChildren<{ class?: string }>) {
	const { children, class: classProp, ...rest } = props;
	const context = useComboboxContext();
	return (
		<div
			data-scope="combobox"
			data-part="empty"
			class={cx(context?.styles.empty, classProp)}
			{...rest}
		>
			{children}
		</div>
	);
}

export interface ComboboxFlattenedProps extends RootProps {
	items?: ComboboxItem[];
	label?: Child;
	placeholder?: string;
	allowClear?: boolean;
}

export function ComboboxStructure(props: ComboboxFlattenedProps) {
	const {
		items = [],
		label,
		placeholder,
		allowClear,
		children,
		...rest
	} = props;
	const { inputValue } = useComboboxContext();

	const filteredItems = items.filter((item) =>
		item.label.toLowerCase().includes(inputValue.toLowerCase()),
	);

	return (
		<>
			{label && <Label>{label}</Label>}
			<Control>
				<Input placeholder={placeholder} />
				<IndicatorGroup>
					{allowClear && <ClearTrigger />}
					<Trigger />
				</IndicatorGroup>
			</Control>
			<Positioner>
				<Content>
					<List>
						{filteredItems.length > 0 ? (
							filteredItems.map((item) => (
								<Item
									key={item.value}
									value={item.label}
									disabled={item.disabled}
								>
									<ItemText>{item.label}</ItemText>
									<ItemIndicator />
								</Item>
							))
						) : (
							<Empty>No results found</Empty>
						)}
					</List>
				</Content>
			</Positioner>
			{children}
		</>
	);
}

export function InteractiveCombobox(props: ComboboxFlattenedProps) {
	const { open: openProp, inputValue: inputValueProp, ...rest } = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);
	const [inputValue, setInputValue] = useState(inputValueProp ?? "");

	const handleToggle = () => setIsOpen(!isOpen);
	const handleClose = () => setIsOpen(false);
	const handleInputChange = (val: string) => {
		setInputValue(val);
		if (val && !isOpen) setIsOpen(true);
	};
	const handleItemSelect = (val: string) => {
		setInputValue(val);
		setIsOpen(false);
	};

	return (
		<Root
			{...rest}
			open={isOpen}
			inputValue={inputValue}
			onToggle={handleToggle}
			onClose={handleClose}
			onInputChange={handleInputChange}
			onItemSelect={handleItemSelect}
		>
			<ComboboxStructure {...props} />
		</Root>
	);
}
