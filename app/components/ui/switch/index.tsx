import {
	Switch as SwitchIsland,
	type SwitchProps as SwitchIslandProps,
} from "../../../islands/switch";
import { SwitchRoot, type SwitchRootProps } from "./switch-root";

export interface SmartSwitchProps extends SwitchIslandProps {
	interactive?: boolean;
}

export function Switch(props: SmartSwitchProps) {
	const { interactive = true, ...rest } = props;

	if (interactive) {
		return <SwitchIsland {...rest} />;
	}

	return <SwitchRoot {...rest} />;
}

export * from "./switch-root";
