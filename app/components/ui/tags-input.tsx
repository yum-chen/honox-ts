import TagsInputIsland from "../../islands/tags-input";
import { shouldHydrate } from "./island-utils";
import {
	ClearTrigger,
	Control,
	HiddenInput,
	Input,
	type InteractiveTagsInputProps,
	Item,
	ItemDeleteTrigger,
	ItemInput,
	ItemPreview,
	Items,
	ItemText,
	Label,
	Root as TagsInputPrimitiveRoot,
	TagsInputStructure,
} from "./tags-input-primitive";

interface TagsInputProps extends InteractiveTagsInputProps {
	interactive?: boolean;
}

function TagsInputRoot(props: TagsInputProps) {
	const { interactive, ...rest } = props;

	const hasSignal =
		rest.value !== undefined ||
		rest.onValueChange !== undefined ||
		rest.inputValue !== undefined ||
		rest.onInputValueChange !== undefined ||
		rest.addOnPaste !== undefined ||
		rest.validate !== undefined;

	const isInteractive = shouldHydrate(interactive, hasSignal);

	if (isInteractive) {
		return <TagsInputIsland {...rest} />;
	}

	return (
		<TagsInputPrimitiveRoot {...rest}>
			<TagsInputStructure {...rest} />
		</TagsInputPrimitiveRoot>
	);
}

const TagsInput = Object.assign(TagsInputRoot, {
	Root: TagsInputPrimitiveRoot,
	Label,
	Control,
	Input,
	ClearTrigger,
	Item,
	ItemPreview,
	ItemText,
	ItemDeleteTrigger,
	ItemInput,
	HiddenInput,
	Items,
});

export type { TagsInputProps };
export { TagsInput };
