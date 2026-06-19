import { createRoute } from 'honox/factory'
import Counter from '../islands/counter'
import { css } from '../../styled-system/css'
import { getPosts } from '../lib/content'

export default createRoute((c) => {
  const posts = getPosts()
  return c.render(
    <div class={css({ py: '8', textAlign: 'center', maxWidth: '800px', mx: 'auto' })}>
      <title>Artefact Blog</title>
      <h1 class={css({ fontSize: '3xl', fontWeight: 'bold', mb: '4' })}>Welcome to my Blog</h1>
      <p class={css({ mb: '8' })}>This blog is powered by HonoX and Sveltia CMS.</p>

      <div class={css({ textAlign: 'left', mb: '8' })}>
        <h2 class={css({ fontSize: 'xl', fontWeight: 'semibold', mb: '4' })}>Recent Posts</h2>
        <ul class={css({ listStyleType: 'none', p: '0' })}>
          {posts.map((post) => (
            <li key={post.slug} class={css({ mb: '4', borderBottom: '1px solid', borderColor: 'gray.200', pb: '2' })}>
              <a href={`/posts/${post.slug}`} class={css({ fontSize: 'lg', color: 'blue.600', _hover: { textDecoration: 'underline' } })}>
                {post.title}
              </a>
              <div class={css({ fontSize: 'sm', color: 'gray.500' })}>{new Date(post.date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      </div>

      <div class={css({ mt: '8', pt: '8', borderTop: '1px solid', borderColor: 'gray.200' })}>
        <Counter />
      </div>
    </div>
  )
})
