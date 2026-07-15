import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

export const __importing_islands = true;

export default jsxRenderer(({ children, title, description, keywords, image, type, canonical }, c) => {
	const siteName = "Artefact";
	const defaultDescription = "Modern HonoX web application built with PandaCSS and Sveltia CMS.";
	const defaultKeywords = "honox, pandacss, sveltiacms, web development, design system";

	const displayTitle = title ? `${title} | ${siteName}` : siteName;
	const metaDescription = description || defaultDescription;
	const metaKeywords = keywords || defaultKeywords;
	const metaType = type || "website";

	let canonicalUrl = canonical || "";
	let ogImageUrl = image || "/favicon.ico";

	if (c && c.req) {
		canonicalUrl = canonical || c.req.url;
		if (ogImageUrl.startsWith("/")) {
			try {
				const urlObj = new URL(c.req.url);
				ogImageUrl = `${urlObj.origin}${ogImageUrl}`;
			} catch (_) {
				// Fallback
			}
		}
	}

	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />

				{/* Primary Meta Tags */}
				<title>{displayTitle}</title>
				<meta name="title" content={displayTitle} />
				<meta name="description" content={metaDescription} />
				{metaKeywords && <meta name="keywords" content={metaKeywords} />}
				{canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

				{/* Open Graph / Facebook */}
				<meta property="og:type" content={metaType} />
				{canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
				<meta property="og:title" content={displayTitle} />
				<meta property="og:description" content={metaDescription} />
				<meta property="og:image" content={ogImageUrl} />
				<meta property="og:site_name" content={siteName} />

				{/* Twitter */}
				<meta property="twitter:card" content="summary_large_image" />
				{canonicalUrl && <meta property="twitter:url" content={canonicalUrl} />}
				<meta property="twitter:title" content={displayTitle} />
				<meta property="twitter:description" content={metaDescription} />
				<meta property="twitter:image" content={ogImageUrl} />

				<Link href="/app/style.css" rel="stylesheet" />
				<Script src="/app/client.ts" async />
			</head>
			<body>{children}</body>
		</html>
	);
});
