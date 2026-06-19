import { useState } from 'hono/jsx'
import { css } from '../../styled-system/css'
import { Button } from '../components/ui/button'
import { Text } from '../components/ui/text'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div class={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6' })}>
      <div class={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1' })}>
        <Text size="sm" fontWeight="medium" color="fg.muted">Current Count</Text>
        <Text size="5xl" fontWeight="bold" tabularNums>{count}</Text>
      </div>
      <div class={css({ display: 'flex', gap: '3' })}>
        <Button
          variant="outline"
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </Button>
        <Button
          variant="solid"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <Button
          variant="ghost"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
