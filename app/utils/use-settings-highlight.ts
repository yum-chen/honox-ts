import { useEffect } from "hono/jsx";

export function useSettingsHighlight() {
	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const highlightId = params.get("highlight");
		if (highlightId) {
			// Small delay to ensure the DOM is fully rendered and settled
			const timer = setTimeout(() => {
				const element = document.getElementById(highlightId);
				if (element) {
					// Inject dynamic CSS style tag if it doesn't exist yet
					if (!document.getElementById("settings-highlight-styles")) {
						const style = document.createElement("style");
						style.id = "settings-highlight-styles";
						style.textContent = `
							@keyframes settings-glow {
								0% {
									box-shadow: 0 0 0 4px var(--colors-blue-5);
									border-color: var(--colors-blue-8);
								}
								100% {
									box-shadow: none;
								}
							}
							.settings-highlighted {
								animation: settings-glow 3s ease-out;
							}
						`;
						document.head.appendChild(style);
					}

					// Scroll and highlight
					element.scrollIntoView({ behavior: "smooth", block: "center" });
					element.classList.remove("settings-highlighted");
					// Trigger reflow to restart animation if already highlighted
					void element.offsetWidth;
					element.classList.add("settings-highlighted");

					const input = element.querySelector("input, textarea, select") as HTMLElement;
					if (input) {
						input.focus();
					} else {
						element.focus();
					}

					// Clean up the URL query parameter so subsequent refreshes don't highlight
					const cleanUrl = new URL(window.location.href);
					cleanUrl.searchParams.delete("highlight");
					window.history.replaceState(null, "", cleanUrl);
				}
			}, 100);

			return () => clearTimeout(timer);
		}
	}, []);
}
