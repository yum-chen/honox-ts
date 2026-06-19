import type { ComponentProps } from 'hono/jsx'
import { input, type InputVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type InputProps = ComponentProps<'input'> & InputVariantProps

export const Input = (props: InputProps) => {
  const [variantProps, localProps] = splitVariantProps(props, input)
  return (
    <input
      {...localProps}
      class={cx(input(variantProps), css(localProps.css), localProps.class, localProps.className)}
    />
  )
}
