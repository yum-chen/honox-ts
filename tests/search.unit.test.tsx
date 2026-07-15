import { expect, test } from "bun:test";
import Search from "../app/islands/search";

test("Search component renders default layout", () => {
	const html = (
		<Search placeholder="Type here to search..." />
	).toString();

	// Check that the basic search input structure is rendered
	expect(html).toContain('type="search"');
	expect(html).toContain('placeholder="Type here to search..."');
	expect(html).toContain('autocomplete="off"');
	expect(html).toContain("<input");
	expect(html).not.toContain('role="listbox"'); // Dropdown is hidden initially
});

test("Search component has custom endpoint default or specified", () => {
	const html = (
		<Search endpoint="/custom/posts.json" placeholder="Custom Search" />
	).toString();

	expect(html).toContain('placeholder="Custom Search"');
	expect(html).toContain('type="search"');
});
