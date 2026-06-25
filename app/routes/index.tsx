import { createRoute } from "honox/factory";
import type { Child } from "hono/jsx";
import { css } from "../../styled-system/css";
import { container, hstack, stack, wrap } from "../../styled-system/patterns";
import { Button, IconButton, MenuItem, MenuSeparator } from "../components/ui";
import { MenuItemGroup, MenuItemGroupLabel } from "../components/ui/menu";
import {
	ChevronDownIcon,
	HeartIcon,
	LogOutIcon,
	PlusIcon,
	SearchIcon,
	SettingsIcon,
	TrashIcon,
	UserIcon,
} from "../components/icons";
import Dialog from "../islands/dialog";
import Menu from "../islands/menu";
import ThemeToggle from "../islands/theme-toggle";
import Tooltip from "../islands/tooltip";

const variants = ["solid", "outline", "subtle", "ghost", "link"] as const;

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl"] as const;

const Section = ({ title, children }: { title: string; children: Child }) => (
	<section class={stack({ gap: "4" })}>
		<h2 class={css({ textStyle: "xl", fontWeight: "semibold" })}>{title}</h2>
		{children}
	</section>
);

export default createRoute((c) => {
	return c.render(
		<main class={container({ maxW: "3xl", py: "12" })}>
			<title>Park UI · Hono/JSX</title>
			<div
				class={hstack({ justify: "space-between", alignItems: "flex-start", mb: "10" })}
			>
				<div class={stack({ gap: "1" })}>
					<h1 class={css({ textStyle: "4xl", fontWeight: "bold" })}>
						Park UI for Hono/JSX
					</h1>
					<p class={css({ color: "fg.muted", textStyle: "md" })}>
						Park UI's design system ported to native Hono/JSX — no React, no
						SolidJS.
					</p>
				</div>
				<ThemeToggle />
			</div>

			<div class={stack({ gap: "12" })}>
				<Section title="Button variants">
					<div class={wrap({ gap: "3", alignItems: "center" })}>
						{variants.map((variant) => (
							<Button key={variant} variant={variant}>
								{variant}
							</Button>
						))}
					</div>
				</Section>

				<Section title="Button sizes">
					<div class={wrap({ gap: "3", alignItems: "center" })}>
						{sizes.map((size) => (
							<Button key={size} size={size}>
								Button
							</Button>
						))}
					</div>
				</Section>

				<Section title="Buttons with icons">
					<div class={wrap({ gap: "3", alignItems: "center" })}>
						<Button>
							<PlusIcon /> New item
						</Button>
						<Button variant="outline">
							<SearchIcon /> Search
						</Button>
						<Button variant="subtle">
							Continue <ChevronDownIcon />
						</Button>
						<Button variant="ghost" disabled>
							<HeartIcon /> Disabled
						</Button>
					</div>
				</Section>

				<Section title="Icon buttons">
					<div class={wrap({ gap: "3", alignItems: "center" })}>
						{variants
							.filter((variant) => variant !== "link")
							.map((variant) => (
								<IconButton key={variant} variant={variant} aria-label="Settings">
									<SettingsIcon />
								</IconButton>
							))}
						<IconButton size="sm" aria-label="Add">
							<PlusIcon />
						</IconButton>
						<IconButton size="lg" variant="outline" aria-label="Delete">
							<TrashIcon />
						</IconButton>
					</div>
				</Section>

				<Section title="Interactive components">
					<div class={wrap({ gap: "3", alignItems: "center" })}>
						<Menu
							trigger={
								<Button variant="outline">
									Options <ChevronDownIcon />
								</Button>
							}
						>
							<MenuItemGroup>
								<MenuItemGroupLabel>My Account</MenuItemGroupLabel>
								<MenuItem value="profile">
									<UserIcon /> Profile
								</MenuItem>
								<MenuItem value="settings">
									<SettingsIcon /> Settings
								</MenuItem>
							</MenuItemGroup>
							<MenuSeparator />
							<MenuItem value="logout">
								<LogOutIcon /> Log out
							</MenuItem>
						</Menu>

						<Dialog
							trigger={<Button>Open dialog</Button>}
							title="Update profile"
							description="Make changes to your profile here. Click save when you're done."
						>
							<div class={hstack({ gap: "3", justify: "flex-end" })}>
								<Button variant="outline" data-dialog-close>
									Cancel
								</Button>
								<Button data-dialog-close>Save changes</Button>
							</div>
						</Dialog>

						<Tooltip content="Add to your library">
							<IconButton variant="outline" aria-label="Add to library">
								<HeartIcon />
							</IconButton>
						</Tooltip>
					</div>
				</Section>
			</div>
		</main>,
	);
});
