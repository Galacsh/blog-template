'use client'

import { Suspense } from 'react'
import { PostsFilter } from '@/components/posts-filter'
import { FilteredPosts } from '@/components/filtered-posts'

export function FilterAndPosts() {
  return (
    <Suspense>
      <PostsFilter />
      <FilteredPosts />
    </Suspense>
  )
}
