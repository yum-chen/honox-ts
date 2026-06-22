import "@honox/types";

declare module "hono" {
	interface Env {
		Variables: Record<string, unknown>;
		Bindings: Record<string, unknown>;
	}
}
