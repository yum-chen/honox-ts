import type { ComponentProps } from 'hono/jsx'
import { text, type TextVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type TextProps = ComponentProps<'p'> & TextVariantProps & { as?: any }

export const Text = (props: TextProps) => {
  const [variantProps, localProps] = splitVariantProps(props, text)
  const { as: Component = 'p', ...otherProps } = localProps

  return (
    <Component
      {...otherProps}
      class={cx(text(variantProps), css(localProps.css), localProps.class, localProps.className)}
    />
  )
}
