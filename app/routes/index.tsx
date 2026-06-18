import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { container, stack, center } from '../../styled-system/patterns'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={container({ py: '12' })}>
      <title>{name}</title>
      <div class={center()}>
        <div class={stack({ gap: '4', align: 'center' })}>
          <h1 class={css({ textStyle: '4xl', fontWeight: 'bold', color: 'fg.default' })}>
            Hello, {name}!
          </h1>
          <p class={css({ textStyle: 'lg', color: 'fg.muted' })}>
            Welcome to your application styled with Park UI tokens.
          </p>
          <Counter />
        </div>
      </div>
    </div>
  )
})
