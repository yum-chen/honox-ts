import { cx } from "design-system/css";
import { type DropdownVariantProps, dropdown } from "design-system/recipes";
import type { JSX } from "hono/jsx";
import InteractiveDropdownRoot from "../../islands/dropdown";
// Import primitive components from dropdown-primitive
import {
	DropdownCheckboxItem as CheckboxItem,
	DropdownContent as Content,
	DropdownContextTrigger as ContextTrigger,
	DropdownArrow,
	DropdownArrowTip,
	DropdownItem as Item,
	DropdownItemGroup as ItemGroup,
	DropdownItemGroupLabel as ItemGroupLabel,
	DropdownItemIndicator as ItemIndicator,
	DropdownItemText as ItemText,
	DropdownPositioner as Positioner,
	DropdownRadioItem as RadioItem,
	DropdownRadioItemGroup as RadioItemGroup,
	DropdownRoot as RootPrimitive,
	DropdownSeparator as Separator,
	DropdownTrigger as Trigger,
	DropdownTriggerItem as TriggerItem,
} from "./dropdown-primitive";
import { shouldHydrate } from "./island-utils";

// ============= API Types =============

type DropdownItemType =
	| "item"
	| "separator"
	| "checkbox"
	| "radio"
	| "radio-group"
	| "submenu"
	| "group";

interface BaseDropdownItem {
	type?: DropdownItemType;
	disabled?: boolean;
	class?: string;
}

interface DropdownItemItem extends BaseDropdownItem {
	type?: "item";
	label: string;
	value: string;
	icon?: JSX.Element;
	indicator?: JSX.Element;
}

interface DropdownSeparatorItem extends BaseDropdownItem {
	type: "separator";
}

interface DropdownCheckboxItem extends BaseDropdownItem {
	type: "checkbox";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

interface DropdownRadioItem extends BaseDropdownItem {
	type: "radio";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

interface DropdownRadioGroupItem extends BaseDropdownItem {
	type: "radio-group";
	value: string;
	label?: string;
	items: DropdownRadioItem[];
}

interface DropdownSubmenuItem extends BaseDropdownItem {
	type: "submenu";
	label: string;
	icon?: JSX.Element;
	items: DropdownItem[];
}

interface DropdownGroupItem extends BaseDropdownItem {
	type: "group";
	label?: string;
	items: DropdownItem[];
}

type DropdownItem =
	| DropdownItemItem
	| DropdownSeparatorItem
	| DropdownCheckboxItem
	| DropdownRadioItem
	| DropdownRadioGroupItem
	| DropdownSubmenuItem
	| DropdownGroupItem;

interface DropdownProps extends DropdownVariantProps {
	trigger?: JSX.Element;
	items?: DropdownItem[];
	defaultOpen?: boolean;
	/** Whether the dropdown menu is currently open (controlled). */
	open?: boolean;
	/** Disables every trigger mode and renders the trigger as inert. Default `false`. */
	disabled?: boolean;
	interactive?: boolean;
	class?: string;
	contentClass?: string;
	positionerClass?: string;
	children?: any;
	arrow?: boolean;
	/**
	 * Placement of the menu relative to the trigger. Accepts the 12-way names
	 * (`"bottomLeft"`, `"topRight"`, ...) or their dash-case equivalents
	 * (`"bottom-start"`, `"top-end"`, ...). Default `"bottomLeft"`.
	 */
	placement?: string;
	triggerMode?:
		| ("click" | "hover" | "contextDropdown")[]
		| "click"
		| "hover"
		| "contextDropdown";
	mouseEnterDelay?: number;
	mouseLeaveDelay?: number;
	/** Close when Escape is pressed. Default `true`. */
	closeOnEscape?: boolean;
	/** Called when the menu opens or closes. */
	onOpenChange?: (open: boolean) => void;
	/** Called with an item's `value` when it is activated. */
	onSelect?: (value: string) => void;
}

// ============= Rendering Functions =============

function renderDropdownItem(
	item: DropdownItem,
	index: number,
	size?: DropdownVariantProps["size"],
	interactive = true,
): JSX.Element {
	switch (item.type) {
		case "separator":
			return <Separator key={index} />;

		case "checkbox": {
			const checkboxItem = item as DropdownCheckboxItem;
			return (
				<CheckboxItem
					key={checkboxItem.value}
					value={checkboxItem.value}
					checked={checkboxItem.checked}
					disabled={checkboxItem.disabled}
					class={checkboxItem.class}
				>
					{checkboxItem.icon && (
						<ItemIndicator>{checkboxItem.icon}</ItemIndicator>
					)}
					<ItemText>{checkboxItem.label}</ItemText>
				</CheckboxItem>
			);
		}

		case "radio": {
			const radioItem = item as DropdownRadioItem;
			return (
				<RadioItem
					key={radioItem.value}
					value={radioItem.value}
					checked={radioItem.checked}
					disabled={radioItem.disabled}
					class={radioItem.class}
				>
					{radioItem.icon && <ItemIndicator>{radioItem.icon}</ItemIndicator>}
					<ItemText>{radioItem.label}</ItemText>
				</RadioItem>
			);
		}

		case "radio-group": {
			const radioGroup = item as DropdownRadioGroupItem;
			return (
				<RadioItemGroup key={radioGroup.value} value={radioGroup.value}>
					{radioGroup.label && (
						<ItemGroupLabel>{radioGroup.label}</ItemGroupLabel>
					)}
					{radioGroup.items.map((radioItem, idx) =>
						renderDropdownItem(radioItem, idx, size, interactive),
					)}
				</RadioItemGroup>
			);
		}

		case "group": {
			const groupItem = item as DropdownGroupItem;
			return (
				<ItemGroup key={index} class={groupItem.class}>
					{groupItem.label && (
						<ItemGroupLabel>{groupItem.label}</ItemGroupLabel>
					)}
					{groupItem.items.map((child, idx) =>
						renderDropdownItem(child, idx, size, interactive),
					)}
				</ItemGroup>
			);
		}

		case "submenu": {
			const submenuItem = item as DropdownSubmenuItem;
			return (
				<DropdownSubmenu
					key={submenuItem.label}
					item={submenuItem}
					size={size}
					interactive={interactive}
				/>
			);
		}

		default: {
			const menuItem = item as DropdownItemItem;
			return (
				<Item
					key={menuItem.value}
					value={menuItem.value}
					disabled={menuItem.disabled}
					class={menuItem.class}
				>
					{menuItem.icon && <ItemIndicator>{menuItem.icon}</ItemIndicator>}
					<ItemText>{menuItem.label}</ItemText>
					{menuItem.indicator}
				</Item>
			);
		}
	}
}

/**
 * A cascading submenu, nested inside a parent menu's content. When the parent
 * hydrates, this is its own `InteractiveDropdownRoot` instance — opened via
 * hover or click on its `TriggerItem`, positioned beside it (see `submenu` on
 * `InteractiveDropdownRootProps` for why it needs its own island). Otherwise
 * it renders the same static, inert structure as the top-level non-hydrated
 * case, just closed (submenus have no way to open without JS).
 */
function DropdownSubmenu({
	item,
	size,
	interactive,
}: {
	item: DropdownSubmenuItem;
	size?: DropdownVariantProps["size"];
	interactive: boolean;
}) {
	const styles = dropdown({ size });
	const triggerItem = (
		<TriggerItem disabled={item.disabled}>
			{item.icon && <ItemIndicator>{item.icon}</ItemIndicator>}
			<ItemText>{item.label}</ItemText>
		</TriggerItem>
	);
	const positioner = (
		<Positioner placement="rightTop" class={styles.positioner}>
			<Content class={styles.content}>
				{item.items.map((child, idx) =>
					renderDropdownItem(child, idx, size, interactive),
				)}
			</Content>
		</Positioner>
	);

	if (interactive) {
		return (
			<InteractiveDropdownRoot
				submenu
				trigger={["hover", "click"]}
				placement="rightTop"
				disabled={item.disabled}
			>
				{triggerItem}
				{positioner}
			</InteractiveDropdownRoot>
		);
	}

	return (
		<RootPrimitive open={false} disabled={item.disabled}>
			{triggerItem}
			{positioner}
		</RootPrimitive>
	);
}

// ============= Dropdown Component =============

function DropdownRoot(props: DropdownProps) {
	const {
		trigger,
		items,
		defaultOpen = false,
		open,
		disabled,
		interactive,
		class: classProp,
		contentClass,
		positionerClass,
		children,
		arrow,
		placement = "bottomLeft",
		triggerMode = ["click"],
		mouseEnterDelay,
		mouseLeaveDelay,
		closeOnEscape,
		onOpenChange,
		onSelect,
		...variantProps
	} = props;

	const styles = dropdown(variantProps);
	const triggerModes = Array.isArray(triggerMode) ? triggerMode : [triggerMode];
	// A trigger wired for `contextDropdown` alone (no click/hover) opens on
	// right-click, so it renders as a plain wrapper rather than a `<button>`.
	const isContextMenuOnly =
		triggerModes.includes("contextDropdown") &&
		!triggerModes.includes("click") &&
		!triggerModes.includes("hover");
	const TriggerComponent = isContextMenuOnly ? ContextTrigger : Trigger;

	if (shouldHydrate(interactive, true)) {
		return (
			<InteractiveDropdownRoot
				open={open}
				defaultOpen={defaultOpen}
				disabled={disabled}
				placement={placement}
				trigger={triggerMode}
				mouseEnterDelay={mouseEnterDelay}
				mouseLeaveDelay={mouseLeaveDelay}
				closeOnEscape={closeOnEscape}
				onOpenChange={onOpenChange}
				onSelect={onSelect}
			>
				{trigger && <TriggerComponent asChild>{trigger}</TriggerComponent>}
				{children}
				{items && (
					<Positioner
						placement={placement}
						class={cx(styles.positioner, positionerClass)}
					>
						{arrow && (
							<DropdownArrow placement={placement}>
								<DropdownArrowTip placement={placement} />
							</DropdownArrow>
						)}
						<Content class={cx(styles.content, contentClass)}>
							{items.map((item, index) =>
								renderDropdownItem(item, index, variantProps.size, true),
							)}
						</Content>
					</Positioner>
				)}
			</InteractiveDropdownRoot>
		);
	}

	return (
		<RootPrimitive open={open ?? defaultOpen} disabled={disabled}>
			{trigger && <TriggerComponent asChild>{trigger}</TriggerComponent>}
			{children}
			{items && (
				<Positioner
					placement={placement}
					class={cx(styles.positioner, positionerClass)}
				>
					{arrow && (
						<DropdownArrow placement={placement}>
							<DropdownArrowTip placement={placement} />
						</DropdownArrow>
					)}
					<Content class={cx(styles.content, contentClass)}>
						{items.map((item, index) =>
							renderDropdownItem(item, index, variantProps.size, false),
						)}
					</Content>
				</Positioner>
			)}
		</RootPrimitive>
	);
}

// ============= Exports =============

export const Dropdown = Object.assign(DropdownRoot, {
	Root: DropdownRoot,
	Trigger: Trigger,
	TriggerItem: TriggerItem,
	Positioner: Positioner,
	Content: Content,
	Item: Item,
	CheckboxItem: CheckboxItem,
	Separator: Separator,
	ItemText: ItemText,
	ItemIndicator: ItemIndicator,
	ItemGroup: ItemGroup,
	ItemGroupLabel: ItemGroupLabel,
	RadioItemGroup: RadioItemGroup,
	Arrow: DropdownArrow,
	ArrowTip: DropdownArrowTip,
});

export {
	type BaseDropdownItem,
	Dropdown as default,
	type DropdownCheckboxItem,
	type DropdownGroupItem,
	type DropdownItem,
	type DropdownItemItem,
	type DropdownItemType,
	type DropdownProps,
	type DropdownRadioGroupItem,
	type DropdownRadioItem,
	type DropdownSeparatorItem,
	type DropdownSubmenuItem,
};
