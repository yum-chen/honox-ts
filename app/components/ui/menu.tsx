import { menu } from "../../../styled-system/recipes";
import { css, cx } from "../../../styled-system/css";
import type { HTMLProps } from "./types";

const slots = menu();

export type MenuItemProps = HTMLProps<"button"> & {
	value?: string;
};

/**
 * Park UI `Menu.Item`. Carries `data-menu-item` so the {@link Menu} island can
 * close the dropdown on selection without a serialized closure crossing the
 * island boundary.
 */
export const MenuItem = ({
	class: className,
	children,
	value,
	...props
}: MenuItemProps) => (
	<button
		type="button"
		role="menuitem"
		data-menu-item
		data-value={value}
		class={cx(slots.item, css({ gap: "2", justifyContent: "flex-start" }), className)}
		{...props}
	>
		{children}
	</button>
);

export const MenuItemGroup = ({
	class: className,
	children,
	...props
}: HTMLProps<"div">) => (
	// biome-ignore lint/a11y/useSemanticElements: mirrors Park UI's menu anatomy (role="group")
	<div role="group" class={cx(slots.itemGroup, className)} {...props}>
		{children}
	</div>
);

export const MenuItemGroupLabel = ({
	class: className,
	children,
	...props
}: HTMLProps<"span">) => (
	<span class={cx(slots.itemGroupLabel, className)} {...props}>
		{children}
	</span>
);

export const MenuSeparator = ({
	class: className,
	...props
}: HTMLProps<"hr">) => (
	<hr
		class={cx(
			slots.separator,
			css({ height: "1px", bg: "border.subtle", my: "1", mx: "1" }),
			className,
		)}
		{...props}
	/>
);
