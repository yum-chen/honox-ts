import { createRoute } from "honox/factory";

export default createRoute((c) => {
	const origin = new URL(c.req.url).origin;
	const robots = `User-agent: *
Allow: /

Sitemap: ${origin}/sitemap.xml
`;

	return c.text(robots, 200, {
		"Content-Type": "text/plain",
	});
});
