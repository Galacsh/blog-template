import { PostsFilter } from '@/components/posts-filter'
import { FilteredPosts } from '@/components/filtered-posts'

export default function Posts() {
  return (
    <div className="w-full max-w-screen-sm mx-auto my-8 space-y-8">
      <PostsFilter tags={[]} />
      <FilteredPosts />
    </div>
  )
}
