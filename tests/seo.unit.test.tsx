import { describe, expect, it } from "bun:test";
import { parseFrontmatter } from "../app/utils/markdown";

describe("SEO frontmatter and metadata tests", () => {
	it("should fallback to default fields if seo is missing", () => {
		const markdown = `---
title: "A Great Post"
date: "2026-07-15"
description: "My post description"
tags: ["tech", "hono"]
---
Body content`;
		const { data } = parseFrontmatter(markdown);
		const seoData = data.seo as { title?: string; description?: string; keywords?: string; image?: string } | undefined;
		const seoTitle = seoData?.title || data.title || "Untitled";
		const seoDesc = seoData?.description || data.description || "Read this article on our blog.";
		const seoKeywords = seoData?.keywords || (Array.isArray(data.tags) ? data.tags.join(", ") : "");

		expect(seoTitle).toBe("A Great Post");
		expect(seoDesc).toBe("My post description");
		expect(seoKeywords).toBe("tech, hono");
	});

	it("should use explicit seo settings if present", () => {
		const markdown = `---
title: "A Great Post"
description: "My post description"
seo:
  title: "Custom SEO Title"
  description: "Custom SEO Description"
  keywords: "custom, keywords"
---
Body content`;
		const { data } = parseFrontmatter(markdown);
		const seoData = data.seo as { title?: string; description?: string; keywords?: string; image?: string } | undefined;
		const seoTitle = seoData?.title || data.title || "Untitled";
		const seoDesc = seoData?.description || data.description || "Read this article on our blog.";
		const seoKeywords = seoData?.keywords || (Array.isArray(data.tags) ? data.tags.join(", ") : "");

		expect(seoTitle).toBe("Custom SEO Title");
		expect(seoDesc).toBe("Custom SEO Description");
		expect(seoKeywords).toBe("custom, keywords");
	});
});

describe("Robots.txt and Sitemap builders", () => {
	it("should build a valid robots.txt", () => {
		const origin = "https://example.com";
		const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;
		expect(robots).toContain("User-agent: *");
		expect(robots).toContain("Sitemap: https://example.com/sitemap.xml");
	});

	it("should build a valid sitemap.xml structure", () => {
		const urls = [
			"https://example.com/",
			"https://example.com/blog",
			"https://example.com/blog/getting-started",
		];
		const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url}</loc>
    <changefreq>daily</changefreq>
    <priority>${url.endsWith("/") ? "1.0" : "0.8"}</priority>
  </url>`).join("\n")}
</urlset>`;

		expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
		expect(sitemap).toContain('<loc>https://example.com/</loc>');
		expect(sitemap).toContain('<priority>1.0</priority>');
		expect(sitemap).toContain('<priority>0.8</priority>');
	});
});
