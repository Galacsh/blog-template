'use client'

import { QueryFilter } from '@/components/posts-filter-query'
import { DateFilter } from '@/components/posts-filter-date'
import { TagFilter } from '@/components/posts-filter-tag'
import { useSearchState } from '@/lib/hooks/use-search'
import { format, parse } from 'date-fns'

import type { Tag } from '@/lib/types'

export function PostsFilter() {
  const [query, setQuery] = useSearchState('query', '', toStateQuery, toParamQuery)
  const [from, setFrom] = useSearchState('from', undefined, toStateDate, toParamDate)
  const [to, setTo] = useSearchState('to', undefined, toStateDate, toParamDate)
  const [selectedTags, setSelectedTags] = useSearchState('tags', [], toStateTags, toParamTags)

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="block font-bold text-xl">Filter</h1>
      <QueryFilter query={query} onQueryChange={setQuery} />
      <DateFilter from={from} onFromChange={setFrom} to={to} onToChange={setTo} />
      <TagFilter selectedTags={selectedTags} onSelectedTagsChange={setSelectedTags} />
    </div>
  )
}

function toStateQuery(val: string | null) {
  return val || ''
}
function toParamQuery(state: string) {
  return state || null
}
function toStateDate(val: string | null) {
  if (!val) return undefined

  const date = parse(val, 'yyyy-MM-dd', new Date())

  if (isNaN(date.valueOf()) || date.valueOf() < 0) {
    throw new Error('Invalid date.')
  }

  return date
}
function toParamDate(state: Date | undefined) {
  if (!state) return null
  return format(state, 'yyyy-MM-dd')
}
function toStateTags(val: string | null) {
  return val?.split(',').map(decodeURIComponent) || []
}
function toParamTags(state: Tag[]) {
  return state?.map(encodeURIComponent).join(',')
}
