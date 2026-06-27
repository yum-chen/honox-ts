import { cx } from "../../../styled-system/css";
import type { SwitchRecipeVariantProps } from "../../../styled-system/recipes";
import { switchRecipe } from "../../../styled-system/recipes";
import { useFieldContext } from "./field-base";

export interface SwitchProps extends SwitchRecipeVariantProps {
	children?: any;
	class?: string;
	checked?: boolean;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	readOnly?: boolean;
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
		readOnly: readOnlyProp = field?.readOnly,
		name,
		value = "on",
		onCheckedChange,
		id: idProp = field?.id,
		...restProps
	} = localProps;

	const styles = switchRecipe(variantProps);

	const toggle = () => {
		if (disabledProp || readOnlyProp) return;
		onCheckedChange?.({ checked: !checked });
	};

	const labelId = `switch::${idProp}::label`;

	const describedBy = [];
	if (field?.hasHelperText) describedBy.push(field.helperTextId);
	if (field?.invalid && field?.hasErrorText)
		describedBy.push(field.errorTextId);

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabledProp ? "" : undefined}
			data-invalid={invalidProp ? "" : undefined}
			data-readonly={readOnlyProp ? "" : undefined}
			data-required={requiredProp ? "" : undefined}
			data-state={checked ? "checked" : "unchecked"}
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
				readOnly={readOnlyProp}
				tabIndex={-1}
				id={idProp}
				aria-describedby={
					describedBy.length > 0 ? describedBy.join(" ") : undefined
				}
				onChange={(e) => {
					if (readOnlyProp) {
						e.preventDefault();
						return;
					}
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
				data-readonly={readOnlyProp ? "" : undefined}
				data-required={requiredProp ? "" : undefined}
				data-state={checked ? "checked" : "unchecked"}
				role="switch"
				aria-checked={checked}
				aria-disabled={disabledProp}
				aria-readonly={readOnlyProp}
				aria-required={requiredProp}
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
					data-readonly={readOnlyProp ? "" : undefined}
					data-required={requiredProp ? "" : undefined}
					data-state={checked ? "checked" : "unchecked"}
				/>
			</div>
			{children && (
				<span
					id={labelId}
					class={styles.label}
					data-disabled={disabledProp ? "" : undefined}
					data-invalid={invalidProp ? "" : undefined}
					data-readonly={readOnlyProp ? "" : undefined}
					data-required={requiredProp ? "" : undefined}
					data-state={checked ? "checked" : "unchecked"}
				>
					{children}
				</span>
			)}
		</label>
	);
}
