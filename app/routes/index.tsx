import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { Heading } from '../components/ui/heading'
import { Text } from '../components/ui/text'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={css({
      py: '12',
      px: '6',
      maxW: '3xl',
      mx: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '6',
      textAlign: 'center'
    })}>
      <title>{name}</title>
      <div class={css({ display: 'flex', flexDirection: 'column', gap: '2' })}>
        <Heading as="h1" size="3xl">Hello, {name}!</Heading>
        <Text size="lg" color="fg.muted">
          Welcome to your HonoX application styled with Park UI.
        </Text>
      </div>
      <div class={css({
        p: '8',
        bg: 'bg.default',
        borderRadius: 'l3',
        borderWidth: '1px',
        boxShadow: 'sm'
      })}>
        <Counter />
      </div>
    </div>
  )
})
