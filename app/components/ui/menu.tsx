import type { JSX } from "hono/jsx";
import { cx } from "styled-system/css";
import { type MenuVariantProps, menu } from "styled-system/recipes";
import InteractiveMenuRoot from "../../islands/menu";
import { shouldHydrate } from "./island-utils";
// Import primitive components from menu-primitive
import {
	MenuCheckboxItem as CheckboxItem,
	MenuContent as Content,
	MenuContextTrigger as ContextTrigger,
	MenuItem as Item,
	MenuItemGroupLabel as ItemGroupLabel,
	MenuItemIndicator as ItemIndicator,
	MenuItemText as ItemText,
	MenuPositioner as Positioner,
	MenuRadioItem as RadioItem,
	MenuRadioItemGroup as RadioItemGroup,
	MenuRoot as RootPrimitive,
	MenuSeparator as Separator,
	MenuTrigger as Trigger,
	MenuTriggerItem as TriggerItem,
} from "./menu-primitive";

// ============= Flattened API Types =============

type MenuItemType =
	| "item"
	| "separator"
	| "checkbox"
	| "radio"
	| "radio-group"
	| "submenu"
	| "group";

interface BaseMenuItem {
	type?: MenuItemType;
	disabled?: boolean;
	class?: string;
}

interface MenuItemItem extends BaseMenuItem {
	type?: "item";
	label: string;
	value: string;
	icon?: JSX.Element;
	indicator?: JSX.Element;
}

interface MenuSeparatorItem extends BaseMenuItem {
	type: "separator";
}

interface MenuCheckboxItem extends BaseMenuItem {
	type: "checkbox";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

interface MenuRadioItem extends BaseMenuItem {
	type: "radio";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

interface MenuRadioGroupItem extends BaseMenuItem {
	type: "radio-group";
	value: string;
	label?: string;
	items: MenuRadioItem[];
}

interface MenuSubmenuItem extends BaseMenuItem {
	type: "submenu";
	label: string;
	icon?: JSX.Element;
	items: MenuItem[];
}

type MenuItem =
	| MenuItemItem
	| MenuSeparatorItem
	| MenuCheckboxItem
	| MenuRadioItem
	| MenuRadioGroupItem
	| MenuSubmenuItem;

interface MenuProps extends MenuVariantProps {
	trigger?: JSX.Element;
	triggerType?: "trigger" | "trigger-item" | "context-trigger";
	items?: MenuItem[];
	defaultOpen?: boolean;
	interactive?: boolean;
	class?: string;
	contentClass?: string;
	positionerClass?: string;
	triggerMode?: "click" | "hover" | "contextMenu";
	children?: any;
}

// ============= Rendering Functions =============

function renderMenuItem(
	item: MenuItem,
	index: number,
	triggerMode?: "click" | "hover" | "contextMenu",
): JSX.Element {
	switch (item.type) {
		case "separator":
			return <Separator key={index} />;

		case "checkbox": {
			const checkboxItem = item as MenuCheckboxItem;
			return (
				<CheckboxItem
					key={checkboxItem.value}
					value={checkboxItem.value}
					checked={checkboxItem.checked}
					disabled={checkboxItem.disabled}
				>
					{checkboxItem.icon && (
						<ItemIndicator>{checkboxItem.icon}</ItemIndicator>
					)}
					<ItemText>{checkboxItem.label}</ItemText>
				</CheckboxItem>
			);
		}

		case "radio": {
			const radioItem = item as MenuRadioItem;
			return (
				<RadioItem
					key={radioItem.value}
					value={radioItem.value}
					checked={radioItem.checked}
					disabled={radioItem.disabled}
				>
					{radioItem.icon && <ItemIndicator>{radioItem.icon}</ItemIndicator>}
					<ItemText>{radioItem.label}</ItemText>
				</RadioItem>
			);
		}

		case "radio-group": {
			const radioGroup = item as MenuRadioGroupItem;
			return (
				<RadioItemGroup key={radioGroup.value} value={radioGroup.value}>
					{radioGroup.label && (
						<ItemGroupLabel>{radioGroup.label}</ItemGroupLabel>
					)}
					{radioGroup.items.map((radioItem, idx) =>
						renderMenuItem(radioItem, idx, triggerMode),
					)}
				</RadioItemGroup>
			);
		}

		case "submenu": {
			const submenuItem = item as MenuSubmenuItem;
			return (
				<MenuRootComponent
					key={index}
					triggerMode={triggerMode || "hover"}
					triggerType="trigger-item"
					trigger={
						<>
							{submenuItem.icon && (
								<ItemIndicator>{submenuItem.icon}</ItemIndicator>
							)}
							<ItemText>{submenuItem.label}</ItemText>
							<span
								style={{
									marginLeft: "auto",
									display: "inline-flex",
									alignItems: "center",
								}}
							>
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
									<title>Submenu Chevron</title>
									<path d="m9 18 6-6-6-6" />
								</svg>
							</span>
						</>
					}
					items={submenuItem.items}
				/>
			);
		}

		default: {
			const menuItem = item as MenuItemItem;
			return (
				<Item
					key={menuItem.value}
					value={menuItem.value}
					disabled={menuItem.disabled}
				>
					{menuItem.icon && <ItemIndicator>{menuItem.icon}</ItemIndicator>}
					<ItemText>{menuItem.label}</ItemText>
					{menuItem.indicator}
				</Item>
			);
		}
	}
}

// ============= Flattened Menu Component =============

function MenuRootComponent(props: MenuProps) {
	const {
		trigger,
		triggerType = "trigger",
		items,
		defaultOpen = false,
		interactive,
		class: classProp,
		contentClass,
		positionerClass,
		triggerMode = "click",
		children,
		...variantProps
	} = props;

	const styles = menu(variantProps);

	let triggerElement = null;
	if (trigger) {
		if (triggerType === "context-trigger") {
			triggerElement = (
				<ContextTrigger asChild={triggerMode === "contextMenu"}>
					{trigger}
				</ContextTrigger>
			);
		} else if (triggerType === "trigger-item") {
			triggerElement = <TriggerItem>{trigger}</TriggerItem>;
		} else {
			triggerElement = <Trigger asChild>{trigger}</Trigger>;
		}
	}

	if (shouldHydrate(interactive, true)) {
		return (
			<InteractiveMenuRoot open={defaultOpen} triggerMode={triggerMode}>
				{triggerElement}
				{children}
				{items && (
					<Positioner class={cx(styles.positioner, positionerClass)}>
						<Content class={cx(styles.content, contentClass)}>
							{items.map((item, index) =>
								renderMenuItem(item, index, triggerMode),
							)}
						</Content>
					</Positioner>
				)}
			</InteractiveMenuRoot>
		);
	}

	return (
		<RootPrimitive open={defaultOpen} triggerMode={triggerMode}>
			{triggerElement}
			{children}
			{items && (
				<Positioner class={cx(styles.positioner, positionerClass)}>
					<Content class={cx(styles.content, contentClass)}>
						{items.map((item, index) =>
							renderMenuItem(item, index, triggerMode),
						)}
					</Content>
				</Positioner>
			)}
		</RootPrimitive>
	);
}

// ============= Exports =============

const Menu = Object.assign(MenuRootComponent, {
	Root: MenuRootComponent,
	Trigger: Trigger,
	TriggerItem: TriggerItem,
	ContextTrigger: ContextTrigger,
	Positioner: Positioner,
	Content: Content,
	Item: Item,
	CheckboxItem: CheckboxItem,
	Separator: Separator,
	ItemText: ItemText,
	ItemIndicator: ItemIndicator,
	ItemGroupLabel: ItemGroupLabel,
	RadioItemGroup: RadioItemGroup,
});

export {
	type BaseMenuItem,
	Menu as default,
	Menu,
	type MenuCheckboxItem,
	type MenuItem,
	type MenuItemItem,
	type MenuItemType,
	type MenuProps,
	type MenuRadioGroupItem,
	type MenuRadioItem,
	type MenuSeparatorItem,
	type MenuSubmenuItem,
};
