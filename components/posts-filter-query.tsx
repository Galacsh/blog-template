'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { FilterLabel } from '@/components/posts-filter-label'

export function QueryFilter() {
  const [query, setQuery] = useState<string>()

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
