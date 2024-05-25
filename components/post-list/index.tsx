import { PostPreview } from '@/types'

type Props = {
  posts: PostPreview[]
}

export default function PostList({ posts }: Props) {
  return (
    <>
      {posts.map((post, idx) => {
        return <div key={'post_' + idx}>post {post.title}</div>
      })}
    </>
  )
}
