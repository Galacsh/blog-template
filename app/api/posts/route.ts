import { getPosts } from '@/lib/posts'
import type { PostInfo, Preview, PostTree } from '@/lib/types'

export async function generateStaticParams() {
  return []
}

export async function GET() {
  return Response.json({ posts: flatten(getPosts()).map(toPreview) })
}

function flatten(tree: PostTree): PostInfo[] {
  if (tree.children == null) return []

  return Object.values(tree.children).flatMap((child) => {
    if (!child.children) {
      return child.post as PostInfo
    } else {
      return flatten(child)
    }
  })
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
