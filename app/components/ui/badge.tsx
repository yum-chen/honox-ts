import { type HTMLAttributes } from 'hono/jsx'
import { cx } from '../../../styled-system/css'
import { badge, type BadgeVariantProps } from '../../../styled-system/recipes'

export interface BadgeProps extends HTMLAttributes, BadgeVariantProps {}

export const Badge = (props: BadgeProps) => {
  const [variantProps, localProps] = badge.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return <span class={cx(badge(variantProps), className)} {...rest} />
}
