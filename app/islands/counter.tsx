import { useState } from 'hono/jsx'
import { Button, Group, Text } from '../components/ui'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Group direction="vertical" gap="4">
      <Text size="2xl" class="cp">{count}</Text>
      <Group gap="2">
        <Button
          variant="solid"
          size="md"
          colorPalette="blue"
          onClick={() => setCount(count + 1)}
        >
          Increment
        </Button>
        <Button
          variant="outline"
          size="md"
          colorPalette="gray"
          onClick={() => setCount(0)}
        >
          Reset
        </Button>
      </Group>
    </Group>
  )
}
