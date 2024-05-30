export type Post = {
  title: string
  description: string
  slug: string
  date?: Date
  tags?: Tag[]
}

export type PostPreview = Pick<Post, 'title' | 'description' | 'slug' | 'date' | 'tags'>

export type PostPreviewResponse = {
  posts: (Pick<Post, 'title' | 'description' | 'slug' | 'tags'> & {
    date?: string
  })[]
}

export type Tag = string

export type SortBy = 'date' | 'title'

export type SortOrder = 'desc' | 'asc'
