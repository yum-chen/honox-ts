import { useEffect, useState } from "hono/jsx";
import { IconButton } from "../components/ui/icon-button";
import { MoonIcon, SunIcon } from "../components/icons";

/**
 * Light/dark mode toggle. Switches the `dark` class on `<html>` that Park UI's
 * color conditions key off, and persists the choice to `localStorage`.
 */
export default function ThemeToggle() {
	const [dark, setDark] = useState(false);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));
	}, []);

	const toggle = () => {
		const next = !document.documentElement.classList.contains("dark");
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
		setDark(next);
	};

	return (
		<IconButton
			variant="outline"
			size="md"
			aria-label="Toggle color mode"
			onClick={toggle}
		>
			{dark ? <SunIcon /> : <MoonIcon />}
		</IconButton>
	);
}
