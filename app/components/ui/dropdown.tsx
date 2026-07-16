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
	trigger?: any;
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
	arrow?: boolean | { pointAtCenter?: boolean };
	/**
	 * Placement of the menu relative to the trigger. Accepts the 12-way names
	 * (`"bottomLeft"`, `"topRight"`, ...) or their dash-case equivalents
	 * (`"bottom-start"`, `"top-end"`, ...). Default `"bottomLeft"`.
	 */
	placement?: string;
	triggerMode?:
		| ("click" | "hover" | "contextDropdown" | "contextMenu")[]
		| "click"
		| "hover"
		| "contextDropdown"
		| "contextMenu";
	mouseEnterDelay?: number;
	mouseLeaveDelay?: number;
	/** Close when Escape is pressed. Default `true`. */
	closeOnEscape?: boolean;
	/** Called when the menu opens or closes. */
	onOpenChange?: (open: boolean, info?: { source: "trigger" | "menu" }) => void;
	/** Called with an item's `value` when it is activated. */
	onSelect?: (value: string) => void;
	classNames?: Record<string, string>;
	styles?: Record<string, any>;
	destroyOnHidden?: boolean;
	destroyPopupOnHide?: boolean;
	menu?: {
		items?: DropdownItem[];
		onClick?: (info: { key: string; keyPath: string[] }) => void;
		selectable?: boolean;
		multiple?: boolean;
		selectedKeys?: string[];
		defaultSelectedKeys?: string[];
	};
	autoAdjustOverflow?: boolean;
}

// ============= Rendering Functions =============

function renderDropdownItem(
	item: DropdownItem,
	index: number,
	size?: DropdownVariantProps["size"],
	interactive = true,
	classNames?: Record<string, string>,
	elementStyles?: Record<string, any>,
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
						renderDropdownItem(
							radioItem,
							idx,
							size,
							interactive,
							classNames,
							elementStyles,
						),
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
						renderDropdownItem(
							child,
							idx,
							size,
							interactive,
							classNames,
							elementStyles,
						),
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
					classNames={classNames}
					elementStyles={elementStyles}
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
	classNames,
	elementStyles,
}: {
	item: DropdownSubmenuItem;
	size?: DropdownVariantProps["size"];
	interactive: boolean;
	classNames?: Record<string, string>;
	elementStyles?: Record<string, any>;
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
					renderDropdownItem(
						child,
						idx,
						size,
						interactive,
						classNames,
						elementStyles,
					),
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
				classNames={classNames}
				elementStyles={elementStyles}
			>
				{triggerItem}
				{positioner}
			</InteractiveDropdownRoot>
		);
	}

	return (
		<RootPrimitive
			open={false}
			disabled={item.disabled}
			classNames={classNames}
			elementStyles={elementStyles}
		>
			{triggerItem}
			{positioner}
		</RootPrimitive>
	);
}

// ============= Dropdown Component =============

function DropdownRoot(props: DropdownProps) {
	const {
		trigger,
		items: itemsProp,
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
		triggerMode: triggerModeProp = ["click"],
		mouseEnterDelay,
		mouseLeaveDelay,
		closeOnEscape,
		onOpenChange,
		onSelect,
		classNames,
		styles: stylesProp,
		destroyOnHidden,
		destroyPopupOnHide,
		menu,
		autoAdjustOverflow = true,
		...variantProps
	} = props;

	const styles = dropdown(variantProps);

	const items = menu?.items ?? itemsProp;

	const isArrowVisible = !!arrow;
	const arrowPointAtCenter =
		typeof arrow === "object" ? !!arrow.pointAtCenter : false;

	const shouldDestroyOnHidden = destroyOnHidden ?? destroyPopupOnHide ?? false;

	let elementTrigger: any;
	let triggerMode = triggerModeProp;

	if (trigger) {
		if (Array.isArray(trigger) || typeof trigger === "string") {
			triggerMode = trigger as any;
		} else {
			elementTrigger = trigger;
		}
	}

	const triggerModes = Array.isArray(triggerMode) ? triggerMode : [triggerMode];
	const isContextMenuOnly =
		(triggerModes.includes("contextDropdown") ||
			triggerModes.includes("contextMenu")) &&
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
				trigger={triggerMode as any}
				mouseEnterDelay={mouseEnterDelay}
				mouseLeaveDelay={mouseLeaveDelay}
				closeOnEscape={closeOnEscape}
				onOpenChange={onOpenChange}
				onSelect={onSelect}
				classNames={classNames}
				elementStyles={stylesProp}
				destroyOnHidden={shouldDestroyOnHidden}
				autoAdjustOverflow={autoAdjustOverflow}
				arrowPointAtCenter={arrowPointAtCenter}
				menu={menu}
			>
				{elementTrigger && (
					<TriggerComponent asChild>{elementTrigger}</TriggerComponent>
				)}
				{children}
				{items && (
					<Positioner
						placement={placement}
						class={cx(
							styles.positioner,
							positionerClass,
							classNames?.positioner,
						)}
					>
						{isArrowVisible && (
							<DropdownArrow
								placement={placement}
								arrowPointAtCenter={arrowPointAtCenter}
							>
								<DropdownArrowTip placement={placement} />
							</DropdownArrow>
						)}
						<Content
							class={cx(styles.content, contentClass, classNames?.content)}
						>
							{items.map((item, index) =>
								renderDropdownItem(
									item,
									index,
									variantProps.size,
									true,
									classNames,
									stylesProp,
								),
							)}
						</Content>
					</Positioner>
				)}
			</InteractiveDropdownRoot>
		);
	}

	return (
		<div
			data-scope="dropdown"
			data-part="root"
			class={cx(classNames?.root, classProp)}
			style={{
				position: "relative",
				display: "inline-block",
				...stylesProp?.root,
			}}
		>
			<RootPrimitive
				open={open ?? defaultOpen}
				disabled={disabled}
				classNames={classNames}
				elementStyles={stylesProp}
				destroyOnHidden={shouldDestroyOnHidden}
			>
				{elementTrigger && (
					<TriggerComponent asChild>{elementTrigger}</TriggerComponent>
				)}
				{children}
				{items && (
					<Positioner
						placement={placement}
						class={cx(
							styles.positioner,
							positionerClass,
							classNames?.positioner,
						)}
					>
						{isArrowVisible && (
							<DropdownArrow
								placement={placement}
								arrowPointAtCenter={arrowPointAtCenter}
							>
								<DropdownArrowTip placement={placement} />
							</DropdownArrow>
						)}
						<Content
							class={cx(styles.content, contentClass, classNames?.content)}
						>
							{items.map((item, index) =>
								renderDropdownItem(
									item,
									index,
									variantProps.size,
									false,
									classNames,
									stylesProp,
								),
							)}
						</Content>
					</Positioner>
				)}
			</RootPrimitive>
		</div>
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
