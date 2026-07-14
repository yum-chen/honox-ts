import { expect, test } from "bun:test";
import { PageRenderer } from "../app/components/page-renderer";

test("PageRenderer renders grid (Row) and gridCol (Col) components correctly", () => {
	const content = [
		{
			type: "grid",
			align: "middle",
			justify: "center",
			gutter: "[16, 24]",
			wrap: false,
			children: [
				{
					type: "gridCol",
					span: 12,
					offset: 2,
					xs: 24,
					md: '{"span": 12, "offset": 2}',
					children: [
						{
							type: "button",
							text: "Grid Button",
							variant: "solid",
						}
					]
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	// Verify grid/Row class and attributes are rendered correctly
	expect(html).toContain("grid-row");
	expect(html).toContain("grid-row--align_middle");
	expect(html).toContain("grid-row--justify_center");
	expect(html).toContain("grid-row--wrap_false");

	// Verify gutter negative margins are calculated and applied
	expect(html).toContain("ml_-8px");
	expect(html).toContain("mr_-8px");
	expect(html).toContain("mt_-12px");
	expect(html).toContain("mb_-12px");

	// Verify gridCol/Col class and attributes are rendered correctly
	expect(html).toContain("grid-col");
	expect(html).toContain("grid-col--span_12");
	expect(html).toContain("grid-col--offset_2");

	// Verify responsive Col props (direct or parsed objects) are correctly resolved and rendered
	expect(html).toContain("grid-col--span_24"); // from xs=24
	expect(html).toContain("md:grid-col--span_12"); // from md: { span: 12 }
	expect(html).toContain("md:grid-col--offset_2"); // from md: { offset: 2 }

	// Verify child component in grid is rendered
	expect(html).toContain("Grid Button");
});

test("PageRenderer handles kebab-case aliases grid-row and grid-col", () => {
	const content = [
		{
			type: "grid-row",
			children: [
				{
					type: "grid-col",
					span: "6",
					children: [
						{
							type: "badge",
							text: "Grid Badge",
						}
					]
				}
			]
		}
	];

	const html = (<PageRenderer content={content} />).toString();

	expect(html).toContain("grid-row");
	expect(html).toContain("grid-col");
	expect(html).toContain("Grid Badge");
});
