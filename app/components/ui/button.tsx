import type { HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { button, type ButtonVariantProps } from '../../../styled-system/recipes'

export type ButtonProps = ButtonVariantProps & HTMLAttributes

export const Button = (props: ButtonProps) => {
  const [variantProps, localProps] = button.splitVariantProps(props)
  const { className, ...rest } = localProps
  return <button className={cx(button(variantProps), css(rest as any), className)} {...rest} />
}
