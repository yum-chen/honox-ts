import { useState } from 'hono/jsx'
import { css, cx } from '../../styled-system/css'

const buttonBase = css({
  alignItems: 'center',
  appearance: 'none',
  borderRadius: 'l2',
  cursor: 'pointer',
  display: 'inline-flex',
  flexShrink: '0',
  fontWeight: 'semibold',
  gap: '2',
  isolation: 'isolate',
  justifyContent: 'center',
  outline: '0',
  position: 'relative',
  transition: 'colors',
  transitionProperty: 'background-color, border-color, color, box-shadow',
  userSelect: 'none',
  verticalAlign: 'middle',
  whiteSpace: 'nowrap',
  h: '10',
  minW: '10',
  textStyle: 'sm',
  px: '3.5',
  _disabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
})

const solidBlue = css({
  bg: 'colorPalette.solid.bg',
  color: 'colorPalette.solid.fg',
  _hover: { bg: 'colorPalette.solid.bg.hover' },
})

const outlineGray = css({
  borderWidth: '1px',
  borderColor: 'colorPalette.outline.border',
  color: 'colorPalette.outline.fg',
  _hover: { bg: 'colorPalette.outline.bg.hover' },
  _active: { bg: 'colorPalette.outline.bg.active' },
})

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div class={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
      <p class={css({ textStyle: '2xl', fontWeight: 'bold' })}>{count}</p>
      <div class={css({ display: 'flex', gap: '2' })}>
        <button
          type="button"
          class={cx(buttonBase, solidBlue)}
          style={{ colorPalette: 'blue' }}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>
        <button
          type="button"
          class={cx(buttonBase, outlineGray)}
          style={{ colorPalette: 'gray' }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  )
}
