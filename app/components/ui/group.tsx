import { css, cx } from '../../../styled-system/css'
import type { ComponentProps } from 'hono/jsx'

const groupStyles = css({
  display: 'flex',
  alignItems: 'center',
})

const groupVariants = {
  horizontal: css({ flexDirection: 'row' }),
  vertical: css({ flexDirection: 'column' }),
}

type GroupProps = ComponentProps<'div'> & {
  direction?: keyof typeof groupVariants
  gap?: string
}

export function Group({
  direction = 'horizontal',
  gap = '4',
  class: className,
  children,
  ...props
}: GroupProps) {
  return (
    <div
      class={cx(groupStyles, groupVariants[direction], css({ gap }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

const stackStyles = css({
  display: 'flex',
  flexDirection: 'column',
})

type StackProps = ComponentProps<'div'> & {
  gap?: string
}

export function Stack({ gap = '4', class: className, children, ...props }: StackProps) {
  return (
    <div class={cx(stackStyles, css({ gap }), className)} {...props}>
      {children}
    </div>
  )
}
