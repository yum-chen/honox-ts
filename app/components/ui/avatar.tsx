import { InteractiveAvatar } from "../../islands/avatar";
import {
	AvatarBase,
	type AvatarBaseProps,
	Fallback,
	Image,
	Root,
} from "./avatar-primitive";
import { shouldHydrate } from "./island-utils";

interface AvatarProps extends AvatarBaseProps {
	interactive?: boolean;
}

function Avatar(props: AvatarProps) {
	const { interactive, ...rest } = props;

	// Hydrate the interactive avatar when an async image (src) needs client-side
	// loading/error handling, or when interactive is explicitly requested.
	if (shouldHydrate(interactive, Boolean(rest.src))) {
		return <InteractiveAvatar {...rest} />;
	}

	return <AvatarBase {...rest} />;
}

const AvatarComponent = Object.assign(Avatar, {
	Root,
	Image,
	Fallback,
});

export type { AvatarProps };
export { AvatarComponent as Avatar };
