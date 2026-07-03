import type { PropsWithChildren } from "hono/jsx";
import { createContext, useContext, useId } from "hono/jsx";
import { cx } from "styled-system/css";
import type { SplitterVariantProps } from "styled-system/recipes";
import { splitter } from "styled-system/recipes";

type SplitterStyles = ReturnType<typeof splitter>;

interface SplitterContextValue {
	styles: SplitterStyles;
	orientation: "horizontal" | "vertical";
}

const SplitterContext = createContext<SplitterContextValue | null>(null);

const useSplitterContext = () => {
	const context = useContext(SplitterContext);
	return context;
};

export interface RootProps extends SplitterVariantProps, PropsWithChildren {
	orientation?: "horizontal" | "vertical";
	class?: string;
	id?: string;
	style?: Record<string, string | number>;
}

export function Root(props: RootProps) {
	const [variantProps, localProps] = splitter.splitVariantProps(props);
	const {
		children,
		orientation = "horizontal",
		class: classProp,
		id: idProp,
		...restProps
	} = localProps;
	const styles = splitter(variantProps);
	const generatedId = useId();
	const id = idProp || generatedId;

	const value = {
		styles,
		orientation,
	};

	return (
		<SplitterContext.Provider value={value}>
			<div
				id={id}
				data-scope="splitter"
				data-part="root"
				class={cx(styles.root, classProp)}
				data-orientation={orientation}
				style={{
					flexDirection: orientation === "horizontal" ? "row" : "column",
					...(restProps.style || {}),
				}}
				{...restProps}
			>
				{children}
			</div>
		</SplitterContext.Provider>
	);
}

export interface PanelProps extends PropsWithChildren {
	id: string | number;
	class?: string;
	style?: Record<string, string | number>;
}

export function Panel(props: PanelProps) {
	const { children, id, class: classProp, style, ...restProps } = props;
	const context = useSplitterContext();
	const styles = context?.styles;

	return (
		<div
			id={`splitter-panel-${id}`}
			data-scope="splitter"
			data-part="panel"
			class={cx(styles?.panel, classProp)}
			style={{
				flex: `var(--splitter-panel-${id}, 1 1 0%)`,
				...style,
			}}
			{...restProps}
		>
			{children}
		</div>
	);
}

export interface ResizeTriggerProps extends PropsWithChildren {
	id: string;
	class?: string;
	step?: number;
	disabled?: boolean;
}

export function ResizeTrigger(props: ResizeTriggerProps) {
	const { children, id, class: classProp, disabled, ...restProps } = props;
	const context = useSplitterContext();
	const styles = context?.styles;
	const orientation = context?.orientation;

	return (
		<button
			type="button"
			id={`splitter-trigger-${id}`}
			role="separator"
			aria-orientation={orientation}
			data-scope="splitter"
			data-part="resize-trigger"
			data-orientation={orientation}
			data-disabled={disabled ? "" : undefined}
			class={cx(styles?.resizeTrigger, classProp)}
			disabled={disabled}
			{...restProps}
		>
			{children}
		</button>
	);
}
