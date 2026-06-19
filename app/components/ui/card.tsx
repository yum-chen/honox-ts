import { type HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { card, type CardVariantProps } from '../../../styled-system/recipes'

export interface CardProps extends HTMLAttributes, CardVariantProps {}

export const Card = (props: CardProps) => {
  const [variantProps, localProps] = card.splitVariantProps(props)
  const { class: className, ...rest } = localProps
  const styles = card(variantProps)

  return <div class={cx(styles.root, css(rest as any), className)} {...rest} />
}

export const CardHeader = (props: HTMLAttributes) => {
  const { class: className, ...rest } = props
  const styles = card()
  return <div class={cx(styles.header, css(rest as any), className)} {...rest} />
}

export const CardBody = (props: HTMLAttributes) => {
  const { class: className, ...rest } = props
  const styles = card()
  return <div class={cx(styles.body, css(rest as any), className)} {...rest} />
}

export const CardFooter = (props: HTMLAttributes) => {
  const { class: className, ...rest } = props
  const styles = card()
  return <div class={cx(styles.footer, css(rest as any), className)} {...rest} />
}

export const CardTitle = (props: HTMLAttributes) => {
  const { class: className, ...rest } = props
  const styles = card()
  return <h3 class={cx(styles.title, css(rest as any), className)} {...rest} />
}

export const CardDescription = (props: HTMLAttributes) => {
  const { class: className, ...rest } = props
  const styles = card()
  return <p class={cx(styles.description, css(rest as any), className)} {...rest} />
}
