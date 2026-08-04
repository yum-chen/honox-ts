import fs from "node:fs";
import path from "node:path";

// Normalization and parsing rules matching block-style.ts
const BORDER_STYLE_VALUES = new Set(["solid", "dashed", "dotted", "none"]);
const LENGTH = /^(-?\d+(\.\d+)?(px|rem|em|%|vw|vh)|0|none|100%)$/;
const COLOR = /^(#[0-9a-fA-F]{3,8}|rgba?\([\d.,%\s]+\)|[a-zA-Z\-]+)$/;

const CATEGORICAL_PROPERTIES = {
	textAlign: new Set(["left", "center", "right", "justify", "start", "end"]),
	fontWeight: new Set(["bold", "600", "normal", "700"]),
	textTransform: new Set(["uppercase", "none", "lowercase", "capitalize"]),
	borderStyle: BORDER_STYLE_VALUES,
	borderTopStyle: BORDER_STYLE_VALUES,
	borderBottomStyle: BORDER_STYLE_VALUES,
	flexWrap: new Set(["wrap", "nowrap", "wrap-reverse"]),
	justifyContent: new Set(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"]),
	color: new Set(["var(--colors-fg-muted)"]),
	borderColor: new Set(["var(--colors-border)", "var(--colors-border-error)"]),
	borderTopColor: new Set(["var(--colors-border)"]),
	borderBottomColor: new Set(["var(--colors-border)"]),
};

function normalizeColor(val) {
	const trimmed = val.trim().toLowerCase();
	if (trimmed === "#71717a" || trimmed === "#6b7280" || trimmed === "var(--colors-fg-muted)") {
		return "var(--colors-fg-muted)";
	}
	if (trimmed === "#e5e7eb" || trimmed === "var(--colors-border)" || trimmed === "default") {
		return "var(--colors-border)";
	}
	if (trimmed === "error" || trimmed === "var(--colors-border-error)") {
		return "var(--colors-border-error)";
	}
	return undefined;
}

function decomposeBorderShorthand(val) {
	const parts = val.trim().split(/\s+/);
	let width;
	let style;
	let color;

	for (const part of parts) {
		const trimmedPart = part.trim();
		if (BORDER_STYLE_VALUES.has(trimmedPart)) {
			style = trimmedPart;
		} else if (LENGTH.test(trimmedPart)) {
			width = trimmedPart;
		} else if (COLOR.test(trimmedPart) || trimmedPart.startsWith("var(")) {
			color = trimmedPart;
		}
	}
	return { width, style, color };
}

function parseAndValidateStyleProperty(name, value) {
	const camelName = name.trim().replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());

	if (camelName === "border" || camelName === "borderTop" || camelName === "borderBottom") {
		const decomposed = decomposeBorderShorthand(value);
		const prefix = camelName === "border" ? "border" : camelName;
		const results = [];
		if (decomposed.width) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Width`, decomposed.width));
		}
		if (decomposed.style) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Style`, decomposed.style));
		}
		if (decomposed.color) {
			results.push(...parseAndValidateStyleProperty(`${prefix}Color`, decomposed.color));
		}
		return results;
	}

	if (
		camelName === "color" ||
		camelName === "borderColor" ||
		camelName === "borderTopColor" ||
		camelName === "borderBottomColor"
	) {
		const normalized = normalizeColor(value);
		if (normalized) {
			return [{ type: "categorical", name: camelName, value: normalized }];
		}
		return [];
	}

	if (camelName in CATEGORICAL_PROPERTIES) {
		const set = CATEGORICAL_PROPERTIES[camelName];
		const trimmedVal = value.trim();
		if (set.has(trimmedVal)) {
			return [{ type: "categorical", name: camelName, value: trimmedVal }];
		}
	}

	return [];
}

function parseStyleString(styleStr) {
	const results = [];
	const declarations = styleStr.split(";");
	for (const decl of declarations) {
		const trimmedDecl = decl.trim();
		if (!trimmedDecl) continue;
		const colonIdx = trimmedDecl.indexOf(":");
		if (colonIdx === -1) continue;
		const prop = trimmedDecl.slice(0, colonIdx).trim();
		const val = trimmedDecl.slice(colonIdx + 1).trim();
		if (prop && val) {
			results.push(...parseAndValidateStyleProperty(prop, val));
		}
	}
	return results;
}

// 1. Parse panda.config.ts static CSS properties list
const configPath = "panda.config.ts";
if (!fs.existsSync(configPath)) {
	console.error(`Error: Could not find ${configPath}`);
	process.exit(1);
}

const configContent = fs.readFileSync(configPath, "utf8");
const matches = configContent.match(/properties:\s*\{([\s\S]+?)\}/);
const configProperties = {};

if (matches) {
	const propBlock = matches[1];
	const propRegex = /(\w+):\s*\[([\s\S]+?)\]/g;
	let m;
	while ((m = propRegex.exec(propBlock)) !== null) {
		const propName = m[1];
		const propValues = m[2]
			.split(",")
			.map((v) => v.trim().replace(/['"]/g, ""))
			.filter(Boolean);
		configProperties[propName] = new Set(propValues);
	}
} else {
	console.error("Error: Could not find static CSS properties block in panda.config.ts");
	process.exit(1);
}

// 2. Scan all JSON pages recursively under content/pages/
function getJsonFiles(dir) {
	let files = [];
	const list = fs.readdirSync(dir);
	for (const file of list) {
		const filepath = path.join(dir, file);
		const stat = fs.statSync(filepath);
		if (stat && stat.isDirectory()) {
			files = files.concat(getJsonFiles(filepath));
		} else if (file.endsWith(".json")) {
			files.push(filepath);
		}
	}
	return files;
}

const jsonFiles = getJsonFiles("content/pages");
let hasErrors = false;

for (const file of jsonFiles) {
	let page;
	try {
		page = JSON.parse(fs.readFileSync(file, "utf8"));
	} catch (err) {
		console.error(`Error parsing JSON file ${file}:`, err);
		continue;
	}

	const walk = (node) => {
		if (!node || typeof node !== "object") return;

		// Extract style property if present
		if (typeof node.style === "string") {
			const parsed = parseStyleString(node.style);
			for (const p of parsed) {
				if (p.type === "categorical") {
					const registered = configProperties[p.name];
					if (!registered || !registered.has(p.value)) {
						console.error(
							`Error in ${file} (blockType: ${node.blockType}):\n` +
							`  Categorical style property "${p.name}: ${p.value}" is not registered in panda.config.ts staticCss.css.\n` +
							`  Raw style string: "${node.style}"`
						);
						hasErrors = true;
					}
				}
			}
		}

		// Recurse children and nested structures
		const containerKeys = ["content", "children", "header", "sider", "footer"];
		for (const k of containerKeys) {
			if (node[k] && Array.isArray(node[k])) {
				for (const child of node[k]) {
					walk(child);
				}
			}
		}
	};

	if (page.content && Array.isArray(page.content)) {
		for (const node of page.content) {
			walk(node);
		}
	}
}

if (hasErrors) {
	console.error("\nCMS Style Vocabulary Check FAILED. See errors above.");
	process.exit(1);
} else {
	console.log("CMS Style Vocabulary Check PASSED. All style values are correctly registered in panda.config.ts.");
	process.exit(0);
}
