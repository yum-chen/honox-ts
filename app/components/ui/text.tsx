import { type HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { text, type TextVariantProps } from '../../../styled-system/recipes'

export interface TextProps extends HTMLAttributes, TextVariantProps {
  as?: 'span' | 'p' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
}

export const Text = (props: TextProps) => {
  const [variantProps, localProps] = text.splitVariantProps(props)
  const { as: Component = 'span', class: className, children, ...rest } = localProps

  const { fontWeight, color, textTransform, fontFamily, ...htmlProps } = rest as any

  return (
    <Component
      class={cx(text(variantProps), css({ fontWeight, color, textTransform, fontFamily }), className)}
      {...htmlProps}
    >
      {children}
    </Component>
  )
}

export const Heading = (props: TextProps) => {
  return <Text as="h2" variant="heading" {...props} />
}
