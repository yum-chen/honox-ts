import type { ComponentProps } from 'hono/jsx'
import { text, type TextVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'

export type HeadingProps = ComponentProps<'h2'> & TextVariantProps & { as?: any }

export const Heading = (props: HeadingProps) => {
  const [variantProps, localProps] = text.splitVariantProps(props)
  const { as: Component = 'h2', class: className, ...rest } = localProps

  return (
    <Component
      class={cx(
        text({ variant: 'heading', ...variantProps }),
        css({ fontWeight: 'semibold', textStyle: 'xl', ...rest } as any),
        className
      )}
      {...(rest as any)}
    />
  )
}
