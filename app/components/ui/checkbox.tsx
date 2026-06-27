import CheckboxIsland from "../../islands/checkbox";
import {
	type CheckboxProps as BaseCheckboxProps,
	Checkbox as CheckboxBase,
} from "./checkbox-base";

export interface CheckboxProps extends BaseCheckboxProps {
	interactive?: boolean;
	defaultChecked?: boolean | "indeterminate";
}

export function Checkbox(props: CheckboxProps) {
	const { interactive, onCheckedChange, defaultChecked, ...rest } = props;

	if (interactive || onCheckedChange || defaultChecked !== undefined) {
		return <CheckboxIsland {...props} />;
	}

	return <CheckboxBase {...rest} />;
}
