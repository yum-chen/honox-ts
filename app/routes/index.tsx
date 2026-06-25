import { createRoute } from "honox/factory";
import Counter from "../islands/counter";
import { Badge } from "../components/ui/badge";
import { css } from "../../styled-system/css";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={css({ py: "8", textAlign: "center" })}>
			<title>{name}</title>
			<h1 class={css({ fontSize: "3xl", fontWeight: "bold" })}>
				Hello, {name}!
			</h1>

			<div class={css({ mt: "8", display: "flex", gap: "4", flexWrap: "wrap", justifyContent: "center" })}>
				<h2 class={css({ fontSize: "xl", mb: "4", width: "100%" })}>Badge Component Examples</h2>

				{/* Variant examples */}
				<Badge variant="solid" colorPalette="blue">Solid</Badge>
				<Badge variant="subtle" colorPalette="green">Subtle</Badge>
				<Badge variant="outline" colorPalette="red">Outline</Badge>
				<Badge variant="surface" colorPalette="purple">Surface</Badge>

				{/* Size examples */}
				<Badge size="sm" colorPalette="blue">Small</Badge>
				<Badge size="md" colorPalette="blue">Medium</Badge>
				<Badge size="lg" colorPalette="blue">Large</Badge>
				<Badge size="xl" colorPalette="blue">XL</Badge>
				<Badge size="2xl" colorPalette="blue">2XL</Badge>
			</div>

			<div class={css({ mt: "8" })}>
				<Counter />
			</div>
		</div>,
	);
});
