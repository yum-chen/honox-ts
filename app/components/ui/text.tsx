import type { HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { text, type TextVariantProps } from '../../../styled-system/recipes'

export type TextProps = TextVariantProps & HTMLAttributes & { as?: 'p' | 'span' | 'div' | 'label' }

export const Text = (props: TextProps) => {
  const { as: Component = 'p', ...rest } = props
  const [variantProps, localProps] = text.splitVariantProps(rest)
  const { className, ...remainingProps } = localProps
  return <Component className={cx(text(variantProps), css(remainingProps as any), className)} {...remainingProps} />
}
