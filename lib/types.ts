export type Post = {
  title: string
  description: string
  slug: string
  date?: Date
  thumbnail?: string
  tags?: Tag[]
}

export type PostPreview = Pick<
  Post,
  'title' | 'description' | 'slug' | 'date' | 'thumbnail' | 'tags'
>

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
