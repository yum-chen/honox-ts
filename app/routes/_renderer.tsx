import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";

export default jsxRenderer(({ children, title }) => {
	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>{title ?? "Artefact"}</title>
				<link rel="icon" href="/favicon.ico" />
				<link
					rel="stylesheet"
					href="https://cdn.jsdelivr.net/npm/@fontsource-variable/inter@5.0.17/index.min.css"
				/>
				<Link href="/app/style.css" rel="stylesheet" />
				<Script src="/app/client.ts" async />
			</head>
			<body>{children}</body>
		</html>
	);
});
