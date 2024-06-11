'use client'

import { SortButton } from '@/components/sort-button'
import { PostPreviewItem } from '@/components/post-preview'
import { PostPreviewSkeleton } from '@/components/post-preview-skeleton'
import { useMemo, useCallback, useState, useEffect, useRef } from 'react'
import { useSearch } from '@/lib/hooks/use-search'
import { parse } from 'date-fns'

import type { PreviewResponse, PreviewDateParsed, SortBy, SortOrder, Tag } from '@/lib/types'
import { config } from '@/lib/config'

export function FilteredPosts() {
  const [posts, setPosts] = useState<PreviewDateParsed[]>()

  // Load posts
  useEffect(() => {
    getPosts().then((data) => setPosts(data))
  }, [])

  // Filter
  const query = useSearch('query', '', toStateQuery)
  const from = useSearch('from', undefined, toStateDate)
  const to = useSearch('to', undefined, toStateDate)
  const selectedTags = useSearch('tags', [], toStateTags)
  const tagsSet = useMemo(() => new Set(selectedTags), [selectedTags])

  const filter = useCallback(
    async (unfiltered: PreviewDateParsed[]) => {
      let result = unfiltered
      if (query || from || to || tagsSet) {
        result = unfiltered
          .filter((p) => filterQuery(p, query))
          .filter((p) => filterDate(p, from, to))
          .filter((p) => filterTags(p, tagsSet))
      }
      return result
    },
    [query, from, to, tagsSet]
  )

  // Sort
  const sort = useSearch('sort', 'date', toStateSort)
  const order = useSearch('order', 'desc', toStateOrder)

  const compare = useCallback(
    (a: PreviewDateParsed, b: PreviewDateParsed) => {
      let result = 0
      const aValue = a[sort]
      const bValue = b[sort]
      const aExists = aValue != null
      const bExists = bValue != null

      // existing one should come first
      if (!aExists && bExists) return 1
      if (aExists && !bExists) return -1
      // compare
      if (aExists && bExists) {
        result = aValue < bValue ? -1 : 1
      }
      // if nothing, compare title
      else {
        result = a.title < b.title ? -1 : 1
      }

      return order === 'asc' ? result : -result
    },
    [sort, order]
  )

  // Actual filtering and sorting
  const filteringQueue = useRef<Promise<PreviewDateParsed[]>[]>([])
  const [loading, setLoading] = useState(true)
  const [filtered, setFiltered] = useState<PreviewDateParsed[]>([])

  useEffect(() => {
    if (posts) {
      setLoading(true)

      const filtering = filter(posts)
      filteringQueue.current.push(filtering)

      filtering.then((unsorted) => {
        const idx = filteringQueue.current.indexOf(filtering)
        if (idx === filteringQueue.current.length - 1) {
          // clear the queue
          filteringQueue.current = []
          // use this value
          setFiltered(unsorted.sort(compare))
          setLoading(false)
        } else {
          // remove this value
          filteringQueue.current.splice(idx, 1)
          // and do nothing
          return
        }
      })
    }
  }, [posts, filter, compare])

  return (
    <div>
      <div className="flex flex-row items-center justify-between mb-4">
        <h1 className="font-bold text-xl">Posts</h1>
        <SortButton />
      </div>
      <div className="flex flex-col space-y-8">
        {loading ? (
          <PostPreviewSkeletons />
        ) : filtered.length === 0 ? (
          <NoPostsFound />
        ) : (
          filtered.map((post) => (
            <PostPreviewItem
              key={post.slug.full}
              slug={post.slug.full}
              title={post.title}
              description={post.description}
              tags={post.tags}
              date={post.date}
            />
          ))
        )}
      </div>
    </div>
  )
}

/**
 * Show this component during loading/filtering
 */
function PostPreviewSkeletons() {
  return (
    <>
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
      <PostPreviewSkeleton />
    </>
  )
}

/**
 * When no posts found, show this instead
 */
function NoPostsFound() {
  return (
    <div className="h-16 w-full flex flex-row items-center justify-center">
      <span className="text-xs text-muted-foreground">No posts found.</span>
    </div>
  )
}

// ==============
// == API call ==
// ==============

/**
 * Fetch and parse posts
 */
async function getPosts(): Promise<PreviewDateParsed[]> {
  const res = await fetch(config.basePath + '/api/posts', {
    next: { revalidate: 3600 },
  })
  const { posts } = (await res.json()) as PreviewResponse

  if (posts == null) return []

  return posts.map((p) => ({
    ...p,
    date: p.date ? parse(p.date, 'yyyy-MM-dd', refDate) : undefined,
  }))
}

// =============
// == Filters ==
// =============

const filterQuery = (p: PreviewDateParsed, query: string) => {
  if (query) {
    const queryLowercase = query.toLowerCase()
    return (
      p.title.toLowerCase().includes(queryLowercase) ||
      p.description.toLowerCase().includes(queryLowercase)
    )
  } else {
    return true
  }
}

const filterDate = (p: PreviewDateParsed, from: Date | undefined, to: Date | undefined) => {
  if (!from && !to) return true
  if (!p.date) return false

  if (from && to) return from <= p.date && p.date <= to
  else if (from) return from <= p.date
  else if (to) {
    return p.date <= to
  }

  return true
}

const filterTags = (p: PreviewDateParsed, selectedTagsSet: Set<Tag>) => {
  if (selectedTagsSet.size === 0) return true
  if (!p.tags) return false

  return p.tags.some((t) => selectedTagsSet.has(t))
}

// ======================================
// == Parse search parameters to state ==
// ======================================

function toStateQuery(val: string | null) {
  return val || ''
}

function toStateDate(val: string | null) {
  if (!val) return undefined

  const date = parse(val, 'yyyy-MM-dd', refDate)

  if (isNaN(date.valueOf()) || date.valueOf() < 0) {
    throw new Error('Invalid date.')
  }

  return date
}

function toStateTags(val: string | null) {
  return val?.split(',').map(decodeURIComponent) || []
}

function toStateSort(val: string | null) {
  return (val || 'date') as SortBy
}

function toStateOrder(val: string | null) {
  return (val || 'desc') as SortOrder
}

const refDate = new Date()
