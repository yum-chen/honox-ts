import { cx } from "../../../styled-system/css";
import { switchRecipe } from "../../../styled-system/recipes";

export interface SwitchProps {
	children?: any;
	class?: string;
	defaultChecked?: boolean;
	checked?: boolean;
	disabled?: boolean;
	onCheckedChange?: (checked: boolean) => void;
	[key: string]: any;
}

export function Switch(props: SwitchProps) {
	const [variantProps, localProps] = switchRecipe.splitVariantProps(props);
	const {
		children,
		class: classProp,
		defaultChecked,
		checked,
		disabled,
		onCheckedChange,
		...restProps
	} = localProps;
	const styles = switchRecipe(variantProps);

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabled ? "" : undefined}
		>
			<input
				type="checkbox"
				class="peer"
				style={{
					position: "absolute",
					width: "1px",
					height: "1px",
					padding: "0",
					margin: "-1px",
					overflow: "hidden",
					clip: "rect(0, 0, 0, 0)",
					whiteSpace: "nowrap",
					borderWidth: "0",
				}}
				checked={checked}
				defaultChecked={defaultChecked}
				disabled={disabled}
				onChange={(e: any) => onCheckedChange?.(e.target.checked)}
				{...restProps}
			/>
			<div class={styles.control}>
				<div class={styles.thumb} />
			</div>
			{children && <span class={styles.label}>{children}</span>}
		</label>
	);
}
