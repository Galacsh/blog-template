'use client'

import { QueryFilter } from '@/components/posts-filter-query'
import { DateFilter } from '@/components/posts-filter-date'
import { TagFilter } from '@/components/posts-filter-tag'

const availableTags = [
  'hello',
  'world',
  'this is sample',
  'will wrap nicely?',
  'javascript',
  'java',
  'go',
  'devops',
  'ai',
  'rust',
  'cli',
  'setup',
]

export function PostsFilter() {
  return (
    <div className="flex flex-col space-y-4">
      <h1 className="block font-bold text-xl">Filter</h1>
      <QueryFilter />
      <DateFilter />
      <TagFilter available={availableTags} />
    </div>
  )
}
