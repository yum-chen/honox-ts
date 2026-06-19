import type { ComponentProps } from 'hono/jsx'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type ButtonProps = ComponentProps<'button'> & ButtonVariantProps & { colorPalette?: string }

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = splitVariantProps(props, button)
  const { colorPalette, ...otherProps } = localProps

  return (
    <button
      {...otherProps}
      style={colorPalette ? { colorPalette, ...otherProps.style } : otherProps.style}
      class={cx(button(variantProps), css(localProps.css), localProps.class, localProps.className)}
    />
  )
}
