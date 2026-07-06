import { expect, test } from "bun:test";
import { Collapsible } from "../app/components/ui/collapsible";
import { Button } from "../app/components/ui/button";

test("Collapsible renders with a string trigger", () => {
	const triggerText = "Toggle me";
	const contentText = "Hidden content";
	const html = (
		<Collapsible
			trigger={triggerText}
			content={<div>{contentText}</div>}
			interactive={false}
		/>
	).toString();

	expect(html).toContain(triggerText);
	expect(html).toContain(contentText);
	expect(html).toContain('data-part="trigger"');
	expect(html).toContain('data-part="content"');
});

test("Collapsible renders with a JSX trigger", () => {
	const contentText = "Hidden content";
	const html = (
		<Collapsible
			trigger={<Button>Click me</Button>}
			content={<div>{contentText}</div>}
			interactive={false}
		/>
	).toString();

	expect(html).toContain("Click me");
	expect(html).toContain(contentText);
	expect(html).toContain('data-part="trigger"');
});

test("Collapsible renders with an indicator", () => {
	const html = (
		<Collapsible
			trigger="Toggle"
			indicator={<span id="test-indicator">V</span>}
			content={<div>Content</div>}
			interactive={false}
		/>
	).toString();

	expect(html).toContain("Toggle");
	expect(html).toContain('id="test-indicator"');
	expect(html).toContain('data-part="indicator"');
});

test("Collapsible renders in interactive mode", () => {
	const html = (
		<Collapsible
			interactive
			trigger="Toggle"
			content={<div>Content</div>}
		/>
	).toString();

	// Interactive mode uses the island, which in SSR/SSG still renders its content
	expect(html).toContain("Toggle");
	expect(html).toContain("Content");
    // Should have data-scope="collapsible" from the island wrapper or primitive
	expect(html).toContain('data-scope="collapsible"');
});
