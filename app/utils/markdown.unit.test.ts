import { expect, test } from "bun:test";
import { markdownToHtml } from "./markdown";

test("markdownToHtml converts a GFM pipe table", () => {
	const markdown = [
		"| Prop | Type | Description |",
		"| :--- | :--- | :--- |",
		"| `size` | `string` | The size. |",
		'| `variant` | `"solid" \\| "outline"` | The variant. |',
	].join("\n");

	const html = markdownToHtml(markdown);

	expect(html).toContain("<table>");
	expect(html).toContain('<th style="text-align:left">Prop</th>');
	expect(html).toContain('<td style="text-align:left"><code>size</code></td>');
	expect(html).toContain('<code>"solid" | "outline"</code>');
	expect(html).not.toContain("<p>|");
});

test("markdownToHtml leaves non-table pipe text alone", () => {
	const html = markdownToHtml("Use `a | b` inside a sentence.");
	expect(html).not.toContain("<table>");
	expect(html).toContain("<code>a | b</code>");
});

test("markdownToHtml preserves multi-line fenced code blocks and escapes markup", () => {
	const markdown = [
		"```tsx",
		'import { Button } from "../components/ui";',
		"",
		"export default function MyPage() {",
		"  return (",
		'    <Button variant="solid">Click me</Button>',
		"  );",
		"}",
		"```",
	].join("\n");

	const html = markdownToHtml(markdown);

	expect(html).toContain('<pre><code class="language-tsx">');
	expect(html).toContain("export default function MyPage() {");
	expect(html).toContain(
		'&lt;Button variant="solid"&gt;Click me&lt;/Button&gt;',
	);
	expect(html).not.toContain("<p>export default function");
});

test("markdownToHtml converts a multi-line blockquote into one <blockquote>", () => {
	const markdown = [
		"> Every component's hydration behaviour funnels through the `shouldHydrate`",
		"> predicate — see [Hydration](/docs/Hydration) for details.",
	].join("\n");

	const html = markdownToHtml(markdown);

	expect(html).toContain("<blockquote><p>");
	expect(html).toContain(
		"Every component's hydration behaviour funnels through the <code>shouldHydrate</code> predicate",
	);
	expect(html).toContain('<a href="/docs/Hydration">Hydration</a>');
	expect(html).not.toContain("&gt;");
	// The two source lines collapse into one blockquote, not two.
	expect(html.match(/<blockquote>/g)?.length).toBe(1);
});

test("markdownToHtml converts a horizontal rule to <hr />", () => {
	const markdown = ["## Section one", "", "---", "", "## Section two"].join(
		"\n",
	);

	const html = markdownToHtml(markdown);

	expect(html).toContain("<hr />");
	expect(html).not.toContain("<p>---</p>");
});
