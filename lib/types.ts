import { JSX } from 'react'

export type Slug = {
  slug: {
    full: string
    arr: string[]
  }
}

export type Content = {
  toc: OnThisPage[]
  content: JSX.Element
}

export type RelatedPost = Pick<Frontmatter, 'title'> & Slug

export type AdditionalInfo = {
  relatedPosts: RelatedPost[]
}

export type Frontmatter = {
  title: string
  description: string
  date?: string
  tags?: Tag[]
}

export type Preview = Frontmatter & Slug

export type PostInfo = Preview & AdditionalInfo

export type Post = PostInfo & Content

export type PostTree = {
  post?: PostInfo
  children?: Record<string, PostTree>
}

export type Tag = string

export type SortBy = 'date' | 'title'

export type SortOrder = 'desc' | 'asc'

export type OnThisPage = {
  id: string
  depth: number
  text: string
}

export type PreviewResponse = {
  posts: Preview[]
}

export type PreviewDateParsed = Omit<Preview, 'date'> & {
  date: Date | undefined
}

declare module 'vfile' {
  interface DataMap {
    slug: Slug['slug']
    matter: Frontmatter
    toc: OnThisPage[]
  }
}
