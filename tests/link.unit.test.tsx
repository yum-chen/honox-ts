import { describe, expect, it } from "bun:test";
import { Link } from "../app/components/ui/link";

describe("Link component", () => {
	it("renders an anchor with the default (underline / blue) recipe classes", () => {
		const html = (<Link href="/home">Home</Link>).toString();
		expect(html).toContain("<a");
		expect(html).toContain("link--variant_underline");
		expect(html).toContain("link--colorPalette_blue");
		expect(html).toContain('href="/home"');
		expect(html).toContain("Home");
	});

	it("applies the plain variant and a custom colorPalette", () => {
		const html = (
			<Link href="/docs" variant="plain" colorPalette="green">
				Docs
			</Link>
		).toString();
		expect(html).toContain("link--variant_plain");
		expect(html).toContain("link--colorPalette_green");
	});

	it("adds rel=noopener noreferrer to external (target=_blank) links by default", () => {
		const html = (
			<Link href="https://example.com" target="_blank">
				External
			</Link>
		).toString();
		expect(html).toContain('target="_blank"');
		expect(html).toContain('rel="noopener noreferrer"');
	});

	it("does not override an explicit rel on external links", () => {
		const html = (
			<Link href="https://example.com" target="_blank" rel="noopener">
				External
			</Link>
		).toString();
		expect(html).toContain('rel="noopener"');
		expect(html).not.toContain('rel="noopener noreferrer"');
	});

	it("respects the `as` prop to change the rendered element", () => {
		const html = (
			<Link as="span" href="/x">
				Inline
			</Link>
		).toString();
		expect(html).toContain("<span");
		expect(html).not.toContain("<a");
	});

	it("merges styles onto a single child when asChild is set", () => {
		const html = (
			<Link asChild href="/dashboard">
				<span class="custom-link">Go</span>
			</Link>
		).toString();
		// No <a> is rendered; the child element receives the recipe classes.
		expect(html).not.toContain("<a");
		expect(html).toContain("<span");
		expect(html).toContain("link--variant_underline");
		expect(html).toContain("custom-link");
		expect(html).toContain('href="/dashboard"');
	});
});
