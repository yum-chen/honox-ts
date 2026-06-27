import { cx } from "../../../styled-system/css";
import type { SwitchRecipeVariantProps } from "../../../styled-system/recipes";
import { switchRecipe } from "../../../styled-system/recipes";
import { useFieldContext } from "./field-primitive";

export interface SwitchProps extends SwitchRecipeVariantProps {
	children?: any;
	class?: string;
	checked?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	name?: string;
	value?: string;
	onCheckedChange?: (details: { checked: boolean }) => void;
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
		disabled: disabledProp = field?.disabled,
		invalid: invalidProp = field?.invalid,
		required: requiredProp = field?.required,
		name,
		value = "on",
		onCheckedChange,
		id: idProp = field?.id,
		...restProps
	} = localProps;

	const styles = switchRecipe(variantProps);

	const toggle = () => {
		if (disabledProp) return;
		onCheckedChange?.({ checked: !checked });
	};

	const labelId = `switch::${idProp}::label`;

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabledProp ? "" : undefined}
			data-invalid={invalidProp ? "" : undefined}
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
				disabled={disabledProp}
				required={requiredProp}
				id={idProp}
				onChange={(e) => {
					if (e.target instanceof HTMLInputElement) {
						onCheckedChange?.({ checked: e.target.checked });
					}
				}}
			/>
			<div
				class={styles.control}
				onClick={(e) => {
					e.stopPropagation();
					toggle();
				}}
				data-disabled={disabledProp ? "" : undefined}
				data-invalid={invalidProp ? "" : undefined}
				data-checked={checked ? "" : undefined}
				role="switch"
				aria-checked={checked}
				aria-disabled={disabledProp}
				aria-invalid={invalidProp}
				aria-labelledby={children ? labelId : undefined}
				tabIndex={disabledProp ? -1 : 0}
				onKeyDown={(e) => {
					if (e.key === " " || e.key === "Enter") {
						e.preventDefault();
						toggle();
					}
				}}
			>
				<div
					class={styles.thumb}
					data-disabled={disabledProp ? "" : undefined}
					data-invalid={invalidProp ? "" : undefined}
					data-checked={checked ? "" : undefined}
				/>
			</div>
			{children && (
				<span
					id={labelId}
					class={styles.label}
					data-disabled={disabledProp ? "" : undefined}
					data-invalid={invalidProp ? "" : undefined}
					data-checked={checked ? "" : undefined}
				>
					{children}
				</span>
			)}
		</label>
	);
}
