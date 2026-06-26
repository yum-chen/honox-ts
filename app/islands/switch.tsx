import { useState } from "hono/jsx";
import {
	Switch as SwitchComponent,
	type SwitchProps,
} from "../components/ui/switch";

export default function SwitchIsland(props: SwitchProps) {
	const [isChecked, setIsChecked] = useState(
		props.checked ?? !!props.defaultChecked,
	);
	const isControlled = props.checked !== undefined;
	const checked = isControlled ? props.checked : isChecked;

	const handleCheckedChange = (e: any) => {
		const nextChecked = e.target.checked;
		if (!isControlled) {
			setIsChecked(nextChecked);
		}
		props.onCheckedChange?.({ checked: nextChecked });
	};

	return (
		<SwitchComponent
			{...props}
			checked={checked}
			onChange={handleCheckedChange}
		/>
	);
}
