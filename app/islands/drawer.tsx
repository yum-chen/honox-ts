import { useEffect, useId, useRef, useState } from "hono/jsx";
import {
	Root as DrawerPrimitiveRoot,
	type RootProps,
} from "../components/ui/drawer-primitive";

export default function DrawerIsland(props: RootProps) {
	const {
		open: openProp,
		onOpenChange: onOpenChangeProp,
		id: idProp,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `drawer-${fallbackId}`;

	const handleOpenChangeRef = useRef<(nextOpen: boolean) => void>(() => {});

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.(nextOpen);
	};

	useEffect(() => {
		handleOpenChangeRef.current = handleOpenChange;
	}, [isControlled, onOpenChangeProp]);

	useEffect(() => {
		const root = document.getElementById(rootId);
		if (!root) return;

		const positioners = root.querySelectorAll<HTMLElement>(
			'[data-part="positioner"]',
		);
		const backdrops = root.querySelectorAll<HTMLElement>(
			'[data-part="backdrop"]',
		);
		const contents = root.querySelectorAll<HTMLElement>(
			'[data-part="content"]',
		);

		const show = () => {
			root.setAttribute("data-state", "open");
			for (const p of positioners) {
				p.style.cssText =
					"display: flex !important; visibility: visible !important;";
				p.setAttribute("data-state", "open");
			}
			for (const b of backdrops) {
				b.style.cssText =
					"display: block !important; visibility: visible !important;";
				b.setAttribute("data-state", "open");
			}
			for (const c of contents) {
				c.setAttribute("data-state", "open");
				c.style.cssText =
					"display: flex !important; visibility: visible !important;";
			}
			document.body.style.overflow = "hidden";
		};

		const hide = () => {
			root.setAttribute("data-state", "closed");
			for (const p of positioners) {
				p.style.cssText =
					"display: none !important; visibility: hidden !important;";
				p.setAttribute("data-state", "closed");
			}
			for (const b of backdrops) {
				b.style.cssText =
					"display: none !important; visibility: hidden !important;";
				b.setAttribute("data-state", "closed");
			}
			for (const c of contents) {
				c.setAttribute("data-state", "closed");
				c.style.cssText =
					"display: none !important; visibility: hidden !important;";
			}
			document.body.style.overflow = "";
		};

		if (open) show();
		else hide();

		const handleClick = (e: Event) => {
			const target = (e.target as HTMLElement).closest(
				"[data-part]",
			) as HTMLElement;
			if (!target) return;

			const dataPart = target.getAttribute("data-part");

			if (dataPart === "backdrop") {
				hide();
				handleOpenChangeRef.current?.(false);
			} else if (dataPart === "trigger") {
				const currentOpen = root.getAttribute("data-state") === "open";
				if (currentOpen) hide();
				else show();
				handleOpenChangeRef.current?.(!currentOpen);
			} else if (
				dataPart === "close-trigger" ||
				dataPart === "action-trigger"
			) {
				hide();
				handleOpenChangeRef.current?.(false);
			}
		};

		const handleEscKey = (e: KeyboardEvent) => {
			if (e.key === "Escape" && root.getAttribute("data-state") === "open") {
				hide();
				handleOpenChangeRef.current?.(false);
			}
		};

		root.addEventListener("click", handleClick);
		document.addEventListener("keydown", handleEscKey);

		return () => {
			root.removeEventListener("click", handleClick);
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [rootId, open]);

	useEffect(() => {
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	return (
		<DrawerPrimitiveRoot
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={handleOpenChange}
		/>
	);
}
