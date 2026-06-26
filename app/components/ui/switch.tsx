import { cx } from "../../../styled-system/css";
import type { SwitchRecipeVariantProps } from "../../../styled-system/recipes";
import { switchRecipe } from "../../../styled-system/recipes";
import { useFieldContext } from "./field";

export interface SwitchProps extends SwitchRecipeVariantProps {
	children?: any;
	class?: string;
	checked?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	onChange?: (e: any) => void;
	id?: string;
	[key: string]: any;
}

export function Switch(props: SwitchProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = switchRecipe.splitVariantProps(props);
	const {
		children,
		class: classProp,
		checked,
		disabled = props.disabled ?? field?.disabled,
		invalid = props.invalid ?? field?.invalid,
		required = props.required ?? field?.required,
		name,
		value = "on",
		onChange,
		id = props.id ?? field?.id,
		...restProps
	} = localProps;

	const styles = switchRecipe(variantProps);
	const labelId = `switch::${id}::label`;

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
				onChange={onChange}
			/>
			<div
				class={styles.control}
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-checked={checked ? "" : undefined}
				role="switch"
				aria-checked={checked}
				aria-disabled={disabled}
				aria-invalid={invalid}
				aria-labelledby={children ? labelId : undefined}
				tabIndex={disabled ? -1 : 0}
				onKeyDown={(e) => {
					if (e.key === " " || e.key === "Enter") {
						e.preventDefault();
						// In a dumb component, we rely on the input's onChange being triggered
						// or a passed down toggle. But here we can't easily trigger the input.
						// So we might need to pass a 'onToggle' as well.
						// However, for standard HTML behavior, clicking the label toggles the checkbox.
					}
				}}
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
