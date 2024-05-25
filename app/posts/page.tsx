import { Suspense } from 'react'
import PostList from './post-list'
import SearchFilters from './search-filters'

import type { Tag, PostPreview } from '@/types'

export default function PostsPage() {
  const dummyPosts: PostPreview[] = [
    { title: 'Hello 1', description: 'world 1' },
    { title: 'Hello 2', description: 'world 2' },
    { title: 'Hello 3', description: 'world 3' },
  ]
  const dummyTags: Tag[] = [
    'java',
    'css',
    'javascript',
    'typescript',
    'go',
    'rust',
    'ssh',
    'devops',
    'docker',
    'Hello world',
    'However, what if tag is too long to show in one line? Have you ever tested this?',
  ]

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-sm p-4 flex flex-col items-center">
        <Suspense>
          <div className="w-full mt-8">
            <span className="block mb-4 font-bold text-xl text-white">Search Filters</span>
            <SearchFilters tags={dummyTags} className="w-full" />
          </div>
          <div className="w-full mt-8">
            <span className="block mb-4 font-bold text-xl text-white">Posts</span>
            <PostList posts={dummyPosts} />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
