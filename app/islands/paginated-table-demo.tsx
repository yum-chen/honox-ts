import { useState } from "hono/jsx";
import { css } from "styled-system/css";
import { Badge, Pagination, Table } from "../components/ui";

interface UserItem {
	id: string;
	name: string;
	email: string;
	role: string;
	status: string;
}

const mockData: UserItem[] = [
	{
		id: "USR-001",
		name: "Alice Johnson",
		email: "alice@example.com",
		role: "Administrator",
		status: "Active",
	},
	{
		id: "USR-002",
		name: "Bob Smith",
		email: "bob@example.com",
		role: "Software Engineer",
		status: "Active",
	},
	{
		id: "USR-003",
		name: "Charlie Brown",
		email: "charlie@example.com",
		role: "Product Manager",
		status: "Inactive",
	},
	{
		id: "USR-004",
		name: "Diana Prince",
		email: "diana@example.com",
		role: "Designer",
		status: "Active",
	},
	{
		id: "USR-005",
		name: "Evan Wright",
		email: "evan@example.com",
		role: "QA Engineer",
		status: "Active",
	},
	{
		id: "USR-006",
		name: "Fiona Gallagher",
		email: "fiona@example.com",
		role: "Support Specialist",
		status: "Inactive",
	},
	{
		id: "USR-007",
		name: "George Costanza",
		email: "george@example.com",
		role: "Architect",
		status: "Active",
	},
	{
		id: "USR-008",
		name: "Hannah Abbott",
		email: "hannah@example.com",
		role: "Software Engineer",
		status: "Active",
	},
	{
		id: "USR-009",
		name: "Ian Malcolm",
		email: "ian@example.com",
		role: "Data Scientist",
		status: "Inactive",
	},
	{
		id: "USR-010",
		name: "Julia Roberts",
		email: "julia@example.com",
		role: "Marketing Lead",
		status: "Active",
	},
	{
		id: "USR-011",
		name: "Kevin Bacon",
		email: "kevin@example.com",
		role: "Security Engineer",
		status: "Active",
	},
	{
		id: "USR-012",
		name: "Laura Croft",
		email: "laura@example.com",
		role: "Explorer",
		status: "Active",
	},
	{
		id: "USR-013",
		name: "Michael Scott",
		email: "michael@example.com",
		role: "Regional Manager",
		status: "Inactive",
	},
	{
		id: "USR-014",
		name: "Nancy Drew",
		email: "nancy@example.com",
		role: "Detective",
		status: "Active",
	},
	{
		id: "USR-015",
		name: "Oliver Twist",
		email: "oliver@example.com",
		role: "Intern",
		status: "Inactive",
	},
	{
		id: "USR-016",
		name: "Penelope Cruz",
		email: "penelope@example.com",
		role: "UX Researcher",
		status: "Active",
	},
	{
		id: "USR-017",
		name: "Quentin Tarantino",
		email: "quentin@example.com",
		role: "Director",
		status: "Active",
	},
	{
		id: "USR-018",
		name: "Rachel Green",
		email: "rachel@example.com",
		role: "HR Representative",
		status: "Active",
	},
	{
		id: "USR-019",
		name: "Samwise Gamgee",
		email: "sam@example.com",
		role: "Gardener",
		status: "Active",
	},
	{
		id: "USR-020",
		name: "Thomas Anderson",
		email: "neo@example.com",
		role: "Security Analyst",
		status: "Inactive",
	},
	{
		id: "USR-021",
		name: "Ursula Buffay",
		email: "ursula@example.com",
		role: "Masseuse",
		status: "Inactive",
	},
	{
		id: "USR-022",
		name: "Victor Frankenstein",
		email: "victor@example.com",
		role: "Bioengineer",
		status: "Active",
	},
	{
		id: "USR-023",
		name: "Wendy Darling",
		email: "wendy@example.com",
		role: "Storyteller",
		status: "Active",
	},
	{
		id: "USR-024",
		name: "Xavier Charles",
		email: "xavier@example.com",
		role: "Professor",
		status: "Active",
	},
	{
		id: "USR-025",
		name: "Yosemite Sam",
		email: "sam.y@example.com",
		role: "Safety Inspector",
		status: "Inactive",
	},
];

const columns = [
	{ header: "ID", key: "id" },
	{ header: "Name", key: "name" },
	{ header: "Email", key: "email" },
	{ header: "Role", key: "role" },
	{
		header: "Status",
		key: "status",
		render: (row: UserItem) => (
			<Badge
				variant="subtle"
				colorPalette={row.status === "Active" ? "green" : "gray"}
			>
				{row.status}
			</Badge>
		),
	},
];

function PaginatedTableDemo() {
	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 5;

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const currentData = mockData.slice(startIndex, endIndex);

	return (
		<div
			id="paginated-table-demo"
			class={css({
				width: "full",
				display: "flex",
				flexDirection: "column",
				gap: "4",
				alignItems: "center",
			})}
		>
			<Table variant="surface" columns={columns} rows={currentData} />
			<Pagination
				interactive={false}
				count={mockData.length}
				pageSize={pageSize}
				page={currentPage}
				onPageChange={(details) => setCurrentPage(details.page)}
			/>
		</div>
	);
}

export default PaginatedTableDemo;
export type { UserItem };
