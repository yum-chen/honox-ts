import { expect, test, describe, mock } from "bun:test";
import { Dropdown } from "../app/components/ui/dropdown";

describe("Dropdown Unit Tests", () => {
	test("should render correctly", () => {
		const html = (
			<Dropdown.Root interactive={false}>
				<Dropdown.Trigger>Open</Dropdown.Trigger>
				<Dropdown.Positioner>
					<Dropdown.Content>
						<Dropdown.Item value="item-1">Item 1</Dropdown.Item>
					</Dropdown.Content>
				</Dropdown.Positioner>
			</Dropdown.Root>
		).toString();

		expect(html).toContain('data-part="trigger"');
		expect(html).toContain("Open");
		expect(html).toContain('role="menu"');
	});

	test("should render items correctly", () => {
		const html = (
			<Dropdown.Root interactive={false}>
				<Dropdown.Positioner>
					<Dropdown.Content>
						<Dropdown.Item value="item-1">Item 1</Dropdown.Item>
						<Dropdown.CheckboxItem value="item-2" checked>
							Item 2
						</Dropdown.CheckboxItem>
					</Dropdown.Content>
				</Dropdown.Positioner>
			</Dropdown.Root>
		).toString();

		expect(html).toContain('role="menuitem"');
		expect(html).toContain('data-value="item-1"');
		expect(html).toContain('role="menuitemcheckbox"');
		expect(html).toContain('aria-checked="true"');
	});

	test("should render a group with a label", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				items={[
					{
						type: "group",
						label: "Actions",
						items: [{ type: "item", label: "Edit", value: "edit" }],
					},
				]}
			/>
		).toString();

		expect(html).toContain('data-part="item-group"');
		expect(html).toContain("Actions");
		expect(html).toContain('data-value="edit"');
	});

	test("should render a cascading submenu as real nested trigger + content, not a disabled placeholder", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				items={[
					{
						type: "submenu",
						label: "More",
						items: [{ type: "item", label: "Nested", value: "nested" }],
					},
				]}
			/>
		).toString();

		expect(html).toContain('data-part="trigger-item"');
		expect(html).toContain('aria-haspopup="menu"');
		expect(html).toContain("More");
		expect(html).toContain('data-value="nested"');
		expect(html).not.toContain("data-disabled");
	});

	test("should render arrow and arrow tip when arrow is true", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				arrow={true}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('data-part="arrow"');
		expect(html).toContain('data-part="arrow-tip"');
	});

	test("should support placement and triggerMode attributes", () => {
		const html = (
			<Dropdown.Root
				interactive={true}
				trigger={<button>Open</button>}
				placement="bottomRight"
				triggerMode="hover"
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('data-part="trigger"');
		expect(html).toContain('role="menu"');
	});

	test("should render aria-disabled and data-disabled on the trigger when disabled", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				disabled
				trigger={<button type="button">Open</button>}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('aria-disabled="true"');
		expect(html).toContain('data-disabled=""');
	});

	test("should render a context-menu-only trigger as a context-trigger, not a button", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				trigger={<div>Right-click me</div>}
				triggerMode="contextDropdown"
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('data-part="context-trigger"');
		expect(html).not.toContain('data-part="trigger"');
	});

	test("should support a controlled open prop", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				open={true}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('data-state="open"');
	});

	// Refined API unit tests:

	test("should support arrow with pointAtCenter", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				arrow={{ pointAtCenter: true }}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('data-part="arrow"');
		expect(html).toContain('data-part="arrow-tip"');
	});

	test("should support customizing with classNames and styles", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				classNames={{
					root: "custom-root-class",
					item: "custom-item-class",
					itemTitle: "custom-title-class",
				}}
				styles={{
					root: { background: "red" },
					item: { color: "blue" },
				}}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain("custom-root-class");
		expect(html).toContain("custom-item-class");
		expect(html).toContain("background:red");
		expect(html).toContain("color:blue");
	});

	test("should respect destroyOnHidden / destroyPopupOnHide when open is false", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				open={false}
				destroyOnHidden={true}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).not.toContain('role="menu"');
		expect(html).not.toContain('data-value="item-1"');
	});

	test("should respect destroyOnHidden / destroyPopupOnHide when open is true", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				open={true}
				destroyOnHidden={true}
				items={[{ type: "item", label: "Item 1", value: "item-1" }]}
			/>
		).toString();

		expect(html).toContain('role="menu"');
		expect(html).toContain('data-value="item-1"');
	});

	test("should support menu prop as alternative to items and handle custom trigger formats", () => {
		const html = (
			<Dropdown.Root
				interactive={false}
				trigger={["hover", "contextMenu"]}
				menu={{
					items: [{ type: "item", label: "Menu Item", value: "menu-item" }],
				}}
			/>
		).toString();

		expect(html).toContain("Menu Item");
		expect(html).toContain('data-value="menu-item"');
	});
});