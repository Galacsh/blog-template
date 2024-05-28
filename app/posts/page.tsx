import { Suspense } from 'react'
import { Metadata } from 'next'
import { PostsFilter } from '@/components/posts-filter'
import { FilteredPosts } from '@/components/filtered-posts'
import { imageSize } from '@/lib/og/image'

import type { PostPreview, Tag } from '@/lib/types'

export const metadata: Metadata = {
  openGraph: {
    title: 'Posts',
    description: 'List of posts',
    images: [
      {
        alt: 'Posts',
        type: 'image/png',
        width: imageSize.width,
        height: imageSize.height,
        url: '/posts/og.png',
      },
    ],
  },
}

export default function Posts() {
  return (
    <div className="w-full max-w-screen-sm mx-auto my-16 space-y-16">
      <Suspense>
        <PostsFilter tags={sampleTags} />
        <FilteredPosts posts={samplePosts} />
      </Suspense>
    </div>
  )
}

const sampleTags: Tag[] = [
  'react',
  'css',
  'layout',
  'asynchronous',
  'intermediate',
  'javaScript',
  'tutorial',
  'frontend',
  'beginner',
]

const samplePosts: PostPreview[] = [
  {
    title: 'Introduction to JavaScript',
    description:
      'A comprehensive guide to getting started with JavaScript, covering the basics and foundational concepts.',
    slug: 'introduction-to-javascript',
    date: new Date('2024-04-01'),
    thumbnail: 'https://example.com/thumbnails/js-intro.png',
    tags: ['javaScript', 'beginner'],
  },
  {
    title: 'CSS Grid Layout',
    description: 'Learn how to use CSS Grid to create complex layouts with ease.',
    slug: 'css-grid-layout',
    thumbnail: 'https://example.com/thumbnails/css-grid.png',
    tags: ['css', 'layout', 'frontend'],
  },
  {
    title: 'Understanding Promises in JavaScript',
    description:
      'An in-depth look at promises in JavaScript and how to use them for asynchronous programming.',
    slug: 'understanding-promises-in-javascript',
    date: new Date('2024-04-02'),
    thumbnail: 'https://example.com/thumbnails/js-promises.png',
    tags: ['javaScript', 'asynchronous', 'intermediate'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
  {
    title: 'Getting Started with React',
    description:
      "A beginner's guide to building user interfaces with React, a popular JavaScript library.",
    slug: 'getting-started-with-react',
    thumbnail: 'https://example.com/thumbnails/react-start.png',
    tags: ['react', 'javaScript', 'frontend', 'beginner'],
  },
]
