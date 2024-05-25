import DateFilter from './date-filter'
import SortByFilter from './sort-by-filter'
import TagFilter from './tag-filter'
import TextFilter from './text-filter'

import type { Tag } from '@/types'

type Props = {
  tags: Tag[]
  className?: string
}

export default function SearchFilters({ tags, className }: Props) {
  return (
    <div className={className}>
      <TextFilter className="mb-4" />
      <DateFilter className="mb-4" />
      <SortByFilter className="mb-4" />
      <TagFilter tags={tags} />
    </div>
  )
}
