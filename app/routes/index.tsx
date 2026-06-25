import { createRoute } from "honox/factory";
import { css } from "@/../styled-system/css";
import { stack } from "@/../styled-system/patterns";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { LucideChevronDown } from "@/components/ui/icons";
import Counter from "@/islands/counter";
import { Dialog } from "@/islands/dialog";
import { Menu } from "@/islands/menu";
import { Tooltip } from "@/islands/tooltip";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div
			class={stack({
				py: "12",
				px: "6",
				maxW: "4xl",
				mx: "auto",
				gap: "10",
			})}
		>
			<header class={css({ textAlign: "center", mb: "4" })}>
				<h1 class={css({ fontSize: "4xl", fontWeight: "bold" })}>
					Hello, {name}!
				</h1>
				<p class={css({ color: "fg.muted", mt: "2" })}>
					Welcome to the Park UI Port for Hono/JSX.
				</p>
			</header>

			<section class={stack({ gap: "4" })}>
				<h2 class={css({ fontSize: "2xl", fontWeight: "semibold" })}>
					Buttons & Icons
				</h2>
				<div class={css({ display: "flex", gap: "3", flexWrap: "wrap" })}>
					<Button>Primary Button</Button>
					<Button variant="outline">Outline</Button>
					<Button variant="subtle">Subtle</Button>
					<Button variant="ghost">Ghost</Button>
					<IconButton variant="outline">
						<LucideChevronDown />
					</IconButton>
				</div>
			</section>

			<section class={stack({ gap: "4" })}>
				<h2 class={css({ fontSize: "2xl", fontWeight: "semibold" })}>
					Interactive Islands
				</h2>
				<div class={css({ display: "flex", gap: "6", alignItems: "center" })}>
					<Dialog
						trigger="Open Dialog"
						title="Park UI Dialog"
						description="This modal is built using HonoX Islands."
					>
						<p>Experience seamless interactivity without heavy dependencies.</p>
					</Dialog>

					<Menu
						trigger={<Button variant="outline">Actions</Button>}
						items={[
							{ label: "Edit Profile", onClick: () => console.log("Edit") },
							{
								label: "Account Settings",
								onClick: () => console.log("Settings"),
							},
							{ label: "Sign Out", onClick: () => console.log("Sign Out") },
						]}
					/>

					<Tooltip
						trigger={<Button variant="ghost">Hover for Tooltip</Button>}
						content="I'm a native Hono/JSX tooltip!"
					/>
				</div>
			</section>

			<section class={stack({ gap: "4" })}>
				<h2 class={css({ fontSize: "2xl", fontWeight: "semibold" })}>
					Existing Components
				</h2>
				<Counter />
			</section>
		</div>,
		{ title: `Hello ${name} - Park UI` },
	);
});
