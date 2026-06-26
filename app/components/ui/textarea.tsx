import TextareaIsland from "../../islands/textarea";
import { TextareaBase, type TextareaProps } from "./textarea-base";

export const Textarea = (props: TextareaProps) => {
	const isInteractive =
		props.interactive !== false &&
		(props.interactive === true ||
			props.validator !== undefined ||
			props.onInput !== undefined);

	if (isInteractive) {
		return <TextareaIsland {...props} />;
	}
	return <TextareaBase {...props} />;
};

export type { TextareaProps } from "./textarea-base";
