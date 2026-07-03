import { createRoute } from "honox/factory";
import {
	Content,
	Positioner,
	Root,
	Trigger,
} from "../components/ui/hover-card";

export default createRoute((c) => {
	return c.render(
		<div style={{ padding: "2rem" }}>
			<h1>HoverCard Test Page</h1>

			<Root openDelay={100} closeDelay={100} interactive>
				<Trigger
					id="trigger"
					style={{
						padding: "1rem",
						background: "#f0f0f0",
						display: "inline-block",
					}}
				>
					Hover over me
				</Trigger>

				<Positioner>
					<Content
						id="content"
						style={{
							padding: "1rem",
							background: "white",
							border: "1px solid #ccc",
						}}
					>
						Hover card content
					</Content>
				</Positioner>
			</Root>
		</div>,
	);
});
