import type { ComponentProps } from 'hono/jsx'
import { text, type TextVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type HeadingProps = ComponentProps<'h2'> & TextVariantProps & { as?: any }

export const Heading = (props: HeadingProps) => {
  const [variantProps, localProps] = splitVariantProps(props, text)
  const { as: Component = 'h2', ...otherProps } = localProps

  return (
    <Component
      {...otherProps}
      class={cx(
        text({ variant: 'heading', ...variantProps }),
        css({ fontWeight: 'semibold', textStyle: 'xl' }, localProps.css),
        localProps.class,
        localProps.className,
      )}
    />
  )
}
