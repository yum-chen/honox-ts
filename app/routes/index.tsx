import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import {
	Alert,
	AlertIcon,
	Badge,
	Button,
	ButtonGroup,
	CloseButton,
	Field,
	Heading,
	IconButton,
	Spinner,
	Text,
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

				<div class={css({ display: "flex", gap: "4", flexWrap: "wrap", justifyContent: "center" })}>
					<Button variant="solid" colorPalette="blue">Solid Blue</Button>
					<Button variant="outline" colorPalette="green">Outline Green</Button>
					<Button variant="subtle" colorPalette="red">Subtle Red</Button>
					<Button variant="surface" colorPalette="purple">Surface Purple</Button>
					<Button variant="plain">Plain</Button>
				</div>

				<div class={css({ display: "flex", gap: "4", alignItems: "center" })}>
					<Button loading loadingText="Saving...">Save</Button>
					<Button interactive onclick="alert('Hello!')">Interactive</Button>
					<IconButton aria-label="Search">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
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
					gap: "4",
					flexWrap: "wrap",
					justifyContent: "center",
				})}
			>
				<Heading
					as="h2"
					class={css({ fontSize: "xl", mb: "4", width: "100%" })}
				>
					Badge Component Examples
				</Heading>

				<Badge variant="solid" colorPalette="blue">
					Solid
				</Badge>
				<Badge variant="subtle" colorPalette="green">
					Subtle
				</Badge>
				<Badge variant="outline" colorPalette="red">
					Outline
				</Badge>
				<Badge variant="surface" colorPalette="purple">
					Surface
				</Badge>
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
				<h2 class={css({ fontSize: "xl", mb: "4" })}>
					Field Component Examples
				</h2>

				<Field>
					<label>Username *</label>
					<input
						type="text"
						placeholder="Enter your username"
						class={css({
							borderWidth: "1px",
							borderColor: "border",
							borderRadius: "md",
							px: "3",
							py: "2",
						})}
					/>
					<div>Keep it unique.</div>
				</Field>

				<Field>
					<label>Email</label>
					<input
						type="email"
						placeholder="Enter your email"
						class={css({
							borderWidth: "1px",
							borderColor: "border.error",
							borderRadius: "md",
							px: "3",
							py: "2",
						})}
					/>
					<div>Invalid email address.</div>
				</Field>
			</div>
		</div>,
	);
});
