# Artefact - HonoX + Park UI + Panda CSS

A high-performance web application built with [HonoX](https://github.com/honojs/honox), styled with [Panda CSS](https://panda-css.com/), and featuring a custom port of [Park UI](https://park-ui.com/) components to Hono JSX.

## 🚀 Tech Stack

- **Framework**: [HonoX](https://github.com/honojs/honox) (Full-stack Hono)
- **Styling**: [Panda CSS](https://panda-css.com/) with [@park-ui/panda-preset](https://park-ui.com/docs/panda/installation)
- **UI Components**: Park UI ported to Hono JSX
- **Runtime**: [Bun](https://bun.sh/)
- **Linting & Formatting**: [Biome](https://biomejs.dev/)
- **Deployment**: [Cloudflare Pages](https://pages.cloudflare.com/)

## 🎨 Design System

This project uses the Park UI design system integrated via Panda CSS.

- **Accent Color**: Amber
- **Gray Color**: Sand
- **Radius**: Medium (md)

The color system follows the Radix Colors 12-shade scale, providing fine-grained control over light and dark modes.

## 🧱 Ported Components

Since Park UI natively supports React and Solid, this project includes a manual port of core components to **Hono JSX**. These components are located in `app/components/ui`.

Currently ported:
- `Button`: A clickable component for triggering actions.
- `Heading`: Typography for page and section headers.
- `Text`: Typography for body content and paragraphs.

### Component Usage Example

```tsx
import { Button, Heading, Text } from '@/components/ui'
import { vstack } from '../../styled-system/patterns'

export default function Welcome() {
  return (
    <div className={vstack({ gap: '4' })}>
      <Heading as="h1" textStyle="4xl">Hello World</Heading>
      <Text color="fg.muted">Welcome to your styled application.</Text>
      <Button variant="solid" size="md">Click Me</Button>
    </div>
  )
}
```

## 🛠️ Development

### Setup

```bash
bun install
bun run prepare # Generates Panda CSS styled-system
```

### Scripts

- `bun run dev`: Start the Vite development server.
- `bun run build`: Build the client and server for production.
- `bun run preview`: Preview the production build locally using Wrangler.
- `bun run check`: Run Biome linting and formatting checks.
- `bun run format`: Fix Biome formatting issues.
- `bun run prepare`: Run `panda codegen` to update styling recipes.

## 📦 Adding New Components

To add more Park UI components:
1. Ensure the `@park-ui/panda-preset` includes the recipe for the component.
2. Port the component's JSX structure from the [Park UI React Docs](https://park-ui.com/docs/components/button) to `app/components/ui`.
3. Wrap the component with Panda CSS's `button.splitVariantProps` (or equivalent for the component) and use `cx` and `css` to handle system props.
