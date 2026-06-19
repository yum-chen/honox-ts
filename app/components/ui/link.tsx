import { type AnchorHTMLAttributes } from 'hono/jsx'
import { cx } from '../../../styled-system/css'
import { link, type LinkVariantProps } from '../../../styled-system/recipes'

export interface LinkProps extends AnchorHTMLAttributes, LinkVariantProps {}

export const Link = (props: LinkProps) => {
  const [variantProps, localProps] = link.splitVariantProps(props)
  const { class: className, ...rest } = localProps

  return <a class={cx(link(variantProps), className)} {...rest} />
}
