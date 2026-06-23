import { createRoute } from "honox/factory";
import Counter from "../islands/counter";
import { css } from "../../styled-system/css";
import { stack } from "../../styled-system/patterns";
import { Button } from "../components/ui/button";
import { Heading } from "../components/ui/heading";
import { Text } from "../components/ui/text";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={stack({ py: "12", px: "4", align: "center", gap: "8" })}>
			<title>{name}</title>
			<div class={stack({ gap: "2", textAlign: "center" })}>
				<Heading as="h1" size="4xl" fontWeight="bold">
					Hello, {name}!
				</Heading>
				<Text size="lg" color="fg.muted">
					Welcome to your new HonoX application powered by Park UI and Panda CSS.
				</Text>
			</div>

			<div class={css({ p: "6", bg: "bg.default", borderRadius: "l2", boxShadow: "sm", border: "1px solid", borderColor: "border.default" })}>
				<Counter />
			</div>

			<div class={stack({ direction: "row", gap: "4" })}>
				<Button variant="outline">Learn More</Button>
				<Button>Get Started</Button>
			</div>
		</div>,
	);
});
