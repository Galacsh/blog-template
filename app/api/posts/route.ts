import type { PostPreviewResponse } from '@/lib/types'

export async function generateStaticParams() {
  return []
}

export async function GET() {
  return Response.json({ posts: samplePosts || [] } as PostPreviewResponse)
}

const samplePosts = [
  {
    title: 'Introduction to JavaScript',
    description:
      'A comprehensive guide to getting started with JavaScript, covering the basics and foundational concepts.',
    slug: 'introduction-to-javascript',
    date: '2024-04-01',
    tags: ['javaScript', 'beginner'],
  },
  {
    title: 'CSS Grid Layout',
    description: 'Learn how to use CSS Grid to create complex layouts with ease.',
    slug: 'css-grid-layout',
    tags: ['css', 'layout', 'frontend'],
  },
  {
    title: 'Understanding Promises in JavaScript',
    description:
      'An in-depth look at promises in JavaScript and how to use them for asynchronous programming.',
    slug: 'understanding-promises-in-javascript',
    date: '2024-04-02',
    tags: ['javaScript', 'asynchronous', 'intermediate'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
]
