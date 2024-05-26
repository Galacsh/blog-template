'use client'

import { Input } from '@/components/ui/input'
import { FilterLabel } from '@/components/posts-filter-label'
import { useSearch } from '@/lib/hooks/use-search'

export function QueryFilter() {
  const [query, setQuery] = useSearch('query', '', toState, toParam)

  return (
    <div className="w-full">
      <FilterLabel htmlFor="query">Search</FilterLabel>
      <Input
        type="search"
        id="query"
        placeholder="Type here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  )
}

function toState(val: string | null) {
  return val || ''
}

function toParam(state: string) {
  return state || null
}
