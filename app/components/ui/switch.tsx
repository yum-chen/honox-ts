import SwitchIsland from "../../islands/switch";
import {
	type SwitchProps as SwitchPrimitiveProps,
	Switch as SwitchPrimitive,
} from "./switch-primitive";

export interface SwitchProps extends SwitchPrimitiveProps {
	interactive?: boolean;
	defaultChecked?: boolean;
}

export function Switch(props: SwitchProps) {
	const { interactive, onCheckedChange, checked, defaultChecked } = props;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onCheckedChange !== undefined ||
			checked !== undefined ||
			defaultChecked !== undefined);

	if (isInteractive) {
		return <SwitchIsland {...props} />;
	}

	return <SwitchPrimitive {...props} />;
}
