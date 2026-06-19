import { createRoute } from 'honox/factory'
import { css } from '../../../styled-system/css'
import { getPostBySlug } from '../../lib/content'
import { ssgParams } from 'hono/ssg'
import { readdirSync } from 'node:fs'
import { join } from 'node:path'

export default createRoute(
  ssgParams(() => {
    const postsDir = join(process.cwd(), 'content/posts')
    return readdirSync(postsDir)
      .filter(file => file.endsWith('.md'))
      .map(file => ({ slug: file.replace(/\.md$/, '') }))
  }),
  (c) => {
    const slug = c.req.param('slug')
    const post = getPostBySlug(slug)

    if (!post) {
      return c.notFound()
    }

    return c.render(
      <div class={css({ py: '8', maxWidth: '800px', mx: 'auto' })}>
        <title>{post.title}</title>
        <header class={css({ mb: '8' })}>
          <a href="/" class={css({ color: 'blue.600', mb: '4', display: 'inline-block' })}>← Back to home</a>
          <h1 class={css({ fontSize: '4xl', fontWeight: 'bold', mb: '2' })}>{post.title}</h1>
          <time class={css({ color: 'gray.500' })}>{new Date(post.date).toLocaleDateString()}</time>
        </header>
        <article
          class={css({
            '& h2': { fontSize: '2xl', fontWeight: 'bold', mt: '6', mb: '4' },
            '& p': { mb: '4', lineHeight: 'relaxed' },
            '& ul': { mb: '4', ml: '6', listStyleType: 'disc' }
          })}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    )
  }
)
