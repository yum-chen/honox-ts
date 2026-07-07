import { describe, expect, it } from "vitest";
import { Breadcrumb } from "../app/components/ui/breadcrumb";

describe("Breadcrumb Unit Tests", () => {
	it("should render correctly with flattened API", async () => {
		const items = [
			{ label: "Home", href: "/" },
			{ label: "Components", href: "/components" },
			{ label: "Breadcrumb", current: true },
		];
		const html = (await Breadcrumb({ items })).toString();

		expect(html).toContain('aria-label="breadcrumb"');
		expect(html).toContain('href="/"');
		expect(html).toContain("Home");
		expect(html).toContain('href="/components"');
		expect(html).toContain("Components");
		expect(html).toContain('aria-current="page"');
		expect(html).toContain("Breadcrumb");
        // ChevronRightIcon should be there as default separator
        expect(html).toContain('viewBox="0 0 24 24"');
	});

	it("should use custom separator", async () => {
		const items = [
			{ label: "Home", href: "/" },
			{ label: "Breadcrumb", current: true },
		];
		const html = (await Breadcrumb({ items, separator: ">" })).toString();
		expect(html).toContain(">");
	});

    it("should apply variant and size", async () => {
        const items = [{ label: "Home", current: true }];
        const html = (await Breadcrumb({ items, variant: "underline", size: "sm" })).toString();
        expect(html).toContain('breadcrumb__root--variant_underline');
        expect(html).toContain('breadcrumb__root--size_sm');
    });
});
