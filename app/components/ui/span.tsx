import type { PropsWithChildren } from "hono/jsx";

export interface SpanProps extends PropsWithChildren<{ class?: string }> {
	[key: string]: unknown;
}

export function Span(props: SpanProps) {
	const { children, ...rest } = props;
	return <span {...(rest as any)}>{children}</span>;
}
