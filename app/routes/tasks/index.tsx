import { css, cx } from "design-system/css";
import { button } from "design-system/recipes";
import { createRoute } from "honox/factory";
import {
	Anchor,
	Avatar,
	Badge,
	Heading,
	Search,
	Stack,
	Table,
	Text,
} from "../../components/ui";
import { type Project, listProjects } from "../../lib/projects";
import {
	buildTaskSearchEntries,
	TASK_PRIORITY_COLOR,
	TASK_STATUS_COLOR,
	type Task,
	listTasks,
} from "../../lib/tasks";
import { filterEntries } from "../../utils/search";

function formatDate(value?: string) {
	if (!value) return undefined;
	return new Date(value).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

export default createRoute(async (c) => {
	const [tasks, projects] = await Promise.all([listTasks(), listProjects()]);
	const projectBySlug = new Map<string, Project>(
		projects.map((project) => [project.slug, project]),
	);
	const projectTitleBySlug = new Map(
		projects.map((project) => [project.slug, project.title]),
	);

	// Server-side filtering for the no-JS ?q= fallback, mirroring the blog
	// listing page: all rows still render (non-matches hidden) so the Search
	// island can broaden results client-side without a round-trip.
	const searchQuery = new URL(c.req.url).searchParams.get("q") || "";
	const searchEntries = buildTaskSearchEntries(tasks, projectTitleBySlug);
	const matchedSlugs = new Set(
		filterEntries(searchEntries, searchQuery).map((entry) => entry.key),
	);

	return c.render(
		<>
			<title>Tasks - Artefact</title>

			<header
				class={css({
					borderBottomWidth: "1px",
					borderColor: { _light: "white.a4", _dark: "black.a4" },
					bg: { _light: "white.a7", _dark: "black.a7" },
					backdropFilter: "blur(20px) saturate(180%)",
					position: "sticky",
					top: "0",
					zIndex: "10",
				})}
			>
				<div
					class={css({
						maxWidth: "7xl",
						mx: "auto",
						px: { base: "4", md: "6", lg: "8" },
						py: "4",
						display: "flex",
						flexWrap: "wrap",
						rowGap: "3",
						alignItems: "center",
						justifyContent: "space-between",
						gap: "4",
					})}
				>
					<Anchor
						href="/"
						variant="plain"
						class={css({ textDecoration: "none", flexShrink: "0" })}
					>
						<Heading
							as="span"
							class={css({
								fontSize: "lg",
								fontWeight: "bold",
								tracking: "tight",
							})}
						>
							Artefact UI
						</Heading>
					</Anchor>

					<nav class={css({ display: "flex", gap: "6", alignItems: "center" })}>
						<Anchor
							href="/projects"
							variant="plain"
							class={css({
								textStyle: "sm",
								fontWeight: "medium",
								color: "fg.muted",
								textDecoration: "none",
								_hover: { color: "fg" },
							})}
						>
							Projects
						</Anchor>
						<Anchor
							href="/tasks"
							variant="plain"
							class={css({
								textStyle: "sm",
								fontWeight: "semibold",
								color: "fg",
								textDecoration: "none",
							})}
						>
							Tasks
						</Anchor>
						<Anchor
							href="/admin"
							class={cx(
								button({ variant: "outline", size: "sm" }),
								css({ textStyle: "sm", fontWeight: "medium" }),
							)}
						>
							Admin
						</Anchor>
					</nav>
				</div>
			</header>

			<div
				class={css({
					py: { base: "8", md: "12" },
					px: { base: "4", md: "6", lg: "8" },
					maxWidth: "7xl",
					mx: "auto",
				})}
			>
				<Heading as="h1" size="3xl" class={css({ mb: "2" })}>
					Tasks
				</Heading>
				<Text class={css({ color: "fg.muted", mb: "8" })}>
					Every task across every project, soonest due date first.
				</Text>

				{tasks.length > 0 && (
					<div class={css({ mb: "6", maxWidth: "sm" })}>
						<Search
							src="/api/tasks/search.json"
							action="/tasks"
							initialQuery={searchQuery}
							placeholder="Search tasks..."
							itemLabel="tasks"
							total={tasks.length}
							filterAttribute="data-task-slug"
							emptyStateId="tasks-search-empty"
						/>
					</div>
				)}

				{tasks.length === 0 ? (
					<Text class={css({ color: "fg.muted" })}>No tasks yet.</Text>
				) : (
					<>
						{/* Empty state — visibility toggled by the Search island */}
						<div
							id="tasks-search-empty"
							hidden={matchedSlugs.size !== 0}
							class={css({ textAlign: "center", py: "16", px: "4" })}
						>
							<Text class={css({ color: "fg.muted" })}>
								No tasks match your search.
							</Text>
						</div>
						<Table
							getRowProps={(task: Task) => ({
								id: `task-${task.slug}`,
								"data-task-slug": task.slug,
								hidden: !matchedSlugs.has(task.slug),
							})}
							variant="surface"
							striped
							columns={[
								{
									header: "Task",
									key: "title",
									render: (task: Task) => (
										<Anchor href={`/tasks/${task.slug}`} variant="plain">
											{task.title}
										</Anchor>
									),
								},
								{
									header: "Project",
									key: "project",
									render: (task: Task) => {
										const project = projectBySlug.get(task.project);
										return project ? (
											<Anchor
												href={`/projects/${project.slug}`}
												variant="plain"
											>
												{project.title}
											</Anchor>
										) : (
											<Text size="sm" class={css({ color: "fg.muted" })}>
												—
											</Text>
										);
									},
								},
								{
									header: "Status",
									key: "status",
									render: (task: Task) => (
										<Badge
											variant="subtle"
											size="sm"
											colorPalette={TASK_STATUS_COLOR[task.status]}
										>
											{task.status}
										</Badge>
									),
								},
								{
									header: "Priority",
									key: "priority",
									render: (task: Task) => (
										<Badge
											variant="subtle"
											size="sm"
											colorPalette={TASK_PRIORITY_COLOR[task.priority]}
										>
											{task.priority}
										</Badge>
									),
								},
								{
									header: "Assignee",
									key: "assignee",
									render: (task: Task) =>
										task.assignee ? (
											<Stack gap="2" align="center">
												<Avatar size="xs" name={task.assignee} />
												<Text size="sm">{task.assignee}</Text>
											</Stack>
										) : (
											<Text size="sm" class={css({ color: "fg.muted" })}>
												—
											</Text>
										),
								},
								{
									header: "Due",
									key: "dueDate",
									render: (task: Task) => (
										<Text size="sm" class={css({ color: "fg.muted" })}>
											{formatDate(task.dueDate) ?? "—"}
										</Text>
									),
								},
							]}
							rows={tasks}
						/>
					</>
				)}
			</div>
		</>,
	);
});
