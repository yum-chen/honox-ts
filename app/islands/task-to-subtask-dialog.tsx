import { css, cx } from "design-system/css";
import { button } from "design-system/recipes";
import { useEffect, useState } from "hono/jsx";
import { Dialog } from "../components/ui/dialog";
import { InteractiveCombobox } from "../components/ui/combobox-primitive";
import { Stack } from "../components/ui/stack";
import { Text } from "../components/ui/text";
import { toaster } from "../components/ui/toast";
import { saveTaskField, TaskSaveError } from "../utils/task-save";

export interface TaskToSubtaskDialogProps {
	task: { slug: string; title: string } | null;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	tasks?: { label: string; value: string }[];
}

export default function TaskToSubtaskDialog({
	task,
	open,
	onOpenChange,
	tasks = [],
}: TaskToSubtaskDialogProps) {
	const [parentTaskSlug, setParentTaskSlug] = useState("");
	const [converting, setConverting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Filter out the current task itself from candidate parent tasks
	const filteredTasks = task
		? tasks.filter((t) => t.value !== task.slug)
		: tasks;

	useEffect(() => {
		if (open) {
			setParentTaskSlug("");
			setError(null);
		}
	}, [open]);

	const close = () => {
		if (converting) return;
		onOpenChange(false);
		setError(null);
	};

	const handleConvert = async () => {
		if (!task) return;
		const trimmedParentSlug = parentTaskSlug.trim();
		if (!trimmedParentSlug) {
			setError("Select a parent task.");
			return;
		}
		setConverting(true);
		setError(null);
		try {
			await saveTaskField(task.slug, (data) => ({
				data: { ...data, parentTask: trimmedParentSlug },
			}));
			toaster.success(`Converted "${task.title}" to a subtask.`, {
				description: "Committed to main — live once the site rebuilds.",
			});
			onOpenChange(false);
			// Reload the page to reflect the new parent task details
			window.location.reload();
		} catch (err) {
			setError(
				err instanceof TaskSaveError || err instanceof Error
					? err.message
					: "Failed to convert the task.",
			);
		} finally {
			setConverting(false);
		}
	};

	return (
		<Dialog
			open={open}
			onOpenChange={(next: boolean) => {
				if (!next) close();
			}}
			title={task ? `Convert "${task.title}" to Subtask` : "Convert to Subtask"}
			description="Converts this task into a subtask of a parent task."
			body={
				<Stack
					direction="column"
					gap="4"
					class={css({ alignItems: "stretch", width: "full", minHeight: "48" })}
				>
					<div>
						<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
							Parent Task
						</Text>
						<InteractiveCombobox
							items={filteredTasks}
							value={parentTaskSlug}
							onValueChange={setParentTaskSlug}
							placeholder="Search parent task..."
							allowClear
							size="sm"
						/>
					</div>

					{error && (
						<Text size="sm" class={css({ color: "fg.error" })}>
							{error}
						</Text>
					)}
				</Stack>
			}
			cancel={
				<button
					type="button"
					disabled={converting}
					class={cx(button({ variant: "outline", size: "sm" }))}
				>
					Cancel
				</button>
			}
			confirm={
				<button
					type="button"
					onClick={() => void handleConvert()}
					disabled={converting || !parentTaskSlug}
					class={cx(button({ variant: "solid", size: "sm" }))}
				>
					{converting ? "Converting..." : "Convert"}
				</button>
			}
		/>
	);
}
