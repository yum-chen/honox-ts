import { createRoute } from "honox/factory";
import { css } from "styled-system/css";
import {
	AbsoluteCenter,
	Alert,
	AlertIcon,
	Badge,
	Breadcrumb,
	Button,
	ButtonGroup,
	Card,
	Checkbox,
	CloseButton,
	Collapsible,
	Combobox,
	Dialog,
	Drawer,
	Field,
	Fieldset,
	Group,
	Heading,
	HoverCard,
	IconButton,
	Loader,
	Menu,
	Popover,
	Progress,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Slider,
	Spinner,
	Splitter,
	Switch,
	Table,
	Tabs,
	Text,
	Textarea,
	Toast,
	Tooltip,
} from "../components/ui";

const items = [
	{ label: "React", value: "react" },
	{ label: "Solid", value: "solid" },
	{ label: "Svelte", value: "svelte" },
	{ label: "Vue", value: "vue" },
	{ label: "Hono", value: "hono" },
];

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={css({ py: "8", textAlign: "center" })}>
			<title>{name}</title>
			<Heading as="h1" class={css({ fontSize: "3xl", fontWeight: "bold" })}>
				Hello, {name}!
			</Heading>

			{/* Button Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "2" })}>
					Button Component Examples
				</Heading>

				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<Button variant="solid" colorPalette="blue">
						Solid Blue
					</Button>
					<Button variant="outline" colorPalette="green">
						Outline Green
					</Button>
					<Button variant="subtle" colorPalette="red">
						Subtle Red
					</Button>
					<Button variant="surface" colorPalette="purple">
						Surface Purple
					</Button>
					<Button variant="ghost" colorPalette="cyan">
						Ghost Cyan
					</Button>
					<Button variant="link" colorPalette="amber">
						Link Amber
					</Button>
					<Button variant="plain">Plain</Button>
				</div>

				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>

				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Button loading loadingText="Saving...">
						Save
					</Button>
					<Button loading>Spinner only</Button>
					<Button interactive onclick="alert('Hello!')">
						Interactive
					</Button>
					<IconButton aria-label="Search">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<title>Search</title>
							<circle cx="11" cy="11" r="8" />
							<path d="m21 21-4.3-4.3" />
						</svg>
					</IconButton>
					<CloseButton />
				</div>

				<ButtonGroup variant="outline" attached>
					<Button>Left</Button>
					<Button>Middle</Button>
					<Button>Right</Button>
				</ButtonGroup>
			</div>

			{/* Heading Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "2" })}>
					Heading Component Examples
				</Heading>
				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "4",
						alignItems: "center",
					})}
				>
					<Heading size="6xl">Heading 6xl</Heading>
					<Heading size="4xl">Heading 4xl</Heading>
					<Heading size="2xl">Heading 2xl</Heading>
					<Heading size="xl">Heading xl</Heading>
					<Heading size="md">Heading md</Heading>
					<Heading size="sm">Heading sm</Heading>
					<Heading size="xs">Heading xs</Heading>
				</div>
			</div>

			{/* Badge Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading
					as="h2"
					class={css({
						fontSize: "xl",
						mb: "4",
						width: "100%",
						textAlign: "center",
					})}
				>
					Badge Component Examples
				</Heading>

				{/* Semantic Colors */}
				<Text
					size="sm"
					class={css({ color: "fg.muted", width: "100%", textAlign: "left" })}
				>
					Semantic Colors
				</Text>
				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
						width: "100%",
					})}
				>
					<Badge variant="solid" colorPalette="red">
						Error
					</Badge>
					<Badge variant="solid" colorPalette="green">
						Success
					</Badge>
					<Badge variant="solid" colorPalette="orange">
						Warning
					</Badge>
					<Badge variant="solid" colorPalette="blue">
						Info
					</Badge>
				</div>

				{/* All Color Palettes */}
				<Text
					size="sm"
					class={css({
						color: "fg.muted",
						width: "100%",
						textAlign: "left",
						mt: "4",
					})}
				>
					All Color Palettes
				</Text>
				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
						width: "100%",
					})}
				>
					<Badge variant="subtle" colorPalette="red">
						Red
					</Badge>
					<Badge variant="subtle" colorPalette="orange">
						Orange
					</Badge>
					<Badge variant="subtle" colorPalette="amber">
						Amber
					</Badge>
					<Badge variant="subtle" colorPalette="green">
						Green
					</Badge>
					<Badge variant="subtle" colorPalette="blue">
						Blue
					</Badge>
					<Badge variant="subtle" colorPalette="cyan">
						Cyan
					</Badge>
					<Badge variant="subtle" colorPalette="purple">
						Purple
					</Badge>
					<Badge variant="subtle" colorPalette="slate">
						Slate
					</Badge>
				</div>

				{/* Variants */}
				<Text
					size="sm"
					class={css({
						color: "fg.muted",
						width: "100%",
						textAlign: "left",
						mt: "4",
					})}
				>
					Variants (Blue)
				</Text>
				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
						width: "100%",
					})}
				>
					<Badge variant="solid" colorPalette="blue">
						Solid
					</Badge>
					<Badge variant="subtle" colorPalette="blue">
						Subtle
					</Badge>
					<Badge variant="outline" colorPalette="blue">
						Outline
					</Badge>
					<Badge variant="surface" colorPalette="blue">
						Surface
					</Badge>
				</div>

				{/* Sizes */}
				<Text
					size="sm"
					class={css({
						color: "fg.muted",
						width: "100%",
						textAlign: "left",
						mt: "4",
					})}
				>
					Sizes
				</Text>
				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
						width: "100%",
						alignItems: "center",
					})}
				>
					<Badge size="sm">Small</Badge>
					<Badge size="md">Medium</Badge>
					<Badge size="lg">Large</Badge>
				</div>
			</div>

			{/* Switch Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "2" })}>
					Switch Component Examples
				</Heading>
				<div
					class={css({
						display: "flex",
						gap: "8",
						alignItems: "center",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Sizes
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Switch size="sm">Small</Switch>
							<Switch size="md">Medium</Switch>
							<Switch size="lg">Large</Switch>
						</div>
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							States
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Switch checked>Checked</Switch>
							<Switch disabled>Disabled</Switch>
							<Switch disabled checked>
								Disabled Checked
							</Switch>
							<Switch invalid>Invalid</Switch>
						</div>
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Interactive
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Switch interactive defaultChecked>
								Interactive
							</Switch>
							<Switch interactive colorPalette="blue">
								Interactive Blue
							</Switch>
							<Switch
								interactive
								colorPalette="red"
								onCheckedChange={(details) =>
									console.log("Switch changed:", details.checked)
								}
							>
								Check Console
							</Switch>
						</div>
					</div>
				</div>
			</div>

			{/* Checkbox Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "2" })}>
					Checkbox Component Examples
				</Heading>
				<div
					class={css({
						display: "flex",
						gap: "8",
						alignItems: "center",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Sizes
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Checkbox size="sm">Small</Checkbox>
							<Checkbox size="md">Medium</Checkbox>
							<Checkbox size="lg">Large</Checkbox>
						</div>
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							States
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Checkbox checked>Checked</Checkbox>
							<Checkbox checked="indeterminate">Indeterminate</Checkbox>
							<Checkbox disabled>Disabled</Checkbox>
							<Checkbox invalid>Invalid</Checkbox>
						</div>
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "center",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Interactive
						</Text>
						<div
							class={css({ display: "flex", gap: "4", alignItems: "center" })}
						>
							<Checkbox interactive defaultChecked>
								Interactive
							</Checkbox>
							<Checkbox interactive colorPalette="blue">
								Interactive Blue
							</Checkbox>
							<Checkbox
								interactive
								colorPalette="green"
								onCheckedChange={(details) =>
									console.log("Checkbox changed:", details.checked)
								}
							>
								Check Console
							</Checkbox>
						</div>
					</div>
				</div>
			</div>

			{/* Spinner Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "2" })}>
					Spinner Component Examples
				</Heading>
				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner size="xl" />
				</div>
			</div>

			{/* Text Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Text Component Examples
				</Heading>

				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "2",
						alignItems: "center",
					})}
				>
					<Text size="7xl">Text 7xl</Text>
					<Text size="4xl">Text 4xl</Text>
					<Text size="2xl">Text 2xl</Text>
					<Text size="lg">Text lg</Text>
					<Text size="md">Text md</Text>
					<Text size="sm">Text sm</Text>
					<Text size="xs">Text xs</Text>
				</div>
			</div>

			{/* Alert Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "5xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Alert Component Examples
				</Heading>

				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "4",
						width: "full",
					})}
				>
					<Alert
						status="info"
						title="Info Alert"
						description="This is an informational alert."
						indicator={AlertIcon()}
					/>
					<Alert
						status="success"
						variant="solid"
						title="Success Alert"
						description="Your changes have been saved."
						indicator={AlertIcon()}
					/>
					<Alert
						status="warning"
						variant="outline"
						title="Warning Alert"
						description="This action cannot be undone."
						indicator={AlertIcon()}
					/>
					<Alert
						status="error"
						variant="surface"
						title="Error Alert"
						description="An error occurred while processing your request."
						indicator={AlertIcon()}
					/>
				</div>
			</div>

			{/* Dialog Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Dialog Component Examples
				</Heading>
				<Dialog
					interactive
					trigger={<Button variant="outline">Open Dialog</Button>}
					title="Dialog Title"
					description="This dialog uses the simplified flattened API."
					body="This is the dialog body content."
					cancel={<Button variant="outline">Cancel</Button>}
					confirm={<Button>Confirm</Button>}
				/>
			</div>

			{/* Drawer Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Drawer Component Examples
				</Heading>

				<Drawer
					interactive
					trigger={<Button variant="outline">Open Drawer</Button>}
					title="Drawer Title"
					description="This drawer uses the simplified flattened API."
					body="This is the main content of the drawer, passed via the body prop."
					cancel={<Button variant="outline">Close</Button>}
					confirm={<Button>Action</Button>}
				/>
			</div>

			{/* Menu Examples (Flattened API) */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Menu Component Examples (Flattened API)
				</Heading>

				<Text size="sm" class={css({ color: "fg.muted", mb: "2" })}>
					Basic Menu with Items (Interactive)
				</Text>
				<Menu
					trigger={<Button variant="outline">Open Menu</Button>}
					items={[
						{ type: "item", label: "New Tab", value: "new-tab" },
						{ type: "item", label: "New Window", value: "new-window" },
						{ type: "separator" },
						{ type: "item", label: "Print", value: "print" },
						{
							type: "checkbox",
							label: "Show Bookmarks",
							value: "show-bookmarks",
							checked: true,
						},
					]}
				/>

				<Text size="sm" class={css({ color: "fg.muted", mt: "4", mb: "2" })}>
					Menu with Disabled Items (Interactive)
				</Text>
				<Menu
					trigger={
						<Button variant="outline" colorPalette="blue">
							Options
						</Button>
					}
					items={[
						{ type: "item", label: "Edit", value: "edit" },
						{ type: "item", label: "Duplicate", value: "duplicate" },
						{ type: "separator" },
						{ type: "item", label: "Delete", value: "delete", disabled: true },
					]}
				/>
			</div>

			{/* Slider Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Slider Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					{/* Basic Slider */}
					<Slider
						label="Basic Slider"
						defaultValue={30}
						class={css({ width: "full" })}
					/>

					{/* Interactive Slider with Value Text */}
					<Slider
						interactive
						label="Interactive Slider"
						defaultValue={50}
						showValueText
						formatValue={(v) => `${v}%`}
						class={css({ width: "full" })}
						onChange={(details) =>
							console.log("Slider changed:", details.value)
						}
					/>

					{/* Range Slider */}
					<Slider
						interactive
						label="Range Slider"
						defaultValue={[20, 80]}
						showValueText
						class={css({ width: "full" })}
					/>

					{/* Slider with Marks */}
					<Slider
						interactive
						label="Slider with Marks"
						defaultValue={2}
						min={0}
						max={4}
						step={1}
						marks={[
							{ value: 0, label: "0" },
							{ value: 1, label: "1" },
							{ value: 2, label: "2" },
							{ value: 3, label: "3" },
							{ value: 4, label: "4" },
						]}
						class={css({ width: "full" })}
					/>

					{/* Vertical Slider */}
					<div
						class={css({
							display: "flex",
							justifyContent: "center",
							gap: "12",
							height: "200px",
						})}
					>
						<Slider
							interactive
							orientation="vertical"
							label="Vertical"
							defaultValue={70}
							height="200px"
							showValueText
						/>
						<Slider
							interactive
							orientation="vertical"
							label="Range"
							defaultValue={[30, 70]}
							height="200px"
							showValueText
						/>
					</div>
				</div>
			</div>

			{/* Popover Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Popover Component Examples
				</Heading>
				<Popover.Root interactive>
					<Popover.Trigger asChild>
						<Button variant="outline">Open Popover</Button>
					</Popover.Trigger>
					<Popover.Positioner>
						<Popover.Content>
							<Popover.Arrow>
								<Popover.ArrowTip />
							</Popover.Arrow>
							<Popover.Header>
								<Popover.Title>Popover Title</Popover.Title>
							</Popover.Header>
							<Popover.Body>This is the popover body content.</Popover.Body>
							<Popover.CloseTrigger asChild>
								<IconButton
									aria-label="Close"
									variant="ghost"
									size="sm"
									class={css({ position: "absolute", top: "2", right: "2" })}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<title>Close</title>
										<path d="M18 6 6 18M6 6l12 12" />
									</svg>
								</IconButton>
							</Popover.CloseTrigger>
						</Popover.Content>
					</Popover.Positioner>
				</Popover.Root>
			</div>

			{/* HoverCard Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					HoverCard Component Examples
				</Heading>
				<div class={css({ display: "flex", gap: "8" })}>
					<div class={css({ position: "relative" })}>
						<HoverCard.Root>
							<HoverCard.Trigger asChild>
								<Text
									class={css({
										cursor: "default",
										textDecoration: "underline",
										textDecorationStyle: "dotted",
									})}
								>
									Basic HoverCard
								</Text>
							</HoverCard.Trigger>
							<HoverCard.Positioner>
								<HoverCard.Content>
									<Text fontWeight="bold">HoverCard Title</Text>
									<Text size="sm" class={css({ color: "fg.muted", mt: "1" })}>
										This is a basic hover card that appears on hover.
									</Text>
								</HoverCard.Content>
							</HoverCard.Positioner>
						</HoverCard.Root>
					</div>

					<div class={css({ position: "relative" })}>
						<HoverCard.Root>
							<HoverCard.Trigger asChild>
								<Button variant="outline">Hover with Arrow</Button>
							</HoverCard.Trigger>
							<HoverCard.Positioner>
								<HoverCard.Content>
									<HoverCard.Arrow>
										<HoverCard.ArrowTip />
									</HoverCard.Arrow>
									<Text fontWeight="bold">HoverCard with Arrow</Text>
									<Text size="sm" class={css({ color: "fg.muted", mt: "1" })}>
										This hover card includes an arrow pointing to the trigger.
									</Text>
								</HoverCard.Content>
							</HoverCard.Positioner>
						</HoverCard.Root>
					</div>

					<div class={css({ position: "relative" })}>
						<HoverCard.Root interactive openDelay={100} closeDelay={100}>
							<HoverCard.Trigger asChild>
								<Badge variant="outline" colorPalette="blue" cursor="default">
									Interactive
								</Badge>
							</HoverCard.Trigger>
							<HoverCard.Positioner>
								<HoverCard.Content>
									<Text fontWeight="bold">Interactive HoverCard</Text>
									<Text size="sm" class={css({ color: "fg.muted", mt: "1" })}>
										This hover card is interactive and has custom delays.
									</Text>
									<Button size="xs" variant="solid" class={css({ mt: "3" })}>
										Action
									</Button>
								</HoverCard.Content>
							</HoverCard.Positioner>
						</HoverCard.Root>
					</div>
				</div>
			</div>

			{/* Combobox Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Combobox Component Examples
				</Heading>
				<Combobox
					interactive
					items={items}
					label="Framework"
					placeholder="Select a Framework"
				/>
			</div>

			{/* Group Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Group Component Examples
				</Heading>

				<div
					class={css({ display: "flex", flexDirection: "column", gap: "8" })}
				>
					<div class={css({ textAlign: "center" })}>
						<Text size="sm" class={css({ mb: "2", color: "fg.muted" })}>
							Attached Group
						</Text>
						<Group attached>
							<Button variant="outline">First</Button>
							<Button variant="outline">Second</Button>
							<Button variant="outline">Third</Button>
						</Group>
					</div>

					<div class={css({ textAlign: "center" })}>
						<Text size="sm" class={css({ mb: "2", color: "fg.muted" })}>
							Grow Group
						</Text>
						<Group grow class={css({ width: "400px" })}>
							<Button variant="solid">Left</Button>
							<Button variant="solid">Right</Button>
						</Group>
					</div>

					<div class={css({ textAlign: "center" })}>
						<Text size="sm" class={css({ mb: "2", color: "fg.muted" })}>
							Vertical Group
						</Text>
						<Group orientation="vertical">
							<Button variant="outline">Top</Button>
							<Button variant="outline">Bottom</Button>
						</Group>
					</div>
				</div>
			</div>

			{/* AbsoluteCenter Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					AbsoluteCenter Component Examples
				</Heading>

				<div
					class={css({
						position: "relative",
						height: "150px",
						width: "300px",
						borderWidth: "1px",
						borderColor: "border",
						borderRadius: "md",
						bg: "bg.subtle",
					})}
				>
					<AbsoluteCenter>
						<Badge variant="solid" colorPalette="blue">
							Centered Content
						</Badge>
					</AbsoluteCenter>
				</div>
			</div>

			{/* Field Examples - using plain HTML to isolate */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "8",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Field Component Examples
				</Heading>

				<Field
					label="Email"
					validator={(value: string) => {
						if (!value.includes("@")) {
							return "Please enter a valid email address containing @";
						}
						return true;
					}}
					type="email"
					placeholder="Enter your email"
				/>

				<Field
					label="Username"
					minLength={5}
					helperText="Minimum 5 characters"
					defaultValue="usr"
					placeholder="Enter username"
				/>
			</div>

			{/* Skeleton Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Skeleton Component Examples
				</Heading>

				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "8",
						width: "full",
					})}
				>
					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "flex-start",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Basic Skeleton
						</Text>
						<Skeleton class={css({ height: "4", width: "full" })} />
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "flex-start",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Skeleton Circle
						</Text>
						<SkeletonCircle class={css({ size: "12" })} />
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "flex-start",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Skeleton Text
						</Text>
						<SkeletonText noOfLines={3} gap="3" />
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "flex-start",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Skeleton with Children (Loading: true)
						</Text>
						<Skeleton loading={true}>
							<Button>Loaded Content</Button>
						</Skeleton>
					</div>

					<div
						class={css({
							display: "flex",
							flexDirection: "column",
							gap: "2",
							alignItems: "flex-start",
						})}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Skeleton with Children (Loading: false)
						</Text>
						<Skeleton loading={false}>
							<Button>Loaded Content</Button>
						</Skeleton>
					</div>
				</div>
			</div>

			{/* Breadcrumb Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Breadcrumb Component Examples
				</Heading>
				<Breadcrumb.Root>
					<Breadcrumb.List>
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
						</Breadcrumb.Item>
						<Breadcrumb.Separator />
						<Breadcrumb.Item>
							<Breadcrumb.Link href="/components/breadcrumb" current>
								Breadcrumb
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					</Breadcrumb.List>
				</Breadcrumb.Root>
			</div>

			{/* Card Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Card Component Examples
				</Heading>
				<div
					class={css({
						display: "grid",
						gridTemplateColumns: { base: "1fr", md: "repeat(2, 1fr)" },
						gap: "6",
						width: "full",
					})}
				>
					{/* Basic Flattened Card */}
					<Card
						title="Team Members"
						description="Add new members to your organization."
						footer={
							<>
								<Button variant="outline">Cancel</Button>
								<Button>Invite</Button>
							</>
						}
					>
						<Text size="sm">Invite your colleagues to collaborate.</Text>
					</Card>

					{/* Card with Avatar and Action */}
					<Card
						title="John Doe"
						description="Software Engineer"
						avatar={
							<div
								class={css({
									w: "10",
									h: "10",
									bg: "blue.500",
									rounded: "full",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									color: "white",
									fontWeight: "bold",
								})}
							>
								JD
							</div>
						}
						headerAction={
							<IconButton variant="ghost" size="sm" aria-label="Settings">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
								>
									<title>Settings</title>
									<circle cx="12" cy="12" r="3" />
									<path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
								</svg>
							</IconButton>
						}
					>
						<Text size="sm">
							Specializes in building high-performance web applications with
							Hono and React.
						</Text>
					</Card>

					{/* Card with Image */}
					<Card
						title="Mountain Retreat"
						description="A peaceful getaway in the heart of nature."
						image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80"
						imagePosition="top"
					>
						<Text size="sm">
							Experience the beauty of the mountains from our cozy cabin.
						</Text>
					</Card>

					{/* Interactive Card */}
					<Card
						interactive
						clickable
						title="Interactive Card"
						description="Click this card to see it in action."
						variant="elevated"
						onclick="alert('Card clicked!')"
					>
						<Text size="sm">
							This card is interactive and handles click events via the island.
						</Text>
					</Card>
				</div>
			</div>

			{/* Fieldset Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Fieldset Component Examples
				</Heading>
				<Fieldset
					legend="Shipping Information"
					helperText="Please enter your delivery details."
				>
					<Field label="Full Name" placeholder="John Doe" />
					<Field label="Address" placeholder="123 Main St" />
				</Fieldset>

				<Fieldset
					invalid
					legend="Account Settings"
					errorText="Please fix the errors in this section."
					class={css({ mt: "4" })}
				>
					<Field label="Email" defaultValue="invalid-email" />
				</Fieldset>
			</div>

			{/* Textarea Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Textarea Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Static
						</Text>
						<Textarea placeholder="Basic Textarea" />
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Interactive (Validated)
						</Text>
						<Textarea
							label="Feedback"
							placeholder="Tell us what you think..."
							interactive
							minLength={10}
							helperText="Minimum 10 characters required."
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Disabled
						</Text>
						<Textarea placeholder="Disabled Textarea" disabled />
					</div>
				</div>
			</div>

			{/* Toast Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Toast Component Examples
				</Heading>
				<Toast.Toaster />
				<div
					class={css({
						display: "flex",
						gap: "4",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<Button
						variant="outline"
						onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Success', description: 'Action completed successfully', closable: true, type: 'success' } }))"
					>
						Show Success Toast
					</Button>
					<Button
						variant="outline"
						onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Error', description: 'An error occurred', closable: true, type: 'error' } }))"
					>
						Show Error Toast
					</Button>
					<Button
						variant="outline"
						onclick="window.dispatchEvent(new CustomEvent('park-ui:toast:create', { detail: { id: Math.random().toString(36).substring(2, 9), title: 'Loading', description: 'Please wait...', type: 'loading' } }))"
					>
						Show Loading Toast
					</Button>
				</div>
			</div>

			{/* Tooltip Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Tooltip Component Examples
				</Heading>
				<div class={css({ display: "flex", gap: "8" })}>
					<Tooltip content="This is a static tooltip" interactive={false}>
						<Button variant="outline">Static Tooltip</Button>
					</Tooltip>

					<Tooltip content="This is an interactive tooltip" interactive={true}>
						<Button variant="outline">Interactive Tooltip</Button>
					</Tooltip>

					<Tooltip content="Tooltip with Arrow" showArrow>
						<Button variant="outline">With Arrow</Button>
					</Tooltip>
				</div>
			</div>

			{/* Table Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "2xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Table Component Examples
				</Heading>

				<Table.Root variant="plain" interactive>
					<Table.Caption>Product Inventory</Table.Caption>
					<Table.Head>
						<Table.Row>
							<Table.Header>Name</Table.Header>
							<Table.Header>Category</Table.Header>
							<Table.Header>Price</Table.Header>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Laptop</Table.Cell>
							<Table.Cell>Electronics</Table.Cell>
							<Table.Cell>$999.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Coffee Mug</Table.Cell>
							<Table.Cell>Home & Kitchen</Table.Cell>
							<Table.Cell>$15.00</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Ergonomic Chair</Table.Cell>
							<Table.Cell>Furniture</Table.Cell>
							<Table.Cell>$250.00</Table.Cell>
						</Table.Row>
					</Table.Body>
					<Table.Foot>
						<Table.Row>
							<Table.Cell colSpan={2}>Total</Table.Cell>
							<Table.Cell>$1,264.00</Table.Cell>
						</Table.Row>
					</Table.Foot>
				</Table.Root>

				<Text size="sm" class={css({ mt: "8", mb: "2", color: "fg.muted" })}>
					Surface Variant with Striped Rows
				</Text>
				<Table.Root variant="surface" striped>
					<Table.Head>
						<Table.Row>
							<Table.Header>Member</Table.Header>
							<Table.Header>Role</Table.Header>
							<Table.Header>Status</Table.Header>
						</Table.Row>
					</Table.Head>
					<Table.Body>
						<Table.Row>
							<Table.Cell>Alice Johnson</Table.Cell>
							<Table.Cell>Designer</Table.Cell>
							<Table.Cell>Active</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Bob Smith</Table.Cell>
							<Table.Cell>Developer</Table.Cell>
							<Table.Cell>Away</Table.Cell>
						</Table.Row>
						<Table.Row>
							<Table.Cell>Charlie Brown</Table.Cell>
							<Table.Cell>Manager</Table.Cell>
							<Table.Cell>Offline</Table.Cell>
						</Table.Row>
					</Table.Body>
				</Table.Root>
			</div>

			{/* Progress Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Progress Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					<Progress label="Default Progress" value={40} showValueText />
					<Progress
						label="Subtle Progress"
						variant="subtle"
						colorPalette="amber"
						value={60}
						showValueText
					/>
					<Progress label="Indeterminate Progress" value={null} />

					<div
						class={css({ display: "flex", gap: "8", justifyContent: "center" })}
					>
						<Progress
							label="Circular Progress"
							value={75}
							size="lg"
							type="circular"
							showValueText
						/>
					</div>

					<div
						class={css({ display: "flex", gap: "8", justifyContent: "center" })}
					>
						<Progress value={25} size="sm" type="circular" />
						<Progress value={null} size="md" type="circular" />
					</div>
				</div>
			</div>

			{/* Loader Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
					pb: "20",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Loader Component Examples
				</Heading>
				<div
					class={css({
						display: "flex",
						gap: "8",
						alignItems: "center",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<Loader text="Loading..." />
					<Loader spinnerPlacement="end">Processing</Loader>
					<Loader spinner={<Spinner color="blue.500" />}>Custom Spinner</Loader>
				</div>
			</div>

			{/* Tabs Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Tabs Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Basic Tabs (Interactive)
						</Text>
						<Tabs
							colorPalette="blue"
							defaultValue="react"
							items={[
								{ value: "react", label: "React", content: "React Content" },
								{ value: "solid", label: "Solid", content: "Solid Content" },
								{ value: "svelte", label: "Svelte", content: "Svelte Content" },
							]}
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Subtle Variant
						</Text>
						<Tabs
							variant="subtle"
							defaultValue="react"
							items={[
								{ value: "react", label: "React", content: "React Content" },
								{ value: "solid", label: "Solid", content: "Solid Content" },
							]}
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Enclosed Variant
						</Text>
						<Tabs
							variant="enclosed"
							defaultValue="react"
							items={[
								{ value: "react", label: "React", content: "React Content" },
								{ value: "solid", label: "Solid", content: "Solid Content" },
							]}
						/>
					</div>
				</div>
			</div>

			{/* Splitter Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Splitter Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Horizontal Splitter (Static)
						</Text>
						<Splitter
							panels={[
								{
									id: "left",
									content: <div class={css({ p: "4" })}>Left Panel</div>,
								},
								{
									id: "right",
									content: <div class={css({ p: "4" })}>Right Panel</div>,
								},
							]}
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Vertical Splitter (Interactive)
						</Text>
						<div class={css({ height: "300px", width: "full" })}>
							<Splitter
								interactive
								orientation="vertical"
								panels={[
									{
										id: "top",
										content: <div class={css({ p: "4" })}>Top Panel</div>,
									},
									{
										id: "bottom",
										content: <div class={css({ p: "4" })}>Bottom Panel</div>,
									},
								]}
							/>
						</div>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Three Panels (Interactive)
						</Text>
						<Splitter
							interactive
							panels={[
								{
									id: "p1",
									content: <div class={css({ p: "4" })}>Panel 1</div>,
								},
								{
									id: "p2",
									content: <div class={css({ p: "4" })}>Panel 2</div>,
								},
								{
									id: "p3",
									content: <div class={css({ p: "4" })}>Panel 3</div>,
								},
							]}
							defaultSize={[
								{ id: "p1", size: 20 },
								{ id: "p2", size: 60 },
								{ id: "p3", size: 20 },
							]}
						/>
					</div>
				</div>
			</div>

			{/* Collapsible Examples */}
			<div
				class={css({
					mt: "8",
					display: "flex",
					flexDirection: "column",
					gap: "4",
					alignItems: "center",
					maxWidth: "xl",
					mx: "auto",
					pb: "20",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Collapsible Component Examples
				</Heading>
				<div
					class={css({
						width: "full",
						display: "flex",
						flexDirection: "column",
						gap: "8",
					})}
				>
					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Basic Collapsible (Interactive)
						</Text>
						<Collapsible
							interactive
							trigger={<Button variant="outline">Toggle Content</Button>}
							content={
								<div class={css({ p: "4", bg: "bg.subtle", borderRadius: "md" })}>
									<Text>
										This is a basic collapsible component with a JSX trigger.
									</Text>
								</div>
							}
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							With String Trigger & Indicator
						</Text>
						<Collapsible
							interactive
							trigger="Click to Expand"
							indicator={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<title>Chevron Down</title>
									<path d="m6 9 6 6 6-6" />
								</svg>
							}
							content={
								<div class={css({ p: "4", bg: "bg.subtle", borderRadius: "md" })}>
									<Text>
										When trigger is a string, it's auto-wrapped in a button.
									</Text>
								</div>
							}
						/>
					</div>

					<div
						class={css({ display: "flex", flexDirection: "column", gap: "2" })}
					>
						<Text size="sm" class={css({ color: "fg.muted" })}>
							Default Open & Indicator Start
						</Text>
						<Collapsible
							interactive
							defaultOpen
							indicatorPlacement="start"
							trigger="Settings"
							indicator={
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="2"
									stroke-linecap="round"
									stroke-linejoin="round"
								>
									<title>Chevron Right</title>
									<path d="m9 18 6-6-6-6" />
								</svg>
							}
							content={
								<div class={css({ p: "4", bg: "bg.subtle", borderRadius: "md" })}>
									<Text>This collapsible is open by default.</Text>
								</div>
							}
						/>
					</div>
				</div>
			</div>
		</div>,
	);
});
