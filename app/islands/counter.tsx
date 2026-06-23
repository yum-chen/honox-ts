import { useState } from "hono/jsx";
import { Button } from "../components/ui/button";
import { Text } from "../components/ui/text";
import { stack } from "../../styled-system/patterns";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div class={stack({ align: "center", gap: "4" })}>
			<Text size="3xl" fontWeight="semibold">{count}</Text>
			<Button
				type="button"
				onClick={() => setCount(count + 1)}
			>
				Increment
			</Button>
		</div>
	);
}
