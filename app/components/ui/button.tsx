import { type HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'

export interface ButtonProps extends HTMLAttributes, ButtonVariantProps {}

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = button.splitVariantProps(props)
  const { class: className, children, ...rest } = localProps

  // We omit style props from 'rest' for now to be safe, or we could use a whitelist.
  // For buttons, we usually don't pass many custom style props directly.
  return (
    <button class={cx(button(variantProps), className)} {...rest}>
      {children}
    </button>
  )
}
