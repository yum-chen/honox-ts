import { expect, test, describe } from "bun:test";
import { Drawer } from "../app/components/ui/drawer";

describe("Drawer Unit Tests", () => {
	test("should render flattened API correctly", () => {
		const html = (
			<Drawer
				trigger={<button type="button">Open</button>}
				title="Drawer Title"
				description="Drawer Description"
				body="Body content"
				footer={<button type="button">Close</button>}
			/>
		).toString();

		expect(html).toContain('data-part="trigger"');
		expect(html).toContain("Open");
		expect(html).toContain('data-part="content"');
		expect(html).toContain("Drawer Title");
		expect(html).toContain("Drawer Description");
		expect(html).toContain("Body content");
		expect(html).toContain("Close");
	});

	test("should render primitive API correctly via namespace", () => {
		const html = (
			<Drawer.Root>
				<Drawer.Trigger>Open</Drawer.Trigger>
				<Drawer.Backdrop />
				<Drawer.Positioner>
					<Drawer.Content>
						<Drawer.Header>
							<Drawer.Title>Title</Drawer.Title>
						</Drawer.Header>
						<Drawer.Body>Content</Drawer.Body>
					</Drawer.Content>
				</Drawer.Positioner>
			</Drawer.Root>
		).toString();

		expect(html).toContain('data-part="trigger"');
		expect(html).toContain("Open");
		expect(html).toContain('data-part="backdrop"');
		expect(html).toContain('data-part="content"');
		expect(html).toContain("Title");
		expect(html).toContain("Content");
	});
});
