import { useId, useRef, useState } from "hono/jsx";
import { Root, type RootProps } from "../components/ui/dialog-primitive";
import { useOverlay } from "./use-overlay";

export interface InteractiveDialogProps extends RootProps {
	defaultOpen?: boolean;
	/** Close when Escape is pressed. Default: true. */
	closeOnEscape?: boolean;
	/** Close when the backdrop is clicked / interaction occurs outside. Default: true. */
	closeOnInteractOutside?: boolean;
	/** Element to focus when the dialog opens. Defaults to the first focusable. */
	initialFocusEl?: () => HTMLElement | null;
	/** Element to focus when the dialog closes. Defaults to the trigger. */
	finalFocusEl?: () => HTMLElement | null;
}

export function InteractiveDialog(props: InteractiveDialogProps) {
	const {
		open: openProp,
		onOpenChange: onOpenChangeProp,
		defaultOpen,
		id: idProp,
		dialogRole,
		closeOnEscape = true,
		closeOnInteractOutside = true,
		initialFocusEl,
		finalFocusEl,
		...rest
	} = props;
	const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);

	const isControlled = openProp !== undefined;
	const open = isControlled ? openProp : isOpen;

	const fallbackId = useId();
	const rootId = idProp || `dialog-${fallbackId}`;
	const rootRef = useRef<HTMLElement>(null);

	const handleOpenChange = (nextOpen: boolean) => {
		if (!isControlled) {
			setIsOpen(nextOpen);
		}
		onOpenChangeProp?.(nextOpen);
	};

	// Click delegation + focus trap / Escape / inert / scroll lock / focus return.
	useOverlay({
		rootRef,
		open,
		closeOnEscape,
		closeOnInteractOutside,
		onChange: handleOpenChange,
		initialFocusEl,
		finalFocusEl,
	});

	return (
		<Root
			{...rest}
			id={rootId}
			open={open}
			onOpenChange={handleOpenChange}
			rootRef={rootRef}
			dialogRole={dialogRole}
		/>
	);
}

export default function DialogIsland(props: InteractiveDialogProps) {
	return <InteractiveDialog {...props} />;
}

export type { InteractiveDialogProps as DialogIslandProps };
