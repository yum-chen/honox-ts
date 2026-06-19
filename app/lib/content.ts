import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import yaml from 'js-yaml'
import { marked } from 'marked'

const postsDirectory = join(process.cwd(), 'content/posts')

export interface Post {
  slug: string
  title: string
  date: string
  content: string
}

interface PostAttributes {
  title: string
  date: string | Date
}

function parseMarkdown(fileContents: string) {
  const match = fileContents.match(/^---\r?\n([\s\S]+?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) {
    return { attributes: {} as PostAttributes, body: fileContents }
  }
  const attributes = yaml.load(match[1]) as PostAttributes
  const body = match[2]
  return { attributes, body }
}

export function getPosts(): Post[] {
  try {
    const fileNames = readdirSync(postsDirectory)
    const allPostsData = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        const fullPath = join(postsDirectory, fileName)
        const fileContents = readFileSync(fullPath, 'utf8')
        const { attributes, body } = parseMarkdown(fileContents)

        return {
          slug,
          title: attributes.title,
          date: attributes.date?.toString(),
          content: marked.parse(body) as string,
        }
      })
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (e) {
    console.error('Error reading posts:', e)
    return []
  }
}

export function getPostBySlug(slug: string): Post | undefined {
  try {
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = readFileSync(fullPath, 'utf8')
    const { attributes, body } = parseMarkdown(fileContents)

    return {
      slug,
      title: attributes.title,
      date: attributes.date?.toString(),
      content: marked.parse(body) as string,
    }
  } catch (e) {
    console.error(`Error reading post with slug ${slug}:`, e)
    return undefined
  }
}
