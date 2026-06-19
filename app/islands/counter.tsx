import { useState } from "hono/jsx";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";
import { Stack } from "../components/ui/stack";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<Stack gap="4" align="center">
			<Text size="3xl" weight="bold">
				{count}
			</Text>
			<Stack direction="row" gap="2">
				<Button onClick={() => setCount(count + 1)}>Increment</Button>
				<Button variant="outline" onClick={() => setCount(0)}>
					Reset
				</Button>
			</Stack>
		</Stack>
	);
}
