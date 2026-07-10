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

test("PageRenderer renders collapsible with custom trigger component correctly", () => {
	const content = [
		{
			type: "collapsible",
			trigger: [
				{
					type: "badge",
					text: "Custom Collapsible Trigger Badge"
				}
			],
			children: [
				{
					type: "text",
					content: "Secret content 2"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Custom Collapsible Trigger Badge");
	expect(html).toContain("Secret content 2");
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

test("PageRenderer renders dialog with custom trigger component correctly", () => {
	const content = [
		{
			type: "dialog",
			title: "Confirm Custom Action",
			description: "Custom sure?",
			trigger: [
				{
					type: "heading",
					text: "Custom Dialog Trigger Heading"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Confirm Custom Action");
	expect(html).toContain("Custom Dialog Trigger Heading");
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

test("PageRenderer renders drawer with custom trigger component correctly", () => {
	const content = [
		{
			type: "drawer",
			title: "Custom Sidebar",
			trigger: [
				{
					type: "button",
					text: "Custom Drawer Trigger Button"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Custom Sidebar");
	expect(html).toContain("Custom Drawer Trigger Button");
});

test("PageRenderer renders field correctly", () => {
	const content = [
		{
			type: "field",
			label: "Username",
			helperText: "Enter a unique username",
			errorText: "Username is taken",
			defaultValue: "john_doe"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Username");
	expect(html).toContain("Enter a unique username");
	expect(html).toContain("john_doe");
});

test("PageRenderer renders fieldset correctly", () => {
	const content = [
		{
			type: "fieldset",
			legend: "User details",
			helperText: "Provide accurate info",
			children: [
				{
					type: "field",
					label: "Email",
					defaultValue: "john@example.com"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("User details");
	expect(html).toContain("Provide accurate info");
	expect(html).toContain("Email");
	expect(html).toContain("john@example.com");
});

test("PageRenderer renders group correctly", () => {
	const content = [
		{
			type: "group",
			orientation: "vertical",
			attached: true,
			children: [
				{
					type: "button",
					text: "First Button"
				},
				{
					type: "button",
					text: "Second Button"
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("First Button");
	expect(html).toContain("Second Button");
});

test("PageRenderer renders hover-card correctly", () => {
	const content = [
		{
			type: "hover-card",
			triggerText: "Hover Me",
			title: "HoverCard Title",
			description: "HoverCard description detail"
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Hover Me");
	expect(html).toContain("HoverCard Title");
	expect(html).toContain("HoverCard description detail");
});

test("PageRenderer renders menu correctly", () => {
	const content = [
		{
			type: "menu",
			triggerText: "Options Menu",
			items: [
				{ type: "item", label: "Edit Profile", value: "edit" },
				{ type: "separator" },
				{ type: "checkbox", label: "Subscribe", value: "subscribe", checked: true }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Options Menu");
	expect(html).toContain("Edit Profile");
	expect(html).toContain("Subscribe");
});

test("PageRenderer renders paginatedTable correctly", () => {
	const content = [
		{
			type: "paginatedTable"
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("table");
});

test("PageRenderer renders pagination correctly", () => {
	const content = [
		{
			type: "pagination",
			count: 100,
			pageSize: 10,
			defaultPage: 1
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("nav");
});

test("PageRenderer renders popover correctly", () => {
	const content = [
		{
			type: "popover",
			triggerText: "Open Popover",
			title: "Popover Title",
			body: "Popover Body content info"
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("Open Popover");
	expect(html).toContain("Popover Title");
	expect(html).toContain("Popover Body content info");
});

test("PageRenderer renders progress correctly", () => {
	const content = [
		{
			type: "progress",
			label: "Downloading",
			value: 75,
			showValueText: true
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("Downloading");
});

test("PageRenderer renders radioGroup correctly", () => {
	const content = [
		{
			type: "radioGroup",
			label: "Options",
			items: [
				{ label: "Option A", value: "a" },
				{ label: "Option B", value: "b" }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("Options");
	expect(html).toContain("Option A");
	expect(html).toContain("Option B");
});

test("PageRenderer renders segmentGroup correctly", () => {
	const content = [
		{
			type: "segmentGroup",
			label: "View Mode",
			items: [
				{ label: "Grid", value: "grid" },
				{ label: "List", value: "list" }
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("View Mode");
	expect(html).toContain("Grid");
	expect(html).toContain("List");
});

test("PageRenderer renders slider correctly", () => {
	const content = [
		{
			type: "slider",
			label: "Volume",
			defaultValue: 50,
			showValueText: true
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("Volume");
});

test("PageRenderer renders switch correctly", () => {
	const content = [
		{
			type: "switch",
			label: "Enable notifications",
			defaultChecked: true
		}
	];

	const html = (<PageRenderer content={content} />).toString();
	expect(html).toContain("Enable notifications");
});

test("PageRenderer renders skeleton variants correctly", () => {
	const contentCircle = [
		{
			type: "skeleton",
			circle: true
		}
	];
	const contentText = [
		{
			type: "skeleton",
			noOfLines: 4
		}
	];
	const contentPlain = [
		{
			type: "skeleton",
			children: [
				{ type: "text", content: "Inside skeleton text" }
			]
		}
	];

	const htmlCircle = (<PageRenderer content={contentCircle} />).toString();
	const htmlText = (<PageRenderer content={contentText} />).toString();
	const htmlPlain = (<PageRenderer content={contentPlain} />).toString();

	// Check circles have circle variant
	expect(htmlCircle).toContain("skeleton");
	// Check text works
	expect(htmlText).toContain("skeleton");
	// Check children renders inside plain skeleton
	expect(htmlPlain).toContain("Inside skeleton text");
});
