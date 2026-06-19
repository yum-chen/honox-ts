import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { Heading, Text } from '../components/ui/text'
import { Badge } from '../components/ui/badge'
import { Code } from '../components/ui/code'
import { Link } from '../components/ui/link'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={css({ py: '12', px: '4', display: 'flex', flexDirection: 'column', gap: '8', alignItems: 'center', maxW: '2xl', mx: 'auto' })}>
      <title>{name}</title>
      <div class={css({ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2', textAlign: 'center' })}>
        <Badge variant="outline" size="lg">Park UI + HonoX</Badge>
        <Heading size="5xl" fontWeight="bold">Hello, {name}!</Heading>
        <Text color="fg.muted" size="lg">
          A high-performance web framework built on top of <Link href="https://hono.dev" target="_blank">Hono</Link> and styled with <Link href="https://park-ui.com" target="_blank">Park UI</Link>.
        </Text>
      </div>

      <div class={css({ w: 'full', p: '6', bg: 'bg.subtle', borderRadius: 'l2', borderW: '1px' })}>
        <Heading size="xl" mb="4">Quick Start</Heading>
        <div class={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
          <div>
            <Text fontWeight="medium" mb="1">1. Install dependencies</Text>
            <Code px="2" py="1">bun install</Code>
          </div>
          <div>
            <Text fontWeight="medium" mb="1">2. Run development server</Text>
            <Code px="2" py="1">bun run dev</Code>
          </div>
        </div>
      </div>

      <Counter />

      <div class={css({ w: 'full', display: 'flex', flexDirection: 'column', gap: '4' })}>
        <Heading size="xl">Try it out</Heading>
        <form method="get" class={css({ display: 'flex', gap: '2' })}>
          <Input name="name" placeholder="Enter your name..." defaultValue={name} />
          <Button type="submit">Greet</Button>
        </form>
      </div>
    </div>
  )
})
