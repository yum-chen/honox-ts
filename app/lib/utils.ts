import { cx as pandaCx } from "../../styled-system/css";

export const cx = (...args: (string | undefined | null | boolean)[]) =>
	pandaCx(...(args.filter(Boolean) as string[]));
