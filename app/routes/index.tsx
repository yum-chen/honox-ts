import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import {
	Alert,
	AlertIcon,
	Badge,
	Field,
	Heading,
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
