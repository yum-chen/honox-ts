import { cx } from "../../../styled-system/css";
import type { SwitchRecipeVariantProps } from "../../../styled-system/recipes";
import { switchRecipe } from "../../../styled-system/recipes";
import { useFieldContext } from "./field-base";

interface SwitchProps extends SwitchRecipeVariantProps {
	children?: any;
	class?: string;
	checked?: boolean;
	defaultChecked?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	onCheckedChange?: (details: { checked: boolean }) => void;
	id?: string;
	[key: string]: any;
}

function SwitchBase(props: SwitchProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = switchRecipe.splitVariantProps(props);
	const {
		children,
		class: classProp,
		checked,
		disabled = field?.disabled,
		invalid = field?.invalid,
		required = field?.required,
		name,
		value = "on",
		onCheckedChange,
		id = field?.id,
		...restProps
	} = localProps;

	const styles = switchRecipe(variantProps);
	const labelId = `switch::${id}::label`;

	const toggle = () => {
		if (disabled) return;
		onCheckedChange?.({ checked: !checked });
	};

	const handleKeyDown = (e: any) => {
		if (e.key === " " || e.key === "Enter") {
			e.preventDefault();
			toggle();
		}
	};

	const handleChange = (e: any) => {
		if (e.target instanceof HTMLInputElement) {
			onCheckedChange?.({ checked: e.target.checked });
		}
	};

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
			data-checked={checked ? "" : undefined}
			{...restProps}
		>
			<input
				type="checkbox"
				style={{
					border: "0",
					clip: "rect(0 0 0 0)",
					height: "1px",
					margin: "-1px",
					overflow: "hidden",
					padding: "0",
					position: "absolute",
					width: "1px",
					whiteSpace: "nowrap",
				}}
				name={name}
				value={value}
				checked={checked}
				disabled={disabled}
				required={required}
				id={id}
				onChange={handleChange}
			/>
			<div
				class={styles.control}
				onClick={toggle}
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-checked={checked ? "" : undefined}
				role="switch"
				aria-checked={checked}
				aria-disabled={disabled}
				aria-invalid={invalid}
				aria-labelledby={children ? labelId : undefined}
				tabIndex={disabled ? -1 : 0}
				onKeyDown={handleKeyDown}
			>
				<div
					class={styles.thumb}
					data-disabled={disabled ? "" : undefined}
					data-invalid={invalid ? "" : undefined}
					data-checked={checked ? "" : undefined}
				/>
			</div>
			{children && (
				<span
					id={labelId}
					class={styles.label}
					data-disabled={disabled ? "" : undefined}
					data-invalid={invalid ? "" : undefined}
					data-checked={checked ? "" : undefined}
				>
					{children}
				</span>
			)}
		</label>
	);
}

export type { SwitchProps };
export { SwitchBase };
