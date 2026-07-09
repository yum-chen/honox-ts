import type { Child, PropsWithChildren } from "hono/jsx";
import {
	createContext,
	useContext,
	useEffect,
	useId,
	useRef,
	useState,
} from "hono/jsx";
import { cx } from "styled-system/css";
import type { TagsInputVariantProps } from "styled-system/recipes";
import { tagsInput } from "styled-system/recipes";

type TagsInputStyles = ReturnType<typeof tagsInput>;

interface TagsInputContextValue {
	styles: TagsInputStyles;
	value: string[];
	inputValue: string;
	highlightedIndex: number;
	editingIndex: number;
	rootId: string;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
}

const TagsInputContext = createContext<TagsInputContextValue | null>(null);

const useTagsInputContext = () => {
	const context = useContext(TagsInputContext);
	if (!context) {
		return null;
	}
	return context;
};

const ItemContext = createContext<{ index: number; value: string } | null>(
	null,
);

const useItemContext = () => {
	const context = useContext(ItemContext);
	return context;
};

interface RootProps extends TagsInputVariantProps, PropsWithChildren {
	value?: string[];
	defaultValue?: string[];
	inputValue?: string;
	defaultInputValue?: string;
	onValueChange?: (details: { value: string[] }) => void;
	onInputValueChange?: (details: { inputValue: string }) => void;
	max?: number;
	disabled?: boolean;
	invalid?: boolean;
	readOnly?: boolean;
	required?: boolean;
	id?: string;
	class?: string;
	style?: any;
}

function Root(props: RootProps) {
	const [variantProps, localProps] = tagsInput.splitVariantProps(props);
	const {
		children,
		value,
		defaultValue = [],
		inputValue = "",
		highlightedIndex = -1,
		editingIndex = -1,
		disabled,
		invalid,
		readOnly,
		required,
		id,
		class: classProp,
		style,
		...rest
	} = localProps;

	const styles = tagsInput(variantProps);
	const fallbackId = useId();
	const rootId = id || `tags-input-${fallbackId}`;
	const resolvedValue = value ?? defaultValue;

	const contextValue: TagsInputContextValue = {
		styles,
		value: resolvedValue,
		inputValue,
		highlightedIndex,
		editingIndex,
		rootId,
		disabled,
		invalid,
		readOnly,
		required,
	};

	return (
		<TagsInputContext.Provider value={contextValue}>
			<div
				id={rootId}
				data-scope="tags-input"
				data-part="root"
				data-disabled={disabled ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-empty={resolvedValue.length === 0 ? "" : undefined}
				class={cx(styles.root, classProp)}
				style={style}
				{...rest}
			>
				{children}
			</div>
		</TagsInputContext.Provider>
	);
}

function Label(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();
	const htmlForId = context?.rootId ? `${context.rootId}-input` : undefined;

	return (
		<label
			htmlFor={htmlForId}
			data-scope="tags-input"
			data-part="label"
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-required={context?.required ? "" : undefined}
			class={cx(context?.styles.label, props.class)}
		>
			{props.children}
		</label>
	);
}

function Control(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();

	return (
		<div
			data-scope="tags-input"
			data-part="control"
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			class={cx(context?.styles.control, props.class)}
		>
			{props.children}
		</div>
	);
}

function Input(props: any) {
	const { class: classProp, ...rest } = props;
	const context = useTagsInputContext();
	const inputId = context?.rootId ? `${context.rootId}-input` : undefined;

	return (
		<input
			id={inputId}
			data-scope="tags-input"
			data-part="input"
			data-disabled={context?.disabled ? "" : undefined}
			data-invalid={context?.invalid ? "" : undefined}
			data-readonly={context?.readOnly ? "" : undefined}
			data-empty={context?.inputValue === "" ? "" : undefined}
			disabled={context?.disabled}
			readOnly={context?.readOnly}
			required={context?.required}
			class={cx(context?.styles.input, classProp)}
			value={context?.inputValue}
			{...rest}
		/>
	);
}

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Close</title>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

function ClearTrigger(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();

	return (
		<button
			type="button"
			data-scope="tags-input"
			data-part="clear-trigger"
			data-readonly={context?.readOnly ? "" : undefined}
			disabled={context?.disabled || context?.readOnly}
			class={cx(context?.styles.clearTrigger, props.class)}
		>
			{props.children || <CloseIcon />}
		</button>
	);
}

interface ItemProps extends PropsWithChildren {
	index: number;
	value: string;
	disabled?: boolean;
	class?: string;
}

function Item(props: ItemProps) {
	const { index, value, disabled, children, class: classProp, ...rest } = props;
	const context = useTagsInputContext();
	const isHighlighted = context?.highlightedIndex === index;
	const isEditing = context?.editingIndex === index;
	const isDisabled = disabled || context?.disabled;

	return (
		<ItemContext.Provider value={{ index, value }}>
			<div
				data-scope="tags-input"
				data-part="item"
				data-value={value}
				data-disabled={isDisabled ? "" : undefined}
				data-highlighted={isHighlighted ? "" : undefined}
				data-state={isEditing ? "editing" : "preview"}
				class={classProp}
				style={{ display: "inline-flex", alignItems: "center" }}
				{...rest}
			>
				{children}
			</div>
		</ItemContext.Provider>
	);
}

function ItemPreview(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();
	const item = useItemContext();
	const isHighlighted = item && context?.highlightedIndex === item.index;
	const isEditing = item && context?.editingIndex === item.index;

	return (
		<div
			data-scope="tags-input"
			data-part="item-preview"
			data-value={item?.value}
			data-disabled={context?.disabled ? "" : undefined}
			data-highlighted={isHighlighted ? "" : undefined}
			class={cx(context?.styles.itemPreview, props.class)}
			style={{ display: isEditing ? "none" : "inline-flex" }}
		>
			{props.children}
		</div>
	);
}

function ItemText(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();
	const item = useItemContext();
	const isHighlighted = item && context?.highlightedIndex === item.index;

	return (
		<span
			data-scope="tags-input"
			data-part="item-text"
			data-disabled={context?.disabled ? "" : undefined}
			data-highlighted={isHighlighted ? "" : undefined}
			class={cx(context?.styles.itemText, props.class)}
		>
			{props.children}
		</span>
	);
}

function ItemDeleteTrigger(props: PropsWithChildren<{ class?: string }>) {
	const context = useTagsInputContext();
	const item = useItemContext();
	const isHighlighted = item && context?.highlightedIndex === item.index;

	return (
		<button
			type="button"
			data-scope="tags-input"
			data-part="item-delete-trigger"
			data-disabled={context?.disabled ? "" : undefined}
			data-highlighted={isHighlighted ? "" : undefined}
			disabled={context?.disabled || context?.readOnly}
			class={cx(context?.styles.itemDeleteTrigger, props.class)}
		>
			{props.children || <CloseIcon />}
		</button>
	);
}

function ItemInput(props: any) {
	const { class: classProp, ...rest } = props;
	const context = useTagsInputContext();
	const item = useItemContext();
	const isEditing = item && context?.editingIndex === item.index;

	return (
		<input
			data-scope="tags-input"
			data-part="item-input"
			data-disabled={context?.disabled ? "" : undefined}
			disabled={context?.disabled}
			readOnly={context?.readOnly}
			class={cx(context?.styles.itemInput, classProp)}
			style={{ display: isEditing ? "inline-block" : "none" }}
			value={item?.value}
			{...rest}
		/>
	);
}

function HiddenInput(props: { name?: string; value?: string[] }) {
	const context = useTagsInputContext();
	const values = props.value ?? context?.value ?? [];

	return (
		<input
			type="hidden"
			name={props.name}
			value={values.join(",")}
			data-scope="tags-input"
			data-part="hidden-input"
		/>
	);
}

interface TagsInputItemsProps {
	class?: string;
}

function Items(props: TagsInputItemsProps) {
	const context = useTagsInputContext();
	const value = context?.value ?? [];

	return (
		<>
			{value.map((tag, index) => (
				<Item key={`${tag}-${index}`} index={index} value={tag}>
					<ItemPreview>
						<ItemText>{tag}</ItemText>
						<ItemDeleteTrigger />
					</ItemPreview>
					<ItemInput />
				</Item>
			))}
		</>
	);
}

interface TagsInputFlattenedProps extends RootProps {
	label?: Child;
	placeholder?: string;
	allowClear?: boolean;
	name?: string;
}

function TagsInputStructure(props: TagsInputFlattenedProps) {
	const { label, placeholder, allowClear = true, name } = props;
	const context = useTagsInputContext();
	const hasTags = (context?.value ?? []).length > 0;

	return (
		<>
			{label && <Label>{label}</Label>}
			<Control>
				<Items />
				<Input placeholder={placeholder} />
				{allowClear && hasTags && <ClearTrigger />}
			</Control>
			<HiddenInput name={name} />
		</>
	);
}

interface InteractiveTagsInputProps extends TagsInputFlattenedProps {
	max?: number;
	allowOverflow?: boolean;
	maxLength?: number;
	delimiter?: string | RegExp;
	addOnPaste?: boolean;
	editable?: boolean;
	validate?: (details: { value: string; values: string[] }) => boolean;
}

function InteractiveTagsInput(props: InteractiveTagsInputProps) {
	const {
		value: valueProp,
		defaultValue = [],
		inputValue: inputValueProp,
		defaultInputValue = "",
		onValueChange,
		onInputValueChange,
		max = Number.POSITIVE_INFINITY,
		allowOverflow = false,
		maxLength,
		delimiter = ",",
		addOnPaste = false,
		editable = true,
		validate,
		id: idProp,
		...rest
	} = props;

	const fallbackId = useId();
	const rootId = idProp || `tags-input-${fallbackId}`;

	const [value, setValue] = useState<string[]>(valueProp ?? defaultValue);
	const [inputValue, setInputValue] = useState<string>(
		inputValueProp ?? defaultInputValue,
	);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const [editingIndex, setEditingIndex] = useState<number>(-1);

	const isControlledValue = valueProp !== undefined;
	const currentValue = isControlledValue ? valueProp : value;

	const isControlledInput = inputValueProp !== undefined;
	const currentInputValue = isControlledInput ? inputValueProp : inputValue;

	const valueRef = useRef<string[]>(currentValue);
	const inputValueRef = useRef<string>(currentInputValue);
	const highlightedIndexRef = useRef<number>(highlightedIndex);
	const editingIndexRef = useRef<number>(editingIndex);

	useEffect(() => {
		valueRef.current = currentValue;
	}, [currentValue]);

	useEffect(() => {
		inputValueRef.current = currentInputValue;
	}, [currentInputValue]);

	useEffect(() => {
		highlightedIndexRef.current = highlightedIndex;
	}, [highlightedIndex]);

	useEffect(() => {
		editingIndexRef.current = editingIndex;
	}, [editingIndex]);

	const updateValue = (newValue: string[]) => {
		if (!isControlledValue) {
			setValue(newValue);
		}
		onValueChange?.({ value: newValue });
	};

	const updateInputValue = (newInput: string) => {
		if (!isControlledInput) {
			setInputValue(newInput);
		}
		onInputValueChange?.({ inputValue: newInput });
	};

	// DOM Syncing
	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const syncDom = () => {
			root.setAttribute(
				"data-empty",
				currentValue.length === 0 ? "true" : "false",
			);
			const isAtMax = currentValue.length >= max;
			root.setAttribute("data-at-max", isAtMax ? "true" : "false");
			if (currentValue.length > max && !allowOverflow) {
				root.setAttribute("data-invalid", "true");
			} else {
				root.removeAttribute("data-invalid");
			}

			const control = root.querySelector('[data-part="control"]');
			if (control) {
				control.setAttribute(
					"data-empty",
					currentValue.length === 0 ? "true" : "false",
				);
			}

			const mainInput = root.querySelector(
				'[data-part="input"]',
			) as HTMLInputElement | null;
			if (mainInput) {
				mainInput.value = currentInputValue;
				mainInput.setAttribute(
					"data-empty",
					currentInputValue === "" ? "true" : "false",
				);
			}

			const hiddenInput = root.querySelector(
				'[data-part="hidden-input"]',
			) as HTMLInputElement | null;
			if (hiddenInput) {
				hiddenInput.value = currentValue.join(",");
			}

			const items = Array.from(
				root.querySelectorAll('[data-part="item"]'),
			) as HTMLElement[];
			items.forEach((item, idx) => {
				const isHighlighted = idx === highlightedIndex;
				const isEditing = idx === editingIndex;

				item.setAttribute("data-highlighted", isHighlighted ? "true" : "false");
				item.setAttribute("data-state", isEditing ? "editing" : "preview");

				const preview = item.querySelector(
					'[data-part="item-preview"]',
				) as HTMLElement | null;
				if (preview) {
					preview.style.display = isEditing ? "none" : "inline-flex";
					preview.setAttribute(
						"data-highlighted",
						isHighlighted ? "true" : "false",
					);
				}

				const deleteBtn = item.querySelector(
					'[data-part="item-delete-trigger"]',
				) as HTMLElement | null;
				if (deleteBtn) {
					deleteBtn.setAttribute(
						"data-highlighted",
						isHighlighted ? "true" : "false",
					);
				}

				const textEl = item.querySelector(
					'[data-part="item-text"]',
				) as HTMLElement | null;
				if (textEl) {
					textEl.setAttribute(
						"data-highlighted",
						isHighlighted ? "true" : "false",
					);
				}

				const itemInput = item.querySelector(
					'[data-part="item-input"]',
				) as HTMLInputElement | null;
				if (itemInput) {
					itemInput.style.display = isEditing ? "inline-block" : "none";
					if (isEditing) {
						itemInput.value = currentValue[idx] || "";
					}
				}
			});
		};

		syncDom();

		const validateTag = (tag: string, list: string[]): boolean => {
			const trimmed = tag.trim();
			if (!trimmed) return false;
			if (maxLength && trimmed.length > maxLength) return false;
			if (validate) {
				return validate({ value: trimmed, values: list });
			}
			return !list.includes(trimmed);
		};

		const handleAddTag = (tag: string) => {
			const list = valueRef.current;
			if (list.length >= max && !allowOverflow) return;
			if (validateTag(tag, list)) {
				const newList = [...list, tag.trim()];
				updateValue(newList);
				updateInputValue("");
			}
		};

		// Event Delegation Handlers
		const handleClick = (e: MouseEvent) => {
			const target = e.target as HTMLElement;

			// Clear Trigger
			if (target.closest('[data-part="clear-trigger"]')) {
				updateValue([]);
				updateInputValue("");
				setHighlightedIndex(-1);
				setEditingIndex(-1);
				const mainInput = root.querySelector(
					'[data-part="input"]',
				) as HTMLInputElement | null;
				mainInput?.focus();
				return;
			}

			// Delete Trigger
			const deleteTrigger = target.closest('[data-part="item-delete-trigger"]');
			if (deleteTrigger) {
				const item = deleteTrigger.closest('[data-part="item"]');
				if (item) {
					const items = Array.from(root.querySelectorAll('[data-part="item"]'));
					const idx = items.indexOf(item);
					if (idx !== -1) {
						const list = [...valueRef.current];
						list.splice(idx, 1);
						updateValue(list);
						setHighlightedIndex(-1);
						setEditingIndex(-1);
						const mainInput = root.querySelector(
							'[data-part="input"]',
						) as HTMLInputElement | null;
						mainInput?.focus();
					}
				}
				return;
			}

			// Control click should focus input
			if (
				target.closest('[data-part="control"]') &&
				!target.closest('[data-part="item"]')
			) {
				const mainInput = root.querySelector(
					'[data-part="input"]',
				) as HTMLInputElement | null;
				mainInput?.focus();
				setHighlightedIndex(-1);
				setEditingIndex(-1);
			}
		};

		const handleDblClick = (e: MouseEvent) => {
			if (!editable) return;
			const target = e.target as HTMLElement;
			const item = target.closest('[data-part="item"]');
			if (item) {
				const items = Array.from(root.querySelectorAll('[data-part="item"]'));
				const idx = items.indexOf(item);
				if (idx !== -1) {
					setEditingIndex(idx);
					setHighlightedIndex(-1);
					setTimeout(() => {
						const itemInput = item.querySelector(
							'[data-part="item-input"]',
						) as HTMLInputElement | null;
						if (itemInput) {
							itemInput.focus();
							itemInput.select();
						}
					}, 0);
				}
			}
		};

		const handleKeyDown = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement;
			const isMainInput = target.matches('[data-part="input"]');
			const isItemInput = target.matches('[data-part="item-input"]');

			if (isMainInput) {
				const inputVal = (target as HTMLInputElement).value;

				// Delimiter check or Enter
				const matchesDelimiter =
					typeof delimiter === "string"
						? e.key === delimiter
						: delimiter.test(e.key);

				if (e.key === "Enter" || matchesDelimiter) {
					e.preventDefault();
					if (inputVal.trim()) {
						handleAddTag(inputVal);
					}
					return;
				}

				// Focus visual tags with Left/Backspace when empty
				if (inputVal === "") {
					if (e.key === "ArrowLeft" || e.key === "Backspace") {
						const list = valueRef.current;
						if (list.length > 0) {
							e.preventDefault();
							setHighlightedIndex(list.length - 1);
							const items = Array.from(
								root.querySelectorAll('[data-part="item"]'),
							);
							const lastItem = items[list.length - 1] as HTMLElement | null;
							lastItem?.focus();
						}
					}
				}
			}

			// Navigate highlighted visual tag
			if (highlightedIndexRef.current !== -1) {
				const list = valueRef.current;
				const currentHigh = highlightedIndexRef.current;

				if (e.key === "ArrowLeft") {
					e.preventDefault();
					const nextHigh = Math.max(0, currentHigh - 1);
					setHighlightedIndex(nextHigh);
					const items = Array.from(root.querySelectorAll('[data-part="item"]'));
					(items[nextHigh] as HTMLElement | null)?.focus();
				} else if (e.key === "ArrowRight") {
					e.preventDefault();
					const nextHigh = currentHigh + 1;
					if (nextHigh >= list.length) {
						setHighlightedIndex(-1);
						const mainInput = root.querySelector(
							'[data-part="input"]',
						) as HTMLInputElement | null;
						mainInput?.focus();
					} else {
						setHighlightedIndex(nextHigh);
						const items = Array.from(
							root.querySelectorAll('[data-part="item"]'),
						);
						(items[nextHigh] as HTMLElement | null)?.focus();
					}
				} else if (e.key === "Backspace" || e.key === "Delete") {
					e.preventDefault();
					const newList = [...list];
					newList.splice(currentHigh, 1);
					updateValue(newList);

					if (newList.length === 0) {
						setHighlightedIndex(-1);
						const mainInput = root.querySelector(
							'[data-part="input"]',
						) as HTMLInputElement | null;
						mainInput?.focus();
					} else {
						const nextHigh = Math.min(currentHigh, newList.length - 1);
						setHighlightedIndex(nextHigh);
						setTimeout(() => {
							const items = Array.from(
								root.querySelectorAll('[data-part="item"]'),
							);
							(items[nextHigh] as HTMLElement | null)?.focus();
						}, 0);
					}
				} else if (e.key === "Escape") {
					e.preventDefault();
					setHighlightedIndex(-1);
					const mainInput = root.querySelector(
						'[data-part="input"]',
					) as HTMLInputElement | null;
					mainInput?.focus();
				} else if (e.key === "Enter") {
					if (editable) {
						e.preventDefault();
						setEditingIndex(currentHigh);
						setHighlightedIndex(-1);
						setTimeout(() => {
							const items = Array.from(
								root.querySelectorAll('[data-part="item"]'),
							);
							const itemInput = items[currentHigh]?.querySelector(
								'[data-part="item-input"]',
							) as HTMLInputElement | null;
							if (itemInput) {
								itemInput.focus();
								itemInput.select();
							}
						}, 0);
					}
				}
			}

			// Editing tag input keys
			if (isItemInput && editingIndexRef.current !== -1) {
				const idx = editingIndexRef.current;
				const inputVal = (target as HTMLInputElement).value;

				if (e.key === "Enter") {
					e.preventDefault();
					const list = [...valueRef.current];
					if (inputVal.trim()) {
						list[idx] = inputVal.trim();
						updateValue(list);
					} else {
						// if empty, delete tag
						list.splice(idx, 1);
						updateValue(list);
					}
					setEditingIndex(-1);
					const mainInput = root.querySelector(
						'[data-part="input"]',
					) as HTMLInputElement | null;
					mainInput?.focus();
				} else if (e.key === "Escape") {
					e.preventDefault();
					setEditingIndex(-1);
					const mainInput = root.querySelector(
						'[data-part="input"]',
					) as HTMLInputElement | null;
					mainInput?.focus();
				}
			}
		};

		const handleInput = (e: Event) => {
			const target = e.target as HTMLElement;
			if (target.matches('[data-part="input"]')) {
				const val = (target as HTMLInputElement).value;
				updateInputValue(val);
			}
		};

		const handlePaste = (e: ClipboardEvent) => {
			const target = e.target as HTMLElement;
			if (target.matches('[data-part="input"]') && addOnPaste) {
				e.preventDefault();
				const text = e.clipboardData?.getData("text") || "";
				const list = valueRef.current;
				const parts = text.split(delimiter);
				const newList = [...list];

				for (const rawPart of parts) {
					const part = rawPart.trim();
					if (newList.length >= max && !allowOverflow) break;
					if (validateTag(part, newList)) {
						newList.push(part);
					}
				}

				updateValue(newList);
				updateInputValue("");
			}
		};

		const handleFocusIn = (e: FocusEvent) => {
			const target = e.target as HTMLElement;
			const control = root.querySelector('[data-part="control"]');
			if (control) {
				control.setAttribute("data-focus", "true");
			}
			root.setAttribute("data-focus", "true");

			const item = target.closest('[data-part="item"]');
			if (item) {
				const items = Array.from(root.querySelectorAll('[data-part="item"]'));
				const idx = items.indexOf(item);
				if (
					idx !== -1 &&
					idx !== highlightedIndexRef.current &&
					editingIndexRef.current === -1
				) {
					setHighlightedIndex(idx);
				}
			} else {
				setHighlightedIndex(-1);
			}
		};

		const handleFocusOut = (e: FocusEvent) => {
			const relatedTarget = e.relatedTarget as HTMLElement | null;
			if (!relatedTarget || !root.contains(relatedTarget)) {
				const control = root.querySelector('[data-part="control"]');
				control?.removeAttribute("data-focus");
				root.removeAttribute("data-focus");
				setHighlightedIndex(-1);
				setEditingIndex(-1);

				// Blur behavior add or clear
				const mainInput = root.querySelector(
					'[data-part="input"]',
				) as HTMLInputElement | null;
				if (mainInput) {
					const val = mainInput.value;
					if (val.trim()) {
						if (props.blurBehavior === "add") {
							handleAddTag(val);
						} else if (props.blurBehavior === "clear") {
							updateInputValue("");
						}
					}
				}
			}
		};

		root.addEventListener("click", handleClick);
		root.addEventListener("dblclick", handleDblClick);
		root.addEventListener("keydown", handleKeyDown);
		root.addEventListener("input", handleInput);
		root.addEventListener("paste", handlePaste as any);
		root.addEventListener("focusin", handleFocusIn);
		root.addEventListener("focusout", handleFocusOut);

		return () => {
			root.removeEventListener("click", handleClick);
			root.removeEventListener("dblclick", handleDblClick);
			root.removeEventListener("keydown", handleKeyDown);
			root.removeEventListener("input", handleInput);
			root.removeEventListener("paste", handlePaste as any);
			root.removeEventListener("focusin", handleFocusIn);
			root.removeEventListener("focusout", handleFocusOut);
		};
	}, [
		currentValue,
		currentInputValue,
		highlightedIndex,
		editingIndex,
		max,
		allowOverflow,
		maxLength,
		delimiter,
		addOnPaste,
		editable,
		props.blurBehavior,
		rootId,
	]);

	return (
		<Root
			id={rootId}
			{...rest}
			value={currentValue}
			inputValue={currentInputValue}
			highlightedIndex={highlightedIndex}
			editingIndex={editingIndex}
		>
			<TagsInputStructure {...props} />
		</Root>
	);
}

export type {
	InteractiveTagsInputProps,
	ItemProps,
	RootProps,
	TagsInputFlattenedProps,
};

export {
	ClearTrigger,
	Control,
	HiddenInput,
	Input,
	InteractiveTagsInput,
	Item,
	ItemDeleteTrigger,
	ItemInput,
	ItemPreview,
	Items,
	ItemText,
	Label,
	Root,
	TagsInputStructure,
	useTagsInputContext,
};
