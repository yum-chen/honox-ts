import {
	InteractiveTagsInput,
	type InteractiveTagsInputProps,
} from "../components/ui/tags-input-primitive";

export default function TagsInputIsland(props: InteractiveTagsInputProps) {
	return <InteractiveTagsInput {...props} data-hydrated="true" />;
}
