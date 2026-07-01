import ButtonIsland from "../../islands/button";
import { Button as ButtonPrimitive, type ButtonProps as BaseButtonProps } from "./button-base";

export interface ButtonProps extends BaseButtonProps {
    interactive?: boolean;
}

export function Button(props: ButtonProps) {
    const { interactive, ...rest } = props;

    if (interactive) {
        return <ButtonIsland {...props} />;
    }

    return <ButtonPrimitive {...rest} />;
}
