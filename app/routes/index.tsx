import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
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
	IconButton,
	Loader,
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
	Text,
	Textarea,
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
					maxWidth: "xl",
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
				<Dialog.Root interactive>
					<Dialog.Trigger asChild>
						<Button variant="outline">Open Dialog</Button>
					</Dialog.Trigger>
					<Dialog.Backdrop />
					<Dialog.Positioner>
						<Dialog.Content>
							<Dialog.Header>
								<Dialog.Title>Dialog Title</Dialog.Title>
								<Dialog.Description>Dialog Description</Dialog.Description>
							</Dialog.Header>
							<Dialog.Body>This is the dialog body content.</Dialog.Body>
							<Dialog.Footer>
								<Dialog.CloseTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Dialog.CloseTrigger>
								<Dialog.ActionTrigger asChild>
									<Button>Confirm</Button>
								</Dialog.ActionTrigger>
							</Dialog.Footer>
						</Dialog.Content>
					</Dialog.Positioner>
				</Dialog.Root>
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
				<Drawer.Root interactive>
					<Drawer.Trigger asChild>
						<Button variant="outline">Open Drawer</Button>
					</Drawer.Trigger>
					<Drawer.Backdrop />
					<Drawer.Positioner>
						<Drawer.Content>
							<Drawer.Header>
								<Drawer.Title>Drawer Title</Drawer.Title>
								<Drawer.Description>Drawer Description</Drawer.Description>
							</Drawer.Header>
							<Drawer.Body>This is the drawer body content.</Drawer.Body>
							<Drawer.Footer>
								<Drawer.CloseTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Drawer.CloseTrigger>
								<Drawer.ActionTrigger asChild>
									<Button>Confirm</Button>
								</Drawer.ActionTrigger>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Positioner>
				</Drawer.Root>
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
					<Slider.Root defaultValue={[30]} class={css({ width: "full" })}>
						<Slider.Label>Basic Slider</Slider.Label>
						<Slider.Control>
							<Slider.Track>
								<Slider.Range />
							</Slider.Track>
							<Slider.Thumb index={0} />
						</Slider.Control>
					</Slider.Root>

					<Slider.Root
						interactive
						defaultValue={[50]}
						class={css({ width: "full" })}
					>
						<div
							class={css({ display: "flex", justifyContent: "space-between" })}
						>
							<Slider.Label>Interactive Slider</Slider.Label>
							<Slider.ValueText />
						</div>
						<Slider.Control>
							<Slider.Track>
								<Slider.Range />
							</Slider.Track>
							<Slider.Thumb index={0} />
						</Slider.Control>
					</Slider.Root>

					<Slider.Root
						interactive
						defaultValue={[20, 80]}
						class={css({ width: "full" })}
					>
						<div
							class={css({ display: "flex", justifyContent: "space-between" })}
						>
							<Slider.Label>Range Slider</Slider.Label>
							<Slider.ValueText />
						</div>
						<Slider.Control>
							<Slider.Track>
								<Slider.Range />
							</Slider.Track>
							<Slider.Thumb index={0} />
							<Slider.Thumb index={1} />
						</Slider.Control>
					</Slider.Root>
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
					<Splitter.Root
						interactive
						defaultSize={[
							{ id: "left", size: 50 },
							{ id: "right", size: 50 },
						]}
						class={css({
							width: "full",
							height: "200px",
							borderWidth: "1px",
							borderRadius: "md",
						})}
					>
						<Splitter.Panel id="left">
							<AbsoluteCenter>Left Panel</AbsoluteCenter>
						</Splitter.Panel>
						<Splitter.ResizeTrigger id="left:right" />
						<Splitter.Panel id="right">
							<AbsoluteCenter>Right Panel</AbsoluteCenter>
						</Splitter.Panel>
					</Splitter.Root>

					<Splitter.Root
						interactive
						orientation="vertical"
						defaultSize={[
							{ id: "top", size: 50 },
							{ id: "bottom", size: 50 },
						]}
						class={css({
							width: "full",
							height: "300px",
							borderWidth: "1px",
							borderRadius: "md",
						})}
					>
						<Splitter.Panel id="top">
							<AbsoluteCenter>Top Panel</AbsoluteCenter>
						</Splitter.Panel>
						<Splitter.ResizeTrigger id="top:bottom" />
						<Splitter.Panel id="bottom">
							<AbsoluteCenter>Bottom Panel</AbsoluteCenter>
						</Splitter.Panel>
					</Splitter.Root>
				</div>
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
						display: "flex",
						gap: "6",
						flexWrap: "wrap",
						justifyContent: "center",
					})}
				>
					<Card.Root class={css({ width: "sm" })}>
						<Card.Header>
							<Card.Title>Team Members</Card.Title>
							<Card.Description>
								Add new members to your organization.
							</Card.Description>
						</Card.Header>
						<Card.Body>
							<Text size="sm">Invite your colleagues to collaborate.</Text>
						</Card.Body>
						<Card.Footer>
							<Button variant="outline">Cancel</Button>
							<Button>Invite</Button>
						</Card.Footer>
					</Card.Root>

					<Card.Root class={css({ width: "sm" })} variant="subtle">
						<Card.Header>
							<Card.Title>Subtle Card</Card.Title>
						</Card.Header>
						<Card.Body>
							<Text size="sm">This card uses the subtle variant.</Text>
						</Card.Body>
					</Card.Root>
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
					pb: "20",
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
					<Collapsible.Root
						interactive
						class={css({ width: "full", border: "1px solid border", p: "4" })}
					>
						<Collapsible.Trigger asChild>
							<Button variant="outline">Click to Toggle</Button>
						</Collapsible.Trigger>
						<Collapsible.Content class={css({ mt: "4" })}>
							<div
								class={css({
									bg: "bg.subtle",
									p: "4",
									borderRadius: "md",
								})}
							>
								<Text>
									This is the collapsible content. It can contain any elements
									and will expand/collapse when the trigger is clicked.
								</Text>
							</div>
						</Collapsible.Content>
					</Collapsible.Root>
				</div>
			</div>
		</div>,
	);
});
