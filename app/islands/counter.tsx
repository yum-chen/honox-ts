import { useState } from "hono/jsx";
import { stack } from "../../styled-system/patterns";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div class={stack({ align: "center", gap: "4" })}>
			<Text size="5xl" fontWeight="bold">
				{count}
			</Text>
			<Button type="button" onClick={() => setCount(count + 1)} size="xl">
				Increment
			</Button>
		</div>
	);
}
