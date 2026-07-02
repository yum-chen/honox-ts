import ButtonIsland from "../../islands/button";
import {
	Button as ButtonBase,
	ButtonGroup as ButtonGroupBase,
	type ButtonGroupProps,
	type ButtonProps,
} from "./button-primitive";

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Close</title>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

export function IconButton(props: ButtonProps) {
	if (props.interactive) {
		return <ButtonIsland {...props} px="0" />;
	}
	return (
		<ButtonBase px="0" {...props}>
			{props.children}
		</ButtonBase>
	);
}

export function CloseButton(props: ButtonProps) {
	if (props.interactive) {
		return (
			<ButtonIsland variant="plain" aria-label="Close" {...props} px="0">
				<CloseIcon />
			</ButtonIsland>
		);
	}
	return (
		<ButtonBase variant="plain" aria-label="Close" {...props} px="0">
			<CloseIcon />
		</ButtonBase>
	);
}

export function Button(props: ButtonProps) {
	if (props.interactive) {
		return <ButtonIsland {...props} />;
	}
	return <ButtonBase {...props} />;
}

export function ButtonGroup(props: ButtonGroupProps) {
	return <ButtonGroupBase {...props} />;
}

export type { ButtonGroupProps, ButtonProps };
