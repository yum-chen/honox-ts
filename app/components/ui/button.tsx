import { type HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'

export interface ButtonProps extends HTMLAttributes, ButtonVariantProps {}

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = button.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return <button class={cx(button(variantProps), css(rest as any), className)} {...rest} />
}
