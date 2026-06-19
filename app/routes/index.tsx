import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { Button } from '../components/ui/button'
import { Heading } from '../components/ui/heading'
import { Text } from '../components/ui/text'
import { Badge } from '../components/ui/badge'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from '../components/ui/card'
import { Input } from '../components/ui/input'

export default createRoute((c) => {
  const name = c.req.query('name') ?? 'Hono'
  return c.render(
    <div class={css({
      py: '20',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '12',
      minHeight: '100vh',
      bg: 'bg.canvas',
      color: 'fg.default',
      px: '4'
    })}>
      <div class={css({ display: 'flex', flexDirection: 'column', gap: '4', alignItems: 'center' })}>
        <Badge variant="outline" colorPalette="amber" size="lg">New Release</Badge>
        <Heading as="h1" size="6xl">Hello, {name}!</Heading>
        <Text size="xl" color="fg.muted" maxWidth="2xl">
          Experience the power of HonoX with the beauty of Park UI. Ported specifically for Hono JSX.
        </Text>
      </div>

      <div class={css({
        display: 'grid',
        gridTemplateColumns: { base: '1fr', md: '1fr 1fr' },
        gap: '8',
        width: 'full',
        maxWidth: '5xl'
      })}>
        <Card>
          <CardHeader>
            <CardTitle>Interactive Counter</CardTitle>
            <CardDescription>A client-side island component using Hono's useState.</CardDescription>
          </CardHeader>
          <CardBody>
            <Counter />
          </CardBody>
          <CardFooter class={css({ justifyContent: 'center' })}>
             <Text size="xs" color="fg.subtle">This is a client-side hydrated island.</Text>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and inputs.</CardDescription>
          </CardHeader>
          <CardBody class={css({ display: 'flex', flexDirection: 'column', gap: '4' })}>
            <div class={css({ textAlign: 'left' })}>
                <Text size="sm" fontWeight="medium" mb="1.5">Your Name</Text>
                <Input placeholder="Enter your name" defaultValue={name} />
            </div>
            <div class={css({ display: 'flex', gap: '3', pt: '2' })}>
                <Button variant="solid" width="full">Save Changes</Button>
                <Button variant="outline" width="full">Cancel</Button>
            </div>
          </CardBody>
        </Card>
      </div>

      <div class={css({ display: 'flex', gap: '4' })}>
        <Text color="fg.subtle">Built with</Text>
        <Badge variant="subtle">HonoX</Badge>
        <Badge variant="subtle">Panda CSS</Badge>
        <Badge variant="subtle">Park UI</Badge>
      </div>
    </div>,
    { title: name }
  )
})
