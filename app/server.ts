import { showRoutes } from "hono/dev";
import { createApp } from "honox/server";

const app = createApp({
	ROUTES: import.meta.glob(import.meta.env.ROUTES_GLOB, { eager: true }),
});

showRoutes(app);

export default app;
