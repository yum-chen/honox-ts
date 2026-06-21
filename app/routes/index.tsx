import { createRoute } from "honox/factory";
import { center, container, stack } from "../../styled-system/patterns";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
	Card,
	CardBody,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../components/ui/card";
import { Text } from "../components/ui/text";
import Counter from "../islands/counter";
import Navigation from "../islands/navigation";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={container({ py: "12" })}>
			<title>{name}</title>
			<div class={stack({ gap: "8", align: "center" })}>
				<div class={stack({ gap: "3", align: "center" })}>
					<Badge variant="outline" size="lg">
						Powered by Park UI
					</Badge>
					<Text as="h1" variant="heading" size="4xl" fontWeight="bold">
						Hello, {name}!
					</Text>
					<Text color="fg.muted" size="lg" textAlign="center" maxW="md">
						Experience the power of HonoX combined with the beautiful design
						system of Park UI.
					</Text>
				</div>

				<Card width="full" maxW="md">
					<CardHeader>
						<CardTitle>Interactive Counter</CardTitle>
						<CardDescription>
							This is a HonoX island using Park UI styling.
						</CardDescription>
					</CardHeader>
					<CardBody>
						<div class={center()}>
							<Counter />
						</div>
					</CardBody>
					<CardFooter justifyContent="flex-end">
						<Button variant="outline" size="sm">
							Learn More
						</Button>
					</CardFooter>
				</Card>

				<div class={stack({ direction: "row", gap: "4" })}>
					<Button size="lg">Get Started</Button>
					<Button variant="ghost" size="lg">
						Documentation
					</Button>
				</div>

				<div class={center()}>
					<Navigation />
				</div>
			</div>
		</div>,
	);
});
