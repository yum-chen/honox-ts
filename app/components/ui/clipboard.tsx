import type { JSX } from "hono/jsx";
import ClipboardIsland from "../../islands/clipboard";
import {
	Context,
	Control,
	CopyText,
	Indicator,
	Input,
	Label,
	Root as RootPrimitive,
	type RootProps,
	RootProvider,
	Trigger,
} from "./clipboard-primitive";
import { shouldHydrate } from "./island-utils";

export interface ClipboardProps extends RootProps {
	interactive?: boolean; // keep — forces island hydration (default true)
	label?: JSX.Element | string;
	children?: JSX.Element; // custom Trigger content; defaults to copy/check icons
}

const DefaultCopyIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Copy</title>
		<rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
		<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
	</svg>
);

const DefaultCheckIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Copied</title>
		<path d="M20 6 9 17l-5-5" />
	</svg>
);

function Root(props: ClipboardProps) {
	const { interactive, ...rest } = props;

	if (shouldHydrate(interactive, true)) {
		return <ClipboardIsland {...rest} />;
	}

	return <RootPrimitive {...rest} />;
}

function Clipboard(props: ClipboardProps) {
	const { interactive, label, children, ...rest } = props;

	return (
		<Root {...rest} interactive={interactive}>
			{label && <Label>{label}</Label>}
			<Control>
				<Input />
				<Trigger>
					{children ?? (
						<Indicator copied={<DefaultCheckIcon />}>
							<DefaultCopyIcon />
						</Indicator>
					)}
				</Trigger>
			</Control>
		</Root>
	);
}

const ClipboardComponent = Object.assign(Clipboard, {
	Root,
	RootProvider,
	Label,
	Control,
	Input,
	Trigger,
	Indicator,
	CopyText,
	Context,
});

export {
	ClipboardComponent as Clipboard,
	type ClipboardProps,
	Context,
	Control,
	CopyText,
	Indicator,
	Input,
	Label,
	Root,
	RootProvider,
	Trigger,
};

export default ClipboardComponent;
