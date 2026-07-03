import { useId } from "hono/jsx";
import TabsIsland from "../../islands/tabs";
import {
	Content,
	Indicator,
	List,
	Root as TabsPrimitiveRoot,
	type RootProps as TabsPrimitiveRootProps,
	Trigger,
} from "./tabs-primitive";

export interface RootProps extends TabsPrimitiveRootProps {
	interactive?: boolean;
	onValueChange?: (details: { value: string }) => void;
}

export function Root(props: RootProps) {
	const {
		interactive,
		onValueChange,
		value,
		defaultValue,
		id: idProp,
		...rest
	} = props;
	const fallbackId = useId();
	const id = idProp || `tabs-${fallbackId}`;

	const isInteractive =
		interactive !== false &&
		(interactive ||
			onValueChange !== undefined ||
			value !== undefined ||
			defaultValue !== undefined);

	if (isInteractive) {
		return (
			<TabsIsland
				{...props}
				id={id}
				value={value}
				defaultValue={defaultValue}
			/>
		);
	}

	return (
		<TabsPrimitiveRoot
			{...rest}
			id={id}
			value={value}
			defaultValue={defaultValue}
		/>
	);
}

export { List, Trigger, Content, Indicator };
