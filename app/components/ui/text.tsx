import { css, cx } from '../../../styled-system/css'
import type { ComponentProps } from 'hono/jsx'

const textStyles = {
  body: css({ textStyle: 'sm' }),
  subtitle: css({ textStyle: 'md' }),
  title: css({ textStyle: 'xl' }),
  display: css({ textStyle: '2xl' }),
}

const textSizes = {
  xs: css({ textStyle: 'xs' }),
  sm: css({ textStyle: 'sm' }),
  md: css({ textStyle: 'md' }),
  lg: css({ textStyle: 'lg' }),
  xl: css({ textStyle: 'xl' }),
  '2xl': css({ textStyle: '2xl' }),
}

type TextProps = ComponentProps<'p'> & {
  size?: keyof typeof textSizes
  color?: string
}

export function Text({ size = 'md', color, class: className, children, ...props }: TextProps) {
  const colorStyle = color ? css({ color }) : ''
  return (
    <p class={cx(textSizes[size], colorStyle, className)} {...props}>
      {children}
    </p>
  )
}

type HeadingProps = ComponentProps<'h1'> & {
  level?: 1 | 2 | 3 | 4 | 5 | 6
  size?: keyof typeof textSizes
}

export function Heading({ level = 1, size = '2xl', class: className, children, ...props }: HeadingProps) {
  const Tag = `h${level}` as 'h1'
  return (
    <Tag class={cx(textSizes[size], css({ fontWeight: 'bold' }), className)} {...props}>
      {children}
    </Tag>
  )
}
