import { useState } from "hono/jsx";
import {
	SwitchRoot,
	type SwitchRootProps,
} from "../components/ui/switch/switch-root";

export interface SwitchProps extends SwitchRootProps {
	defaultChecked?: boolean;
	onCheckedChange?: (details: { checked: boolean }) => void;
}

export function Switch(props: SwitchProps) {
	const {
		checked: checkedProp,
		defaultChecked,
		onCheckedChange,
		disabled,
		...rest
	} = props;

	const [isChecked, setIsChecked] = useState(checkedProp ?? !!defaultChecked);
	const isControlled = checkedProp !== undefined;
	const checked = isControlled ? checkedProp : isChecked;

	const toggle = () => {
		if (disabled) return;
		const nextChecked = !checked;
		if (!isControlled) {
			setIsChecked(nextChecked);
		}
		onCheckedChange?.({ checked: nextChecked });
	};

	return (
		<SwitchRoot
			{...rest}
			checked={checked}
			disabled={disabled}
			onClick={(e: any) => {
				e.stopPropagation();
				toggle();
			}}
			onKeyDown={(e: any) => {
				if (e.key === " " || e.key === "Enter") {
					e.preventDefault();
					toggle();
				}
			}}
			onChange={(e: any) => {
				if (e.target instanceof HTMLInputElement) {
					if (!isControlled) {
						setIsChecked(e.target.checked);
					}
					onCheckedChange?.({ checked: e.target.checked });
				}
			}}
		/>
	);
}
