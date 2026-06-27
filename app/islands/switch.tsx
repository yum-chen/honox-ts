import { useState } from "hono/jsx";
import { SwitchBase, type SwitchProps } from "../components/ui/switch-base";

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
		<SwitchBase
			{...rest}
			checked={checked}
			onCheckedChange={handleCheckedChange}
		/>
	);
}
