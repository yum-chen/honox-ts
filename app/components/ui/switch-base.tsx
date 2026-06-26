import type { ChildNode } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { SwitchRecipeVariantProps } from "../../../styled-system/recipes";
import { switchRecipe } from "../../../styled-system/recipes";

export interface SwitchProps extends SwitchRecipeVariantProps {
	children?: ChildNode;
	class?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	interactive?: boolean;
	[key: string]: unknown;
}

export function SwitchBase(props: SwitchProps) {
	const [variantProps, localProps] = switchRecipe.splitVariantProps(props);
	const {
		children,
		class: classProp,
		checked,
		defaultChecked,
		disabled,
		onCheckedChange,
		interactive,
		...restProps
	} = localProps;

	const styles = switchRecipe(variantProps);

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabled ? "" : undefined}
			data-state={checked ? "checked" : "unchecked"}
			{...(restProps as Record<string, any>)}
		>
			<input
				type="checkbox"
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				onChange={(e) =>
					onCheckedChange?.((e.target as HTMLInputElement).checked)
				}
				style={{
					border: 0,
					clip: "rect(0 0 0 0)",
					height: "1px",
					margin: "-1px",
					overflow: "hidden",
					padding: 0,
					position: "absolute",
					width: "1px",
					whiteSpace: "nowrap",
				}}
			/>
			<div
				class={styles.control}
				data-state={checked ? "checked" : "unchecked"}
				data-disabled={disabled ? "" : undefined}
			>
				<div
					class={styles.thumb}
					data-state={checked ? "checked" : "unchecked"}
					data-disabled={disabled ? "" : undefined}
				/>
			</div>
			{children && (
				<span class={styles.label} data-disabled={disabled ? "" : undefined}>
					{children}
				</span>
			)}
		</label>
	);
}
