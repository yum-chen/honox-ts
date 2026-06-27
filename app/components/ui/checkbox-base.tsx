import { useEffect, useRef } from "hono/jsx";
import { cx } from "../../../styled-system/css";
import type { CheckboxVariantProps } from "../../../styled-system/recipes";
import { checkbox } from "../../../styled-system/recipes";
import { useFieldContext } from "./field-base";

export interface CheckboxProps extends CheckboxVariantProps {
	children?: any;
	class?: string;
	checked?: boolean | "indeterminate";
	onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void;
	disabled?: boolean;
	invalid?: boolean;
	required?: boolean;
	readOnly?: boolean;
	id?: string;
	name?: string;
	value?: string;
	[key: string]: any;
}

export function Checkbox(props: CheckboxProps) {
	const field = useFieldContext();
	const [variantProps, localProps] = checkbox.splitVariantProps(props);
	const {
		children,
		class: classProp,
		checked,
		onCheckedChange,
		disabled = field?.disabled,
		invalid = field?.invalid,
		required = field?.required,
		readOnly = field?.readOnly,
		id = field?.id,
		name,
		value = "on",
		...restProps
	} = localProps;

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.indeterminate = checked === "indeterminate";
		}
	}, [checked]);

	const handleChange = (e: any) => {
		if (readOnly) {
			e.preventDefault();
			return;
		}
		const target = e.target as HTMLInputElement;
		onCheckedChange?.({ checked: target.checked });
	};

	const styles = checkbox(variantProps);

	const isChecked = checked === true;
	const isIndeterminate = checked === "indeterminate";
	const state = isIndeterminate
		? "indeterminate"
		: isChecked
			? "checked"
			: "unchecked";

	const describedBy = [];
	if (field?.hasHelperText) describedBy.push(field.helperTextId);
	if (field?.invalid && field?.hasErrorText)
		describedBy.push(field.errorTextId);

	return (
		<label
			class={cx(styles.root, classProp)}
			data-disabled={disabled ? "" : undefined}
			data-invalid={invalid ? "" : undefined}
			data-readonly={readOnly ? "" : undefined}
			data-required={required ? "" : undefined}
			data-state={state}
			{...restProps}
		>
			<input
				ref={inputRef}
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
				checked={isChecked}
				onChange={handleChange}
				disabled={disabled}
				required={required}
				readOnly={readOnly}
				id={id}
				aria-invalid={invalid ? "true" : undefined}
				aria-required={required ? "true" : undefined}
				aria-readonly={readOnly ? "true" : undefined}
				aria-checked={isIndeterminate ? "mixed" : isChecked}
				aria-describedby={
					describedBy.length > 0 ? describedBy.join(" ") : undefined
				}
				data-state={state}
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
			/>
			<div
				class={styles.control}
				data-part="control"
				data-disabled={disabled ? "" : undefined}
				data-invalid={invalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
				data-state={state}
			>
				{(isChecked || isIndeterminate) && (
					<div class={styles.indicator}>
						{isIndeterminate ? (
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Indeterminate</title>
								<line x1="5" y1="12" x2="19" y2="12" />
							</svg>
						) : (
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="4"
								strokeLinecap="round"
								strokeLinejoin="round"
							>
								<title>Checked</title>
								<polyline points="20 6 9 17 4 12" />
							</svg>
						)}
					</div>
				)}
			</div>
			{children && (
				<span
					class={styles.label}
					data-disabled={disabled ? "" : undefined}
					data-invalid={invalid ? "" : undefined}
					data-readonly={readOnly ? "" : undefined}
					data-required={required ? "" : undefined}
					data-state={state}
				>
					{children}
				</span>
			)}
		</label>
	);
}
