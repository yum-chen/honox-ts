// Simple frontmatter parser for markdown files
// No external dependencies required

interface BlogPost {
	slug: string;
	title: string;
	date: string;
	description: string;
	tags: string[];
	draft: boolean;
	content: string;
}

interface FrontmatterData {
	title?: string;
	date?: string;
	description?: string;
	tags?: string[];
	draft?: boolean;
	author?: string;
	readTime?: string;
	cover?: string;
	[key: string]: unknown;
}

function unquote(value: string): string {
	if (
		(value.startsWith('"') && value.endsWith('"')) ||
		(value.startsWith("'") && value.endsWith("'"))
	) {
		return value.slice(1, -1);
	}
	return value;
}

export function parseFrontmatter(markdown: string): {
	data: FrontmatterData;
	content: string;
} {
	const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);

	if (!match) {
		return { data: {}, content: markdown };
	}

	const frontmatter = match[1] ?? "";
	const content = match[2] ?? "";

	// Simple YAML parsing for basic types
	const data: FrontmatterData = {};
	const lines = frontmatter.split("\n");

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i] ?? "";
		// Indented lines are block-list items consumed by the lookahead below
		if (!line.trim() || /^\s/.test(line)) continue;

		const colonIndex = line.indexOf(":");
		if (colonIndex === -1) continue;

		const key = line.slice(0, colonIndex).trim();
		const rawValue = line.slice(colonIndex + 1).trim();

		if (rawValue === "") {
			// Block-style list (the format Sveltia CMS writes):
			// tags:
			//   - accessibility
			//   - ui
			const items: string[] = [];
			let j = i + 1;
			while (j < lines.length) {
				const itemMatch = (lines[j] ?? "").match(/^\s+-\s+(.*)$/);
				if (!itemMatch) break;
				items.push(unquote((itemMatch[1] ?? "").trim()));
				j++;
			}
			if (items.length > 0) {
				data[key] = items;
				i = j - 1;
			}
			continue;
		}

		const value = unquote(rawValue);

		// Parse arrays (inline format: ["item1", "item2"])
		if (value.startsWith("[") && value.endsWith("]")) {
			try {
				data[key] = JSON.parse(value);
			} catch {
				data[key] = value;
			}
		} else if (value === "true") {
			data[key] = true;
		} else if (value === "false") {
			data[key] = false;
		} else {
			data[key] = value;
		}
	}

	return { data, content };
}

// Reduce markdown to plain text for search indexing
export function stripMarkdown(markdown: string): string {
	return markdown
		.replace(/```[^\n]*\n([\s\S]*?)```/g, "$1") // keep code block contents
		.replace(/`([^`]*)`/g, "$1")
		.replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1") // images → alt text
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → link text
		.replace(/^#{1,6}\s+/gm, "")
		.replace(/^\s*[-+*]\s+/gm, "")
		.replace(/^\s*\d+\.\s+/gm, "")
		.replace(/[*_~>]/g, "")
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();
}

// Simple markdown to HTML converter (basic implementation)
export function markdownToHtml(markdown: string): string {
	let html = markdown;

	// Pre-process tables before doing any paragraph wrapping or replacements
	const rawLines = html.split("\n");
	const tableLines: string[] = [];
	let inTable = false;
	let tableHeaderDone = false;

	for (let i = 0; i < rawLines.length; i++) {
		const line = rawLines[i] ?? "";
		const trimmed = line.trim();

		if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
			if (!inTable) {
				inTable = true;
				tableHeaderDone = false;
				tableLines.push("<table>");
			}

			if (trimmed.includes("---")) {
				// Skip the separator line e.g. | :--- | :--- |
				continue;
			}

			const safeLine = trimmed.replace(/\\\|/g, "__ESCAPED_PIPE__");
			const cells = safeLine
				.slice(1, -1)
				.split("|")
				.map((c) => c.trim().replace(/__ESCAPED_PIPE__/g, "|"));

			if (!tableHeaderDone) {
				tableLines.push("<thead>");
				tableLines.push("<tr>");
				for (const cell of cells) {
					tableLines.push(`<th>${cell}</th>`);
				}
				tableLines.push("</tr>");
				tableLines.push("</thead>");
				tableLines.push("<tbody>");
				tableHeaderDone = true;
			} else {
				tableLines.push("<tr>");
				for (const cell of cells) {
					tableLines.push(`<td>${cell}</td>`);
				}
				tableLines.push("</tr>");
			}
		} else {
			if (inTable) {
				tableLines.push("</tbody>");
				tableLines.push("</table>");
				inTable = false;
			}
			tableLines.push(line);
		}
	}
	if (inTable) {
		tableLines.push("</tbody>");
		tableLines.push("</table>");
	}

	html = tableLines.join("\n");

	// Headers
	html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
	html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
	html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

	// Bold and italic
	html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
	html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
	html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");

	// Code blocks
	html = html.replace(
		/```(.*?)\n([\s\S]*?)```/g,
		'<pre><code class="language-$1">$2</code></pre>',
	);
	html = html.replace(/`(.*?)`/g, "<code>$1</code>");

	// Links
	html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

	// Lists
	html = html.replace(/^\s*\d+\.\s+(.*)$/gim, "<li>$1</li>");
	html = html.replace(/^\s*[-*+]\s+(.*)$/gim, "<li>$1</li>");

	// Paragraphs (wrap text that's not already in HTML tags)
	const lines = html.split("\n");
	const processedLines = lines.map((line) => {
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("<")) {
			return line;
		}
		return `<p>${trimmed}</p>`;
	});

	return processedLines.join("\n");
}

export type { BlogPost };
