import type { ComponentProps } from 'hono/jsx'
import { badge, type BadgeVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type BadgeProps = ComponentProps<'div'> & BadgeVariantProps & { colorPalette?: string }

export const Badge = (props: BadgeProps) => {
  const [variantProps, localProps] = splitVariantProps(props, badge)
  const { colorPalette, ...otherProps } = localProps

  return (
    <div
      {...otherProps}
      style={colorPalette ? { colorPalette, ...otherProps.style } : otherProps.style}
      class={cx(badge(variantProps), css(localProps.css), localProps.class, localProps.className)}
    />
  )
}
