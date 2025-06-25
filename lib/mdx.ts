import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'

const postsDirectory = join(process.cwd(), 'posts')

export type Post = {
  slug: string
  title: string
  date: string
  excerpt?: string
  author?: string
  tags?: string[]
  readingTime: string
  content: string
}

export function getPostSlugs() {
  return readdirSync(postsDirectory).filter(file => file.endsWith('.mdx'))
}

export function getPostBySlug(slug: string): Post {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)
  const stats = readingTime(content)

  return {
    slug: realSlug,
    title: data.title || '',
    date: data.date || '',
    excerpt: data.excerpt || '',
    author: data.author || '',
    tags: data.tags || [],
    readingTime: stats.text,
    content,
  }
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
} 