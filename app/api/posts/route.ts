import { getPosts } from '@/lib/posts'
import type { PostInfo, Preview, PostTree } from '@/lib/types'

export async function generateStaticParams() {
  return []
}

export async function GET() {
  return Response.json({ posts: flatten(getPosts()).map(toPreview) })
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

function toPreview(post: PostInfo): Preview {
  return {
    title: post.title,
    description: post.description,
    slug: post.slug,
    date: post.date,
    tags: post.tags,
  }
}
