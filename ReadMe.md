# HonoX UI + PandaCSS Starter

Template for starting a HonoX + PandaCSS UI project.

## Architecture

This project follows a "Component-Only API" philosophy. All UI components are located in `app/components/ui` and serve as the primary entry points for developers.

### Smart Switchers

To balance performance and interactivity, components use a "Smart Switcher" pattern:

1.  **Public Component (`app/components/ui/*.tsx`)**: The main entry point. It decides whether to render a static primitive or an interactive island based on the props provided (e.g., if `onValueChange` or `interactive={true}` is passed).
2.  **Base/Primitive (`app/components/ui/*-base.tsx`)**: A stateless, server-side compatible version of the component.
3.  **Island (`app/islands/*.tsx`)**: A client-side component that adds interactivity and state management. Islands should only be used internally by the public components and not imported directly by routes.

### Interactivity

Every interactable component supports an `interactive` prop. Setting `interactive={true}` forces the component to hydrate as an island, even if no other interactive props are present.
