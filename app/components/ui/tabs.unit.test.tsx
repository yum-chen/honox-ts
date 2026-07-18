import { describe, expect, test } from "bun:test";
import { Tabs } from "./tabs";

describe("Tabs Unit Tests", () => {
	test("should render correctly under SSR", () => {
		const html = (
			<Tabs.Root defaultValue="react">
				<Tabs.List>
					<Tabs.Trigger value="react">React</Tabs.Trigger>
					<Tabs.Trigger value="vue">Vue</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>
				<Tabs.Content value="react">React Panel</Tabs.Content>
				<Tabs.Content value="vue">Vue Panel</Tabs.Content>
			</Tabs.Root>
		).toString();

		expect(html).toContain('data-scope="tabs"');
		expect(html).toContain('data-part="root"');
		expect(html).toContain('id="tabs-root-');
		expect(html).toContain("React Panel");
	});

	test("should support variant, size, and fitted props", () => {
		const html = (
			<Tabs.Root variant="subtle" size="lg" fitted>
				<Tabs.List>
					<Tabs.Trigger value="one">One</Tabs.Trigger>
				</Tabs.List>
			</Tabs.Root>
		).toString();

		expect(html).toContain('class="tabs__root');
	});
});
