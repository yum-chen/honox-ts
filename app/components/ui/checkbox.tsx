import CheckboxIsland from "../../islands/checkbox";
import {
	type CheckboxProps as BaseCheckboxProps,
	Checkbox as CheckboxPrimitive,
} from "./checkbox-primitive";

export * from "./checkbox-primitive";

export interface CheckboxProps extends BaseCheckboxProps {
	interactive?: boolean;
	onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void;
	defaultChecked?: boolean | "indeterminate";
}

export function Checkbox(props: CheckboxProps) {
	const { interactive, onCheckedChange, defaultChecked, ...rest } = props;

	if (interactive || onCheckedChange || defaultChecked !== undefined) {
		return <CheckboxIsland {...props} />;
	}

	return <CheckboxPrimitive {...rest} />;
}
