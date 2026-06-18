import { css, cx } from '../../../styled-system/css'
import type { ComponentProps } from 'hono/jsx'

const badgeBase = css({
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 'l2',
  cursor: 'default',
  display: 'inline-flex',
  fontWeight: 'semibold',
  whiteSpace: 'nowrap',
  _disabled: {
    opacity: 0.5,
  },
})

const badgeVariants = {
  solid: css({
    bg: 'colorPalette.solid.bg',
    color: 'colorPalette.solid.fg',
  }),
  surface: css({
    bg: 'colorPalette.surface.bg',
    borderWidth: '1px',
    borderColor: 'colorPalette.surface.border',
    color: 'colorPalette.surface.fg',
  }),
  subtle: css({
    bg: 'colorPalette.subtle.bg',
    color: 'colorPalette.subtle.fg',
  }),
  outline: css({
    borderWidth: '1px',
    borderColor: 'colorPalette.outline.border',
    color: 'colorPalette.outline.fg',
  }),
  plain: css({
    color: 'colorPalette.plain.fg',
  }),
}

const badgeSizes = {
  sm: css({ h: '5', px: '2', textStyle: 'xs' }),
  md: css({ h: '6', px: '2.5', textStyle: 'xs' }),
  lg: css({ h: '7', px: '3', textStyle: 'sm' }),
}

type BadgeProps = ComponentProps<'span'> & {
  variant?: keyof typeof badgeVariants
  size?: keyof typeof badgeSizes
  colorPalette?: string
}

export function Badge({
  variant = 'subtle',
  size = 'md',
  colorPalette = 'blue',
  class: className,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      class={cx(badgeBase, badgeVariants[variant], badgeSizes[size], className)}
      style={{ colorPalette }}
      {...props}
    >
      {children}
    </span>
  )
}
