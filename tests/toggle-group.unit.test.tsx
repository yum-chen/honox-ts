import { expect, test, describe } from "bun:test";
import { ToggleGroup } from "../app/components/ui/toggle-group";

describe("ToggleGroup Unit Tests", () => {
	test("should render correctly", () => {
		const html = (
			<ToggleGroup defaultValue={["react"]}>
				<ToggleGroup.Item value="react">React</ToggleGroup.Item>
				<ToggleGroup.Item value="solid">Solid</ToggleGroup.Item>
			</ToggleGroup>
		).toString();

		expect(html).toContain('data-scope="toggle-group"');
		expect(html).toContain('data-part="root"');
		expect(html).toContain('data-part="item"');
		expect(html).toContain('data-value="react"');
		expect(html).toContain('data-state="on"');
		expect(html).toContain('data-value="solid"');
		expect(html).toContain('data-state="off"');
	});

	test("should render as an island when interactive", () => {
		const html = (
			<ToggleGroup interactive defaultValue={["react"]}>
				<ToggleGroup.Item value="react">React</ToggleGroup.Item>
			</ToggleGroup>
		).toString();

		expect(html).toContain('data-hydrated="true"');
	});

    test("should handle multiple selection state correctly in primitive", () => {
        const html = (
			<ToggleGroup value={["react", "solid"]}>
				<ToggleGroup.Item value="react">React</ToggleGroup.Item>
				<ToggleGroup.Item value="solid">Solid</ToggleGroup.Item>
				<ToggleGroup.Item value="svelte">Svelte</ToggleGroup.Item>
			</ToggleGroup>
		).toString();

        expect(html).toContain('data-value="react" data-state="on"');
        expect(html).toContain('data-value="solid" data-state="on"');
        expect(html).toContain('data-value="svelte" data-state="off"');
    });
});
