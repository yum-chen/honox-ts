import ButtonIsland from "../../islands/button";
import { Button as ButtonBase, type ButtonProps } from "./button-base";

export function Button(props: ButtonProps) {
	if (props.interactive) {
		return <ButtonIsland {...props} />;
	}
	return <ButtonBase {...props} />;
}

export type { ButtonProps };
