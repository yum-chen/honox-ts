import { useState } from 'hono/jsx'
import { vstack } from '../../styled-system/patterns'
import { button, text } from '../../styled-system/recipes'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className={vstack({ gap: '4' })}>
      <p className={text({ textStyle: '2xl', fontWeight: 'bold' })}>{count}</p>
      <button
        type="button"
        className={button({ variant: 'solid', size: 'md' })}
        onClick={() => setCount(count + 1)}
      >
        Increment
      </button>
    </div>
  )
}
