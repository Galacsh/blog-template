'use client'

import { QueryFilter } from '@/components/posts-filter-query'
import { DateFilter } from '@/components/posts-filter-date'
import { TagFilter } from '@/components/posts-filter-tag'

import type { Tag } from '@/lib/types'

type Props = Readonly<{
  tags: Tag[]
}>

export function PostsFilter({ tags }: Props) {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="block font-bold text-xl">Filter</h1>
      <QueryFilter />
      <DateFilter />
      <TagFilter tags={tags} />
    </div>
  )
}
