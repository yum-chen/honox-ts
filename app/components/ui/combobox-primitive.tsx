import {
	createContext,
	type PropsWithChildren,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { ComboboxVariantProps } from "../../../styled-system/recipes";
import { combobox } from "../../../styled-system/recipes";
import type { Child } from "hono/jsx";

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
	[key: string]: any;
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
		id,
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
				id={id}
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
	return (
		<div
			data-scope="combobox"
			data-part="positioner"
			data-state={context?.open ? "open" : "closed"}
			class={cx(context?.styles.positioner, classProp)}
			style={{
				position: "absolute",
				top: "100%",
				left: "0",
				width: "100%",
				zIndex: 1000,
				...(context?.open ? { display: "block" } : { display: "none" }),
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
	const { items = [], label, placeholder, allowClear, children } = props;
	const context = useComboboxContext();

	const filteredItems = items.filter((item) =>
		item.label.toLowerCase().includes(context?.inputValue.toLowerCase() || ""),
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

export interface InteractiveComboboxProps extends ComboboxFlattenedProps {
	id?: string;
}

export function InteractiveCombobox(props: InteractiveComboboxProps) {
	const {
		open: openProp,
		inputValue: inputValueProp,
		id: idProp,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);
	const [inputValue, setInputValue] = useState(inputValueProp ?? "");

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `combobox-${fallbackId}`;

	const handleToggleRef = useRef<() => void>(() => {});
	const handleCloseRef = useRef<() => void>(() => {});
	const handleInputChangeRef = useRef<(val: string) => void>(() => {});
	const handleItemSelectRef = useRef<(val: string) => void>(() => {});

	const handleToggle = () => {
		if (!isControlled) {
			setIsOpen((prev) => {
				const nextOpen = !prev;
				// When opening via trigger, clear input to show all items
				if (nextOpen) {
					setInputValue("");
				}
				return nextOpen;
			});
		}
	};

	const handleClose = () => {
		if (!isControlled) {
			setIsOpen(false);
		}
	};

	const handleInputChange = (val: string) => {
		setInputValue(val);
		// Open dropdown only when user is actively typing (has non-empty input)
		if (val && !open) {
			if (!isControlled) {
				setIsOpen(true);
			}
		}
	};

	const handleItemSelect = (val: string) => {
		// Keep the display value but reset the filter
		setInputValue(val);
		if (!isControlled) {
			setIsOpen(false);
		}
	};

	// Store handlers in refs
	useEffect(() => {
		handleToggleRef.current = handleToggle;
		handleCloseRef.current = handleClose;
		handleInputChangeRef.current = handleInputChange;
		handleItemSelectRef.current = handleItemSelect;
	}, [
		isControlled,
		open,
		handleToggle,
		handleClose,
		handleInputChange,
		handleItemSelect,
	]);

	// Sync initial DOM state to match component state (fixes hydration mismatch)
	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		root.setAttribute("data-state", open ? "open" : "closed");

		const positioners = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
		);
		const contents = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="content"]'),
		);

		if (open) {
			positioners.forEach((p) => {
				p.style.cssText =
					"display: block !important; visibility: visible !important;";
				p.setAttribute("data-state", "open");
			});
			contents.forEach((c) => {
				c.style.cssText =
					"display: block !important; visibility: visible !important;";
				c.setAttribute("data-state", "open");
			});
		} else {
			positioners.forEach((p) => {
				p.style.cssText =
					"display: none !important; visibility: hidden !important;";
				p.setAttribute("data-state", "closed");
			});
			contents.forEach((c) => {
				c.style.cssText =
					"display: none !important; visibility: hidden !important;";
				c.setAttribute("data-state", "closed");
			});
		}
	}, [rootId, open]);

	// Attach event listeners using event delegation
	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const positioners = Array.from(
			root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
		);

		const handleClick = (e: Event) => {
			const target = (e.target as HTMLElement).closest(
				"[data-part]",
			) as HTMLElement;
			if (!target) return;

			const dataPart = target.getAttribute("data-part");
			const isDisabled = target.hasAttribute("data-disabled");

			const hide = () => {
				root.setAttribute("data-state", "closed");
				positioners.forEach((p) => {
					p.style.cssText =
						"display: none !important; visibility: hidden !important;";
					p.setAttribute("data-state", "closed");
				});
				root
					.querySelectorAll<HTMLElement>('[data-part="content"]')
					.forEach((c) => {
						c.setAttribute("data-state", "closed");
						c.style.cssText =
							"display: none !important; visibility: hidden !important;";
					});
			};

			const show = () => {
				root.setAttribute("data-state", "open");
				positioners.forEach((p) => {
					p.style.cssText =
						"display: block !important; visibility: visible !important;";
					p.setAttribute("data-state", "open");
				});
				root
					.querySelectorAll<HTMLElement>('[data-part="content"]')
					.forEach((c) => {
						c.setAttribute("data-state", "open");
						c.style.cssText =
							"display: block !important; visibility: visible !important;";
					});
			};

			if (dataPart === "trigger") {
				const currentOpen = root.getAttribute("data-state") === "open";
				const nextOpen = !currentOpen;
				if (nextOpen) {
					// When opening, clear the input to show all items
					const inputElement = root.querySelector(
						'[data-part="input"]',
					) as HTMLInputElement | null;
					if (inputElement) {
						inputElement.value = "";
						setInputValue("");
					}
					show();
				} else {
					hide();
				}
				handleToggleRef.current?.();
			} else if (dataPart === "clear-trigger") {
				const inputElement = root.querySelector(
					'[data-part="input"]',
				) as HTMLInputElement | null;
				if (inputElement) {
					inputElement.value = "";
					setInputValue("");
					// Keep the dropdown open to show all options after clearing
					if (root.getAttribute("data-state") !== "open") {
						show();
					}
				}
			} else if (dataPart === "item" && !isDisabled) {
				const value = target.getAttribute("data-value") || "";
				const inputElement = root.querySelector(
					'[data-part="input"]',
				) as HTMLInputElement | null;
				if (inputElement) {
					// Store the full label for display
					inputElement.value = value;
					setInputValue(value);
				}
				hide();
				handleItemSelectRef.current?.(value);
			}
		};

		// Attach event listeners
		root.addEventListener("click", handleClick);

		// Handle input change for opening/closing
		const handleInputEvent = (e: Event) => {
			const input = e.target as HTMLInputElement;
			const value = input.value;
			setInputValue(value);

			// Open the dropdown when user types
			if (root.getAttribute("data-state") !== "open" && value) {
				root.setAttribute("data-state", "open");
				positioners.forEach((p) => {
					p.style.cssText =
						"display: block !important; visibility: visible !important;";
					p.setAttribute("data-state", "open");
				});
				root
					.querySelectorAll<HTMLElement>('[data-part="content"]')
					.forEach((c) => {
						c.setAttribute("data-state", "open");
						c.style.cssText =
							"display: block !important; visibility: visible !important;";
					});
			} else if (!value && root.getAttribute("data-state") === "open") {
				// When user clears the input, show all items while dropdown is open
				setInputValue("");
			}
		};

		const inputElement = root.querySelector(
			'[data-part="input"]',
		) as HTMLInputElement | null;
		if (inputElement) {
			inputElement.addEventListener("input", handleInputEvent);
		}

		return () => {
			root.removeEventListener("click", handleClick);
			if (inputElement) {
				inputElement.removeEventListener("input", handleInputEvent);
			}
		};
	}, [rootId, open]);

	return (
		<Root
			id={rootId}
			data-state={open ? "open" : "closed"}
			{...rest}
			open={open}
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
