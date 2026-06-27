import { useState } from "hono/jsx";
import {
	Checkbox as UICheckbox,
	type CheckboxProps as UICheckboxProps,
} from "../components/ui/checkbox-base";

export interface CheckboxIslandProps extends UICheckboxProps {
	defaultChecked?: boolean | "indeterminate";
}

export default function CheckboxIsland(props: CheckboxIslandProps) {
	const {
		checked: checkedProp,
		defaultChecked,
		onCheckedChange,
		...rest
	} = props;

	const [isChecked, setIsChecked] = useState(
		checkedProp ?? defaultChecked ?? false,
	);
	const isControlled = checkedProp !== undefined;
	const checked = isControlled ? checkedProp : isChecked;

	const handleCheckedChange = (details: {
		checked: boolean | "indeterminate";
	}) => {
		if (!isControlled) {
			setIsChecked(details.checked);
		}
		onCheckedChange?.(details);
	};

	return (
		<UICheckbox
			{...rest}
			checked={checked}
			onCheckedChange={handleCheckedChange}
		/>
	);
}
