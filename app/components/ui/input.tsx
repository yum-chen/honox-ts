import { type InputHTMLAttributes } from 'hono/jsx'
import { cx } from '../../../styled-system/css'
import { input, type InputVariantProps } from '../../../styled-system/recipes'

export interface InputProps extends InputHTMLAttributes, InputVariantProps {}

export const Input = (props: InputProps) => {
  const [variantProps, localProps] = input.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return <input class={cx(input(variantProps), className)} {...rest} />
}
