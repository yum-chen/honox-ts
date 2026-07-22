import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

export const __importing_islands = true;

export default jsxRenderer(({ children }, c) => {
	const currentPath = c.req.path;
	let currentLocale = "en";
	const pathSegments = currentPath.split("/");
	if (pathSegments.includes("zh")) {
		currentLocale = "zh";
	} else if (pathSegments.includes("es")) {
		currentLocale = "es";
	} else if (pathSegments.includes("pt")) {
		currentLocale = "pt";
	} else if (pathSegments.includes("fr")) {
		currentLocale = "fr";
	}
	return (
		<html lang={currentLocale}>
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="icon" href="/favicon.ico" />
				<Link href="/app/style.css" rel="stylesheet" />
				<Script src="/app/client.ts" async />
			</head>
			<body>{children}</body>
		</html>
	);
});
