import { css } from "design-system/css";
import { useState } from "hono/jsx";
import { IconButton } from "../components/ui/button";
import { Dropdown } from "../components/ui/dropdown";
import { EllipsisIcon } from "../icons/ellipsis";
import { useGitToken } from "./git-token-banner";
import ProjectCloneDialog from "./project-clone-dialog";

export interface ProjectActionsMenuProps {
	slug: string;
	title: string;
	editHref: string;
}

export default function ProjectActionsMenu(props: ProjectActionsMenuProps) {
	const { slug, title, editHref } = props;
	const { token } = useGitToken();
	const [cloneOpen, setCloneOpen] = useState(false);

	if (!token) return null;

	return (
		<>
			<Dropdown
				trigger={
					<IconButton variant="outline" size="sm" aria-label="More actions">
						<EllipsisIcon width="16" height="16" />
					</IconButton>
				}
				placement="bottomRight"
				contentClass={css({ minWidth: "48", whiteSpace: "nowrap" })}
				items={[
					{ type: "item", label: "Edit", value: "edit", href: editHref },
					{ type: "item", label: "Clone", value: "clone" },
				]}
				onSelect={(value) => {
					if (value === "clone") setCloneOpen(true);
				}}
			/>
			<ProjectCloneDialog
				project={{ slug, title }}
				open={cloneOpen}
				onOpenChange={setCloneOpen}
			/>
		</>
	);
}
