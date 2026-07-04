#!/usr/bin/env bun

// Post-build script to generate blog post pages for SSG
// Run this after the main build: bun run build && bun run scripts/generate-blog-posts.ts

import { readdirSync, mkdirSync, writeFileSync, readFileSync } from "fs";
import { join } from "path";
import { parseFrontmatter, markdownToHtml } from "../app/utils/markdown";

const postsDir = join(process.cwd(), "content/posts");
const distBlogDir = join(process.cwd(), "dist/blog");

// Create dist/blog directory (for individual post HTML files)
mkdirSync(distBlogDir, { recursive: true });

// Read all markdown files
const files = readdirSync(postsDir).filter((f: string) => f.endsWith(".md"));

console.log(`Found ${files.length} blog posts`);

for (const file of files) {
  const slug = file.replace(".md", "");
  const filePath = join(postsDir, file);
  
  // Read and parse the markdown file
  const markdown = readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(markdown);
  const htmlContent = markdownToHtml(content);
  
  // Find the actual CSS file in dist/static
  const staticDir = join(process.cwd(), "dist/static");
  const cssFiles = readdirSync(staticDir).filter((f: string) => f.startsWith("style-") && f.endsWith(".css"));
  const cssFile = cssFiles[0] || "style-CDCQWUCO.css"; // fallback
  
  // Generate HTML matching the route's output
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.title || "Untitled"}</title>
  <meta name="description" content="${data.description || ""}">
  <link rel="stylesheet" href="/static/${cssFile}">
</head>
<body>
  <div style="max-width: 800px; margin: 0 auto; padding: 2rem;">
    <a href="/blog" style="display: inline-block; margin-bottom: 2rem; color: #1976d2; text-decoration: none;">
      ← Back to Blog
    </a>
    
    <article>
      <header style="margin-bottom: 2rem;">
        <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: #333;">
          ${data.title || "Untitled"}
          ${data.draft === true ? '<span style="font-size: 0.875rem; background-color: #ff9800; color: white; padding: 0.25rem 0.75rem; border-radius: 4px; margin-left: 1rem;">Draft</span>' : ''}
        </h1>
        
        ${data.date ? `<time datetime="${data.date}" style="color: #666; font-size: 1rem; display: block; margin-bottom: 1rem;">
          ${new Date(data.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
        </time>` : ''}
        
        ${data.description ? `<p style="color: #555; font-size: 1.25rem; line-height: 1.6; font-style: italic;">${data.description}</p>` : ''}
        
        ${Array.isArray(data.tags) && data.tags.length > 0 ? `
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem;">
          ${data.tags.map((tag: string) => `<span style="background-color: #e3f2fd; color: #1976d2; padding: 0.25rem 0.75rem; border-radius: 16px; font-size: 0.875rem;">${tag}</span>`).join('')}
        </div>` : ''}
      </header>
      
      <div style="line-height: 1.8; font-size: 1.125rem; color: #333;">
        ${htmlContent}
      </div>
    </article>
  </div>
</body>
</html>`;
  
  // Write the HTML file to dist/blog/ (so URLs are /blog/slug)
  const outputPath = join(distBlogDir, `${slug}.html`);
  writeFileSync(outputPath, html);
  console.log(`Generated: ${outputPath}`);
}

console.log("Done! Blog post pages generated.");
