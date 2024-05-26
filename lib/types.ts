export type Post = {
  title: string
  description: string
  thumbnail?: string
  series?: Series
  tags?: Tag[]
}

export type PostPreview = Pick<Post, 'title' | 'description' | 'thumbnail' | 'series' | 'tags'>

export type Series = string

export type Tag = string

export type Filters = {
  query: string | null
  from: Date | null
  to: Date | null
  sort: SortBy | null
  order: SortOrder | null
  tags: Tag[]
}

export type SortBy = 'date' | 'title'

export type SortOrder = 'desc' | 'asc'
