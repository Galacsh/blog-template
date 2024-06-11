import { Suspense } from 'react'
import { PostsFilter } from '@/components/posts-filter'
import { FilteredPosts } from '@/components/filtered-posts'
import { imageContentType, imageSize } from '@/lib/og/image'

import type { Metadata } from 'next'
import { config } from '@/lib/config'

export const metadata: Metadata = {
  metadataBase: new URL(config.baseUrl),
  title: `Posts | ${config.name}`,
  description: 'List of posts',
  openGraph: {
    title: `Posts | ${config.name}`,
    description: 'List of posts',
    images: [
      {
        alt: config.name,
        type: imageContentType,
        width: imageSize.width,
        height: imageSize.height,
        url: '/og/default',
      },
    ],
  },
}

export default function Posts() {
  return (
    <div className="w-full max-w-screen-sm mx-auto px-4 my-16 space-y-16">
      <Suspense>
        <PostsFilter />
        <FilteredPosts />
      </Suspense>
    </div>
  )
}
