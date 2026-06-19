import { useState } from 'hono/jsx'
import { vstack } from '../../styled-system/patterns'
import { Button, Text } from '../components/ui'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <div className={vstack({ gap: '4' })}>
      <Text textStyle="2xl" fontWeight="bold">{count}</Text>
      <Button
        onClick={() => setCount(count + 1)}
      >
        Increment
      </Button>
    </div>
  )
}
