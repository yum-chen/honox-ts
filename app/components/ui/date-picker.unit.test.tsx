import { expect, test } from "bun:test";
import { DatePicker } from "./date-picker";

test("DatePicker component renders correctly with default props", async () => {
	const result = (await DatePicker({
		interactive: false,
		placeholder: "Pick a date",
		defaultValue: ["2026-07-28"],
	})) as unknown as { toString: () => string };
	const htmlString = result.toString();

	// Verify Root element
	expect(htmlString).toContain('data-scope="date-picker"');
	expect(htmlString).toContain('data-part="root"');
	expect(htmlString).toContain('class="date-picker__root"');

	// Verify Input and label elements
	expect(htmlString).toContain('data-part="input"');
	expect(htmlString).toContain('placeholder="Pick a date"');
	expect(htmlString).toContain('value="2026-07-28"');
	expect(htmlString).toContain('data-part="label"');

	// Verify View hierarchy is rendered
	expect(htmlString).toContain('data-part="view"');
	expect(htmlString).toContain('data-view="day"');
	expect(htmlString).toContain('data-view="month"');
	expect(htmlString).toContain('data-view="year"');

	// Verify Tables are present with cell triggers
	expect(htmlString).toContain('data-part="table"');
	expect(htmlString).toContain('data-part="table-cell-trigger"');
});

test("DatePicker component sets attributes correctly for selected values", async () => {
	const result = (await DatePicker({
		interactive: false,
		defaultValue: ["2026-07-28"],
	})) as unknown as { toString: () => string };
	const htmlString = result.toString();

	// The day 28 should have the selected state attribute
	expect(htmlString).toContain('data-value="2026-07-28"');
});
