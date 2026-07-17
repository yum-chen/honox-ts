import { css } from "design-system/css";
import { useEffect, useState } from "hono/jsx";
import { Badge } from "../components/ui/badge";
import { Button, IconButton } from "../components/ui/button";
import {
	Backdrop,
	Body,
	CloseTrigger,
	Content,
	Description,
	Footer,
	Header,
	InteractiveDrawer,
	Positioner,
	Title,
	Trigger,
} from "../components/ui/drawer-primitive";
import { PaginatedTable } from "../components/ui/paginated-table";

interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	draft: boolean;
	author?: string;
	readTime?: string;
	cover?: string;
}

const CloseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	>
		<title>Close</title>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);

export default function PostsDrawer() {
	const [open, setOpen] = useState(false);
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [loading, setLoading] = useState(true);

	const fetchPosts = async () => {
		setLoading(true);
		try {
			// Simulate network latency (1.5 seconds) to clearly show the skeleton state flashing
			await new Promise((resolve) => setTimeout(resolve, 1500));
			const res = await fetch("/api/posts/index.json");
			if (res.ok) {
				const json = await res.json();
				setPosts(json.posts || []);
			}
		} catch (error) {
			console.error("Failed to fetch posts:", error);
		} finally {
			setLoading(false);
		}
	};

	// Fetch posts when drawer is opened, reset state when drawer is closed
	useEffect(() => {
		if (open) {
			fetchPosts();
		} else {
			setPosts([]);
			setLoading(true);
		}
	}, [open]);

	const columns = [
		{
			header: "Title",
			key: "title",
			class: css({ fontWeight: "semibold", maxW: "64", whiteSpace: "normal" }),
		},
		{ header: "Author", key: "author" },
		{ header: "Date", key: "date" },
		{
			header: "Tags",
			key: "tags",
			render: (row: BlogPost) => (
				<div class={css({ display: "flex", gap: "1", flexWrap: "wrap" })}>
					{(row.tags || []).map((tag) => (
						<Badge key={tag} size="sm" variant="outline" colorPalette="blue">
							{tag}
						</Badge>
					))}
				</div>
			),
		},
	];

	return (
		<InteractiveDrawer open={open} onOpenChange={setOpen}>
			<Trigger asChild>
				<Button variant="outline" interactive>
					Open Posts Drawer
				</Button>
			</Trigger>
			<Backdrop />
			<Positioner>
				<Content>
					<CloseTrigger asChild>
						<IconButton variant="plain" size="sm" aria-label="Close">
							<CloseIcon />
						</IconButton>
					</CloseTrigger>
					<Header>
						<Title>All Blog Posts</Title>
						<Description>
							View and paginate through all published blog posts
						</Description>
					</Header>
					<Body class={css({ flex: "1", overflowY: "auto" })}>
						<PaginatedTable
							columns={columns}
							data={posts}
							loading={loading}
							pageSize={5}
						/>
					</Body>
					<Footer>
						<CloseTrigger asChild unstyled>
							<Button variant="outline">Dismiss</Button>
						</CloseTrigger>
						<Button
							colorPalette="blue"
							onClick={fetchPosts}
							loading={loading}
							interactive
						>
							Reload
						</Button>
					</Footer>
				</Content>
			</Positioner>
		</InteractiveDrawer>
	);
}
