import { expect, test } from "bun:test";
import { interpolateBlock, interpolateValue, resolvePostValue } from "./pages";
import type { ComponentBlock } from "../components/block-types";

test("resolvePostValue handles fallback rules correctly", () => {
	const post = {
		author: "Jane Doe",
		authorLabel: "Jane Doe (Staff)",
	};

	expect(resolvePostValue("author", post)).toBe("Jane Doe");
	expect(resolvePostValue("authorLabel", post)).toBe("Jane Doe (Staff)");

	const postNoLabel = {
		author: "John Smith",
	};
	expect(resolvePostValue("author", postNoLabel)).toBe("John Smith");
	expect(resolvePostValue("authorLabel", postNoLabel)).toBe("John Smith");

	const postNoAuthor = {};
	expect(resolvePostValue("author", postNoAuthor)).toBe("Artefact Team");
	expect(resolvePostValue("authorLabel", postNoAuthor)).toBe("Artefact Team");
});

test("interpolateValue performs exact and partial interpolation", () => {
	const post = {
		author: "Jane Doe",
		title: "HonoX Guide",
	};

	expect(interpolateValue("{{post.author}}", undefined, post)).toBe("Jane Doe");
	expect(interpolateValue("/blog/by-author/{{post.author}}", undefined, post)).toBe("/blog/by-author/Jane Doe");
	expect(interpolateValue("No placeholders here", undefined, post)).toBe("No placeholders here");
});

test("interpolateValue preserves placeholders if context is missing", () => {
	const post = {
		author: "Jane Doe",
	};

	expect(interpolateValue("{{item.title}}", undefined, post)).toBe("{{item.title}}");
	expect(interpolateValue("/blog/by-tag/{{item.tag}}", undefined, post)).toBe("/blog/by-tag/{{item.tag}}");
	expect(interpolateValue("{{post.author}}", undefined, undefined)).toBe("{{post.author}}");
});

test("interpolateBlock recursively interpolates a block tree", () => {
	const post = {
		author: "Jane Doe",
	};

	const block: ComponentBlock = {
		blockType: "anchor",
		href: "/blog/by-author/{{post.author}}",
		title: "{{item.title}}",
		children: [
			{
				blockType: "avatar",
				name: "{{post.author}}",
			},
		],
	};

	// Pass post context but not item context
	const interpolatedPostOnly = interpolateBlock(block, undefined, post);
	expect(interpolatedPostOnly.href).toBe("/blog/by-author/Jane Doe");
	expect(interpolatedPostOnly.children?.[0].name).toBe("Jane Doe");
	expect(interpolatedPostOnly.title).toBe("{{item.title}}"); // Preserved

	// Now pass item context
	const interpolatedBoth = interpolateBlock(interpolatedPostOnly, { title: "My Title" }, post);
	expect(interpolatedBoth.href).toBe("/blog/by-author/Jane Doe");
	expect(interpolatedBoth.children?.[0].name).toBe("Jane Doe");
	expect(interpolatedBoth.title).toBe("My Title"); // Interpolated
});
