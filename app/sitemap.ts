import { config } from '@/lib/config'
import _posts from '@/markdown/posts.json'

import type { MetadataRoute } from 'next'
import type { PostTree, PostInfo } from '@/lib/types'

type ArrayElement<A> = A extends readonly (infer T)[] ? T : never

const posts = _posts as unknown as PostTree

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [
    {
      url: config.baseUrl,
      changeFrequency: 'daily',
    },
  ]

  flatten(posts).forEach((post) => result.push(toSitemapItem(post)))

  return result
}

function toSitemapItem(post: PostInfo): ArrayElement<MetadataRoute.Sitemap> {
  return {
    url: config.baseUrl + '/posts/' + post.slug.full,
    changeFrequency: 'daily',
    lastModified: post.date,
  }
}

function flatten(tree: PostTree): PostInfo[] {
  const result: PostInfo[] = []

  if (tree.post) result.push(tree.post)
  if (tree.children == null) return result

  Object.values(tree.children).forEach((child) => {
    result.push(...flatten(child))
  })

  return result
}
