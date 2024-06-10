import { Input } from '@/components/ui/input'
import { FilterLabel } from '@/components/posts-filter-label'
import { useState, useEffect } from 'react'
import { useDebounce } from '@/lib/hooks/use-debounce'

import type { Dispatch, SetStateAction } from 'react'

type Props = Readonly<{
  query: string
  onQueryChange: Dispatch<SetStateAction<string>>
}>

export function QueryFilter({ query, onQueryChange }: Props) {
  // create buffer with text
  const [buffer, setBuffer] = useState(query)

  // force sync between text and buffer
  useEffect(() => setBuffer(query), [query])

  // debouncing search param update
  const debounced = useDebounce(buffer)
  useEffect(() => onQueryChange(debounced), [debounced, onQueryChange])

  return (
    <div className="w-full">
      <FilterLabel htmlFor="query">Search</FilterLabel>
      <Input
        type="search"
        id="query"
        placeholder="Type here..."
        value={buffer}
        className="hover:bg-accent"
        onChange={(e) => setBuffer(e.target.value)}
      />
    </div>
  )
}
