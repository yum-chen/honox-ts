import type { PropsWithChildren } from "hono/jsx";
import { Spinner } from "./spinner";

export interface LoaderProps extends PropsWithChildren<{
	spinner?: any;
	text?: any;
	spinnerPlacement?: "start" | "end";
}> {}

export function Loader(props: LoaderProps) {
	const { spinner, text, spinnerPlacement = "start", children } = props;

	const spinnerElement = spinner || <Spinner size="sm" />;

	return (
		<>
			{spinnerPlacement === "start" && (
				<span style={{ display: "inline-flex", marginRight: text ? "0.5em" : "0" }}>
					{spinnerElement}
				</span>
			)}
			{text || children}
			{spinnerPlacement === "end" && (
				<span style={{ display: "inline-flex", marginLeft: text ? "0.5em" : "0" }}>
					{spinnerElement}
				</span>
			)}
		</>
	);
}
