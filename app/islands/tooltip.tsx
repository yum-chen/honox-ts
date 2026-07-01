import { useEffect, useRef, useState } from "hono/jsx";
import {
	TooltipBase,
	type TooltipBaseProps,
} from "../components/ui/tooltip-base";

export default function TooltipIsland(props: TooltipBaseProps) {
	const { open: openProp, interactive, ...rest } = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);
	const closeTimeoutRef = useRef<number | null>(null);

	const openTooltip = () => {
		if (closeTimeoutRef.current) {
			clearTimeout(closeTimeoutRef.current);
			closeTimeoutRef.current = null;
		}
		setIsOpen(true);
	};

	const closeTooltip = () => {
		if (interactive) {
			closeTimeoutRef.current = window.setTimeout(() => {
				setIsOpen(false);
			}, 100) as unknown as number;
		} else {
			setIsOpen(false);
		}
	};

	useEffect(() => {
		return () => {
			if (closeTimeoutRef.current) {
				clearTimeout(closeTimeoutRef.current);
			}
		};
	}, []);

	return (
		<TooltipBase
			{...rest}
			open={isOpen}
			interactive={interactive}
			triggerProps={{
				onMouseEnter: openTooltip,
				onMouseLeave: closeTooltip,
				onFocus: openTooltip,
				onBlur: closeTooltip,
				tabIndex: 0,
				...props.triggerProps,
			}}
			contentProps={{
				onMouseEnter: openTooltip,
				onMouseLeave: closeTooltip,
				...props.contentProps,
			}}
		/>
	);
}
