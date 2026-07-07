import { expect, test, describe } from "bun:test";
import { Breadcrumb } from "../app/components/ui/breadcrumb";

describe("Breadcrumb Unit Tests", () => {
	test("Breadcrumb component exists", () => {
		expect(Breadcrumb).toBeDefined();
	});

	test("Breadcrumb primitives are attached", () => {
		expect(Breadcrumb.Root).toBeDefined();
		expect(Breadcrumb.List).toBeDefined();
		expect(Breadcrumb.Item).toBeDefined();
		expect(Breadcrumb.Link).toBeDefined();
		expect(Breadcrumb.Separator).toBeDefined();
		expect(Breadcrumb.Ellipsis).toBeDefined();
	});

	test("Breadcrumb renders with flattened API structure", () => {
		const items = [
			{ label: "Home", href: "/" },
			{ label: "Components", href: "/components" },
			{ label: "Breadcrumb" },
		];

		const breadcrumb = Breadcrumb({ items });
		expect(breadcrumb).toBeDefined();
		expect(typeof breadcrumb).toBe("object");
	});
});
