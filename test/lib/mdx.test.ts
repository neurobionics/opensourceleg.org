import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { getPostSlugs, getPostBySlug, getAllPosts, getPaginatedPosts } from '@/lib/mdx'
import type { Post, PaginatedPosts } from '@/lib/mdx'

// Mock fs module
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  readdirSync: vi.fn(),
  default: {
    readFileSync: vi.fn(),
    readdirSync: vi.fn()
  }
}))

// Mock path module
vi.mock('path', () => ({
  join: vi.fn((...args) => args.join('/')),
  default: {
    join: vi.fn((...args) => args.join('/'))
  }
}))

// Mock gray-matter
vi.mock('gray-matter', () => ({
  default: vi.fn()
}))

// Mock reading-time
vi.mock('reading-time', () => ({
  default: vi.fn()
}))

// Mock process.cwd
const mockCwd = vi.fn()
Object.defineProperty(process, 'cwd', {
  value: mockCwd
})

describe('MDX Library', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCwd.mockReturnValue('/project/root')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('getPostSlugs', () => {
    it('returns only MDX files from posts directory', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue([
        'post1.mdx',
        'post2.mdx',
        'readme.md',
        'post3.mdx',
        'config.json'
      ] as any)

      const slugs = getPostSlugs()
      
      expect(slugs).toEqual(['post1.mdx', 'post2.mdx', 'post3.mdx'])
      expect(readdirSync).toHaveBeenCalledWith('/project/root/posts')
    })

    it('returns empty array when no MDX files found', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue([
        'readme.md',
        'config.json',
        'styles.css'
      ] as any)

      const slugs = getPostSlugs()
      
      expect(slugs).toEqual([])
    })

    it('handles empty directory', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue([] as any)

      const slugs = getPostSlugs()
      
      expect(slugs).toEqual([])
    })
  })

  describe('getPostBySlug', () => {
    it('parses MDX file and returns Post object', async () => {
      const { readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      const mockFileContent = `---
title: Test Post
date: 2023-12-01
excerpt: This is a test post
author: John Doe
tags: ["test", "example"]
---

# Test Post Content

This is the content of the test post.
`

      vi.mocked(readFileSync).mockReturnValue(mockFileContent)
      vi.mocked(grayMatter.default).mockReturnValue({
        data: {
          title: 'Test Post',
          date: '2023-12-01',
          excerpt: 'This is a test post',
          author: 'John Doe',
          tags: ['test', 'example']
        },
        content: '# Test Post Content\n\nThis is the content of the test post.\n'
      } as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      const post = getPostBySlug('test-post')

      expect(post).toEqual({
        slug: 'test-post',
        title: 'Test Post',
        date: '2023-12-01',
        excerpt: 'This is a test post',
        author: 'John Doe',
        tags: ['test', 'example'],
        readingTime: '1 min read',
        content: '# Test Post Content\n\nThis is the content of the test post.\n'
      })

      expect(readFileSync).toHaveBeenCalledWith('/project/root/posts/test-post.mdx', 'utf8')
    })

    it('removes .mdx extension from slug', async () => {
      const { readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      vi.mocked(readFileSync).mockReturnValue('---\ntitle: Test\n---\nContent')
      vi.mocked(grayMatter.default).mockReturnValue({
        data: { title: 'Test' },
        content: 'Content'
      } as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      const post = getPostBySlug('test-post.mdx')

      expect(post.slug).toBe('test-post')
      expect(readFileSync).toHaveBeenCalledWith('/project/root/posts/test-post.mdx', 'utf8')
    })

    it('handles missing frontmatter fields with defaults', async () => {
      const { readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      vi.mocked(readFileSync).mockReturnValue('---\ntitle: Minimal Post\n---\nContent')
      vi.mocked(grayMatter.default).mockReturnValue({
        data: { title: 'Minimal Post' },
        content: 'Content'
      } as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      const post = getPostBySlug('minimal-post')

      expect(post).toEqual({
        slug: 'minimal-post',
        title: 'Minimal Post',
        date: '',
        excerpt: '',
        author: '',
        tags: [],
        readingTime: '1 min read',
        content: 'Content'
      })
    })

    it('handles empty frontmatter', async () => {
      const { readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      vi.mocked(readFileSync).mockReturnValue('---\n---\nContent only')
      vi.mocked(grayMatter.default).mockReturnValue({
        data: {},
        content: 'Content only'
      } as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      const post = getPostBySlug('empty-frontmatter')

      expect(post).toEqual({
        slug: 'empty-frontmatter',
        title: '',
        date: '',
        excerpt: '',
        author: '',
        tags: [],
        readingTime: '1 min read',
        content: 'Content only'
      })
    })

    it('calculates reading time correctly', async () => {
      const { readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      const longContent = 'This is a very long post content that would take more time to read. '.repeat(100)

      vi.mocked(readFileSync).mockReturnValue(`---\ntitle: Long Post\n---\n${longContent}`)
      vi.mocked(grayMatter.default).mockReturnValue({
        data: { title: 'Long Post' },
        content: longContent
      } as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '5 min read' } as any)

      const post = getPostBySlug('long-post')

      expect(post.readingTime).toBe('5 min read')
      expect(readingTime.default).toHaveBeenCalledWith(longContent)
    })
  })

  describe('getAllPosts', () => {
    it('returns all posts sorted by date (newest first)', async () => {
      const { readdirSync, readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      vi.mocked(readdirSync).mockReturnValue(['post1.mdx', 'post2.mdx', 'post3.mdx'] as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      // Mock file contents with different dates
      vi.mocked(readFileSync)
        .mockReturnValueOnce('---\ntitle: Post 1\ndate: 2023-12-01\n---\nContent 1')
        .mockReturnValueOnce('---\ntitle: Post 2\ndate: 2023-12-03\n---\nContent 2')
        .mockReturnValueOnce('---\ntitle: Post 3\ndate: 2023-12-02\n---\nContent 3')

      vi.mocked(grayMatter.default)
        .mockReturnValueOnce({
          data: { title: 'Post 1', date: '2023-12-01' },
          content: 'Content 1'
        } as any)
        .mockReturnValueOnce({
          data: { title: 'Post 2', date: '2023-12-03' },
          content: 'Content 2'
        } as any)
        .mockReturnValueOnce({
          data: { title: 'Post 3', date: '2023-12-02' },
          content: 'Content 3'
        } as any)

      const posts = getAllPosts()

      expect(posts).toHaveLength(3)
      expect(posts[0].title).toBe('Post 2') // Most recent
      expect(posts[0].date).toBe('2023-12-03')
      expect(posts[1].title).toBe('Post 3') // Middle
      expect(posts[1].date).toBe('2023-12-02')
      expect(posts[2].title).toBe('Post 1') // Oldest
      expect(posts[2].date).toBe('2023-12-01')
    })

    it('handles empty posts directory', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue([] as any)

      const posts = getAllPosts()

      expect(posts).toEqual([])
    })

    it('handles posts with same date', async () => {
      const { readdirSync, readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      vi.mocked(readdirSync).mockReturnValue(['post1.mdx', 'post2.mdx'] as any)
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      vi.mocked(readFileSync)
        .mockReturnValueOnce('---\ntitle: Post 1\ndate: 2023-12-01\n---\nContent 1')
        .mockReturnValueOnce('---\ntitle: Post 2\ndate: 2023-12-01\n---\nContent 2')

      vi.mocked(grayMatter.default)
        .mockReturnValueOnce({
          data: { title: 'Post 1', date: '2023-12-01' },
          content: 'Content 1'
        } as any)
        .mockReturnValueOnce({
          data: { title: 'Post 2', date: '2023-12-01' },
          content: 'Content 2'
        } as any)

      const posts = getAllPosts()

      expect(posts).toHaveLength(2)
      expect(posts.every(post => post.date === '2023-12-01')).toBe(true)
    })
  })

  describe('getPaginatedPosts', () => {
    beforeEach(async () => {
      const { readdirSync, readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')
      const readingTime = await import('reading-time')

      // Setup 10 posts for pagination testing
      vi.mocked(readdirSync).mockReturnValue(
        Array.from({ length: 10 }, (_, i) => `post${i + 1}.mdx`) as any
      )
      vi.mocked(readingTime.default).mockReturnValue({ text: '1 min read' } as any)

      // Mock file contents
      vi.mocked(readFileSync).mockImplementation((path) => {
        const match = path.toString().match(/post(\d+)\.mdx/)
        const postNum = match ? parseInt(match[1]) : 1
        return `---\ntitle: Post ${postNum}\ndate: 2023-12-${postNum.toString().padStart(2, '0')}\n---\nContent ${postNum}`
      })

      // Mock gray-matter parsing
      vi.mocked(grayMatter.default).mockImplementation((content) => {
        const match = content.toString().match(/Post (\d+)/)
        const postNum = match ? parseInt(match[1]) : 1
        return {
          data: {
            title: `Post ${postNum}`,
            date: `2023-12-${postNum.toString().padStart(2, '0')}`
          },
          content: `Content ${postNum}`
        } as any
      })
    })

    it('returns first page with default parameters', () => {
      const result = getPaginatedPosts()

      expect(result).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({ title: 'Post 10' }),
          expect.objectContaining({ title: 'Post 9' }),
          expect.objectContaining({ title: 'Post 8' }),
          expect.objectContaining({ title: 'Post 7' })
        ]),
        currentPage: 1,
        totalPages: 3,
        totalPosts: 10,
        hasNextPage: true,
        hasPreviousPage: false
      })
    })

    it('returns correct page with custom parameters', () => {
      const result = getPaginatedPosts(2, 3)

      expect(result).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({ title: 'Post 7' }),
          expect.objectContaining({ title: 'Post 6' }),
          expect.objectContaining({ title: 'Post 5' })
        ]),
        currentPage: 2,
        totalPages: 4,
        totalPosts: 10,
        hasNextPage: true,
        hasPreviousPage: true
      })
    })

    it('handles last page correctly', () => {
      const result = getPaginatedPosts(3, 4)

      expect(result).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({ title: 'Post 2' }),
          expect.objectContaining({ title: 'Post 1' })
        ]),
        currentPage: 3,
        totalPages: 3,
        totalPosts: 10,
        hasNextPage: false,
        hasPreviousPage: true
      })
    })

    it('handles page number beyond total pages', () => {
      const result = getPaginatedPosts(10, 4)

      expect(result.currentPage).toBe(3) // Should be clamped to max page
      expect(result.totalPages).toBe(3)
      expect(result.hasNextPage).toBe(false)
      expect(result.hasPreviousPage).toBe(true)
    })

    it('handles page number less than 1', () => {
      const result = getPaginatedPosts(0, 4)

      expect(result.currentPage).toBe(1) // Should be clamped to min page
      expect(result.hasPreviousPage).toBe(false)
    })

    it('handles negative page numbers', () => {
      const result = getPaginatedPosts(-5, 4)

      expect(result.currentPage).toBe(1) // Should be clamped to min page
      expect(result.hasPreviousPage).toBe(false)
    })

    it('handles single page of posts', async () => {
      const { readdirSync, readFileSync } = await import('fs')
      const grayMatter = await import('gray-matter')

      vi.mocked(readdirSync).mockReturnValue(['post1.mdx'] as any)
      vi.mocked(readFileSync).mockReturnValue('---\ntitle: Single Post\ndate: 2023-12-01\n---\nContent')
      vi.mocked(grayMatter.default).mockReturnValue({
        data: { title: 'Single Post', date: '2023-12-01' },
        content: 'Content'
      } as any)

      const result = getPaginatedPosts(1, 4)

      expect(result).toEqual({
        posts: expect.arrayContaining([
          expect.objectContaining({ title: 'Single Post' })
        ]),
        currentPage: 1,
        totalPages: 1,
        totalPosts: 1,
        hasNextPage: false,
        hasPreviousPage: false
      })
    })

    it('handles empty posts list', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue([] as any)

      const result = getPaginatedPosts(1, 4)

      expect(result).toEqual({
        posts: [],
        currentPage: 1,
        totalPages: 0,
        totalPosts: 0,
        hasNextPage: false,
        hasPreviousPage: false
      })
    })

    it('calculates total pages correctly', async () => {
      const { readdirSync } = await import('fs')
      vi.mocked(readdirSync).mockReturnValue(Array.from({ length: 7 }, (_, i) => `post${i + 1}.mdx`) as any)

      const result = getPaginatedPosts(1, 3)

      expect(result.totalPages).toBe(3) // 7 posts / 3 per page = 2.33... = 3 pages
      expect(result.totalPosts).toBe(7)
    })
  })

  describe('Type Safety', () => {
    it('Post type has correct structure', () => {
      const post: Post = {
        slug: 'test-slug',
        title: 'Test Title',
        date: '2023-12-01',
        excerpt: 'Test excerpt',
        author: 'Test Author',
        tags: ['tag1', 'tag2'],
        readingTime: '2 min read',
        content: 'Test content'
      }

      expect(post.slug).toBe('test-slug')
      expect(post.title).toBe('Test Title')
      expect(post.date).toBe('2023-12-01')
      expect(post.excerpt).toBe('Test excerpt')
      expect(post.author).toBe('Test Author')
      expect(post.tags).toEqual(['tag1', 'tag2'])
      expect(post.readingTime).toBe('2 min read')
      expect(post.content).toBe('Test content')
    })

    it('PaginatedPosts type has correct structure', () => {
      const paginatedPosts: PaginatedPosts = {
        posts: [],
        currentPage: 1,
        totalPages: 5,
        totalPosts: 20,
        hasNextPage: true,
        hasPreviousPage: false
      }

      expect(paginatedPosts.posts).toEqual([])
      expect(paginatedPosts.currentPage).toBe(1)
      expect(paginatedPosts.totalPages).toBe(5)
      expect(paginatedPosts.totalPosts).toBe(20)
      expect(paginatedPosts.hasNextPage).toBe(true)
      expect(paginatedPosts.hasPreviousPage).toBe(false)
    })
  })
}) 