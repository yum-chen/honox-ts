import type { ComponentProps } from 'hono/jsx'
import { card, type CardVariantProps } from '../../../styled-system/recipes'
import { css, cx } from '../../../styled-system/css'
import { splitVariantProps } from './utils/split-variant-props'

export type CardProps = ComponentProps<'div'> & CardVariantProps

export const Card = (props: CardProps) => {
  const [variantProps, localProps] = splitVariantProps(props, card)
  const styles = card(variantProps)

  return (
    <div
      {...localProps}
      class={cx(styles.root, css(localProps.css), localProps.class, localProps.className)}
    />
  )
}

export const CardHeader = (props: ComponentProps<'div'>) => {
  const styles = card()
  return <div {...props} class={cx(styles.header, props.class, props.className)} />
}

export const CardBody = (props: ComponentProps<'div'>) => {
  const styles = card()
  return <div {...props} class={cx(styles.body, props.class, props.className)} />
}

export const CardFooter = (props: ComponentProps<'div'>) => {
  const styles = card()
  return <div {...props} class={cx(styles.footer, props.class, props.className)} />
}

export const CardTitle = (props: ComponentProps<'h3'>) => {
  const styles = card()
  return <h3 {...props} class={cx(styles.title, props.class, props.className)} />
}

export const CardDescription = (props: ComponentProps<'p'>) => {
  const styles = card()
  return <p {...props} class={cx(styles.description, props.class, props.className)} />
}
