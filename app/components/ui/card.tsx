import { type HTMLAttributes } from 'hono/jsx'
import { css, cx } from '../../../styled-system/css'
import { card, type CardVariantProps } from '../../../styled-system/recipes'

export interface CardProps extends HTMLAttributes, CardVariantProps {}

export const Card = (props: CardProps) => {
  const [variantProps, localProps] = card.splitVariantProps(props)
  const { class: className, children, ...rest } = localProps
  const styles = card(variantProps)

  // Extract common layout props that we might want to support
  const { maxW, mx, width, height, ...htmlProps } = rest as any

  return (
    <div class={cx(styles.root, css({ maxW, mx, width, height }), className)} {...htmlProps}>
      {children}
    </div>
  )
}

export const CardHeader = (props: HTMLAttributes) => {
  const { class: className, children, ...rest } = props
  const styles = card()
  return (
    <div class={cx(styles.header, className)} {...rest}>
      {children}
    </div>
  )
}

export const CardBody = (props: HTMLAttributes) => {
  const { class: className, children, ...rest } = props
  const styles = card()
  return (
    <div class={cx(styles.body, className)} {...rest}>
      {children}
    </div>
  )
}

export const CardFooter = (props: HTMLAttributes) => {
  const { class: className, children, ...rest } = props
  const styles = card()
  const { gap, justifyContent, alignItems, ...htmlProps } = rest as any

  return (
    <div
      class={cx(styles.footer, css({ gap, justifyContent, alignItems }), className)}
      {...htmlProps}
    >
      {children}
    </div>
  )
}

export const CardTitle = (props: HTMLAttributes) => {
  const { class: className, children, ...rest } = props
  const styles = card()
  return (
    <h3 class={cx(styles.title, className)} {...rest}>
      {children}
    </h3>
  )
}

export const CardDescription = (props: HTMLAttributes) => {
  const { class: className, children, ...rest } = props
  const styles = card()
  return (
    <p class={cx(styles.description, className)} {...rest}>
      {children}
    </p>
  )
}
