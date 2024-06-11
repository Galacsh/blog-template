import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { CopyToClipboard } from '@/components/post-share-button'
import { config } from '@/lib/config'

import type { Post as PostType } from '@/lib/types'

type Props = Readonly<{
  data: PostType
}>

export function Post({ data }: Props) {
  const { title, date, slug, tags, content } = data
  const url = config.baseUrl + '/posts/' + slug.full

  return (
    <>
      {/* Date */}
      <div className="flex flex-row items-center justify-center space-x-2 text-xs text-muted-foreground/60 mb-2">
        <CalendarIcon className="size-3" />
        <span>{date ? format(date, 'PPP') : 'No date'}</span>
      </div>
      {/* Title */}
      <div className="font-black text-4xl mb-4 text-center">{title}</div>
      {/* Tags */}
      <div className="flex flex-row flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground mb-24 xl:mb-16">
        {tags != null &&
          tags.length &&
          tags.map((tag) => (
            <span key={'tag_' + tag} className="px-2 py-1 rounded-md bg-muted">
              {tag}
            </span>
          ))}
      </div>
      {/* Share link (fixed bottom right) */}
      <CopyToClipboard text={url} className="fixed bottom-4 right-16 z-40" />
      {/* Compiled markdown */}
      {content}
    </>
  )
}
