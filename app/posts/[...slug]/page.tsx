import { Post } from '@/components/post'
import { OnThisPage } from '@/components/on-this-page'
import { RelatedPosts } from '@/components/related-posts'
import { ShrunkNav } from '@/components/shrunk-nav'
import { getPost, getInfo, getSlugs } from '@/lib/posts'
import './github-dark.scss'
import './github-light.scss'

import type { Metadata } from 'next'
import { imageContentType, imageSize } from '@/lib/og/image'
import { config } from '@/lib/config'

type Props = Readonly<{
  params: {
    slug: string[]
  }
}>

export function generateMetadata({ params }: Props): Metadata {
  const { slug } = params

  const post = getInfo(slug)
  if (!post) throw new Error('Post not found.')

  return {
    title: `${post.title} | ${config.name}`,
    description: post.description,
    openGraph: {
      title: `${post.title} | ${config.name}`,
      description: post.description,
      images: [
        {
          alt: post.title,
          type: imageContentType,
          width: imageSize.width,
          height: imageSize.height,
          url: '/og/posts/' + post.slug.full,
        },
      ],
    },
  }
}

export default function PostPage({ params }: Props) {
  const { slug } = params

  const post = getPost(slug)

  return (
    <>
      {/* Non-xl screen navigation menu */}
      <div className="sticky top-0 z-50 h-12 flex flex-row items-center justify-center xl:hidden border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <ShrunkNav
          left={<RelatedPosts posts={post.relatedPosts} />}
          right={<OnThisPage items={post.toc} />}
        />
      </div>
      <div className="flex flex-row items-start justify-center">
        {/* Related posts */}
        <aside className="sticky top-0 max-h-screen w-full max-w-72 hidden xl:flex p-4 mr-2 mt-12 mb-12 z-30">
          <RelatedPosts posts={post.relatedPosts} />
        </aside>
        {/* Post */}
        <article
          id="post"
          className="w-full font-medium flex-1 max-w-2xl px-4 mt-12 xl:mt-16 mb-16"
        >
          <Post data={post} />
        </article>
        {/* On this page */}
        <aside className="sticky top-12 xl:top-0 max-h-[calc(100vh-3rem)] xl:max-h-screen w-full max-w-72 hidden lg:flex p-4 ml-2 mt-8 xl:mt-12 mb-12 z-30">
          <OnThisPage items={post.toc} />
        </aside>
      </div>
    </>
  )
}

export function generateStaticParams() {
  const slugs = getSlugs()
  if (process.env.NODE_ENV === 'production') {
    return slugs.map((s) => s.map(decodeURIComponent)).map((s) => ({ slug: s }))
  } else {
    return slugs.map((s) => ({ slug: s }))
  }
}
