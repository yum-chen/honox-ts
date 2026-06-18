import { css, cx } from '../../../styled-system/css'
import type { ComponentProps } from 'hono/jsx'

const buttonStyles = css({
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 'l2',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: '0',
  fontWeight: 'semibold',
  gap: '2',
  isolation: 'isolate',
  justifyContent: 'center',
  outline: '0',
  position: 'relative',
  transition: 'colors',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const variants = {
  solid: css({
    bg: 'colorPalette.solid.bg',
    color: 'colorPalette.solid.fg',
    _hover: { bg: 'colorPalette.solid.bg.hover' },
  }),
  surface: css({
    bg: 'colorPalette.surface.bg',
    borderWidth: '1px',
    borderColor: 'colorPalette.surface.border',
    color: 'colorPalette.surface.fg',
    _hover: { borderColor: 'colorPalette.surface.border.hover' },
    _active: { bg: 'colorPalette.surface.bg.active' },
  }),
  subtle: css({
    bg: 'colorPalette.subtle.bg',
    color: 'colorPalette.subtle.fg',
    _hover: { bg: 'colorPalette.subtle.bg.hover' },
    _active: { bg: 'colorPalette.subtle.bg.active' },
  }),
  outline: css({
    borderWidth: '1px',
    borderColor: 'colorPalette.outline.border',
    color: 'colorPalette.outline.fg',
    _hover: { bg: 'colorPalette.outline.bg.hover' },
    _active: { bg: 'colorPalette.outline.bg.active' },
  }),
  plain: css({
    color: 'colorPalette.plain.fg',
    _hover: { bg: 'colorPalette.plain.bg.hover' },
    _active: { bg: 'colorPalette.plain.bg.active' },
  }),
}

const sizes = {
  xs: css({ h: '8', minW: '8', textStyle: 'sm', px: '2.5' }),
  sm: css({ h: '9', minW: '9', textStyle: 'sm', px: '3' }),
  md: css({ h: '10', minW: '10', textStyle: 'sm', px: '3.5' }),
  lg: css({ h: '11', minW: '11', textStyle: 'md', px: '4' }),
  xl: css({ h: '12', minW: '12', textStyle: 'md', px: '4.5' }),
}

type ButtonProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  colorPalette?: string
}

export function Button({
  variant = 'solid',
  size = 'md',
  colorPalette = 'blue',
  class: className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      class={cx(
        buttonStyles,
        variants[variant],
        sizes[size],
        `cp`,
        className,
      )}
      style={{ colorPalette }}
      {...props}
    >
      {children}
    </button>
  )
}
