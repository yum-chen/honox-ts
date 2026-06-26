import { useState } from "hono/jsx";
import {
	type SwitchProps,
	Switch as UISwitch,
} from "../components/ui/switch-primitive";

export default function SwitchIsland(props: SwitchProps) {
	const {
		checked: checkedProp,
		defaultChecked,
		onCheckedChange,
		...rest
	} = props;

	const [isChecked, setIsChecked] = useState(checkedProp ?? !!defaultChecked);
	const isControlled = checkedProp !== undefined;
	const checked = isControlled ? checkedProp : isChecked;

	const handleCheckedChange = (details: { checked: boolean }) => {
		if (!isControlled) {
			setIsChecked(details.checked);
		}
		onCheckedChange?.(details);
	};

	return (
		<UISwitch
			{...rest}
			checked={checked}
			onCheckedChange={handleCheckedChange}
		/>
	);
}
