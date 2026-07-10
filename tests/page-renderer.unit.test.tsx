import { expect, test } from "bun:test";
import { PageRenderer } from "../app/components/page-renderer";

test("PageRenderer renders card and its children components correctly", () => {
	const content = [
		{
			type: "card",
			title: "Mountain Adventure",
			description: "Explore nature.",
			body: "Get ready for a nice trip.",
			children: [
				{
					type: "button",
					text: "Book Cabin",
					variant: "solid",
					colorPalette: "green"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Mountain Adventure");
	expect(html).toContain("Explore nature.");
	expect(html).toContain("Get ready for a nice trip.");
	expect(html).toContain("Book Cabin");
});

test("PageRenderer renders checkbox correctly", () => {
	const content = [
		{
			type: "checkbox",
			label: "Accept Terms",
			checked: true,
			colorPalette: "blue"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Accept Terms");
	expect(html).toContain("checkbox");
});

test("PageRenderer renders collapsible correctly", () => {
	const content = [
		{
			type: "collapsible",
			triggerText: "Click to reveal",
			showIndicator: true,
			children: [
				{
					type: "text",
					content: "Secret content"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Click to reveal");
	expect(html).toContain("Secret content");
});

test("PageRenderer renders combobox correctly", () => {
	const content = [
		{
			type: "combobox",
			label: "Select Tech",
			placeholder: "Choose...",
			items: [
				{ "label": "Hono", "value": "hono" },
				{ "label": "React", "value": "react" }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Select Tech");
	expect(html).toContain("Choose...");
	expect(html).toContain("Hono");
	expect(html).toContain("React");
});

test("PageRenderer renders dialog correctly", () => {
	const content = [
		{
			type: "dialog",
			title: "Confirm Action",
			description: "Are you sure?",
			triggerText: "Open Dialog",
			confirmText: "Yes",
			cancelText: "No"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Confirm Action");
	expect(html).toContain("Are you sure?");
	expect(html).toContain("Open Dialog");
	expect(html).toContain("Yes");
	expect(html).toContain("No");
});

test("PageRenderer renders drawer correctly", () => {
	const content = [
		{
			type: "drawer",
			title: "Sidebar",
			description: "Extra options.",
			triggerText: "Open Drawer",
			confirmText: "Save",
			cancelText: "Close"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Sidebar");
	expect(html).toContain("Extra options.");
	expect(html).toContain("Open Drawer");
	expect(html).toContain("Save");
	expect(html).toContain("Close");
});

test("PageRenderer renders paginated-table correctly", () => {
	const content = [
		{
			type: "paginatedTable",
			title: "User Directory"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Alice Johnson");
	expect(html).toContain("Bob Smith");
});

test("PageRenderer renders pagination correctly", () => {
	const content = [
		{
			type: "pagination",
			count: 50,
			pageSize: 10
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("nav");
	expect(html).toContain("1");
	expect(html).toContain("2");
});

test("PageRenderer renders popover correctly with children", () => {
	const content = [
		{
			type: "popover",
			triggerText: "Click Popover",
			title: "Popover Title",
			description: "Popover Desc",
			body: "Popover Body Text",
			children: [
				{
					type: "button",
					text: "Nested Popover Button"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Click Popover");
	expect(html).toContain("Popover Title");
	expect(html).toContain("Popover Desc");
	expect(html).toContain("Popover Body Text");
	expect(html).toContain("Nested Popover Button");
});

test("PageRenderer renders progress correctly", () => {
	const content = [
		{
			type: "progress",
			label: "Loading...",
			value: 40,
			min: 0,
			max: 100,
			showValueText: true,
			type: "linear"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Loading...");
	expect(html).toContain("40");
});

test("PageRenderer renders radio-group correctly", () => {
	const content = [
		{
			type: "radioGroup",
			label: "Choose option",
			items: [
				{ value: "opt1", label: "Option 1" },
				{ value: "opt2", label: "Option 2" }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Choose option");
	expect(html).toContain("Option 1");
	expect(html).toContain("Option 2");
});

test("PageRenderer renders segment-group correctly", () => {
	const content = [
		{
			type: "segmentGroup",
			label: "Fitted Segment",
			items: [
				{ value: "seg1", label: "Segment 1" },
				{ value: "seg2", label: "Segment 2" }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Segment 1");
	expect(html).toContain("Segment 2");
});

test("PageRenderer renders slider correctly", () => {
	const content = [
		{
			type: "slider",
			label: "Volume",
			value: 50,
			min: 0,
			max: 100,
			showValueText: true
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Volume");
	expect(html).toContain("50");
});

test("PageRenderer renders switch correctly", () => {
	const content = [
		{
			type: "switch",
			label: "Dark Mode",
			checked: true
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Dark Mode");
	expect(html).toContain("checkbox");
});

test("PageRenderer renders skeleton variants correctly", () => {
	const content = [
		{
			type: "skeleton",
			skeletonType: "default"
		},
		{
			type: "skeleton",
			skeletonType: "circle"
		},
		{
			type: "skeleton",
			skeletonType: "text",
			noOfLines: 4,
			gap: "3"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("skeleton");
});
