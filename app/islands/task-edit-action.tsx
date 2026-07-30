// biome-ignore lint/style/useExportsLast: allow exporting props interface alongside component
import { css, cx } from "design-system/css";
import { button } from "design-system/recipes";
import { useEffect, useState } from "hono/jsx";
import { Anchor } from "../components/ui/anchor";
import { InteractiveCombobox } from "../components/ui/combobox-primitive";
import { Drawer } from "../components/ui/drawer";
import { Field } from "../components/ui/field";
import { Stack } from "../components/ui/stack";
import { Text } from "../components/ui/text";
import { Textarea } from "../components/ui/textarea";
import { toaster } from "../components/ui/toast";
import type { Project } from "../lib/projects";
import {
	descendantsOf,
	TASK_PRIORITIES,
	TASK_STATUSES,
	type Task,
} from "../lib/tasks";
import { fetchFile, resolveToken } from "../utils/git-backend";
import { parseFrontmatter } from "../utils/markdown";
import { saveTaskField, TaskSaveError } from "../utils/task-save";

const statusItems = TASK_STATUSES.map((status) => ({
	label: status,
	value: status,
}));
const priorityItems = TASK_PRIORITIES.map((priority) => ({
	label: priority,
	value: priority,
}));

export interface TaskEditDrawerProps {
	task: Task | null;
	projects: { label: string; value: string }[];
	tasks: Task[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

function TaskEditDrawer(props: TaskEditDrawerProps) {
	const { task, projects, tasks } = props;
	const [form, setForm] = useState({
		title: "",
		project: "",
		parentTask: "",
		status: "To Do",
		priority: "Medium",
		assignee: "",
		dueDate: "",
		tags: "",
		body: "",
	});
	const [fetching, setFetching] = useState(false);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (task) {
			setForm({
				title: task.title,
				project: task.project,
				parentTask: task.parentTask ?? "",
				status: task.status,
				priority: task.priority,
				assignee: task.assignee ?? "",
				dueDate: task.dueDate ?? "",
				tags: task.tags.join(", "),
				body: "",
			});
			setError(null);

			const token = resolveToken().token;
			if (token) {
				setFetching(true);
				fetchFile(`content/tasks/${task.slug}.md`, token)
					.then((file) => {
						const { content } = parseFrontmatter(file.content);
						setForm((f) => ({ ...f, body: content }));
					})
					.catch((err) => {
						console.error("Failed to fetch task body:", err);
					})
					.finally(() => {
						setFetching(false);
					});
			}
		}
	}, [task]);

	const handleSave = async () => {
		if (!task) return;
		if (!form.title.trim() || !form.project) return;
		setSaving(true);
		setError(null);
		try {
			await saveTaskField(task.slug, (data) => {
				const updatedData = {
					...data,
					title: form.title.trim(),
					project: form.project,
					status: form.status,
					priority: form.priority,
					parentTask: form.parentTask || undefined,
					assignee: form.assignee.trim() || undefined,
					dueDate: form.dueDate || undefined,
					tags: form.tags
						.split(",")
						.map((tag) => tag.trim())
						.filter(Boolean),
				};
				return {
					data: updatedData,
					content: form.body.trim(),
				};
			});
			toaster.success(`Saved "${form.title.trim()}".`, {
				description: "Committed to main — live once the site rebuilds.",
			});
			props.onOpenChange(false);
			window.location.reload();
		} catch (err) {
			setError(
				err instanceof TaskSaveError || err instanceof Error
					? err.message
					: "Failed to save the task.",
			);
		} finally {
			setSaving(false);
		}
	};

	const descendants = task ? descendantsOf(tasks, task.slug) : [];
	const forbiddenSlugs = new Set([
		...(task ? [task.slug] : []),
		...descendants.map((d) => d.slug),
	]);

	const candidateTasks = tasks
		.filter((t) => !forbiddenSlugs.has(t.slug))
		.map((t) => ({
			label: t.title,
			value: t.slug,
		}));

	const canSave = form.title.trim().length > 0 && form.project.length > 0;

	return (
		<Drawer
			open={props.open}
			onOpenChange={(next: boolean) => {
				if (!next && saving) return;
				props.onOpenChange(next);
			}}
			closeOnEscape={false}
			closeOnInteractOutside={false}
			title="Edit Task"
			description="Saves changes to the task file and commits to main."
			footer={
				<Stack gap="3" justify="end" class={css({ width: "full" })}>
					<button
						type="button"
						onClick={() => props.onOpenChange(false)}
						disabled={saving}
						class={cx(button({ variant: "outline", size: "sm" }))}
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={() => void handleSave()}
						disabled={!canSave || saving}
						class={cx(button({ variant: "solid", size: "sm" }))}
					>
						{saving ? "Saving..." : "Save changes"}
					</button>
				</Stack>
			}
			body={
				<Stack
					direction="column"
					gap="4"
					class={css({ alignItems: "stretch", width: "full" })}
				>
					<Field
						label="Title"
						value={form.title}
						onValueChange={(value: string) =>
							setForm((f) => ({ ...f, title: value }))
						}
						required
					/>

					<div>
						<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
							Project
						</Text>
						<InteractiveCombobox
							items={projects}
							value={form.project}
							onValueChange={(value: string) =>
								setForm((f) => ({ ...f, project: value }))
							}
							placeholder="Search projects..."
							allowClear
							size="sm"
						/>
					</div>

					{candidateTasks.length > 0 && (
						<div>
							<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
								Parent task
							</Text>
							<InteractiveCombobox
								items={candidateTasks}
								value={form.parentTask}
								onValueChange={(value: string) =>
									setForm((f) => ({ ...f, parentTask: value }))
								}
								placeholder="None — top-level task"
								allowClear
								size="sm"
							/>
						</div>
					)}

					<Stack gap="4" wrap="wrap" class={css({ alignItems: "stretch" })}>
						<div class={css({ flex: "1", minWidth: "36" })}>
							<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
								Status
							</Text>
							<InteractiveCombobox
								items={statusItems}
								value={form.status}
								onValueChange={(value: string) =>
									setForm((f) => ({ ...f, status: value }))
								}
								size="sm"
							/>
						</div>
						<div class={css({ flex: "1", minWidth: "36" })}>
							<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
								Priority
							</Text>
							<InteractiveCombobox
								items={priorityItems}
								value={form.priority}
								onValueChange={(value: string) =>
									setForm((f) => ({ ...f, priority: value }))
								}
								size="sm"
							/>
						</div>
					</Stack>

					<Stack gap="4" wrap="wrap" class={css({ alignItems: "stretch" })}>
						<div class={css({ flex: "1", minWidth: "36" })}>
							<Field
								label="Assignee"
								value={form.assignee}
								onValueChange={(value: string) =>
									setForm((f) => ({ ...f, assignee: value }))
								}
							/>
						</div>
						<div class={css({ flex: "1", minWidth: "36" })}>
							<Text size="sm" class={css({ fontWeight: "medium", mb: "1.5" })}>
								Due date
							</Text>
							<input
								type="date"
								value={form.dueDate}
								onInput={(e: Event) =>
									setForm((f) => ({
										...f,
										dueDate: (e.target as HTMLInputElement).value,
									}))
								}
								class={css({
									width: "full",
									borderWidth: "1px",
									borderColor: "border",
									borderRadius: "sm",
									px: "2.5",
									py: "1.5",
									fontSize: "sm",
									bg: "bg",
									color: "fg",
								})}
							/>
						</div>
					</Stack>

					<Field
						label="Tags"
						helperText="Comma-separated"
						value={form.tags}
						onValueChange={(value: string) =>
							setForm((f) => ({ ...f, tags: value }))
						}
					/>

					<Textarea
						label="Description"
						rows={4}
						placeholder={fetching ? "Loading description..." : ""}
						value={form.body}
						onValueChange={(value: string) =>
							setForm((f) => ({ ...f, body: value }))
						}
						disabled={fetching}
					/>

					{error && (
						<Text size="sm" class={css({ color: "fg.error" })}>
							{error}{" "}
							{task && (
								<Anchor
									href={`/admin/#/collections/tasks/entries/${task.slug}`}
									target="_blank"
									variant="plain"
								>
									Edit in the CMS
								</Anchor>
							)}{" "}
							instead.
						</Text>
					)}
				</Stack>
			}
		/>
	);
}

export interface TaskEditActionProps {
	tasks: Task[];
	projectBySlug?: Record<string, Project>;
}

export default function TaskEditAction({
	tasks,
	projectBySlug = {},
}: TaskEditActionProps) {
	const [task, setTask] = useState<Task | null>(null);

	useEffect(() => {
		const bySlug = new Map(tasks.map((t) => [t.slug, t]));
		const onClick = (event: MouseEvent) => {
			const trigger = (event.target as HTMLElement)?.closest?.(
				"[data-task-edit-trigger]",
			);
			if (!trigger) return;
			const slug = trigger.getAttribute("data-task-slug");
			const found = slug ? bySlug.get(slug) : undefined;
			if (found) setTask(found);
		};
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, [tasks]);

	const projectsList = Object.values(projectBySlug).map((p) => ({
		label: p.title,
		value: p.slug,
	}));

	return (
		<TaskEditDrawer
			task={task}
			projects={projectsList}
			tasks={tasks}
			open={task != null}
			onOpenChange={(next) => {
				if (!next) setTask(null);
			}}
		/>
	);
}
