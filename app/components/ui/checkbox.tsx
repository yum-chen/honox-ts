import CheckboxIsland from "../../islands/checkbox";
import {
	type CheckboxProps as BaseCheckboxProps,
	Checkbox as CheckboxPrimitive,
} from "./checkbox-primitive";

export interface CheckboxProps extends BaseCheckboxProps {
	interactive?: boolean;
	defaultChecked?: boolean | "indeterminate";
}

export function Checkbox(props: CheckboxProps) {
	const { interactive, onCheckedChange, checked, defaultChecked, ...rest } =
		props;

	if (
		interactive ||
		onCheckedChange ||
		checked !== undefined ||
		defaultChecked !== undefined
	) {
		return <CheckboxIsland {...props} />;
	}

	return <CheckboxPrimitive {...rest} />;
}
