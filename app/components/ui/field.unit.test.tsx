import { expect, test } from "bun:test";
import { Field } from "./field";

test("Field - Flattened API renders basic structure", () => {
	const html = (
		<Field
			id="test-field"
			label="Username"
			helperText="Choose a unique username"
			defaultValue="jules"
		/>
	).toString();

	// Verify label rendering
	expect(html).toContain("Username");
	expect(html).toContain('id="field::test-field::label"');
	expect(html).toContain('for="test-field"');

	// Verify input rendering
	expect(html).toContain('<input id="test-field"');
	expect(html).toContain('value="jules"');

	// Verify helper text rendering
	expect(html).toContain("Choose a unique username");
	expect(html).toContain('id="field::test-field::helper-text"');
});

test("Field - JSX errorText is rendered and announced", () => {
	const html = (
		<Field
			id="jsx-error-field"
			label="Username"
			invalid
			errorText={<span>Username is taken</span>}
		/>
	).toString();

	expect(html).toContain("Username is taken");
	expect(html).toContain('aria-live="polite"');
	expect(html).toContain('id="field::jsx-error-field::error-text"');
	expect(html).toContain(
		'aria-describedby="field::jsx-error-field::error-text"',
	);
});

test("Field - Flattened API validation (minLength)", () => {
	const html = (
		<Field
			id="validate-field"
			label="Username"
			helperText="Choose a unique username"
			defaultValue="ab"
			minLength={5}
		/>
	).toString();

	// Verify error message for minLength validation
	expect(html).toContain("Must be at least 5 characters");
	expect(html).toContain('aria-invalid="true"');
	expect(html).toContain('data-invalid=""');
});

test("Field - Supports type prop", () => {
	const html = (
		<Field id="password-field" label="Password" type="password" />
	).toString();

	expect(html).toContain('type="password"');
});

test("Field - Correctly priorities value over defaultValue on SSR", () => {
	const html = (
		<Field
			id="ssr-value-field"
			label="Input"
			value="controlled-val"
			defaultValue="default-val"
		/>
	).toString();

	expect(html).toContain('value="controlled-val"');
	expect(html).not.toContain('value="default-val"');
});

test("Field - Compound API propagation (Field.Input & Field.Textarea)", () => {
	const htmlInput = (
		<Field
			id="compound-input"
			disabled
			required
			invalid
			helperText="Helper info"
			errorText="Error info"
		>
			<Field.Label>Compound Label</Field.Label>
			<Field.Input value="nested-val" />
			<Field.HelperText>Helper info</Field.HelperText>
			<Field.ErrorText>Error info</Field.ErrorText>
		</Field>
	).toString();

	// Verify input receives context values
	expect(htmlInput).toContain('id="compound-input"');
	expect(htmlInput).toContain('disabled=""');
	expect(htmlInput).toContain('required=""');
	expect(htmlInput).toContain('aria-invalid="true"');
	expect(htmlInput).toContain('value="nested-val"');
	expect(htmlInput).toContain('aria-describedby="field::compound-input::helper-text field::compound-input::error-text"');

	const htmlTextarea = (
		<Field
			id="compound-textarea"
			disabled
			required
			invalid
			helperText="Helper info"
			errorText="Error info"
		>
			<Field.Label>Compound Textarea Label</Field.Label>
			<Field.Textarea value="nested-area-val" />
		</Field>
	).toString();

	// Verify textarea receives context values
	expect(htmlTextarea).toContain('id="compound-textarea"');
	expect(htmlTextarea).toContain('disabled=""');
	expect(htmlTextarea).toContain('required=""');
	expect(htmlTextarea).toContain('aria-invalid="true"');
	expect(htmlTextarea).toContain("nested-area-val");
	expect(htmlTextarea).toContain('aria-describedby="field::compound-textarea::helper-text field::compound-textarea::error-text"');
});
