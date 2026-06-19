# Artefact - HonoX + Park UI + Panda CSS

This project is a high-performance web application built with [HonoX](https://github.com/honojs/honox), styled with [Panda CSS](https://panda-css.com/), and using [Park UI](https://park-ui.com/) design patterns ported to Hono JSX.

## Tech Stack

- **HonoX**: The Hono-based meta-framework.
- **Panda CSS**: Atomic CSS-in-JS engine.
- **Park UI**: Beautifully designed components based on Ark UI and Panda CSS.
- **Bun**: Fast JavaScript runtime and package manager.
- **Cloudflare Pages**: Deployment platform.

## Park UI Integration

Since Park UI natively supports React and SolidJS, we have ported the following components to Hono JSX:

- **General**: `Button`, `Heading`, `Text`, `Badge`, `Input`
- **Card**: `Card`, `CardHeader`, `CardBody`, `CardFooter`, `CardTitle`, `CardDescription`

The components are located in `app/components/ui`.

### How it works

1. **Panda Preset**: We use `@park-ui/panda-preset` in `panda.config.ts` to get all the design tokens and recipes.
2. **Component Porting**: We wrap Panda recipes in Hono JSX components.
3. **Variant Splitting**: A `splitVariantProps` utility is used to separate Panda variant props from standard HTML attributes.

### Usage Example

```tsx
import { Button } from '../components/ui/button'
import { Heading } from '../components/ui/heading'
import { Badge } from '../components/ui/badge'

export default function MyPage() {
  return (
    <div>
      <Badge variant="outline" colorPalette="amber">New</Badge>
      <Heading size="3xl">Welcome</Heading>
      <Button variant="solid">Click Me</Button>
    </div>
  )
}
```

## Getting Started

### Development

```bash
# Generate Panda CSS system
bun run prepare

# Start development server
bun run dev
```

### Build & Deploy

```bash
bun run build
bun run deploy
```

## Project Structure

- `app/routes/`: HonoX routes.
- `app/components/ui/`: Ported Park UI components.
- `app/components/ui/utils/`: Internal utilities (e.g., `splitVariantProps`).
- `app/islands/`: Interactive client-side components.
- `styled-system/`: Panda CSS generated files.
- `panda.config.ts`: Panda CSS configuration with Park UI preset.
