import { useId, useState } from "hono/jsx";
import { cx } from "../../styled-system/css";
import { field } from "../../styled-system/recipes";
import {
	FieldContext,
	type FieldContextValue,
} from "../components/ui/field/field-context";
import type { FieldProps } from "../components/ui/field/field-root";

export default function FieldIsland(props: FieldProps) {
	const [variantProps, localProps] = field.splitVariantProps(props);
	const {
		children,
		class: classProp,
		id: idProp,
		disabled = props.disabled,
		invalid: invalidProp = props.invalid,
		readOnly = props.readOnly,
		required = props.required,
		...restProps
	} = localProps;

	const [isInvalid, setIsInvalid] = useState(!!invalidProp);
	const autoId = useId();
	const id = idProp || autoId;
	const styles = field(variantProps);

	const contextValue: FieldContextValue = {
		id,
		disabled,
		invalid: isInvalid,
		readOnly,
		required,
		labelId: `field::${id}::label`,
		helperTextId: `field::${id}::helper-text`,
		errorTextId: `field::${id}::error-text`,
		hasHelperText: true,
		hasErrorText: true,
		setInvalid: (invalid: boolean) => setIsInvalid(invalid),
	};

	return (
		<FieldContext.Provider value={contextValue}>
			<div
				class={cx(styles.root, classProp)}
				data-disabled={disabled ? "" : undefined}
				data-invalid={isInvalid ? "" : undefined}
				data-readonly={readOnly ? "" : undefined}
				data-required={required ? "" : undefined}
				{...restProps}
			>
				{children}
			</div>
		</FieldContext.Provider>
	);
}
