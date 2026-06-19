import { type HTMLAttributes } from 'hono/jsx'
import { cx } from '../../../styled-system/css'
import { code, type CodeVariantProps } from '../../../styled-system/recipes'

export interface CodeProps extends HTMLAttributes, CodeVariantProps {}

export const Code = (props: CodeProps) => {
  const [variantProps, localProps] = code.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return <code class={cx(code(variantProps), className)} {...rest} />
}
