import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { Heading } from '../components/ui/text'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={css({ py: '12', px: '4', display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center' })}>
      <title>{name}</title>
      <Heading size="3xl">Hello, {name}!</Heading>
      <Counter />
    </div>
  )
})
