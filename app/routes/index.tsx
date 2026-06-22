import { createRoute } from "honox/factory";
import { css } from "../../styled-system/css";
import { container, stack } from "../../styled-system/patterns";
import {
	Alert,
	AlertDescription,
	AlertIcon,
	AlertTitle,
} from "../components/ui/alert";
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
import { Heading } from "../components/ui/heading";
import { Text } from "../components/ui/text";
import Counter from "../islands/counter";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={container({ py: "12", maxW: "3xl" })}>
			<div class={stack({ gap: "8" })}>
				<header class={stack({ gap: "4" })}>
					<Badge
						variant="outline"
						size="lg"
						class={css({ alignSelf: "start" })}
					>
						Welcome to HonoX
					</Badge>
					<Heading as="h1" size="4xl" fontWeight="bold">
						Hello, {name}!
					</Heading>
					<Text size="lg" color="fg.muted">
						Experience the speed of Hono with the power of Panda CSS and Park
						UI.
					</Text>
				</header>

				<Alert>
					<AlertIcon>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<circle cx="12" cy="12" r="10" />
							<line x1="12" y1="16" x2="12" y2="12" />
							<line x1="12" y1="8" x2="12.01" y2="8" />
						</svg>
					</AlertIcon>
					<div class={stack({ gap: "1" })}>
						<AlertTitle>New version available!</AlertTitle>
						<AlertDescription>
							A new version of HonoX has been released. Check out the latest
							features.
						</AlertDescription>
					</div>
				</Alert>

				<Card>
					<CardHeader>
						<CardTitle>Interactive Island</CardTitle>
						<CardDescription>
							This counter is an island, meaning it's hydrated on the client.
						</CardDescription>
					</CardHeader>
					<CardBody>
						<Counter />
					</CardBody>
					<CardFooter class={stack({ direction: "row", gap: "3" })}>
						<Button variant="outline">Learn More</Button>
						<Button>Get Started</Button>
					</CardFooter>
				</Card>

				<section class={stack({ gap: "4" })}>
					<Heading as="h2" size="2xl">
						Features
					</Heading>
					<div
						class={css({
							display: "grid",
							gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
							gap: "4",
						})}
					>
						{[
							{ title: "Static Generation", desc: "Blazing fast performance" },
							{ title: "Type Safe", desc: "Full TypeScript support" },
							{ title: "Styled with Panda", desc: "Zero runtime CSS-in-JS" },
						].map((feature) => (
							<Card key={feature.title} variant="outline">
								<CardHeader>
									<CardTitle size="md">{feature.title}</CardTitle>
								</CardHeader>
								<CardBody>
									<Text size="sm">{feature.desc}</Text>
								</CardBody>
							</Card>
						))}
					</div>
				</section>
			</div>
		</div>,
		{ title: `Welcome ${name}` },
	);
});
