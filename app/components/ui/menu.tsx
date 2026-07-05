import type { JSX } from "hono/jsx";
import { css, cx } from "styled-system/css";
import { type MenuVariantProps, menu } from "styled-system/recipes";
import InteractiveMenuRoot from "../../islands/menu";
// Import primitive components from menu-primitive
import {
	MenuArrow as Arrow,
	MenuArrowTip as ArrowTip,
	MenuCheckboxItem as CheckboxItem,
	MenuContent as Content,
	MenuContextTrigger as ContextTrigger,
	MenuIndicator as Indicator,
	MenuItem as Item,
	MenuItemGroup as ItemGroup,
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

export type MenuItemType =
	| "item"
	| "separator"
	| "checkbox"
	| "radio"
	| "radio-group"
	| "submenu"
	| "group";

export interface BaseMenuItem {
	type?: MenuItemType;
	disabled?: boolean;
	class?: string;
}

export interface MenuItemItem extends BaseMenuItem {
	type?: "item";
	label: string;
	value: string;
	icon?: JSX.Element;
	indicator?: JSX.Element;
}

export interface MenuSeparatorItem extends BaseMenuItem {
	type: "separator";
}

export interface MenuCheckboxItem extends BaseMenuItem {
	type: "checkbox";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

export interface MenuRadioItem extends BaseMenuItem {
	type: "radio";
	label: string;
	value: string;
	checked?: boolean;
	icon?: JSX.Element;
}

export interface MenuRadioGroupItem extends BaseMenuItem {
	type: "radio-group";
	value: string;
	label?: string;
	items: MenuRadioItem[];
}

export interface MenuSubmenuItem extends BaseMenuItem {
	type: "submenu";
	label: string;
	icon?: JSX.Element;
	items: (MenuItemItem | MenuSeparatorItem | MenuCheckboxItem)[];
}

export type MenuItem =
	| MenuItemItem
	| MenuSeparatorItem
	| MenuCheckboxItem
	| MenuRadioItem
	| MenuRadioGroupItem
	| MenuSubmenuItem;

export interface MenuProps extends MenuVariantProps {
	trigger?: JSX.Element;
	items: MenuItem[];
	defaultOpen?: boolean;
	interactive?: boolean;
	class?: string;
	contentClass?: string;
	positionerClass?: string;
}

// ============= Rendering Functions =============

function renderMenuItem(item: MenuItem, index: number): JSX.Element {
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

		case "radio-group": {
			const radioGroup = item as MenuRadioGroupItem;
			return (
				<RadioItemGroup key={radioGroup.value} value={radioGroup.value}>
					{radioGroup.label && (
						<ItemGroupLabel>{radioGroup.label}</ItemGroupLabel>
					)}
					{radioGroup.items.map((radioItem, idx) =>
						renderMenuItem(radioItem, idx),
					)}
				</RadioItemGroup>
			);
		}

		case "submenu": {
			// Note: Submenu rendering is complex and requires nested MenuRoot
			// For now, we'll skip submenu support in the simplified API
			// Users can use the primitive API for submenus
			const submenuItem = item as MenuSubmenuItem;
			return (
				<div key={index}>
					<ItemText>
						{submenuItem.label} (submenu not supported in simplified API)
					</ItemText>
				</div>
			);
		}

		default: {
			// type: "item" or undefined
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

export function Menu(props: MenuProps) {
	const {
		trigger,
		items,
		defaultOpen = false,
		interactive = true,
		class: classProp,
		contentClass,
		positionerClass,
		...variantProps
	} = props;

	const styles = menu(variantProps);

	// Use InteractiveMenuRoot for interactive mode (client-side only)
	// Use RootPrimitive for non-interactive mode (server-side rendering)
	if (interactive) {
		return (
			<InteractiveMenuRoot open={defaultOpen}>
				{trigger && <Trigger asChild>{trigger}</Trigger>}

				<Positioner class={cx(styles.positioner, positionerClass)}>
					<Content class={cx(styles.content, contentClass)}>
						{items.map((item, index) => renderMenuItem(item, index))}
					</Content>
				</Positioner>
			</InteractiveMenuRoot>
		);
	}

	return (
		<RootPrimitive open={defaultOpen}>
			{trigger && <Trigger asChild>{trigger}</Trigger>}

			<Positioner class={cx(styles.positioner, positionerClass)}>
				<Content class={cx(styles.content, contentClass)}>
					{items.map((item, index) => renderMenuItem(item, index))}
				</Content>
			</Positioner>
		</RootPrimitive>
	);
}

// ============= Exports =============

// Export the flattened Menu component
export { Menu as default };
