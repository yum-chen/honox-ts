import type { ComponentProps } from 'hono/jsx'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'

export type ButtonProps = ComponentProps<'button'> & ButtonVariantProps

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = button.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return (
    <button
      class={cx(button(variantProps), css(rest as any), className)}
      {...(rest as any)}
    />
  )
}
