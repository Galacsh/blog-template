import { PostsFilter } from '@/components/posts-filter'
import { FilteredPosts } from '@/components/filtered-posts'
import { Suspense } from 'react'
import { Metadata } from 'next'
import { imageSize } from '@/lib/og/image'

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
    <div className="w-full max-w-screen-sm mx-auto my-8 space-y-8">
      <Suspense>
        <PostsFilter tags={sampleTags} />
        <FilteredPosts posts={samplePosts} />
      </Suspense>
    </div>
  )
}
