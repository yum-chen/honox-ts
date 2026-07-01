import { useState } from "hono/jsx";
import { css } from "../../styled-system/css";
import { Button } from "../components/ui/button";
import { Heading } from "../components/ui/heading";
import { Text } from "../components/ui/text";

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<div
			class={css({
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "4",
				p: "6",
				borderWidth: "1px",
				borderRadius: "l3",
				borderColor: "border.default",
				bg: "canvas",
			})}
		>
			<Heading as="h3" size="lg">
				Interactive Counter Island
			</Heading>
			<Text size="xl" class={css({ fontWeight: "bold" })}>
				Count: {count}
			</Text>
			<div class={css({ display: "flex", gap: "2" })}>
				<Button onClick={() => setCount(count - 1)} variant="outline">
					Decrement
				</Button>
				<Button onClick={() => setCount(count + 1)} colorPalette="blue">
					Increment
				</Button>
			</div>
		</div>
	);
}
