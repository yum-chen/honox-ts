import { expect, test, describe } from "bun:test";
import { Tooltip } from "../app/components/ui/tooltip";

describe("Tooltip Unit Tests", () => {
	test("should render basic structure under SSR", () => {
		const html = (
			<Tooltip content="Tooltip Content">
				<button type="button">Hover Me</button>
			</Tooltip>
		).toString();

		expect(html).toContain("Hover Me");
		// In default SSR, since tooltip open defaults to false, the positioner/content is not rendered.
		// However, it is wrapped in the relative display inline-block container.
		expect(html).toContain("inline-block");
	});

	test("should render content when open is true", () => {
		const html = (
			<Tooltip open={true} content="My Tooltip Content">
				<button type="button">Hover Me</button>
			</Tooltip>
		).toString();

		expect(html).toContain("My Tooltip Content");
		expect(html).toContain('role="tooltip"');
		expect(html).toContain('data-state="open"');
	});

	test("should render arrow when showArrow is true", () => {
		const html = (
			<Tooltip open={true} showArrow={true} content="With Arrow">
				<button type="button">Hover Me</button>
			</Tooltip>
		).toString();

		// Should contain class or part indicating arrow
		expect(html).toContain("tooltip__arrow");
		expect(html).toContain("tooltip__arrowTip");
	});

	test("should support different placements", () => {
		const placements = ["top", "bottom", "left", "right"] as const;

		for (const placement of placements) {
			const html = (
				<Tooltip open={true} placement={placement} content={`Placement ${placement}`}>
					<button type="button">Hover Me</button>
				</Tooltip>
			).toString();

			expect(html).toContain(`Placement ${placement}`);

			// Verify that positioning styles specific to the placement are rendered.
			if (placement === "bottom") {
				expect(html).toContain("top:100%");
				expect(html).toContain("translateY(8px)");
			} else if (placement === "left") {
				expect(html).toContain("right:100%");
				expect(html).toContain("translateX(-8px)");
			} else if (placement === "right") {
				expect(html).toContain("left:100%");
				expect(html).toContain("translateX(8px)");
			} else {
				// top
				expect(html).toContain("bottom:100%");
				expect(html).toContain("translateY(-8px)");
			}
		}
	});

	test("should merge custom classNames and styles on slots", () => {
		const html = (
			<Tooltip
				open={true}
				showArrow={true}
				content="Styled Tooltip"
				classNames={{
					root: "custom-root",
					trigger: "custom-trigger",
					positioner: "custom-positioner",
					content: "custom-content",
					arrow: "custom-arrow",
					arrowTip: "custom-arrow-tip",
				}}
				styles={{
					root: { border: "1px solid red" },
					content: { background: "blue" },
				}}
			>
				<button type="button">Hover Me</button>
			</Tooltip>
		).toString();

		expect(html).toContain("custom-root");
		expect(html).toContain("custom-trigger");
		expect(html).toContain("custom-positioner");
		expect(html).toContain("custom-content");
		expect(html).toContain("custom-arrow");
		expect(html).toContain("custom-arrow-tip");
		expect(html).toContain("border:1px solid red");
		expect(html).toContain("background:blue");
	});

	test("should merge triggers nicely using asChild", () => {
		const html = (
			<Tooltip
				asChild={true}
				content="With asChild"
				triggerProps={{
					class: "extra-trigger-class",
					style: { color: "green" },
				}}
			>
				<button type="button" class="child-btn" style={{ fontWeight: "bold" }}>
					Hover Me
				</button>
			</Tooltip>
		).toString();

		expect(html).toContain("child-btn");
		expect(html).toContain("extra-trigger-class");
		expect(html).toContain("color:green");
		expect(html).toContain("font-weight:bold");
	});
});
