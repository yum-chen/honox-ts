import { createRoute } from "honox/factory";
import Counter from "../islands/counter";
import { css } from "../../styled-system/css";

export default createRoute((c) => {
	const name = c.req.query("name") ?? "Hono";
	return c.render(
		<div class={css({ py: "8", textAlign: "center" })}>
			<title>{name}</title>
			<h1 class={css({ fontSize: "3xl", fontWeight: "bold" })}>
				Hello, {name}!
			</h1>
			<Counter />
		</div>,
	);
});
