import SwitchIsland from "../../islands/switch";
import {
	type SwitchProps as BaseSwitchProps,
	Switch as SwitchPrimitive,
} from "./switch-primitive";

export interface SwitchProps extends BaseSwitchProps {
	interactive?: boolean;
	defaultChecked?: boolean;
}

export function Switch(props: SwitchProps) {
	const { interactive, onCheckedChange, checked, defaultChecked, ...rest } =
		props;

	if (
		interactive ||
		onCheckedChange ||
		checked !== undefined ||
		defaultChecked !== undefined
	) {
		return <SwitchIsland {...props} />;
	}

	return <SwitchPrimitive {...rest} />;
}
