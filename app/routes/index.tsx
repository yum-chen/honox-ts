import { createRoute } from "honox/factory";
import Counter from "../islands/counter";
import { Container } from "../components/ui/container";
import { Heading } from "../components/ui/heading";
import { Text } from "../components/ui/text";
import { Stack } from "../components/ui/stack";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<Container py="12">
			<Stack gap="8" align="center">
				<Stack gap="3" align="center">
					<Heading as="h1" size="4xl">
						Hello, {name}!
					</Heading>
					<Text size="lg" color="fg.muted">
						Welcome to your Park UI powered HonoX app.
					</Text>
				</Stack>
				<Counter />
			</Stack>
		</Container>,
	);
});
