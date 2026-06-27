import { useState } from "hono/jsx";
import {
	Switch as UISwitch,
	type SwitchProps as UISwitchProps,
} from "../components/ui/switch-primitive";

export interface SwitchIslandProps extends UISwitchProps {
	defaultChecked?: boolean;
}

export default function SwitchIsland(props: SwitchIslandProps) {
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
