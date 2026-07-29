import { css } from "design-system/css";
import { useState } from "hono/jsx";
import { Anchor } from "../components/ui/anchor";
import { InteractiveCombobox } from "../components/ui/combobox-primitive";
import { Text } from "../components/ui/text";

export interface TaskProjectEditorProps {
	value: string;
	projects: { label: string; value: string }[];
	editHref: string;
}

// Same nested-island trap as the other task editors: `InteractiveCombobox` is
// imported straight from combobox-primitive, not the `Combobox` wrapper in
// components/ui (which would hydrate as its own separate island). No live
// backend either — see TaskEditableText for the same "local draft, link to
// the CMS to persist" constraint.
export default function TaskProjectEditor(props: TaskProjectEditorProps) {
	const [value, setValue] = useState(props.value);
	const [dirty, setDirty] = useState(false);

	return (
		<div class={css({ minWidth: "48" })}>
			<InteractiveCombobox
				items={props.projects}
				value={value}
				onValueChange={(next: string) => {
					setValue(next);
					if (next !== props.value) setDirty(true);
				}}
				placeholder="Search projects..."
				allowClear
				size="sm"
			/>

			{dirty && (
				<Text size="sm" class={css({ color: "fg.muted", mt: "1" })}>
					Edited locally — not saved.{" "}
					<Anchor href={props.editHref} target="_blank" variant="plain">
						Edit in the CMS
					</Anchor>{" "}
					to make it permanent.
				</Text>
			)}
		</div>
	);
}
