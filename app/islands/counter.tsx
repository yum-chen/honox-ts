import { useState } from 'hono/jsx'
import { css } from '../../styled-system/css'
import { Button } from '../components/ui/button'
import { Card, CardBody, CardFooter, CardHeader, CardTitle, CardDescription } from '../components/ui/card'
import { Text, Heading } from '../components/ui/text'

export default function Counter() {
  const [count, setCount] = useState(0)
  return (
    <Card maxW="sm" mx="auto">
      <CardHeader>
        <CardTitle>Counter Island</CardTitle>
        <CardDescription>A simple counter built with Park UI components.</CardDescription>
      </CardHeader>
      <CardBody>
        <div class={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2' })}>
          <Text size="sm" fontWeight="medium" color="fg.muted" textTransform="uppercase">
            Current Count
          </Text>
          <Heading size="5xl" fontFamily="mono">
            {count}
          </Heading>
        </div>
      </CardBody>
      <CardFooter gap="3" justifyContent="center">
        <Button onClick={() => setCount(count + 1)}>Increment</Button>
        <Button variant="outline" onClick={() => setCount(0)}>
          Reset
        </Button>
      </CardFooter>
    </Card>
  )
}
