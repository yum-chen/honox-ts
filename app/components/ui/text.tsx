import type { ComponentProps } from 'hono/jsx'
import { text, type TextVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'

export type TextProps = ComponentProps<'p'> & TextVariantProps & { as?: any }

export const Text = (props: TextProps) => {
  const [variantProps, localProps] = text.splitVariantProps(props)
  const { as: Component = 'p', class: className, ...rest } = localProps

  return (
    <Component
      class={cx(text(variantProps), css(rest as any), className)}
      {...(rest as any)}
    />
  )
}
