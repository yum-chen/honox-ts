import SwitchIsland from "../../islands/switch";
import { type SwitchProps as BaseSwitchProps, SwitchBase } from "./switch-base";

interface SwitchProps extends BaseSwitchProps {
	interactive?: boolean;
}

function Switch(props: SwitchProps) {
	const { interactive, ...rest } = props;
	if (interactive) {
		return <SwitchIsland {...props} />;
	}
	return <SwitchBase {...rest} />;
}

export * from "./switch-base";
export type { SwitchProps };
export { Switch };
