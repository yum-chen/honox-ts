# HonoX with Park UI

This project is a HonoX application styled using Park UI components, adapted for Hono JSX.

## Setup

The project uses Panda CSS for styling with the `@park-ui/panda-preset`.

### Installation

```bash
bun install
```

### Development

```bash
bun run dev
```

### Build

```bash
bun run build
```

## Park UI Integration

Since Park UI natively supports React and SolidJS, this project ports essential components to Hono JSX.

### Components

Components are located in `app/components/ui`. Current ported components include:

- `Button`
- `Heading` (based on `Text` recipe)
- `Text`

### Adding New Components

To add more Park UI components:

1. Check the Panda CSS recipe for the component in `styled-system/recipes`.
2. Create a new file in `app/components/ui`.
3. Wrap the Panda recipe using its `splitVariantProps` method and `hono/jsx`.

Example:

```tsx
import type { ComponentProps } from 'hono/jsx'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = button.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return (
    <button
      class={cx(button(variantProps), css(rest as any), className)}
      {...(rest as any)}
    />
  )
}
```

## Theming

Theming is configured in `panda.config.ts`. We use:
- **Accent Color**: Amber
- **Gray Color**: Neutral
- **Radius**: Small

Colors are explicitly imported to ensure compatibility during the Panda CSS build process.

## Deployment

The project includes a GitHub Actions workflow for deployment to both GitHub Pages and Cloudflare Pages.

### Configuration

- **GitHub Pages**: Ensure GitHub Pages is enabled for your repository and set to deploy from GitHub Actions.
- **Cloudflare Pages**: Add `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` to your GitHub repository secrets.
