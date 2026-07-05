import type { JSX } from "hono/jsx";
import { Fragment } from "hono/jsx";
import SplitterIsland, {
	type SplitterIslandProps,
} from "../../islands/splitter";
import {
	Panel,
	ResizeTrigger,
	Root,
	type SplitterSize,
} from "./splitter-primitive";

export interface PanelConfig {
	id: string | number;
	content: JSX.Element;
	class?: string;
	style?: Record<string, string | number>;
}

export interface SplitterProps extends Omit<SplitterIslandProps, "children" | "sizes"> {
	panels: PanelConfig[];
	resizeTriggerClass?: string;
	resizeTriggerStyle?: Record<string, string | number>;
	size?: SplitterSize[];
}

export const Splitter = (props: SplitterProps) => {
	const {
		panels,
		interactive,
		resizeTriggerClass,
		resizeTriggerStyle,
		size: sizeProp,
		defaultSize,
		...rest
	} = props;

	const sizes = sizeProp || defaultSize || [];

	const renderContent = () => {
		return panels.map((panel, index) => {
			const isLast = index === panels.length - 1;
			const nextPanel = panels[index + 1];

			return (
				<Fragment key={panel.id}>
					<Panel id={panel.id} class={panel.class} style={panel.style}>
						{panel.content}
					</Panel>
					{!isLast && nextPanel && (
						<ResizeTrigger
							id={`${panel.id}:${nextPanel.id}`}
							class={resizeTriggerClass}
							style={resizeTriggerStyle}
						/>
					)}
				</Fragment>
			);
		});
	};

	if (interactive) {
		return (
			<SplitterIsland
				{...rest}
				sizes={sizeProp}
				defaultSize={defaultSize}
				interactive
			>
				{renderContent()}
			</SplitterIsland>
		);
	}

	return (
		<Root {...rest} sizes={sizes}>
			{renderContent()}
		</Root>
	);
};
