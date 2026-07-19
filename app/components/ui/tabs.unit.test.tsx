import { describe, expect, test } from "bun:test";
import { Tabs } from "./tabs";

describe("Tabs Unit Tests", () => {
	test("should render compound API correctly", () => {
		const html = (
			<Tabs defaultValue="tab-1">
				<Tabs.List>
					<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
					<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>
				<Tabs.Content value="tab-1">Content 1</Tabs.Content>
				<Tabs.Content value="tab-2">Content 2</Tabs.Content>
			</Tabs>
		).toString();

		expect(html).toContain('data-part="root"');
		expect(html).toContain('data-part="list"');
		expect(html).toContain('data-part="trigger"');
		expect(html).toContain('data-value="tab-1"');
		expect(html).toContain('data-value="tab-2"');
		expect(html).toContain('data-part="indicator"');
		expect(html).toContain('data-part="content"');
		expect(html).toContain("Content 1");
		// Content 2 is inactive, but since lazyMount is not set, it is rendered in server primitives but has hidden and display: "none"
		expect(html).toContain("Content 2");
		expect(html).toContain('style="display:none"');
	});

	test("should support lazyMount correctly", () => {
		const html = (
			<Tabs defaultValue="tab-1" lazyMount>
				<Tabs.List>
					<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
					<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab-1">Content 1</Tabs.Content>
				<Tabs.Content value="tab-2">Content 2</Tabs.Content>
			</Tabs>
		).toString();

		expect(html).toContain("Content 1");
		// Since tab-2 is inactive and lazyMount is enabled, Content 2 should not be rendered
		expect(html).not.toContain("Content 2");
	});

	test("should render as an island when interactive", () => {
		const html = (
			<Tabs defaultValue="tab-1" interactive>
				<Tabs.List>
					<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
					<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="tab-1">Content 1</Tabs.Content>
			</Tabs>
		).toString();

		expect(html).toContain('data-hydrated="true"');
	});
});
