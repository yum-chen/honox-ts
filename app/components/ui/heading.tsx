import type { HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { text, type TextVariantProps } from '../../../styled-system/recipes'

export type HeadingProps = TextVariantProps & HTMLAttributes & { as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' }

export const Heading = (props: HeadingProps) => {
  const { as: Component = 'h2', ...rest } = props
  const [variantProps, localProps] = text.splitVariantProps(rest)
  const { className, ...remainingProps } = localProps
  return <Component className={cx(text(variantProps), css(remainingProps as any), className)} {...remainingProps} />
}
