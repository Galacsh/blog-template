import { Metadata } from 'next'
import { imageSize } from '@/lib/og/image'
import { FilterAndPosts } from './filter-and-posts'

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
      <FilterAndPosts />
    </div>
  )
}
