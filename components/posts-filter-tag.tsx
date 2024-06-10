import { useEffect, useState } from 'react'
import { FilterLabel } from '@/components/posts-filter-label'
import { cn } from '@/lib/utils'

import type { Dispatch, SetStateAction } from 'react'
import type { Tag } from '@/lib/types'
import { Skeleton } from './ui/skeleton'

type TagFilterProps = Readonly<{
  selectedTags: Tag[]
  onSelectedTagsChange: Dispatch<SetStateAction<string[]>>
}>

type TagsResponse = {
  tags: Tag[]
}

export function TagFilter({ selectedTags, onSelectedTagsChange }: TagFilterProps) {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getTags().then((data) => {
      setTags(data)
      setLoading(false)
    })
  }, [])

  return (
    <div className="w-full">
      <FilterLabel htmlFor="tags">Tags</FilterLabel>
      <div className="flex flex-row flex-wrap gap-2">
        {loading ? (
          <>
            <TagFilterItemSkeleton width="2.5rem" />
            <TagFilterItemSkeleton width="4.5rem" />
            <TagFilterItemSkeleton width="3.5rem" />
          </>
        ) : tags.length > 0 ? (
          tags.map((tag, idx) => (
            <TagFilterItem
              key={'tag_' + idx}
              tag={tag}
              isSelected={selectedTags?.includes(tag) || false}
              onSelect={(selectedTag) => onSelectedTagsChange([...selectedTags, selectedTag])}
              onDeselect={(deselected) =>
                onSelectedTagsChange(selectedTags.filter((t) => t !== deselected))
              }
            />
          ))
        ) : (
          <span className="text-xs text-muted-foreground">No tags found.</span>
        )}
      </div>
    </div>
  )
}

type TagFilterItemProps = Readonly<{
  tag: Tag
  isSelected: boolean
  onSelect: (tag: Tag) => void
  onDeselect: (tag: Tag) => void
}>

function TagFilterItem({ tag, isSelected, onSelect, onDeselect }: TagFilterItemProps) {
  const toggle = () => {
    if (isSelected) onDeselect(tag)
    else onSelect(tag)
  }

  return (
    <button
      className={cn(
        'px-2 py-1 text-xs rounded-md',
        'border hover:text-accent-foreground bg-background hover:bg-accent',
        'focus:outline-none focus:text-accent-foreground focus:bg-accent',
        {
          'text-muted-foreground': !isSelected,
          'text-foreground': isSelected,
          'border-input': !isSelected,
          'border-foreground hover:border-accent-foreground': isSelected,
        }
      )}
      onClick={toggle}
    >
      {tag}
    </button>
  )
}

function TagFilterItemSkeleton({ width }: { width: string }) {
  return <Skeleton style={{ width }} className={'h-[1.625rem] rounded-md'} />
}

async function getTags(): Promise<Tag[]> {
  const res = await fetch('/api/tags', { next: { revalidate: 3600 } })
  const { tags } = (await res.json()) as TagsResponse

  return tags || []
}
