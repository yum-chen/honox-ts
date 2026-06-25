import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import { Badge, Heading, Text } from "../components/ui";
import Counter from "../islands/counter";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={css({ py: "8", textAlign: "center" })}>
			<title>{name}</title>
			<Heading as="h1" class={css({ fontSize: "3xl", fontWeight: "bold" })}>
				Hello, {name}!
			</Heading>

			<div
				class={css({
					mt: "8",
					display: "flex",
					gap: "4",
					flexWrap: "wrap",
					justifyContent: "center",
				})}
			>
				<Heading as="h2" class={css({ fontSize: "xl", mb: "4", width: "100%" })}>
					Badge Component Examples
				</Heading>

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

			<div class={css({ mt: "8" })}>
				<Counter />
			</div>
		</div>,
	);
});
