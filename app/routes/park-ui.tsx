import { createRoute } from "honox/factory";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { IconButton } from "../components/ui/icon-button";
import { LucideChevronDown } from "../components/ui/icons";
import { Accordion } from "../islands/accordion";
import { Dialog } from "../islands/dialog";
import { Drawer } from "../islands/drawer";
import { Menu } from "../islands/menu";
import { Popover } from "../islands/popover";
import { ToastDemo } from "../islands/toast";
import { Tooltip } from "../islands/tooltip";

export default createRoute((c) => {
	return c.render(
		<div
			style={{
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
			}}
		>
			<section>
				<h2>Badges</h2>
				<div style={{ display: "flex", gap: "1rem" }}>
					<Badge>Default</Badge>
					<Badge variant="solid">Solid</Badge>
					<Badge variant="outline">Outline</Badge>
				</div>
			</section>

			<section>
				<h2>Accordion</h2>
				<Accordion
					items={[
						{ value: "1", trigger: "Section 1", content: "Content 1" },
						{ value: "2", trigger: "Section 2", content: "Content 2" },
					]}
				/>
			</section>

			<section>
				<h2>Buttons</h2>
				<div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
					<Button>Default</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="subtle">Subtle</Button>
					<Button variant="ghost">Ghost</Button>
					<Button size="xs">Extra Small</Button>
					<Button size="2xl">2XL Button</Button>
				</div>
			</section>

			<section>
				<h2>Drawer</h2>
				<Drawer
					trigger={<Button>Open Drawer</Button>}
					title="Drawer Title"
					description="Drawer description"
				>
					<p>Drawer content goes here.</p>
				</Drawer>
			</section>

			<section>
				<h2>Popover</h2>
				<Popover
					trigger={<Button variant="outline">Open Popover</Button>}
					title="Popover Title"
				>
					<p>Popover content.</p>
				</Popover>
			</section>

			<section>
				<h2>Toast</h2>
				<ToastDemo />
			</section>

			<section>
				<h2>Dialog (Island)</h2>
				<Dialog
					trigger="Open Dialog"
					title="Welcome to Park UI"
					description="This is a ported dialog component."
				>
					<p>This content is inside the dialog.</p>
					<Button onClick={() => alert("Action!")}>Action</Button>
				</Dialog>
			</section>

			<section>
				<h2>Menu (Island)</h2>
				<Menu
					trigger={<Button variant="outline">Open Menu</Button>}
					items={[
						{ label: "Profile", onClick: () => console.log("Profile") },
						{ label: "Settings", onClick: () => console.log("Settings") },
						{ label: "Logout", onClick: () => console.log("Logout") },
					]}
				/>
			</section>

			<section>
				<h2>Tooltip (Island)</h2>
				<Tooltip
					trigger={<Button>Hover me</Button>}
					content="I am a tooltip!"
				/>
			</section>
		</div>,
		{ title: "Park UI Port" },
	);
});
