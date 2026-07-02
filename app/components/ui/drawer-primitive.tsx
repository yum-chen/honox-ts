import type { PropsWithChildren } from "hono/jsx";
import { useEffect, useRef } from "hono/jsx";
import {
  cloneElement,
  createContext,
  useContext,
  useId,
  useState,
} from "hono/jsx";
import { cx, css } from "../../../styled-system/css";
import type { DrawerVariantProps } from "../../../styled-system/recipes";
import { drawer } from "../../../styled-system/recipes";

type DrawerStyles = ReturnType<typeof drawer>;

interface DrawerContextValue {
  styles: DrawerStyles;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id: string;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

const useDrawerContext = () => {
  const context = useContext(DrawerContext);
  return context;
};

export interface RootProps extends DrawerVariantProps, PropsWithChildren {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
}

export function Root(props: RootProps) {
  const [variantProps, localProps] = drawer.splitVariantProps(props);
  const { children, open, onOpenChange, id: idProp } = localProps;
  const styles = drawer(variantProps);
  const generatedId = useId();
  const id = idProp || generatedId;

  const value = {
    styles,
    open,
    onOpenChange,
    id,
  };

  return (
    <div id={id}>
      <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
    </div>
  );
}

export interface TriggerProps extends PropsWithChildren {
  class?: string;
  asChild?: boolean;
}

export function Trigger(props: TriggerProps) {
  const { children, class: classProp, asChild, ...restProps } = props;
  const context = useDrawerContext();
  const open = context?.open;

  const triggerProps = {
    "aria-haspopup": "dialog",
    "aria-expanded": open,
    "data-part": "trigger",
    ...restProps,
  };

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as any;
    return cloneElement(child, {
      ...triggerProps,
      class: cx(classProp, child.props?.class),
    });
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

export interface BackdropProps extends PropsWithChildren {
  class?: string;
}

export function Backdrop(props: BackdropProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;
  const open = context?.open;
  console.log("[Drawer.Backdrop] Rendering with open:", open);

  return (
    <div
      class={cx(styles?.backdrop, classProp, !open && css({ display: "none" }))}
      data-state={open ? "open" : "closed"}
      data-part="backdrop"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface PositionerProps extends PropsWithChildren {
  class?: string;
}

export function Positioner(props: PositionerProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;
  const open = context?.open;

  return (
    <div
      class={cx(
        styles?.positioner,
        classProp,
        !open && css({ display: "none" }),
      )}
      data-state={open ? "open" : "closed"}
      data-part="positioner"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface ContentProps extends PropsWithChildren {
  class?: string;
}

export function Content(props: ContentProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;
  const open = context?.open;
  const id = context?.id;
  console.log("[Drawer.Content] Rendering with open:", open);

  return (
    <div
      role="dialog"
      data-part="content"
      aria-modal="true"
      aria-labelledby={id ? `${id}-title` : undefined}
      aria-describedby={id ? `${id}-description` : undefined}
      class={cx(styles?.content, classProp, !open && css({ display: "none" }))}
      data-state={open ? "open" : "closed"}
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface HeaderProps extends PropsWithChildren {
  class?: string;
}

export function Header(props: HeaderProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;

  return (
    <div
      class={cx(styles?.header, classProp)}
      data-part="header"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface BodyProps extends PropsWithChildren {
  class?: string;
}

export function Body(props: BodyProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;

  return (
    <div
      class={cx(styles?.body, classProp)}
      data-part="body"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface FooterProps extends PropsWithChildren {
  class?: string;
}

export function Footer(props: FooterProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;

  return (
    <div
      class={cx(styles?.footer, classProp)}
      data-part="footer"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface TitleProps extends PropsWithChildren {
  class?: string;
}

export function Title(props: TitleProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;
  const id = context?.id;

  return (
    <h2
      id={id ? `${id}-title` : undefined}
      class={cx(styles?.title, classProp)}
      data-part="title"
      {...restProps}
    >
      {children}
    </h2>
  );
}

export interface DescriptionProps extends PropsWithChildren {
  class?: string;
}

export function Description(props: DescriptionProps) {
  const { children, class: classProp, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;
  const id = context?.id;

  return (
    <div
      id={id ? `${id}-description` : undefined}
      class={cx(styles?.description, classProp)}
      data-part="description"
      {...restProps}
    >
      {children}
    </div>
  );
}

export interface CloseTriggerProps extends PropsWithChildren {
  class?: string;
  asChild?: boolean;
}

export function CloseTrigger(props: CloseTriggerProps) {
  const { children, class: classProp, asChild, ...restProps } = props;
  const context = useDrawerContext();
  const styles = context?.styles;

  const triggerProps = {
    "data-part": "close-trigger",
    ...restProps,
  };

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as any;
    return cloneElement(child, {
      ...triggerProps,
      class: cx(styles?.closeTrigger, classProp, child.props?.class),
    });
  }

  return (
    <button
      type="button"
      aria-label="Close"
      class={cx(styles?.closeTrigger, classProp)}
      {...triggerProps}
    >
      {children}
    </button>
  );
}

export interface ActionTriggerProps extends PropsWithChildren {
  class?: string;
  asChild?: boolean;
}

export function ActionTrigger(props: ActionTriggerProps) {
  const { children, class: classProp, asChild, ...restProps } = props;

  const triggerProps = {
    "data-part": "action-trigger",
    ...restProps,
  };

  if (asChild && typeof children === "object" && children !== null) {
    const child = children as any;
    return cloneElement(child, {
      ...triggerProps,
      class: cx(classProp, child.props?.class),
    });
  }

  return (
    <button type="button" class={cx(classProp)} {...triggerProps}>
      {children}
    </button>
  );
}

// Interactive version with state management and event listeners
export interface InteractiveDrawerProps extends RootProps {
  defaultOpen?: boolean;
}

export function InteractiveDrawer(props: InteractiveDrawerProps) {
  const {
    open: openProp,
    onOpenChange: onOpenChangeProp,
    defaultOpen,
    id: idProp,
    ...rest
  } = props;
  const [isOpen, setIsOpen] = useState(openProp ?? defaultOpen ?? false);

  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : isOpen;

  const fallbackId = useId();
  const rootId = idProp || `drawer-${fallbackId}`;

  const handleOpenChangeRef = useRef<(nextOpen: boolean) => void>(() => {});

  const handleOpenChange = (nextOpen: boolean) => {
    console.log(
      "[Drawer] handleOpenChange called with:",
      nextOpen,
      "isControlled:",
      isControlled,
    );
    if (!isControlled) {
      console.log("[Drawer] Calling setIsOpen(", nextOpen, ")");
      setIsOpen(nextOpen);
    }
    onOpenChangeProp?.(nextOpen);
  };

  // Store the handler in a ref
  useEffect(() => {
    handleOpenChangeRef.current = handleOpenChange;
  }, [isControlled, onOpenChangeProp]);

  // Attach event listeners using event delegation
  useEffect(() => {
    const root = document.getElementById(rootId);
    console.log("[Drawer] Attaching listeners to:", rootId, root);
    if (!root) return;

    const [variantProps] = drawer.splitVariantProps(props);
    const styles = drawer(variantProps);

    const syncDom = (isOpen: boolean) => {
      const parts = root.querySelectorAll<HTMLElement>("[data-part]");
      for (const part of Array.from(parts)) {
        const dataPart = part.getAttribute("data-part");
        if (dataPart === "backdrop") {
          part.className = cx(styles.backdrop, part.getAttribute("class"));
          part.setAttribute("data-state", isOpen ? "open" : "closed");
          part.style.display = isOpen ? "block" : "none";
        } else if (dataPart === "positioner") {
          part.className = cx(styles.positioner, part.getAttribute("class"));
          part.setAttribute("data-state", isOpen ? "open" : "closed");
          part.style.display = isOpen ? "block" : "none";
        } else if (dataPart === "content") {
          part.className = cx(styles.content, part.getAttribute("class"));
          part.setAttribute("data-state", isOpen ? "open" : "closed");
          part.style.display = isOpen ? "block" : "none";
        } else if (dataPart === "header") {
          part.className = cx(styles.header, part.getAttribute("class"));
        } else if (dataPart === "body") {
          part.className = cx(styles.body, part.getAttribute("class"));
        } else if (dataPart === "footer") {
          part.className = cx(styles.footer, part.getAttribute("class"));
        } else if (dataPart === "title") {
          part.className = cx(styles.title, part.getAttribute("class"));
        } else if (dataPart === "description") {
          part.className = cx(styles.description, part.getAttribute("class"));
        } else if (dataPart === "close-trigger") {
          part.className = cx(styles.closeTrigger, part.getAttribute("class"));
        }
      }
    };

    syncDom(open);

    console.log("[Drawer] Root innerHTML:", root.innerHTML);
    console.log("[Drawer] Root children:", root.children);
    console.log(
      "[Drawer] All data-part attributes in root:",
      Array.from(root.querySelectorAll("[data-part]")).map((el: Element) =>
        el.getAttribute("data-part"),
      ),
    );

    const positioners = Array.from(
      root.querySelectorAll<HTMLElement>('[data-part="positioner"]'),
    );
    const backdrops = Array.from(
      root.querySelectorAll<HTMLElement>('[data-part="backdrop"]'),
    );

    console.log("[Drawer] Found positioners:", positioners.length);
    console.log("[Drawer] Found backdrops:", backdrops.length);

    // Handle all clicks via event delegation
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      console.log("[Drawer] Click event triggered on:", target);
      console.log(
        "[Drawer] target.getAttribute('data-part'):",
        target.getAttribute("data-part"),
      );
      console.log("[Drawer] open value:", open);

      const dataPart = target.getAttribute("data-part");

      if (dataPart === "backdrop") {
        console.log("[Drawer] Backdrop clicked, closing");
        positioners.forEach((p) => {
          p.style.cssText =
            "display: none !important; visibility: hidden !important;";
        });
        backdrops.forEach((b) => {
          b.style.cssText =
            "display: none !important; visibility: hidden !important;";
        });
        handleOpenChangeRef.current?.(false);
      } else if (dataPart === "trigger") {
        console.log("[Drawer] Trigger clicked");
        const nextOpen = !open;
        console.log("[Drawer] Toggling to:", nextOpen);
        if (nextOpen) {
          positioners.forEach((p) => {
            p.style.cssText =
              "display: block !important; visibility: visible !important;";
          });
          backdrops.forEach((b) => {
            b.style.cssText =
              "display: block !important; visibility: visible !important;";
          });
        } else {
          positioners.forEach((p) => {
            p.style.cssText =
              "display: none !important; visibility: hidden !important;";
          });
          backdrops.forEach((b) => {
            b.style.cssText =
              "display: none !important; visibility: hidden !important;";
          });
        }
        handleOpenChangeRef.current?.(nextOpen);
      } else if (
        dataPart === "close-trigger" ||
        dataPart === "action-trigger"
      ) {
        console.log("[Drawer] Close/Action trigger clicked");
        positioners.forEach((p) => {
          p.style.cssText =
            "display: none !important; visibility: hidden !important;";
        });
        backdrops.forEach((b) => {
          b.style.cssText =
            "display: none !important; visibility: hidden !important;";
        });
        handleOpenChangeRef.current?.(false);
      }
    };

    // Use event delegation on root
    root.addEventListener("click", handleClick);

    return () => {
      root.removeEventListener("click", handleClick);
    };
  }, [rootId, open]);

  return (
    <Root {...rest} id={rootId} open={open} onOpenChange={handleOpenChange} />
  );
}
