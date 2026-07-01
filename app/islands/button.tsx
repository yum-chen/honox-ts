import { useState } from "hono/jsx";
import { Button as UIButton, type ButtonProps as UIButtonProps } from "../components/ui/button-base";

export default function ButtonIsland(props: UIButtonProps) {
    const { loading: loadingProp, onClick, interactive, ...rest } = props;
    const [isLoading, setIsLoading] = useState(!!loadingProp);

    const handleClick = async (e: any) => {
        if (onClick) {
            const result = onClick(e);
            if (result instanceof Promise) {
                setIsLoading(true);
                try {
                    await result;
                } finally {
                    setIsLoading(false);
                }
            }
        }
    };

    return (
        <UIButton
            {...rest}
            loading={isLoading}
            onClick={handleClick}
        />
    );
}
