import type {} from "hono";

declare module "hono" {
	interface Env {
		Variables: Record<string, unknown>;
		Bindings: Record<string, unknown>;
	}

	interface ContextRenderer {
		(
			content: string | Promise<string>,
			props?: {
				title?: string;
				description?: string;
				keywords?: string;
				image?: string;
				type?: string;
				canonical?: string;
			},
		): Response | Promise<Response>;
	}
}
