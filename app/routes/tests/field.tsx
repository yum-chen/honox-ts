import { Field } from "../../components/ui";

export default function TestFieldPage() {
	return (
		<div style={{ padding: "2rem" }}>
			<h1>Field Test Page</h1>
			<div style={{ marginTop: "2rem" }}>
				{/* Basic Field */}
				<section>
					<h2>Basic Field</h2>
					<Field
						label="Basic Label"
						helperText="Basic Helper"
						placeholder="Basic Placeholder"
					/>
				</section>

				{/* Disabled Field */}
				<section>
					<h2>Disabled Field</h2>
					<Field
						label="Disabled Label"
						helperText="Disabled Helper"
						placeholder="Disabled Placeholder"
						disabled
					/>
				</section>

				{/* ReadOnly Field */}
				<section>
					<h2>ReadOnly Field</h2>
					<Field
						label="ReadOnly Label"
						helperText="ReadOnly Helper"
						placeholder="ReadOnly Placeholder"
						readOnly
					/>
				</section>

				{/* MinLength Validation - using value prop for SSR validation */}
				<section>
					<h2>MinLength Validation</h2>
					<Field
						label="MinLength Label"
						helperText="Must be at least 5 characters"
						placeholder="MinLength Placeholder"
						minLength={5}
						value="abc"
					/>
				</section>

				{/* Custom Validator */}
				<section>
					<h2>Custom Validator</h2>
					<Field
						label="Validator Label"
						helperText="Email input"
						placeholder="Validator Placeholder"
						validator={(value: string) => {
							if (value && !value.includes("@")) {
								return "Invalid email";
							}
							return true;
						}}
						value="invalid-email"
					/>
				</section>
			</div>
		</div>
	);
}
