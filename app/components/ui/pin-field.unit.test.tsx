import { describe, expect, test } from "bun:test";
import { PinField } from "./pin-field";

describe("PinField Unit Tests", () => {
	test("should render standard structure with default counts (4)", () => {
		const html = (
			<PinField
				id="pin-test"
				label="Verification Code"
				helperText="Check your phone for the code"
			/>
		).toString();

		// Check root element
		expect(html).toContain('id="pin-test"');
		expect(html).toContain('data-part="root"');

		// Check label
		expect(html).toContain("Verification Code");
		expect(html).toContain('id="pin-field::pin-test::label"');
		expect(html).toContain('for="pin-test-input-0"');

		// Check 4 inputs are rendered by default
		expect(html).toContain('id="pin-test-input-0"');
		expect(html).toContain('id="pin-test-input-1"');
		expect(html).toContain('id="pin-test-input-2"');
		expect(html).toContain('id="pin-test-input-3"');
		expect(html).not.toContain('id="pin-test-input-4"');

		// Check helper text
		expect(html).toContain("Check your phone for the code");
		expect(html).toContain('id="pin-field::pin-test::helper-text"');
	});

	test("should respect custom counts", () => {
		const html = (<PinField id="pin-6" count={6} />).toString();

		expect(html).toContain('id="pin-6-input-0"');
		expect(html).toContain('id="pin-6-input-4"');
		expect(html).toContain('id="pin-6-input-5"');
		expect(html).not.toContain('id="pin-6-input-6"');
	});

	test("should handle invalid state and error messages", () => {
		const html = (
			<PinField id="pin-err" invalid errorText="Incorrect verification code" />
		).toString();

		expect(html).toContain('data-invalid=""');
		expect(html).toContain("Incorrect verification code");
		expect(html).toContain('id="pin-field::pin-err::error-text"');
		expect(html).toContain('aria-invalid="true"');
		expect(html).toContain('aria-describedby="pin-field::pin-err::error-text"');
	});

	test("should respect password masking when mask is true", () => {
		const html = (<PinField id="pin-mask" mask />).toString();

		expect(html).toContain('type="password"');
	});

	test("should support validation with validator prop", () => {
		// Value length < 4, should trigger error text from custom validator function
		const html = (
			<PinField
				id="pin-val"
				value={["1", "2"]}
				validator={(val) => {
					if (val.length < 4) return "Code is too short";
					return true;
				}}
			/>
		).toString();

		expect(html).toContain("Code is too short");
		expect(html).toContain('aria-invalid="true"');
		expect(html).toContain('data-invalid=""');
	});
});
