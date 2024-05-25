// Tag
export type Tag = string
export type OnTagToggle = (tag: Tag, state: ToggleState) => void

// Post
export type Post = {
  title: string
  description: string
  thumbnail?: string
  series?: string
  tags?: Tag[]
}

export type PostPreview = Pick<Post, 'title' | 'tags' | 'series' | 'thumbnail' | 'description'>

// Filters
export type SortBy = 'date' | 'title'
export type SortOrder = 'desc' | 'asc'
export type Filters = {
  query: string | null
  from: Date | null
  to: Date | null
  sort: SortBy | null
  order: SortOrder | null
  tags: Tag[]
}
export type FilterUpdater = (updater: (filter: Filters) => Filters) => void

// Misc
export type ToggleState = 'ON' | 'OFF'

// Search
export type SearchValue = {
  query: string | null
  from: Date | null
  to: Date | null
  sort: SortBy | null
  order: SortOrder | null
  tags: Tag[]
}
