import { expect, test } from "bun:test";
import { PageRenderer } from "../app/components/page-renderer";

test("PageRenderer renders field correctly with custom children and attributes", () => {
	const content = [
		{
			type: "field",
			label: "Username",
			helperText: "Enter a unique username",
			errorText: "Username is already taken",
			defaultValue: "john_doe",
			required: true,
			disabled: false,
			invalid: true,
			children: [
				{
					type: "button",
					text: "Check Availability",
					variant: "outline",
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Username");
	expect(html).toContain("Enter a unique username");
	expect(html).toContain("Username is already taken");
	expect(html).toContain("Check Availability");
	expect(html).toContain("data-invalid");
	expect(html).toContain("data-required");
});

test("PageRenderer renders fieldset correctly with legend and nested content", () => {
	const content = [
		{
			type: "fieldset",
			legend: "Contact Information",
			helperText: "Provide your current contact details",
			errorText: "Please fill out all required fields",
			invalid: true,
			children: [
				{
					type: "field",
					label: "Email Address",
					defaultValue: "user@example.com",
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Contact Information");
	expect(html).toContain("Provide your current contact details");
	expect(html).toContain("Please fill out all required fields");
	expect(html).toContain("Email Address");
	expect(html).toContain("user@example.com");
});

test("PageRenderer renders group correctly", () => {
	const content = [
		{
			type: "group",
			attached: true,
			grow: true,
			orientation: "horizontal",
			children: [
				{
					type: "button",
					text: "Left Option",
				},
				{
					type: "button",
					text: "Right Option",
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Left Option");
	expect(html).toContain("Right Option");
});

test("PageRenderer renders hover-card correctly with trigger, title, and description", () => {
	const content = [
		{
			type: "hover-card",
			triggerText: "Hover over me",
			showArrow: true,
			title: "User Profile",
			description: "Software Developer from San Francisco",
			children: [
				{
					type: "badge",
					text: "Active",
					colorPalette: "green",
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Hover over me");
	expect(html).toContain("User Profile");
	expect(html).toContain("Software Developer from San Francisco");
	expect(html).toContain("Active");
});

test("PageRenderer renders menu correctly with items", () => {
	const content = [
		{
			type: "menu",
			triggerText: "Options Menu",
			items: [
				{
					type: "item",
					label: "Edit Profile",
					value: "edit",
				},
				{
					type: "separator",
				},
				{
					type: "checkbox",
					label: "Receive Notifications",
					value: "notifications",
					checked: true,
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("Options Menu");
	expect(html).toContain("Edit Profile");
	expect(html).toContain("Receive Notifications");
});

test("PageRenderer renders flexbox grid components and parses responsive properties", () => {
	const content = [
		{
			type: "grid",
			align: "middle",
			justify: "center",
			gutter: "{\"base\": 8, \"md\": 16}",
			wrap: "false",
			children: [
				{
					type: "grid-col",
					span: "{\"base\": 24, \"md\": 12}",
					offset: "4",
					children: [
						{
							type: "text",
							content: "Grid Content",
						}
					]
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("grid-row");
	expect(html).toContain("grid-row--align_middle");
	expect(html).toContain("grid-row--justify_center");
	expect(html).toContain("grid-row--wrap_false");
	expect(html).toContain("ml_-4px");
	expect(html).toContain("md:ml_-8px");
	expect(html).toContain("grid-col");
	expect(html).toContain("grid-col--span_24");
	expect(html).toContain("md:grid-col--span_12");
	expect(html).toContain("grid-col--offset_4");
	expect(html).toContain("Grid Content");
});

test("PageRenderer renders CSS Grid components and parses responsive properties", () => {
	const content = [
		{
			type: "css-grid",
			columns: "{\"base\": 1, \"md\": 3}",
			gap: "4",
			children: [
				{
					type: "css-grid-item",
					colSpan: "{\"base\": 1, \"md\": 2}",
					rowSpan: "2",
					children: [
						{
							type: "text",
							content: "Flat Grid Content",
						}
					]
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("grid");
	expect(html).toContain("grid-tc_repeat(1,_minmax(0,_1fr))");
	expect(html).toContain("md:grid-tc_repeat(3,_minmax(0,_1fr))");
	expect(html).toContain("gap_4");
	expect(html).toContain("grid-c_span_1");
	expect(html).toContain("md:grid-c_span_2");
	expect(html).toContain("grid-r_span_2");
	expect(html).toContain("Flat Grid Content");
});
