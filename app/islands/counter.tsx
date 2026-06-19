import { useState } from 'hono/jsx'
import { css, cx } from '../../styled-system/css'

const card = css({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '6',
  p: '8',
  bg: 'white',
  borderWidth: '1px',
  borderColor: 'gray.200',
  borderRadius: 'xl',
  boxShadow: 'sm',
  maxW: 'sm',
  mx: 'auto',
})

const buttonBase = css({
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 'md',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: '0',
  fontWeight: 'semibold',
  gap: '2',
  justifyContent: 'center',
  outline: '0',
  transition: 'all 0.2s',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  h: '10',
  px: '4',
  textStyle: 'sm',
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const incrementButton = css({
  bg: 'blue.600',
  color: 'white',
  _hover: { bg: 'blue.700' },
  _active: { bg: 'blue.800' },
})

const resetButton = css({
  bg: 'gray.100',
  color: 'gray.900',
  borderWidth: '1px',
  borderColor: 'gray.200',
  _hover: { bg: 'gray.200' },
  _active: { bg: 'gray.300' },
})

const countDisplay = css({
  fontSize: '5xl',
  fontWeight: 'bold',
  color: 'gray.900',
  fontFamily: 'mono',
})

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div class={card}>
      <div class={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1' })}>
        <p
          class={css({
            textStyle: 'xs',
            fontWeight: 'bold',
            color: 'gray.500',
            textTransform: 'uppercase',
            letterSpacing: 'wider',
          })}
        >
          Current Count
        </p>
        <p class={countDisplay}>{count}</p>
      </div>
      <div class={css({ display: 'flex', gap: '3' })}>
        <button
          type="button"
          class={cx(buttonBase, incrementButton)}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button type="button" class={cx(buttonBase, resetButton)} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  )
}
