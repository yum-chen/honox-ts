import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { container, stack, center } from '../../styled-system/patterns'
import { Heading, Text } from '../components/ui'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div className={container({ py: '12' })}>
      <title>{name}</title>
      <div className={center()}>
        <div className={stack({ gap: '4', align: 'center' })}>
          <Heading as="h1" textStyle="4xl">Hello, {name}!</Heading>
          <Text textStyle="lg" color="fg.muted">Welcome to your Park UI powered application.</Text>
          <Counter />
        </div>
      </div>
    </div>
  )
})
