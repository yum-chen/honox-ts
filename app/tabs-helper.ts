if (typeof document !== "undefined") {
	const initTabsInteractivity = () => {
		const updateIndicator = (root: HTMLElement, activeTrigger: HTMLElement) => {
			const rect = activeTrigger.getBoundingClientRect();
			const rootRect = root.getBoundingClientRect();

			const width = rect.width;
			const height = rect.height;
			const left = rect.left - rootRect.left;
			const top = rect.top - rootRect.top;

			root.style.setProperty("--width", `${width}px`);
			root.style.setProperty("--height", `${height}px`);
			root.style.setProperty("--left", `${left}px`);
			root.style.setProperty("--top", `${top}px`);
		};

		const selectValue = (
			root: HTMLElement,
			trigger: HTMLElement,
			value: string,
		) => {
			// Update triggers
			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-scope="tabs"][data-part="trigger"]',
				),
			);
			for (const t of triggers) {
				const isSelected = t.getAttribute("data-value") === value;
				t.setAttribute("aria-selected", isSelected ? "true" : "false");
				t.tabIndex = isSelected ? 0 : -1;
				if (isSelected) {
					t.setAttribute("data-selected", "");
				} else {
					t.removeAttribute("data-selected");
				}
			}

			// Update content panes
			const contents = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-scope="tabs"][data-part="content"]',
				),
			);
			for (const c of contents) {
				const isSelected = c.getAttribute("data-value") === value;
				c.hidden = !isSelected;
				if (isSelected) {
					c.setAttribute("data-selected", "");
				} else {
					c.removeAttribute("data-selected");
				}
			}

			updateIndicator(root, trigger);
		};

		// Event delegation for trigger click
		document.addEventListener("click", (e) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-scope="tabs"][data-part="trigger"]',
			);
			if (!trigger || trigger.hasAttribute("data-disabled")) return;

			const root = trigger.closest<HTMLElement>(
				'[data-scope="tabs"][data-part="root"]',
			);
			if (!root) return;

			const value = trigger.getAttribute("data-value");
			if (value) {
				selectValue(root, trigger, value);
			}
		});

		// Keyboard navigation
		document.addEventListener("keydown", (e) => {
			const trigger = (e.target as HTMLElement).closest<HTMLElement>(
				'[data-scope="tabs"][data-part="trigger"]',
			);
			if (!trigger) return;

			const root = trigger.closest<HTMLElement>(
				'[data-scope="tabs"][data-part="root"]',
			);
			if (!root) return;

			if (
				(e.key === "Enter" || e.key === " ") &&
				trigger.tagName !== "BUTTON"
			) {
				const value = trigger.getAttribute("data-value");
				if (value && !trigger.hasAttribute("data-disabled")) {
					selectValue(root, trigger, value);
				}
				e.preventDefault();
				return;
			}

			const triggers = Array.from(
				root.querySelectorAll<HTMLElement>(
					'[data-scope="tabs"][data-part="trigger"]:not([data-disabled])',
				),
			);
			const index = triggers.indexOf(trigger);
			const vertical = root.getAttribute("data-orientation") === "vertical";
			const nextKey = vertical ? "ArrowDown" : "ArrowRight";
			const prevKey = vertical ? "ArrowUp" : "ArrowLeft";

			let nextIndex = -1;
			if (e.key === nextKey) {
				nextIndex = (index + 1) % triggers.length;
			} else if (e.key === prevKey) {
				nextIndex = (index - 1 + triggers.length) % triggers.length;
			} else if (e.key === "Home") {
				nextIndex = 0;
			} else if (e.key === "End") {
				nextIndex = triggers.length - 1;
			}

			if (nextIndex !== -1) {
				const nextTrigger = triggers[nextIndex];
				nextTrigger.focus();
				const value = nextTrigger.getAttribute("data-value");
				if (value) {
					selectValue(root, nextTrigger, value);
				}
				e.preventDefault();
			}
		});

		const initAllIndicators = () => {
			const roots = Array.from(
				document.querySelectorAll<HTMLElement>(
					'[data-scope="tabs"][data-part="root"]',
				),
			);
			for (const root of roots) {
				const activeTrigger = root.querySelector<HTMLElement>(
					'[data-scope="tabs"][data-part="trigger"][data-selected]',
				);
				if (activeTrigger) {
					updateIndicator(root, activeTrigger);
				}
			}
		};

		// Run initially
		requestAnimationFrame(initAllIndicators);
		window.addEventListener("resize", initAllIndicators);
	};

	initTabsInteractivity();
}
