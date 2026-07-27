import { useState, useEffect } from "hono/jsx";
import { css } from "design-system/css";
import { PageRenderer } from "../components/page-renderer";

interface PlaygroundProps {
	pages: Record<string, { title?: string; content?: any[] }>;
}

export default function Playground({ pages }: PlaygroundProps) {
	// Pick 'about' as default if available, otherwise the first slug
	const availableSlugs = Object.keys(pages);
	const defaultSlug = availableSlugs.includes("about") ? "about" : (availableSlugs[0] || "");
	const defaultPage = pages[defaultSlug] || {};

	const [selectedSlug, setSelectedSlug] = useState<string>(defaultSlug);
	const [jsonText, setJsonText] = useState<string>(JSON.stringify(defaultPage, null, 2));
	const [error, setError] = useState<string | null>(null);
	const [parsedContent, setParsedContent] = useState<any[]>(defaultPage.content || []);

	// Update code and preview when selected page changes
	useEffect(() => {
		if (selectedSlug && pages[selectedSlug]) {
			const pageData = pages[selectedSlug];
			const text = JSON.stringify(pageData, null, 2);
			setJsonText(text);
			setError(null);
			setParsedContent(pageData.content || []);
		}
	}, [selectedSlug, pages]);

	// Handle code changes
	const handleJsonChange = (val: string) => {
		setJsonText(val);
		try {
			if (!val.trim()) {
				setParsedContent([]);
				setError(null);
				return;
			}
			const parsed = JSON.parse(val);
			setError(null);
			if (parsed && typeof parsed === "object") {
				setParsedContent(parsed.content || []);
			} else {
				setParsedContent([]);
			}
		} catch (e: any) {
			setError(e.message);
		}
	};

	// Reset current page to original source JSON
	const handleReset = () => {
		if (selectedSlug && pages[selectedSlug]) {
			const pageData = pages[selectedSlug];
			const text = JSON.stringify(pageData, null, 2);
			setJsonText(text);
			setError(null);
			setParsedContent(pageData.content || []);
		}
	};

	return (
		<div class={css({ display: "flex", flexDirection: "column", gap: "6", w: "full" })}>
			{/* Top Bar Controls */}
			<div
				class={css({
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					flexWrap: "wrap",
					gap: "4",
					p: "4",
					bg: "bg.default",
					borderRadius: "lg",
					borderWidth: "1px",
					borderColor: "border",
				})}
			>
				<div class={css({ display: "flex", alignItems: "center", gap: "3" })}>
					<label htmlFor="page-select" class={css({ fontSize: "sm", fontWeight: "semibold", color: "fg.muted" })}>
						Preview CMS Page:
					</label>
					<select
						id="page-select"
						value={selectedSlug}
						onChange={(e: any) => setSelectedSlug(e.target.value)}
						class={css({
							bg: "bg.canvas",
							color: "fg.default",
							borderWidth: "1px",
							borderColor: "border",
							borderRadius: "md",
							px: "3",
							py: "1.5",
							fontSize: "sm",
							outline: "none",
							cursor: "pointer",
							_focus: { borderColor: "accent.default" },
						})}
					>
						{availableSlugs.map((slug) => (
							<option key={slug} value={slug}>
								{slug}.json
							</option>
						))}
					</select>
				</div>

				<button
					type="button"
					onClick={handleReset}
					class={css({
						px: "4",
						py: "2",
						bg: "bg.default",
						color: "fg.default",
						borderWidth: "1px",
						borderColor: "border",
						borderRadius: "md",
						fontSize: "sm",
						fontWeight: "medium",
						cursor: "pointer",
						_hover: { bg: "bg.subtle" },
						_active: { bg: "bg.muted" },
					})}
				>
					Reset Code
				</button>
			</div>

			{/* Main Split Layout */}
			<div
				class={css({
					display: "grid",
					gridTemplateColumns: { base: "1fr", lg: "1fr 1fr" },
					gap: "6",
					w: "full",
					alignItems: "stretch",
				})}
			>
				{/* Editor (Left Column) */}
				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "3",
						p: "5",
						bg: "bg.default",
						borderRadius: "lg",
						borderWidth: "1px",
						borderColor: "border",
						h: "full",
					})}
				>
					<div class={css({ display: "flex", justifyContent: "space-between", alignItems: "center" })}>
						<span class={css({ fontSize: "sm", fontWeight: "bold", color: "fg.default" })}>
							Source Code (JSON)
						</span>
						<span class={css({ fontSize: "xs", color: "fg.muted" })}>
							Editable
						</span>
					</div>

					<textarea
						value={jsonText}
						onInput={(e: any) => handleJsonChange(e.target.value)}
						rows={28}
						spellcheck={false}
						class={css({
							fontFamily: "mono",
							fontSize: "xs",
							p: "4",
							borderRadius: "md",
							borderWidth: "1px",
							borderColor: "border",
							bg: "bg.canvas",
							color: "fg.default",
							width: "100%",
							minHeight: "550px",
							maxHeight: "800px",
							resize: "vertical",
							lineHeight: "relaxed",
							_focus: { outline: "none", borderColor: "accent.default" },
						})}
					>
						{jsonText}
					</textarea>

					{error && (
						<div
							class={css({
								p: "3",
								bg: "red.50",
								_dark: { bg: "red.950" },
								color: "red.600",
								_dark: { color: "red.400" },
								borderRadius: "md",
								fontSize: "xs",
								borderWidth: "1px",
								borderColor: "red.200",
								_dark: { borderColor: "red.900" },
								fontFamily: "mono",
								whiteSpace: "pre-wrap",
							})}
						>
							<strong>JSON Syntax Error:</strong>
							<div class={css({ mt: "1" })}>{error}</div>
						</div>
					)}
				</div>

				{/* Preview (Right Column) */}
				<div
					class={css({
						display: "flex",
						flexDirection: "column",
						gap: "3",
						p: "5",
						bg: "bg.default",
						borderRadius: "lg",
						borderWidth: "1px",
						borderColor: "border",
						h: "full",
					})}
				>
					<div class={css({ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "2" })}>
						<span class={css({ fontSize: "sm", fontWeight: "bold", color: "fg.default" })}>
							Live Preview
						</span>
						<span class={css({ fontSize: "xs", color: "green.600", fontWeight: "medium" })}>
							● Real-time
						</span>
					</div>

					{/* Preview Canvas */}
					<div
						class={css({
							bg: "bg.canvas",
							borderRadius: "md",
							borderWidth: "1px",
							borderColor: "border",
							p: "4",
							flex: "1",
							minHeight: "550px",
							maxHeight: "800px",
							overflowY: "auto",
							display: "flex",
							flexDirection: "column",
							gap: "10",
						})}
					>
						{parsedContent && parsedContent.length > 0 ? (
							<PageRenderer content={parsedContent} />
						) : (
							<div
								class={css({
									display: "flex",
									flexDirection: "column",
									alignItems: "center",
									justifyContent: "center",
									h: "full",
									color: "fg.muted",
									textAlign: "center",
									p: "8",
								})}
							>
								<svg
									width="48"
									height="48"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
									class={css({ mb: "4", opacity: "0.5" })}
								>
									<rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
									<line x1="9" y1="3" x2="9" y2="21" />
								</svg>
								<h3 class={css({ fontWeight: "semibold", fontSize: "md", mb: "1" })}>Empty Preview</h3>
								<p class={css({ fontSize: "xs" })}>
									Add some component blocks to the JSON on the left to see them render here.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
