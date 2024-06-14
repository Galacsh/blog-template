import Link from 'next/link'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'

import type { Tag } from '@/lib/types'

type Props = Readonly<{
  slug: string
  title: string
  description: string
  tags?: Tag[]
  date?: Date
}>

export function PostPreviewItem({ slug, title, description, date, tags }: Props) {
  return (
    <Link href={'/posts/' + slug} className="relative block w-full group focus:outline-none z-[1]">
      {/* Date */}
      {date && (
        <span className="flex flex-row items-center space-x-2 mb-1 text-xs text-muted-foreground/60">
          <CalendarIcon className="size-3" />
          <span>{format(date, 'PPP')}</span>
        </span>
      )}
      {/* Title */}
      <span className="block mb-1 font-bold text-foreground">{title}</span>
      {/* Description */}
      <span className="text-sm text-foreground line-clamp-3 w-full h-full">{description}</span>
      {/* Tags */}
      {tags && (
        <span className="flex flex-row flex-wrap w-full items-center gap-2 mt-2">
          {tags.map((tag, idx) => (
            <span key={'post_tag' + idx} className="px-2 py-1 text-xs rounded-md bg-accent">
              {tag}
            </span>
          ))}
        </span>
      )}
      {/* Hover effect */}
      <span className="absolute block top-[-0.5rem] left-[-1rem] w-[calc(100%+2rem)] h-[calc(100%+1rem)] sm:rounded-md bg-accent/50 invisible group-hover:visible group-focus:visible z-[-1]" />
    </Link>
  )
}
