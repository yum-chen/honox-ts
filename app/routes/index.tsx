import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import {
	AbsoluteCenter,
	Alert,
	AlertIcon,
	Badge,
	Button,
	ButtonGroup,
	Checkbox,
	CloseButton,
	Field,
	Group,
	Heading,
	IconButton,
	Skeleton,
	SkeletonCircle,
	SkeletonText,
	Spinner,
	Switch,
	Text,
	Drawer,
} from "../components/ui";

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
					<Button variant="plain">Plain</Button>
				</div>

				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Button loading loadingText="Saving...">
						Save
					</Button>
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
					class={css({ fontSize: "xl", mb: "4", width: "100%" })}
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
				<h2 class={css({ fontSize: "xl", mb: "4" })}>
					Text Component Examples
				</h2>

				<Text as="h1" size="4xl" variant="heading">
					Heading 1
				</Text>

				<Text as="p" size="lg" class={css({ color: "fg.muted" })}>
					Large paragraph
				</Text>
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
				<h2 class={css({ fontSize: "xl", mb: "4" })}>
					Alert Component Examples
				</h2>

				<Alert
					status="info"
					title="Info Alert"
					description="This is an informational alert."
					indicator={AlertIcon()}
				/>
			</div>

			{/* Button Examples */}
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
					Button Component Examples
				</Heading>

				<div class={css({ display: "flex", gap: "4", flexWrap: "wrap" })}>
					<Button variant="solid" colorPalette="blue">
						Solid
					</Button>
					<Button variant="outline" colorPalette="green">
						Outline
					</Button>
					<Button variant="ghost" colorPalette="red">
						Ghost
					</Button>
					<Button variant="link" colorPalette="purple">
						Link
					</Button>
				</div>

				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Button size="xs">Extra Small</Button>
					<Button size="sm">Small</Button>
					<Button size="md">Medium</Button>
					<Button size="lg">Large</Button>
				</div>

				<div class={css({ display: "flex", gap: "4" })}>
					<Button loading loadingText="Loading...">
						Click me
					</Button>
					<Button loading>Spinner only</Button>
					<Button
						interactive
						onClick={() => alert("Button clicked!")}
						colorPalette="orange"
					>
						Interactive Alert
					</Button>
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
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Spinner Component Examples
				</Heading>
				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Spinner size="sm" />
					<Spinner size="md" />
					<Spinner size="lg" />
					<Spinner size="xl" />
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
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Switch Component Examples
				</Heading>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
					<Switch size="sm">Small</Switch>
					<Switch size="md">Medium</Switch>
					<Switch size="lg">Large</Switch>
				</div>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
					<Switch checked>Checked</Switch>
					<Switch disabled>Disabled</Switch>
					<Switch disabled checked>
						Disabled Checked
					</Switch>
				</div>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
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
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4" })}>
					Checkbox Component Examples
				</Heading>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
					<Checkbox size="sm">Small</Checkbox>
					<Checkbox size="md">Medium</Checkbox>
					<Checkbox size="lg">Large</Checkbox>
				</div>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
					<Checkbox checked>Checked</Checkbox>
					<Checkbox checked="indeterminate">Indeterminate</Checkbox>
					<Checkbox disabled>Disabled</Checkbox>
				</div>

				<div class={css({ display: "flex", gap: "8", alignItems: "center" })}>
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
								<Drawer.CloseTrigger asChild>
									<CloseButton size="sm" />
								</Drawer.CloseTrigger>
							</Drawer.Header>
							<Drawer.Body>
								<Text>This is the drawer body content.</Text>
							</Drawer.Body>
							<Drawer.Footer>
								<Drawer.CloseTrigger asChild>
									<Button variant="outline">Cancel</Button>
								</Drawer.CloseTrigger>
								<Button>Confirm</Button>
							</Drawer.Footer>
						</Drawer.Content>
					</Drawer.Positioner>
				</Drawer.Root>
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
		</div>,
	);
});
