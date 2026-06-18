import { css, cx } from '../../../styled-system/css'
import type { ComponentProps } from 'hono/jsx'

const cardRoot = css({
  borderRadius: 'l3',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  position: 'relative',
})

const cardHeader = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1',
  p: '6',
})

const cardBody = css({
  display: 'flex',
  flex: '1',
  flexDirection: 'column',
  pb: '6',
  px: '6',
})

const cardFooter = css({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '3',
  pb: '6',
  pt: '2',
  px: '6',
})

const cardTitle = css({
  textStyle: 'lg',
  fontWeight: 'semibold',
})

const cardDescription = css({
  color: 'fg.muted',
  textStyle: 'sm',
})

const cardVariants = {
  elevated: css({ bg: 'gray.surface.bg', boxShadow: 'lg' }),
  outline: css({ bg: 'gray.surface.bg', borderWidth: '1px' }),
  subtle: css({ bg: 'gray.subtle.bg' }),
}

type CardRootProps = ComponentProps<'div'> & {
  variant?: keyof typeof cardVariants
}

function Root({ variant = 'outline', class: className, children, ...props }: CardRootProps) {
  return (
    <div class={cx(cardRoot, cardVariants[variant], className)} {...props}>
      {children}
    </div>
  )
}

function Header({ class: className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div class={cx(cardHeader, className)} {...props}>
      {children}
    </div>
  )
}

function Body({ class: className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div class={cx(cardBody, className)} {...props}>
      {children}
    </div>
  )
}

function Footer({ class: className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div class={cx(cardFooter, className)} {...props}>
      {children}
    </div>
  )
}

function Title({ class: className, children, ...props }: ComponentProps<'h3'>) {
  return (
    <h3 class={cx(cardTitle, className)} {...props}>
      {children}
    </h3>
  )
}

function Description({ class: className, children, ...props }: ComponentProps<'div'>) {
  return (
    <div class={cx(cardDescription, className)} {...props}>
      {children}
    </div>
  )
}

export const Card = { Root, Header, Body, Footer, Title, Description }
