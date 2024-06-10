'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayersIcon } from '@radix-ui/react-icons'

import type { RelatedPost } from '@/lib/types'

type RelatedPostsProps = Readonly<{
  posts: RelatedPost[]
}>

export function RelatedPosts({ posts }: RelatedPostsProps) {
  const pathname = usePathname()
  const prefix = '/posts/'

  return (
    <div className="flex flex-col text-sm leading-normal w-full max-w-full">
      <div className="font-bold text-foreground mb-1 flex flex-row items-center">
        <LayersIcon className="mr-2 size-4" />
        Related posts
      </div>
      <div className="block max-h-full max-w-full overflow-y-auto overflow-x-hidden">
        {posts.length > 0 ? (
          posts.map((post) => (
            <RelatedPost
              key={`related_${post.slug.full}`}
              title={post.title}
              slug={post.slug.full}
              active={pathname === prefix + post.slug.full}
            />
          ))
        ) : (
          <div className="block max-w-full w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium text-muted-foreground my-2 first:mt-1">
            Nothing to display.
          </div>
        )}
      </div>
    </div>
  )
}

type RelatedPostProps = Readonly<{
  title: string
  slug: string
  active: boolean
}>

function RelatedPost({ title, slug, active }: RelatedPostProps) {
  if (active)
    return (
      <span className="block max-w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium text-foreground pl-2 my-2 first:mt-1 border-l-4 border-active">
        {title}
      </span>
    )
  else
    return (
      <Link
        href={`/posts/${slug}`}
        className="block max-w-full w-full overflow-hidden whitespace-nowrap text-ellipsis font-medium text-muted-foreground hover:text-foreground my-2 first:mt-1"
      >
        {title}
      </Link>
    )
}
