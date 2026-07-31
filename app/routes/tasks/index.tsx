import { css } from "design-system/css";
import { createRoute } from "honox/factory";
import { PageRenderer } from "../../components/page-renderer";
import { Grid, Search } from "../../components/ui";
import { Toaster } from "../../components/ui/toast";
import AuthStatus from "../../islands/auth-status";
import PmsCreateMenu from "../../islands/pms-create-menu";
import TaskAssigneeFilter from "../../islands/task-assignee-filter";
import TaskPriorityFilter from "../../islands/task-priority-filter";
import TaskProjectFilter from "../../islands/task-project-filter";
import TaskStatusFilter from "../../islands/task-status-filter";
import { loadPage } from "../../lib/pages";
import { listProjects } from "../../lib/projects";
import { listTasks } from "../../lib/tasks";

export default createRoute(async (c) => {
	const [tasks, projects, data] = await Promise.all([
		listTasks(),
		listProjects(),
		loadPage("tasks", "en", { currentUrl: c.req.url }).then(
			(page) => page ?? { content: [] },
		),
	]);
	const projectItems = projects.map((project) => ({
		label: project.title,
		value: project.slug,
	}));
	const taskItems = tasks.map((task) => ({
		label: task.title,
		value: task.slug,
	}));
	const assignees = [...new Set(tasks.map((task) => task.assignee).filter((assignee): assignee is string => !!assignee))].sort();
	const projectTitleBySlug = new Map(projects.map((project) => [project.slug, project.title]));
	const taskProjectSlugs = [...new Set(tasks.map((task) => task.project).filter((slug): slug is string => !!slug))];
	const taskProjectItems = taskProjectSlugs
		.map((slug) => ({ label: projectTitleBySlug.get(slug) ?? slug, value: slug }))
		.sort((a, b) => a.label.localeCompare(b.label));
	const searchQuery = new URL(c.req.url).searchParams.get("q") || "";

	const originalContent = data.content ?? [];

	// Identify and splice out static CMS rows for Project, Assignee, Status, and Priority
	// to ensure none of their fallback badges render in the page body, since Status/Priority
	// are moved to the header and Project/Assignee are rendered as dynamic Grid filters.
	const allFilterRowLabels = ["Project", "Assignee", "Status", "Priority"];
	const foundBlocks = allFilterRowLabels
		.map((label) => ({
			label,
			index: originalContent.findIndex(
				(block) =>
					block.blockType === "stack" &&
					block.children?.some(
						(child) => child.blockType === "text" && child.content === label,
					),
			),
		}))
		.filter((b) => b.index !== -1)
		.sort((a, b) => a.index - b.index);

	const contentParts: (typeof originalContent)[] = [];
	let sliceStart = 0;
	for (const block of foundBlocks) {
		contentParts.push(originalContent.slice(sliceStart, block.index));
		sliceStart = block.index + 1;
	}
	contentParts.push(originalContent.slice(sliceStart));

	const activeFilters = [
		{
			label: "Project",
			render: () => <TaskProjectFilter projects={taskProjectItems} />,
		},
		{
			label: "Assignee",
			render: () => <TaskAssigneeFilter assignees={assignees} />,
		},
	];

	const activeFilterRows = activeFilters
		.map((filter) => {
			const block = foundBlocks.find((b) => b.label === filter.label);
			return {
				...filter,
				index: block ? block.index : -1,
			};
		})
		.filter((row) => row.index !== -1)
		.sort((a, b) => a.index - b.index);

	return c.render(
		<>
			<title>{data.title ?? "Tasks - Artefact"}</title>
			<Toaster />
			<style
				dangerouslySetInnerHTML={{
					__html: `
						tr[data-assignee-hidden="true"],
						tr[data-status-hidden="true"],
						tr[data-priority-hidden="true"],
						tr[data-project-hidden="true"] {
							display: none !important;
						}
					`,
				}}
			/>

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
					<PageRenderer content={data.headerBrand ?? []} />

					{tasks.length > 0 && (
						<div
							class={css({
								flex: "1",
								maxWidth: "md",
								minWidth: "160px",
								display: "flex",
								gap: "2",
							})}
						>
							<div class={css({ flex: "1" })}>
								<Search
									size="sm"
									src="/api/tasks/search.json"
									action="/tasks"
									initialQuery={searchQuery}
									placeholder="Search tasks..."
									itemLabel="tasks"
									total={tasks.length}
									filterAttribute="data-task-slug"
									emptyStateId="tasks-search-empty"
									showCount={false}
								/>
							</div>
							<div class={css({ flexShrink: 0 })}>
								<TaskStatusFilter />
							</div>
							<div class={css({ flexShrink: 0 })}>
								<TaskPriorityFilter />
							</div>
						</div>
					)}

					<nav class={css({ display: "flex", gap: "6", alignItems: "center" })}>
						<PageRenderer content={data.headerNav ?? []} />
						<PmsCreateMenu projects={projectItems} tasks={taskItems} />
						<PageRenderer content={data.headerActions ?? []} />
						<AuthStatus />
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
				<PageRenderer content={contentParts[0]} />

				{activeFilterRows.length > 0 && (
					<Grid
						columns={{ base: 1, md: 2 }}
						gap="6"
						class={css({
							marginTop: "1.5rem",
							marginBottom: "2rem",
						})}
					>
						{activeFilterRows.map((row) => (
							<div
								key={row.label}
								class={css({
									display: "flex",
									flexDirection: "column",
									gap: "2",
									alignItems: "flex-start",
								})}
							>
								<span
									class={css({
										fontSize: "xs",
										fontWeight: "600",
										textTransform: "uppercase",
										letterSpacing: "0.05em",
										color: "#71717a",
									})}
								>
									{row.label}
								</span>
								{row.render()}
							</div>
						))}
					</Grid>
				)}

				{contentParts.slice(1).map((part) => (
					<PageRenderer content={part} />
				))}
			</div>
		</>,
	);
});
