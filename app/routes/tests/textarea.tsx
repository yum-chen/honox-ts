import { Textarea } from "../../components/ui";

export default function TestTextareaPage() {
	return (
		<div
			style={{
				padding: "2rem",
				display: "flex",
				flexDirection: "column",
				gap: "2rem",
			}}
		>
			<section>
				<h2>Static Textarea</h2>
				<Textarea
					id="static-textarea"
					label="Static Label"
					placeholder="Static Placeholder"
				/>
			</section>

			<section>
				<h2>Interactive Textarea</h2>
				<Textarea
					id="interactive-textarea"
					label="Interactive Label"
					placeholder="Type something..."
					interactive
				/>
			</section>

			<section>
				<h2>Textarea with Validation (minLength)</h2>
				<Textarea
					id="validation-textarea"
					label="Min 10 characters"
					minLength={10}
					errorText="Too short!"
					interactive
				/>
			</section>

			<section>
				<h2>Controlled Textarea</h2>
				<Textarea
					id="controlled-textarea"
					label="Controlled"
					value="Initial value"
					interactive
				/>
			</section>

			<section>
				<h2>Custom Validator</h2>
				<Textarea
					id="custom-validator-textarea"
					label="Must contain 'hono'"
					validator={(val) => val.includes("hono") || "Must contain 'hono'"}
					interactive
				/>
			</section>
		</div>
	);
}
