import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { Button, Card, Badge, Heading, Text, Group, Stack } from '../components/ui'
import { css } from '../../styled-system/css'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <Stack
      gap="8"
      class={css({
        minH: '100vh',
        bg: 'canvas',
        py: '16',
        px: '4',
      })}
    >
      <title>{name}</title>

      <Stack gap="2" class={css({ textAlign: 'center', maxW: 'xl', mx: 'auto' })}>
        <Badge colorPalette="blue" variant="subtle">
          Built with HonoX + Park UI
        </Badge>
        <Heading size="2xl">Hello, {name}!</Heading>
        <Text size="lg" color="fg.muted">
          A beautifully styled starter with Park UI design tokens
        </Text>
      </Stack>

      <Card.Root variant="outline" class={css({ maxW: 'md', mx: 'auto', w: 'full' })}>
        <Card.Header>
          <Card.Title>Counter</Card.Title>
          <Card.Description>Click the button to increment</Card.Description>
        </Card.Header>
        <Card.Body>
          <Counter />
        </Card.Body>
      </Card.Root>

      <Group direction="vertical" gap="4" class={css({ maxW: 'md', mx: 'auto', w: 'full' })}>
        <Card.Root variant="elevated">
          <Card.Header>
            <Card.Title>Get Started</Card.Title>
            <Card.Description>Quick links to get up and running</Card.Description>
          </Card.Header>
          <Card.Body>
            <Group gap="2">
              <Button variant="solid" colorPalette="blue" size="sm">
                Documentation
              </Button>
              <Button variant="outline" colorPalette="gray" size="sm">
                GitHub
              </Button>
            </Group>
          </Card.Body>
        </Card.Root>
      </Group>
    </Stack>
  )
})
