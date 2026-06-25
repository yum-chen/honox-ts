import type { JSX } from "hono/jsx";

export const LucideChevronDown = (props: JSX.IntrinsicElements["svg"]) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		{...props}
	>
		<title>Chevron Down</title>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

export const LucideX = (props: JSX.IntrinsicElements["svg"]) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
		{...props}
	>
		<title>Close</title>
		<path d="M18 6 6 18" />
		<path d="m6 6 12 12" />
	</svg>
);
