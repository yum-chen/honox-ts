import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertIndicator,
	AlertTitle,
	Badge,
	Field,
	FieldErrorText,
	FieldHelperText,
	FieldLabel,
	FieldRequiredIndicator,
	Heading,
	Text,
} from "../components/ui";
import Counter from "../islands/counter";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={css({ py: "8", textAlign: "center" })}>
			<title>{name}</title>
			<h1 class={css({ fontSize: "3xl", fontWeight: "bold" })}>
				Hello, {name}!
			</h1>

			<div
				class={css({
					mt: "8",
					display: "flex",
					gap: "4",
					flexWrap: "wrap",
					justifyContent: "center",
				})}
			>
				<h2 class={css({ fontSize: "xl", mb: "4", width: "100%" })}>
					Badge Component Examples
				</h2>

				{/* Variant examples */}
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

				{/* Size examples */}
				<Badge size="sm" colorPalette="blue">
					Small
				</Badge>
				<Badge size="md" colorPalette="blue">
					Medium
				</Badge>
				<Badge size="lg" colorPalette="blue">
					Large
				</Badge>
				<Badge size="xl" colorPalette="blue">
					XL
				</Badge>
				<Badge size="2xl" colorPalette="blue">
					2XL
				</Badge>
			</div>

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
					Heading 1 (Text size="4xl" variant="heading")
				</Text>

				<Text as="p" size="lg" class={css({ color: "fg.muted" })}>
					Large paragraph (Text size="lg")
				</Text>

				<Text
					as="span"
					size="sm"
					class={css({ color: "blue.500", textDecoration: "underline" })}
				>
					Small underlined span text
				</Text>

				<Text variant="label">Label variant text (Text variant="label")</Text>
			</div>

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
					Heading Component Examples
				</h2>

				<Heading as="h1" size="5xl">
					Heading 1 (size="5xl")
				</Heading>

				<Heading as="h2" size="3xl">
					Heading 2 (size="3xl")
				</Heading>

				<Heading as="h3" size="xl">
					Heading 3 (size="xl")
				</Heading>
			</div>

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

				<Alert status="info">
					<AlertIndicator />
					<AlertContent>
						<AlertTitle>Info Alert</AlertTitle>
						<AlertDescription>This is an informational alert.</AlertDescription>
					</AlertContent>
				</Alert>

				<Alert status="success" variant="solid">
					<AlertIndicator />
					<AlertContent>
						<AlertTitle>Success Alert</AlertTitle>
						<AlertDescription>
							Operation completed successfully!
						</AlertDescription>
					</AlertContent>
				</Alert>

				<Alert status="error" variant="outline">
					<AlertIndicator />
					<AlertContent>
						<AlertTitle>Error Alert</AlertTitle>
						<AlertDescription>Something went wrong.</AlertDescription>
					</AlertContent>
				</Alert>
			</div>

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
					<FieldLabel>
						Username <FieldRequiredIndicator />
					</FieldLabel>
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
					<FieldHelperText>Keep it unique.</FieldHelperText>
				</Field>

				<Field>
					<FieldLabel>Email</FieldLabel>
					<input
						type="email"
						placeholder="Enter your email"
						class={css({
							borderWidth: "1px",
							borderColor: "error",
							borderRadius: "md",
							px: "3",
							py: "2",
						})}
					/>
					<FieldErrorText>Invalid email address.</FieldErrorText>
				</Field>
			</div>

			<div class={css({ mt: "8" })}>
				<Counter />
			</div>
		</div>,
	);
});
