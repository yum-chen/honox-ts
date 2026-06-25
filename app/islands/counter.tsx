import { useState } from "hono/jsx";
import { css } from "styled-system/css";

export default function Counter() {
	const [count, setCount] = useState(0);
	return (
		<div>
			<p class={css({ py: "2", fontSize: "2xl" })}>{count}</p>
			<button
				type="button"
				onClick={() => setCount(count + 1)}
				class={css({
					px: "4",
					py: "2",
					bg: "orange.400",
					color: "white",
					rounded: "md",
					cursor: "pointer",
				})}
			>
				Increment
			</button>
		</div>
	);
}
