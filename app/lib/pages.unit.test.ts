import { expect, test, describe } from "bun:test";
import { interpolateBlock } from "./pages";

describe("interpolateBlock", () => {
	test("correctly interpolates post context and authorLabel", () => {
		const block = {
			blockType: "anchor",
			href: "/blog/by-author/{{post.authorLabel}}",
			children: [
				{
					blockType: "avatar",
					size: "md",
					variant: "solid",
					name: "{{post.authorLabel}}"
				}
			]
		};

		const post = {
			author: "Diego Ramos",
			authorLabel: "Diego Ramos",
		};

		const interpolated = interpolateBlock(block, undefined, post);

		expect(interpolated.href).toBe("/blog/by-author/Diego Ramos");
		expect(interpolated.children?.[0].name).toBe("Diego Ramos");
	});

	test("authorLabel falls back to author and Artefact Team", () => {
		const block = {
			blockType: "anchor",
			href: "/blog/by-author/{{post.authorLabel}}",
			children: [
				{
					blockType: "avatar",
					size: "md",
					variant: "solid",
					name: "{{post.authorLabel}}"
				}
			]
		};

		const post = {
			author: "Diego Ramos",
			authorLabel: "", // empty string fallback
		};

		const interpolated = interpolateBlock(block, undefined, post);
		expect(interpolated.href).toBe("/blog/by-author/Diego Ramos");
		expect(interpolated.children?.[0].name).toBe("Diego Ramos");

		const postEmpty = {};
		const interpolatedEmpty = interpolateBlock(block, undefined, postEmpty);
		expect(interpolatedEmpty.href).toBe("/blog/by-author/Artefact Team");
		expect(interpolatedEmpty.children?.[0].name).toBe("Artefact Team");
	});
});
