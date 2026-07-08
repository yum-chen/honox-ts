import { InteractiveAvatar } from "../../islands/avatar";
import { AvatarBase, type AvatarBaseProps } from "./avatar-primitive";

export interface AvatarProps extends AvatarBaseProps {
	interactive?: boolean;
}

export function Avatar(props: AvatarProps) {
	const { interactive, ...rest } = props;

	// Use InteractiveAvatar if src is present (to handle loading states) or if explicitly requested
	if (rest.src || interactive) {
		return <InteractiveAvatar {...rest} />;
	}

	return <AvatarBase {...rest} />;
}
