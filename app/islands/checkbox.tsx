import { useState } from "hono/jsx";
import {
	Checkbox as UICheckbox,
	type CheckboxProps as UICheckboxProps,
} from "../components/ui/checkbox-primitive";

export interface CheckboxIslandProps extends UICheckboxProps {
	onCheckedChange?: (details: { checked: boolean | "indeterminate" }) => void;
	defaultChecked?: boolean | "indeterminate";
}

export default function Checkbox(props: CheckboxIslandProps) {
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

	const handleChange = (e: any) => {
		const target = e.target as HTMLInputElement;
		const nextChecked = target.checked;

		if (!isControlled) {
			setIsChecked(nextChecked);
		}
		onCheckedChange?.({ checked: nextChecked });
	};

	return <UICheckbox {...rest} checked={checked} onChange={handleChange} />;
}
