import { expect, test, describe } from "bun:test";
import { Dialog } from "../app/components/ui/dialog";

describe("Dialog Unit Tests", () => {
	test("should render flattened API correctly", () => {
		const html = (
			<Dialog
				trigger={<button type="button">Open</button>}
				title="Dialog Title"
				description="Dialog Description"
				body="Body content"
				cancel={<button type="button">Close</button>}
			/>
		).toString();

		expect(html).toContain('data-part="trigger"');
		expect(html).toContain("Open");
		expect(html).toContain('data-part="content"');
		expect(html).toContain("Dialog Title");
		expect(html).toContain("Dialog Description");
		expect(html).toContain("Body content");
		expect(html).toContain("Close");
		expect(html).toContain('data-part="close-trigger"');
	});

	test("should fall back to aria-label='dialog' when title and aria-label are omitted", () => {
		const html = (
			<Dialog
				trigger={<button type="button">Open</button>}
				body="Body content"
			/>
		).toString();

		// Since title is omitted, it should have fallback aria-label="dialog"
		expect(html).toContain('aria-label="dialog"');
		// It should not contain aria-labelledby
		expect(html).not.toContain("aria-labelledby");
	});

	test("should fall back to aria-label='alertdialog' when role='alertdialog' and title is omitted", () => {
		const html = (
			<Dialog
				role="alertdialog"
				trigger={<button type="button">Open</button>}
				body="Body content"
			/>
		).toString();

		// Should apply fallback aria-label="alertdialog"
		expect(html).toContain('aria-label="alertdialog"');
		// Should apply role="alertdialog"
		expect(html).toContain('role="alertdialog"');
	});

	test("should use explicit aria-label and omit aria-labelledby even if title is provided", () => {
		const html = (
			<Dialog
				aria-label="Custom Accessible Name"
				title="My Title"
				trigger={<button type="button">Open</button>}
				body="Body content"
			/>
		).toString();

		// Should use the custom aria-label
		expect(html).toContain('aria-label="Custom Accessible Name"');
		// Should NOT render aria-labelledby on Content
		// Wait, let's verify if the content tag has aria-labelledby
		// Since aria-label is present, hasAriaLabel is true, so content won't get aria-labelledby.
		// However, the title tag itself will still render with its ID. Let's make sure the content tag doesn't contain aria-labelledby.
		expect(html).not.toContain('aria-labelledby="dialog-');
	});
});
