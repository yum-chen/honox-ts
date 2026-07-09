import { expect, test, describe } from "bun:test";
import { TagsInput } from "../app/components/ui/tags-input";

describe("TagsInput Unit Tests", () => {
	test("should render correctly with flattened API", () => {
		const html = (
			<TagsInput defaultValue={["React", "Solid"]} placeholder="Add tag" />
		).toString();

		expect(html).toContain('data-part="root"');
		expect(html).toContain('data-part="control"');
		expect(html).toContain('data-part="input"');
		expect(html).toContain('placeholder="Add tag"');
		expect(html).toContain('data-value="React"');
		expect(html).toContain('data-value="Solid"');
	});

	test("should render as an island when interactive", () => {
		const html = (
			<TagsInput defaultValue={["React"]} interactive={true} />
		).toString();

		expect(html).toContain('data-hydrated="true"');
	});

	test("should not render as an island when not interactive", () => {
		const html = (
			<TagsInput defaultValue={["React"]} interactive={false} />
		).toString();

		expect(html).not.toContain('data-hydrated="true"');
	});

	test("should handle size variant props correctly", () => {
		const html = (
			<TagsInput defaultValue={["React"]} size="xs" />
		).toString();

		expect(html).toContain('data-part="root"');
	});
});
