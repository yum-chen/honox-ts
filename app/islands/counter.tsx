import { useState } from 'hono/jsx'
import { css } from '../../styled-system/css'
import { Button } from '../components/ui/button'
import { Text } from '../components/ui/text'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div class={css({ display: 'flex', flexDirection: 'column', gap: '4', alignItems: 'center' })}>
      <Text size="5xl" fontWeight="bold">{count}</Text>
      <div class={css({ display: 'flex', gap: '3' })}>
        <Button
          size="lg"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <Button
          size="lg"
          variant="outline"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
