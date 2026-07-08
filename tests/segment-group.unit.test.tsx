import { expect, test, describe } from "bun:test";
import { SegmentGroup } from "../app/components/ui/segment-group";

describe("SegmentGroup Unit Tests", () => {
	test("should render correctly", () => {
		const html = (
			<SegmentGroup defaultValue="react">
				<SegmentGroup.Indicator />
				<SegmentGroup.Item value="react">
					<SegmentGroup.ItemText>React</SegmentGroup.ItemText>
				</SegmentGroup.Item>
				<SegmentGroup.Item value="solid">
					<SegmentGroup.ItemText>Solid</SegmentGroup.ItemText>
				</SegmentGroup.Item>
			</SegmentGroup>
		).toString();

		expect(html).toContain('data-scope="segment-group"');
		expect(html).toContain('data-part="root"');
		expect(html).toContain('data-part="item"');
		expect(html).toContain('data-value="react"');
		expect(html).toContain('data-state="checked"');
		expect(html).toContain('data-value="solid"');
		expect(html).toContain('data-state="unchecked"');
		expect(html).toContain('data-part="indicator"');
	});

	test("should render as an island when interactive", () => {
		const html = (
			<SegmentGroup interactive defaultValue="react">
				<SegmentGroup.Items items={["react"]} />
			</SegmentGroup>
		).toString();

		expect(html).toContain('data-hydrated="true"');
	});

	test("should render items correctly via SegmentGroup.Items", () => {
		const html = (
			<SegmentGroup defaultValue="solid">
				<SegmentGroup.Items items={["react", "solid"]} />
			</SegmentGroup>
		).toString();

		expect(html).toContain('data-value="react" data-state="unchecked"');
		expect(html).toContain('data-value="solid" data-state="checked"');
	});
});
